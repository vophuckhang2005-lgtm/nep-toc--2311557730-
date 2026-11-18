/* ========================================================
   WEBSITE PHỤ KIỆN TÓC NẾP TÓC - JAVASCRIPT LOGIC
   Xử lý: Giỏ hàng localStorage, Tính phí ship, Lọc, Đặt hàng COD
======================================================== */

// Khởi tạo trạng thái giỏ hàng từ localStorage (hoặc mảng rỗng nếu chưa có)
const CART_STORAGE_KEY = "nep_toc_shopping_cart";
let cart = loadCartFromStorage();

// Ngưỡng miễn phí vận chuyển và mức phí mặc định
const FREESHIP_THRESHOLD = 300000; // 300.000đ
const DEFAULT_SHIPPING_FEE = 25000; // 25.000đ

// Hàm định dạng tiền tệ Việt Nam (Ví dụ: 120000 -> 120.000đ)
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

// Hàm tải giỏ hàng từ localStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Lỗi khi đọc giỏ hàng từ localStorage:", e);
    return [];
  }
}

// Hàm lưu giỏ hàng vào localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Lỗi khi lưu giỏ hàng:", e);
  }
}

/* ========================================================
   1. RENDER DANH MỤC SẢN PHẨM & BỘ LỌC
======================================================== */
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProducts(filterCategory = "all") {
  if (!productsGrid) return;

  const filtered = filterCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filterCategory);

  productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <span class="product-tag">${product.tag}</span>
      <div class="product-visual" style="background: ${product.bgGradient}">
        <span class="product-emoji" role="img" aria-label="${product.name}">${product.emoji}</span>
      </div>
      <div class="product-info">
        <span class="product-category-name">${product.categoryName}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <span>+</span> Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Xử lý sự kiện click chuyển tab bộ lọc
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    renderProducts(filter);
  });
});

/* ========================================================
   2. QUẢN LÝ GIỎ HÀNG (THÊM, BỚT, XÓA, CẬP NHẬT)
======================================================== */
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
}

function updateQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

// Tính toán tổng phụ, phí ship và tổng tiền
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  let shipping = 0;
  if (subtotal > 0) {
    shipping = subtotal >= FREESHIP_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
  }

  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

// Cập nhật giao diện giỏ hàng và tóm tắt checkout
function updateCartUI() {
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  const { subtotal, shipping, total } = calculateTotals();

  // 1. Cập nhật trong Giỏ hàng Drawer
  const cartContainer = document.getElementById("cart-items-container");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartShippingEl = document.getElementById("cart-shipping");
  const cartTotalEl = document.getElementById("cart-total");

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(subtotal);
  if (cartShippingEl) {
    cartShippingEl.textContent = shipping === 0 && subtotal > 0 ? "Miễn phí (0đ)" : formatCurrency(shipping);
    cartShippingEl.style.color = shipping === 0 && subtotal > 0 ? "var(--success)" : "inherit";
  }
  if (cartTotalEl) cartTotalEl.textContent = formatCurrency(total);

  // Thanh tiến trình Freeship
  const freeshipText = document.getElementById("freeship-text");
  const freeshipFill = document.getElementById("freeship-fill");
  if (freeshipText && freeshipFill) {
    if (subtotal >= FREESHIP_THRESHOLD) {
      freeshipText.innerHTML = "🎉 Tuyệt vời! Bạn đã được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!";
      freeshipText.style.color = "var(--success)";
      freeshipFill.style.width = "100%";
      freeshipFill.style.backgroundColor = "var(--success)";
    } else {
      const remaining = FREESHIP_THRESHOLD - subtotal;
      const percent = Math.min(100, Math.round((subtotal / FREESHIP_THRESHOLD) * 100));
      freeshipText.innerHTML = `Mua thêm <strong>${formatCurrency(remaining)}</strong> để được <strong>FREESHIP</strong>!`;
      freeshipText.style.color = "#a63944";
      freeshipFill.style.width = `${percent}%`;
      freeshipFill.style.backgroundColor = "var(--primary)";
    }
  }

  // Danh sách món trong drawer
  if (cartContainer) {
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty-message">
          <div class="cart-empty-emoji">🛍️</div>
          <p><strong>Giỏ hàng của bạn đang trống</strong></p>
          <p style="font-size: 13px; margin-top: 4px;">Hãy chọn những mẫu kẹp tóc xinh xắn để thêm vào giỏ nhé!</p>
        </div>
      `;
    } else {
      cartContainer.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return "";
        return `
          <div class="cart-item">
            <div class="cart-item-visual" style="background: ${product.bgGradient}">
              <span>${product.emoji}</span>
            </div>
            <div class="cart-item-details">
              <h4 class="cart-item-name">${product.name}</h4>
              <div class="cart-item-price">${formatCurrency(product.price)}</div>
              <div class="cart-qty-control">
                <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)" aria-label="Giảm 1">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)" aria-label="Tăng 1">+</button>
              </div>
            </div>
            <button class="cart-item-remove-btn" onclick="removeFromCart(${product.id})" title="Xóa món này">&times;</button>
          </div>
        `;
      }).join("");
    }
  }

  // 2. Cập nhật phần tóm tắt đơn hàng ở khu vực Checkout
  const checkoutItemsList = document.getElementById("checkout-items-list");
  const checkoutSubtotal = document.getElementById("checkout-subtotal");
  const checkoutShipping = document.getElementById("checkout-shipping");
  const checkoutTotal = document.getElementById("checkout-total");

  if (checkoutSubtotal) checkoutSubtotal.textContent = formatCurrency(subtotal);
  if (checkoutShipping) {
    checkoutShipping.textContent = shipping === 0 && subtotal > 0 ? "Miễn phí (0đ)" : formatCurrency(shipping);
    checkoutShipping.style.color = shipping === 0 && subtotal > 0 ? "var(--success)" : "inherit";
  }
  if (checkoutTotal) checkoutTotal.textContent = formatCurrency(total);

  if (checkoutItemsList) {
    if (cart.length === 0) {
      checkoutItemsList.innerHTML = `<p style="color: var(--text-muted); font-size: 13.5px;">Chưa có sản phẩm nào được chọn.</p>`;
    } else {
      checkoutItemsList.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return "";
        return `
          <div class="mini-cart-item">
            <span class="mini-cart-name">${product.name} &times; ${item.quantity}</span>
            <span class="mini-cart-price">${formatCurrency(product.price * item.quantity)}</span>
          </div>
        `;
      }).join("");
    }
  }
}

/* ========================================================
   3. ĐIỀU KHIỂN MỞ / ĐÓNG DRAWER GIỎ HÀNG
======================================================== */
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const gotoCheckoutBtn = document.getElementById("goto-checkout-btn");

function openCartDrawer() {
  if (cartOverlay) cartOverlay.classList.add("open");
}

function closeCartDrawer() {
  if (cartOverlay) cartOverlay.classList.remove("open");
}

if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);

// Đóng drawer khi click ra vùng đen bên ngoài
if (cartOverlay) {
  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) {
      closeCartDrawer();
    }
  });
}

// Bấm nút "Tiến Hành Đặt Hàng" trong giỏ hàng
if (gotoCheckoutBtn) {
  gotoCheckoutBtn.addEventListener("click", () => {
    closeCartDrawer();
    const checkoutSec = document.getElementById("dat-hang");
    if (checkoutSec) {
      checkoutSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ========================================================
   4. XỬ LÝ ĐẶT HÀNG (FORM VALIDATION & MODAL THÀNH CÔNG)
======================================================== */
const orderForm = document.getElementById("order-form");
const successModal = document.getElementById("success-modal");
const closeSuccessBtn = document.getElementById("close-success-btn");

// Tạo mã đơn hàng ngẫu nhiên thân thuộc (Ví dụ: #NT-928415)
function generateOrderCode() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `#NT-${randomNum}`;
}

