// main.js — shared nav, toast, cart badge, wishlist drawer, floating widget & Apple fluid interactions

function renderHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  h.innerHTML = `
    <header id="app-header">
      <div class="nav-inner">
        <a href="index.html" class="logo">Nếp <span>Tóc</span></a>
        <nav id="main-nav">
          <a href="index.html">Trang chủ</a>
          <a href="products.html">Sản phẩm</a>
          <a href="about.html">Về chúng tôi</a>
          <a href="policy.html">Chính sách</a>
          <a href="contact.html">Liên hệ</a>
          <a href="account.html">Tài khoản</a>
        </nav>
        <div class="nav-actions">
          <!-- Account Nav Button -->
          <a href="account.html" class="account-nav-btn" id="open-account-btn" aria-label="Tài khoản cá nhân" title="Tài khoản">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span id="account-name-label">Tài khoản</span>
          </a>

          <!-- Wishlist Nav Button -->
          <button class="wishlist-nav-btn" id="open-wishlist-btn" aria-label="Xem sản phẩm yêu thích" title="Danh sách yêu thích">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span id="wishlist-badge">0</span>
          </button>

          <!-- Cart Button -->
          <button class="cart-btn" id="open-cart-btn" aria-label="Mở giỏ hàng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span>Giỏ hàng</span>
            <span id="cart-badge">0</span>
          </button>

          <!-- Mobile Toggle -->
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Active link detection
  const currentPath = location.pathname;
  const links = h.querySelectorAll('nav a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
      if (href.endsWith('index.html')) a.classList.add('active');
    } else if (href !== '/index.html' && currentPath.includes(href.replace('/', ''))) {
      a.classList.add('active');
    }
  });

  // Mobile toggle handler
  const btn = h.querySelector('#nav-toggle');
  const navEl = h.querySelector('#main-nav');

  if (btn && navEl) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navEl.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
    });

    navEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navEl.classList.remove('open');
        btn.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !navEl.contains(e.target)) {
        navEl.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  // Open Mini Cart Drawer
  const openCartBtn = h.querySelector('#open-cart-btn');
  if (openCartBtn) {
    openCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  // Open Wishlist Drawer
  const openWishlistBtn = h.querySelector('#open-wishlist-btn');
  if (openWishlistBtn) {
    openWishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWishlistDrawer();
    });
  }

  updateCartBadge();
  updateWishlistBadge();
  updateAccountUI();
  renderFloatingHelp();
  initCartDrawer();
  initWishlistDrawer();
}

function renderFooter() {
  const f = document.getElementById('site-footer');
  if (!f) return;
  f.innerHTML = `
    <footer>
      <div class="footer-inner">
        <div>
          <div class="footer-logo">Nếp <span>Tóc</span></div>
          <p class="footer-desc">Phụ kiện tóc & kẹp càng cua thiết kế tối giản, vật liệu cao cấp. Tinh tế trên từng nếp tóc của bạn.</p>
        </div>
        <div class="footer-col">
          <h4>Khám phá</h4>
          <a href="index.html">Trang chủ</a>
          <a href="products.html">Tất cả sản phẩm</a>
          <a href="about.html">Về chúng tôi</a>
          <a href="policy.html">Chính sách bảo hành</a>
          <a href="contact.html">Liên hệ cửa hàng</a>
          <a href="account.html">Tài khoản & Đơn hàng</a>
        </div>
        <div class="footer-col">
          <h4>Hỗ trợ & Liên hệ</h4>
          <p>123 Nguyễn Thị Minh Khai, Q.1, TP.HCM</p>
          <p>Hotline / Zalo: 0901 234 567</p>
          <p>Email: hello@neptoc.vn</p>
          <p>Giờ làm việc: 8:00 – 21:30 hàng ngày</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Nếp Tóc. Thiết kế theo tiêu chuẩn Apple Human Interface.</p>
        <p>Thanh toán khi nhận hàng (COD) toàn TP.HCM</p>
      </div>
    </footer>
  `;
}

// Floating Quick Contact Widget
function renderFloatingHelp() {
  if (document.getElementById('floating-contact-btn')) return;
  const wrap = document.createElement('div');
  wrap.id = 'floating-contact-btn';
  wrap.innerHTML = `
    <div class="floating-contact">
      <a href="tel:0901234567" class="float-btn phone-btn" title="Hotline">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <a href="contact.html" class="float-btn chat-btn" title="Tư vấn">
        <span class="float-label">Tư vấn chọn kẹp</span>
      </a>
    </div>
  `;
  document.body.appendChild(wrap);
}

// ── Apple Slide-Out Mini Cart Drawer ──
function initCartDrawer() {
  if (document.getElementById('cart-drawer-overlay')) return;

  const drawerEl = document.createElement('div');
  drawerEl.id = 'cart-drawer-overlay';
  drawerEl.className = 'cart-drawer-overlay';
  drawerEl.innerHTML = `
    <div class="cart-drawer" id="cart-drawer" onclick="event.stopPropagation()">
      <div class="cart-drawer-header">
        <div class="cart-drawer-title">Giỏ hàng của bạn</div>
        <button class="cart-drawer-close" id="cart-drawer-close" aria-label="Đóng giỏ hàng">×</button>
      </div>

      <!-- Free Shipping Progress Bar -->
      <div class="drawer-freeship-wrap" id="drawer-freeship-wrap"></div>

      <!-- Drawer Body Items -->
      <div class="cart-drawer-body" id="cart-drawer-body"></div>

      <!-- Drawer Footer -->
      <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
    </div>
  `;

  document.body.appendChild(drawerEl);

  drawerEl.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);

  renderCartDrawerContent();
}

function openCartDrawer() {
  closeWishlistDrawer();
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    renderCartDrawerContent();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderCartDrawerContent() {
  const bodyEl = document.getElementById('cart-drawer-body');
  const footerEl = document.getElementById('cart-drawer-footer');
  const shipWrap = document.getElementById('drawer-freeship-wrap');
  if (!bodyEl || !footerEl || !shipWrap) return;

  const cart = getCart();
  const subtotal = getSubtotal();
  const gift = getGiftOption();

  // 1. Free Shipping Progress Bar
  const diff = FREE_SHIP_THRESHOLD - subtotal;
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

  if (subtotal === 0) {
    shipWrap.innerHTML = `
      <div class="drawer-freeship-text">Miễn phí giao hàng cho đơn từ <span>300.000đ</span></div>
      <div class="drawer-progress-track"><div class="drawer-progress-fill" style="width:0%"></div></div>
    `;
  } else if (diff > 0) {
    shipWrap.innerHTML = `
      <div class="drawer-freeship-text">Mua thêm <span>${fmt(diff)}</span> để được miễn phí giao hàng</div>
      <div class="drawer-progress-track"><div class="drawer-progress-fill" style="width:${pct}%"></div></div>
    `;
  } else {
    shipWrap.innerHTML = `
      <div class="drawer-freeship-text" style="color:#28a745;">Đơn hàng của bạn đã được Miễn phí giao hàng</div>
      <div class="drawer-progress-track"><div class="drawer-progress-fill complete" style="width:100%"></div></div>
    `;
  }

  // 2. Cart Items
  if (cart.length === 0) {
    bodyEl.innerHTML = `
      <div class="drawer-empty-msg">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" style="margin:0 auto 12px; color:var(--apple-tertiary);"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p style="font-size:15px; font-weight:600; color:var(--apple-black); margin-bottom:4px;">Túi đồ của bạn đang trống</p>
        <p style="font-size:13px; color:var(--apple-secondary); margin-bottom:20px;">Hãy dạo một vòng và chọn chiếc kẹp bạn yêu thích nhé.</p>
        <a href="products.html" class="btn-primary" style="display:inline-block; font-size:13px; padding:10px 22px;" onclick="closeCartDrawer()">Khám phá ngay</a>
      </div>
    `;
    footerEl.innerHTML = '';
    return;
  }

  bodyEl.innerHTML = `
    <div class="drawer-items-list">
      ${cart.map(item => `
        <div class="drawer-item">
          <div class="drawer-item-thumb" style="background:${item.cardBg || '#fafafc'}">
            <svg width="34" height="34" viewBox="0 0 84 84" fill="none">
              <ellipse cx="42" cy="34" rx="30" ry="20" fill="${item.cardBg || '#ffffff'}" stroke="${item.cardAccent || '#1d1d1f'}" stroke-width="2.5"/>
              <rect x="36" y="50" width="12" height="20" rx="6" fill="${item.cardAccent || '#1d1d1f'}"/>
            </svg>
          </div>
          <div class="drawer-item-info">
            <div class="drawer-item-name">${item.name}</div>
            ${item.swatch ? `<div class="drawer-item-swatch">Màu: ${item.swatch}</div>` : ''}
            <div class="drawer-item-price">${fmt(item.price * item.qty)}</div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-remove" onclick="removeFromCart(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'})" aria-label="Xóa">×</button>
            <div class="cart-qty-ctrl">
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty - 1})">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty + 1})">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Feature 3: Gift Packaging Option in Drawer -->
    <div class="gift-option-card ${gift.enabled ? 'checked' : ''}" id="drawer-gift-card">
      <label class="gift-option-header">
        <input type="checkbox" id="drawer-gift-check" ${gift.enabled ? 'checked' : ''} onchange="handleDrawerGiftToggle(this.checked)"/>
        <span class="gift-option-title">Đóng gói hộp quà nơ lụa & thiệp viết tay</span>
        <span class="gift-option-price">+15.000đ</span>
      </label>
      <div class="gift-note-box ${gift.enabled ? 'show' : ''}" id="drawer-gift-note-box">
        <textarea id="drawer-gift-note" class="gift-note-input" rows="2" placeholder="Ghi lời chúc lên thiệp (ví dụ: Chúc em luôn xinh đẹp rạng ngời...)" oninput="handleDrawerGiftNote(this.value)">${gift.note || ''}</textarea>
      </div>
    </div>
  `;

  // 3. Footer
  const total = getTotal();
  footerEl.innerHTML = `
    <div class="drawer-subtotal-row">
      <span>Tạm tính</span>
      <span style="font-weight:600; color:var(--apple-black);">${fmt(subtotal)}</span>
    </div>
    ${gift.enabled ? `
      <div class="drawer-subtotal-row">
        <span>Hộp quà & thiệp</span>
        <span style="font-weight:600; color:var(--accent-rose);">+${fmt(GIFT_FEE)}</span>
      </div>
    ` : ''}
    <div class="drawer-subtotal-row">
      <span>Phí giao hàng</span>
      <span style="font-weight:600; color:var(--apple-black);">${getShipFee() === 0 ? 'Miễn phí' : fmt(getShipFee())}</span>
    </div>
    <div class="drawer-total-row">
      <span class="drawer-total-label">Tổng thanh toán</span>
      <span class="drawer-total-num">${fmt(total)}</span>
    </div>
    <a href="checkout.html" class="btn-drawer-checkout" onclick="closeCartDrawer()">Đặt hàng COD ngay →</a>
    <a href="cart.html" class="drawer-view-cart-link" onclick="closeCartDrawer()">Xem trang giỏ hàng chi tiết</a>
  `;
}

function handleDrawerGiftToggle(checked) {
  const noteEl = document.getElementById('drawer-gift-note');
  const note = noteEl ? noteEl.value : '';
  setGiftOption(checked, note);
}

function handleDrawerGiftNote(val) {
  setGiftOption(true, val);
}

// ── Apple Slide-Out Wishlist Drawer (Xem lại danh sách Yêu thích) ──
function initWishlistDrawer() {
  if (document.getElementById('wishlist-drawer-overlay')) return;

  const drawerEl = document.createElement('div');
  drawerEl.id = 'wishlist-drawer-overlay';
  drawerEl.className = 'wishlist-drawer-overlay';
  drawerEl.innerHTML = `
    <div class="wishlist-drawer" id="wishlist-drawer" onclick="event.stopPropagation()">
      <div class="wishlist-drawer-header">
        <div class="wishlist-drawer-title">Sản phẩm yêu thích</div>
        <button class="cart-drawer-close" id="wishlist-drawer-close" aria-label="Đóng danh sách yêu thích">×</button>
      </div>
      <div class="wishlist-drawer-body" id="wishlist-drawer-body"></div>
    </div>
  `;

  document.body.appendChild(drawerEl);

  drawerEl.addEventListener('click', closeWishlistDrawer);
  document.getElementById('wishlist-drawer-close').addEventListener('click', closeWishlistDrawer);

  renderWishlistDrawerContent();
}

function openWishlistDrawer() {
  closeCartDrawer();
  const overlay = document.getElementById('wishlist-drawer-overlay');
  if (overlay) {
    renderWishlistDrawerContent();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeWishlistDrawer() {
  const overlay = document.getElementById('wishlist-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderWishlistDrawerContent() {
  const bodyEl = document.getElementById('wishlist-drawer-body');
  if (!bodyEl) return;

  const wishlistIds = getWishlist();
  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  if (wishlistedProducts.length === 0) {
    bodyEl.innerHTML = `
      <div class="drawer-empty-msg">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" style="margin:0 auto 12px; color:var(--apple-tertiary);"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <p style="font-size:15px; font-weight:600; color:var(--apple-black); margin-bottom:4px;">Chưa có sản phẩm yêu thích nào</p>
        <p style="font-size:13px; color:var(--apple-secondary); margin-bottom:20px;">Hãy bấm biểu tượng trái tim trên các sản phẩm bạn ưng ý nhé.</p>
        <a href="products.html" class="btn-primary" style="display:inline-block; font-size:13px; padding:10px 22px;" onclick="closeWishlistDrawer()">Khám phá ngay</a>
      </div>
    `;
    return;
  }

  bodyEl.innerHTML = `
    <div class="wishlist-drawer-list">
      ${wishlistedProducts.map(p => `
        <div class="wishlist-drawer-item">
          <div class="drawer-item-thumb" style="background:${p.cardBg}">
            ${productVisualSVG(p)}
          </div>
          <div class="drawer-item-info">
            <div class="drawer-item-name" style="cursor:pointer;" onclick="location.href='product-detail.html?id=${p.id}'">${p.name}</div>
            <div class="drawer-item-swatch">${p.categoryName}</div>
            <div class="drawer-item-price">${fmt(p.price)}</div>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
            <button class="btn-remove" onclick="removeWishlistItem(${p.id})" title="Bỏ thích">×</button>
            <button class="wishlist-item-btn-add" onclick="quickAdd(${p.id})">Thêm vào giỏ</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function removeWishlistItem(id) {
  toggleWishlist(id);
  updateWishlistBadge();
  renderWishlistDrawerContent();
  // Also update heart state on page if visible
  document.querySelectorAll(`.product-card[onclick*="id=${id}"] .btn-wishlist`).forEach(btn => {
    btn.classList.remove('active');
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', '#1d1d1f');
    }
  });
  showToast('Đã xóa khỏi danh sách yêu thích');
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  const navBtn = document.getElementById('open-wishlist-btn');
  const count = getWishlist().length;

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  if (navBtn) {
    navBtn.classList.toggle('has-items', count > 0);
  }
}

// Apple Fluid Toast Notification (Sửa dứt điểm lỗi chữ trắng trên nền trắng)
function showToast(msg, type = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// ── Wishlist (Yêu thích) Logic ──
const WISHLIST_KEY = 'nep_toc_wishlist';
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch { return []; }
}

function isWishlisted(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id) {
  let list = getWishlist();
  const exists = list.includes(id);
  if (exists) {
    list = list.filter(x => x !== id);
  } else {
    list.push(id);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateWishlistBadge();
  return !exists;
}

function handleWishlist(id, btn) {
  const added = toggleWishlist(id);
  btn.classList.toggle('active', added);
  const svg = btn.querySelector('svg');
  if (svg) {
    svg.setAttribute('fill', added ? '#d6336c' : 'none');
    svg.setAttribute('stroke', added ? '#d6336c' : '#1d1d1f');
  }
  showToast(added ? 'Đã lưu vào danh sách Yêu thích' : 'Đã bỏ khỏi danh sách Yêu thích');
}

// ── Angle 1: Frontal Primary View ──
function productVisualSVG(p) {
  if (p.category === 'claw') {
    return `<svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <ellipse cx="42" cy="34" rx="32" ry="22" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2.5"/>
      <rect x="36" y="52" width="12" height="22" rx="6" fill="${p.cardAccent}"/>
      <ellipse cx="42" cy="34" rx="20" ry="13" fill="${p.cardAccent}" opacity="0.18"/>
      <line x1="22" y1="34" x2="62" y2="34" stroke="${p.cardAccent}" stroke-width="1.5" stroke-dasharray="4 3"/>
    </svg>`;
  } else {
    return `<svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <rect x="14" y="34" width="56" height="12" rx="6" fill="${p.cardAccent}" opacity="0.2" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="26" cy="40" r="7" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="42" cy="40" r="7" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="58" cy="40" r="7" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <line x1="26" y1="47" x2="26" y2="60" stroke="${p.cardAccent}" stroke-width="2"/>
      <line x1="42" y1="47" x2="42" y2="60" stroke="${p.cardAccent}" stroke-width="2"/>
      <line x1="58" y1="47" x2="58" y2="60" stroke="${p.cardAccent}" stroke-width="2"/>
    </svg>`;
  }
}

// ── Angle 2: Secondary Side Profile ──
function productVisualSecondarySVG(p) {
  if (p.category === 'claw') {
    return `<svg width="88" height="88" viewBox="0 0 88 88" fill="none">
      <path d="M22 28 C30 18, 58 18, 66 28 C70 34, 68 44, 62 48 L56 68 C54 74, 34 74, 32 68 L26 48 C20 44, 18 34, 22 28 Z" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2.5"/>
      <circle cx="44" cy="30" r="6" fill="none" stroke="${p.cardAccent}" stroke-width="2.5"/>
      <path d="M40 30 L48 30 M44 26 L44 34" stroke="${p.cardAccent}" stroke-width="2"/>
      <line x1="28" y1="52" x2="38" y2="52" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="52" x2="60" y2="52" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="58" x2="40" y2="58" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="58" x2="58" y2="58" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
      <line x1="33" y1="64" x2="43" y2="64" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
      <line x1="45" y1="64" x2="55" y2="64" stroke="${p.cardAccent}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  } else {
    return `<svg width="88" height="88" viewBox="0 0 88 88" fill="none">
      <rect x="20" y="24" width="48" height="40" rx="14" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <path d="M28 44 L60 44" stroke="${p.cardAccent}" stroke-width="3" stroke-linecap="round"/>
      <path d="M30 40 L34 48 L38 40 L42 48 L46 40 L50 48 L54 40 L58 48" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="44" cy="33" r="4" fill="${p.cardAccent}"/>
      <text x="44" y="60" font-size="8" text-anchor="middle" fill="${p.cardAccent}" font-weight="bold">GRIP TEST</text>
    </svg>`;
  }
}

// Product Card HTML with Wishlist & Dual-Angle Hover Reveal
function productCardHTML(p) {
  const tagClass = ['Bán chạy', 'Yêu thích', 'Độc quyền'].includes(p.tag) ? '' : 'yellow';
  const wishlisted = isWishlisted(p.id);

  return `
    <div class="product-card" onclick="location.href='product-detail.html?id=${p.id}'">
      <div class="product-card-img" style="background:${p.cardBg}; color:${p.cardAccent}">
        <div class="img-view-primary">
          ${productVisualSVG(p)}
        </div>
        
        <div class="img-view-secondary">
          ${productVisualSecondarySVG(p)}
        </div>

        <div class="product-tag ${tagClass}">${p.tag}</div>

        <button class="btn-wishlist ${wishlisted ? 'active' : ''}" onclick="event.stopPropagation(); handleWishlist(${p.id}, this)" title="Lưu yêu thích">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="${wishlisted ? '#d6336c' : 'none'}" stroke="${wishlisted ? '#d6336c' : '#1d1d1f'}" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <span class="hover-hint-badge">Răng kẹp & lò xo</span>
      </div>

      <div class="product-info">
        <div class="product-category">${p.categoryName}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">${fmt(p.price)}</span>
          <span class="product-original">${fmt(p.originalPrice)}</span>
        </div>
      </div>
      <button class="btn-add" onclick="event.stopPropagation(); quickAdd(${p.id})">Thêm vào giỏ</button>
    </div>
  `;
}

// Quick Add to Cart: Adds to cart quietly without intrusive drawer opening
function quickAdd(id) {
  addToCart(id, 1, null);
  showToast('Đã thêm vào giỏ hàng');
}

// ── Account / User Profile & Orders Logic ──
const USER_KEY = 'nep_toc_user';
const ORDERS_KEY = 'nep_toc_orders';

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  updateAccountUI();
}

function logoutUser() {
  localStorage.removeItem(USER_KEY);
  updateAccountUI();
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function updateAccountUI() {
  const label = document.getElementById('account-name-label');
  const user = getUser();
  if (label) {
    if (user && user.fullname) {
      const parts = user.fullname.trim().split(' ');
      const shortName = parts[parts.length - 1];
      label.textContent = shortName;
    } else {
      label.textContent = 'Tài khoản';
    }
  }
}
