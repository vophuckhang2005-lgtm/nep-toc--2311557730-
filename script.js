/* ========================================================
   NẾP TÓC - JAVASCRIPT LOGIC CAO CẤP & HIỆU ỨNG TƯƠNG TÁC
======================================================== */

const CART_STORAGE_KEY = "nep_toc_shopping_cart";
let cart = loadCartFromStorage();

const FREESHIP_THRESHOLD = 300000; // 300.000đ
const DEFAULT_SHIPPING_FEE = 25000; // 25.000đ

// Hàm định dạng tiền tệ VNĐ (Ví dụ: 120000 -> 120.000đ)
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Lỗi đọc localStorage:", e);
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Lỗi lưu localStorage:", e);
  }
}

/* ========================================================
   1. RENDER SẢN PHẨM CAO CẤP & BỘ LỌC
======================================================== */
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProducts(filterCategory = "all") {
  if (!productsGrid) return;

  const filtered = filterCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filterCategory);

  productsGrid.innerHTML = filtered.map(product => {
    // Tạo danh sách các chấm màu (Swatches)
    const swatchesHtml = product.swatches && product.swatches.length > 0
      ? `
        <div class="product-swatches-box">
          <span class="swatch-label">Màu sắc:</span>
          <div class="swatches-list">
            ${product.swatches.map((s, idx) => `
              <span 
                class="swatch-dot ${idx === 0 ? 'active' : ''}" 
                style="background-color: ${s.color};" 
                title="${s.name}"
                onclick="selectSwatch(event, this, ${product.id}, '${s.name}', '${s.color}')"
              ></span>
            `).join("")}
          </div>
        </div>
      `
      : "";

    return `
      <article class="product-card" id="product-${product.id}">
        <span class="product-tag">${product.tag}</span>
        
        <div class="product-visual-stage" style="background: ${product.bgGradient};">
          <div class="glass-pedestal"></div>
          <span class="product-emoji" role="img" aria-label="${product.name}">${product.emoji}</span>
        </div>

        <div class="product-info">
          <div class="product-meta-row">
            <span class="product-category-name">${product.categoryName}</span>
            <div class="product-rating">
              <span>★</span> ${product.rating.toFixed(1)} 
              <span class="review-count">(${product.reviewsCount})</span>
            </div>
          </div>

          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          
          ${swatchesHtml}

          <div class="product-footer">
            <div class="price-container">
              <span class="product-price">${formatCurrency(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ""}
            </div>

            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
              <span>+</span> Thêm vào giỏ
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Xử lý khi bấm chọn chấm màu
function selectSwatch(event, dotEl, productId, swatchName, swatchColor) {
  event.stopPropagation();
  const parent = dotEl.closest(".swatches-list");
  if (parent) {
    parent.querySelectorAll(".swatch-dot").forEach(d => d.classList.remove("active"));
  }
  dotEl.classList.add("active");
  showToast(`Đã chọn màu: ${swatchName}`);
}

// Bộ lọc
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    renderProducts(filter);
  });
});

/* ========================================================
   2. QUẢN LÝ GIỎ HÀNG (THÊM, SỬA, XÓA, TÍNH TOÁN)
======================================================== */
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();

  // Hiệu ứng rung nhẹ nút giỏ hàng và hiện toast thông báo
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.style.transform = "scale(1.4)";
    setTimeout(() => { cartBadge.style.transform = "scale(1)"; }, 300);
  }

  if (product) {
    showToast(`Đã thêm "${product.name}" vào giỏ hàng! 🛍️`);
  }
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
  const product = PRODUCTS.find(p => p.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  if (product) {
    showToast(`Đã xóa món khỏi giỏ hàng.`);
  }
}

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

function updateCartUI() {
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  const { subtotal, shipping, total } = calculateTotals();

  // 1. Cập nhật trong Drawer
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
      freeshipText.style.color = "var(--primary-deep)";
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
          <p style="font-size: 13.5px; margin-top: 6px;">Hãy lựa chọn những mẫu kẹp xinh xắn từ bộ sưu tập nhé!</p>
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

  // 2. Cập nhật phần tóm tắt đơn hàng ở Checkout
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
      checkoutItemsList.innerHTML = `<p style="color: var(--text-muted); font-size: 13.5px;">Chưa có sản phẩm nào được chọn trong giỏ hàng.</p>`;
    } else {
      checkoutItemsList.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return "";
        return `
          <div class="mini-cart-item">
            <span class="mini-cart-name">${product.name} &times; <strong>${item.quantity}</strong></span>
            <span class="mini-cart-price">${formatCurrency(product.price * item.quantity)}</span>
          </div>
        `;
      }).join("");
    }
  }
}

/* ========================================================
   3. DRAWER GIỎ HÀNG
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

if (cartOverlay) {
  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCartDrawer();
  });
}

if (gotoCheckoutBtn) {
  gotoCheckoutBtn.addEventListener("click", () => {
    closeCartDrawer();
    const checkoutSec = document.getElementById("dat-hang");
    if (checkoutSec) checkoutSec.scrollIntoView({ behavior: "smooth" });
  });
}

/* ========================================================
   4. THÔNG BÁO TOAST & SOCIAL PROOF
======================================================== */
const toastContainer = document.getElementById("toast-container");

function showToast(message) {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// Thông báo đơn hàng trực tiếp ngẫu nhiên (Social Proof)
const socialProofToast = document.getElementById("social-proof-toast");
const spIcon = document.getElementById("sp-icon");
const spText = document.getElementById("sp-text");
const spTime = document.getElementById("sp-time");

const FAKE_ORDERS = [
  { name: "Chị Thảo (Q.1, TP.HCM)", product: "Kẹp Càng Cua Hoa Sứ", icon: "🌸", time: "1 phút trước" },
  { name: "Bạn Minh Anh (Bình Thạnh)", product: "Set 5 Kẹp Tăm Ngọc Trai", icon: "🦪", time: "3 phút trước" },
  { name: "Chị Phương (Thủ Đức)", product: "Kẹp Càng Cua Kim Loại", icon: "✨", time: "Vừa xong" },
  { name: "Bạn Yến Nhi (Q.3, TP.HCM)", product: "Set 3 Kẹp Nơ Lụa Tiểu Thư", icon: "🎀", time: "5 phút trước" }
];

function triggerSocialProof() {
  if (!socialProofToast || !spText) return;
  const item = FAKE_ORDERS[Math.floor(Math.random() * FAKE_ORDERS.length)];
  if (spIcon) spIcon.textContent = item.icon;
  spText.innerHTML = `<strong>${item.name}</strong> vừa đặt mua <em>${item.product}</em>`;
  if (spTime) spTime.textContent = item.time;

  socialProofToast.classList.add("show");
  setTimeout(() => {
    socialProofToast.classList.remove("show");
  }, 5000);
}

// Tự động hiện sau mỗi 18 giây
setInterval(triggerSocialProof, 18000);
setTimeout(triggerSocialProof, 4000);

/* ========================================================
   5. HIỆU ỨNG PHÁO GIẤY (CONFETTI CELEBRATION)
======================================================== */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const pieces = [];
  const colors = ["#a84652", "#c6934b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (pieces.some(p => p.y < canvas.height)) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  }

  updateConfetti();
}

/* ========================================================
   6. QUY TRÌNH ĐẶT HÀNG COD & BẮT LỖI
======================================================== */
const orderForm = document.getElementById("order-form");
const successModal = document.getElementById("success-modal");
const closeSuccessBtn = document.getElementById("close-success-btn");

function generateOrderCode() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `#NT-${randomNum}`;
}

function isValidVietnamesePhone(phone) {
  const cleanPhone = phone.trim().replace(/\s+/g, "");
  return /^0[35789]\d{8}$/.test(cleanPhone) || /^0\d{9}$/.test(cleanPhone);
}

if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("⚠️ Giỏ hàng của bạn đang trống! Vui lòng chọn ít nhất 1 sản phẩm trước khi đặt hàng.");
      const shopSection = document.getElementById("san-pham");
      if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

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

    const { total } = calculateTotals();
    const orderCode = generateOrderCode();

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

    if (successModal) {
      successModal.classList.add("open");
      launchConfetti();
    }

    cart = [];
    saveCartToStorage();
    updateCartUI();
    orderForm.reset();
  });
}

if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener("click", () => {
    if (successModal) successModal.classList.remove("open");
    const shopSection = document.getElementById("san-pham");
    if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  updateCartUI();
});