// Kiểm tra định dạng số điện thoại Việt Nam (10 chữ số, bắt đầu bằng 0)
function isValidVietnamesePhone(phone) {
  const cleanPhone = phone.trim().replace(/\s+/g, "");
  return /^0[35789]\d{8}$/.test(cleanPhone) || /^0\d{9}$/.test(cleanPhone);
}

if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Kiểm tra giỏ hàng có trống không
    if (cart.length === 0) {
      alert("⚠️ Giỏ hàng của bạn đang trống! Vui lòng chọn ít nhất 1 sản phẩm trước khi đặt hàng.");
      const shopSection = document.getElementById("san-pham");
      if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2. Lấy giá trị các trường
    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const addressInput = document.getElementById("customer-address");
    const consentCheck = document.getElementById("consent-check");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";

    if (!name) {
      alert("Vui lòng nhập họ và tên người nhận hàng.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phone) {
      alert("Vui lòng nhập số điện thoại người nhận hàng.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!isValidVietnamesePhone(phone)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại gồm 10 chữ số bắt đầu bằng số 0.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!address) {
      alert("Vui lòng nhập địa chỉ nhận hàng chi tiết để cửa hàng giao hàng chính xác.");
      if (addressInput) addressInput.focus();
      return;
    }

    if (!consentCheck || !consentCheck.checked) {
      alert("Bạn cần tích chọn đồng ý cho cửa hàng sử dụng thông tin để giao hàng.");
      if (consentCheck) consentCheck.focus();
      return;
    }

    // 3. Tính toán tổng tiền đơn hàng
    const { total } = calculateTotals();
    const orderCode = generateOrderCode();

    // 4. Cập nhật thông tin vào Modal Cảm Ơn
    const receiptOrderEl = document.getElementById("receipt-order-id");
    const receiptNameEl = document.getElementById("receipt-name");
    const receiptPhoneEl = document.getElementById("receipt-phone");
    const receiptAddressEl = document.getElementById("receipt-address");
    const receiptTotalEl = document.getElementById("receipt-total");

    if (receiptOrderEl) receiptOrderEl.textContent = orderCode;
    if (receiptNameEl) receiptNameEl.textContent = name;
    if (receiptPhoneEl) receiptPhoneEl.textContent = phone;
    if (receiptAddressEl) receiptAddressEl.textContent = address;
    if (receiptTotalEl) receiptTotalEl.textContent = formatCurrency(total);

    // 5. Hiển thị modal thông báo đặt hàng thành công
    if (successModal) {
      successModal.classList.add("open");
    }

    // 6. Xóa giỏ hàng & reset form
    cart = [];
    saveCartToStorage();
    updateCartUI();
    orderForm.reset();
  });
}

// Đóng modal cảm ơn khi click nút
if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener("click", () => {
    if (successModal) {
      successModal.classList.remove("open");
    }
    const shopSection = document.getElementById("san-pham");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ========================================================
   5. KHỞI TẠO BAN ĐẦU
======================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  updateCartUI();
});
