// main.js — shared nav, toast, cart badge, wishlist drawer, floating widget & Apple fluid interactions

function renderHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  h.innerHTML = `
    <div class="promo-topbar" role="region" aria-label="Thông báo khuyến mãi">
      <span class="promo-topbar-text">
        <span>Ưu đãi: <strong>Freeship đơn từ 99.000₫</strong> • Đồng kiểm COD 100% trước khi thanh toán</span>
      </span>
      <span class="practice-badge">Website thực hành – không bán hàng thật</span>
    </div>
    <header id="app-header">
      <div class="nav-inner">
        <a href="index.html" class="logo"><img src="images/logo.svg" alt="SoraHome Logo" class="brand-logo-img"/>Sora<span>Home</span></a>
        <nav id="main-nav">
          <a href="index.html">Trang chủ</a>
          <a href="products.html">Sản phẩm</a>
          <a href="about.html">Về chúng tôi</a>
          <a href="policy.html">Chính sách</a>
          <a href="contact.html">Liên hệ</a>
        </nav>
        <div class="nav-actions">
          <!-- Account Nav Button (Icon Only) -->
          <a href="account.html" class="account-nav-btn" id="open-account-btn" aria-label="Tài khoản cá nhân" title="Tài khoản">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </a>

          <!-- Wishlist Nav Button (Icon Only) -->
          <button class="wishlist-nav-btn" id="open-wishlist-btn" aria-label="Xem sản phẩm yêu thích" title="Danh sách yêu thích">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span id="wishlist-badge">0</span>
          </button>

          <!-- Cart Button (Icon Only) -->
          <button class="cart-btn" id="open-cart-btn" aria-label="Mở giỏ hàng" title="Giỏ hàng">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
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

  // Bulletproof Active Link Detection
  const currentPath = (location.pathname || '').toLowerCase();
  const pageFile = currentPath.split('/').pop() || 'index.html';
  const cleanPageName = pageFile.replace(/\.html$/, '') || 'index';

  const links = h.querySelectorAll('nav a');
  links.forEach(a => {
    a.classList.remove('active');
    const href = (a.getAttribute('href') || '').toLowerCase();
    const hrefClean = href.replace(/\.html$/, '').replace(/^\//, '');

    if (cleanPageName === 'index' || cleanPageName === '') {
      if (hrefClean === 'index') a.classList.add('active');
    } else if (hrefClean === 'products' && (cleanPageName.includes('product') || cleanPageName.includes('detail'))) {
      a.classList.add('active');
    } else if (hrefClean === cleanPageName) {
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
          <div class="footer-logo"><img src="images/logo.svg" alt="SoraHome Logo" class="brand-logo-img"/>Sora<span>Home</span></div>
          <p class="footer-desc">Dụng cụ vệ sinh & tiện ích gia đình phong cách tối giản. Mang lại không gian sống thoáng đãng, tinh tươm mỗi ngày.</p>
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
          <p>Email: hello@sorahome.vn</p>
          <p>Giờ làm việc: 8:00 – 21:30 hàng ngày</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 SoraHome. <strong>Website thực hành – không bán hàng thật</strong>.</p>
        <p>Thanh toán khi nhận hàng (COD) toàn quốc</p>
      </div>
    </footer>
  `;
}

// Floating Quick Contact & SoraHome Live Chat Widget (Icon Only)
function renderFloatingHelp() {
  if (document.getElementById('floating-contact-btn')) return;
  const wrap = document.createElement('div');
  wrap.id = 'floating-contact-btn';
  wrap.innerHTML = `
    <!-- Floating Action Buttons (Icon Only) -->
    <div class="floating-contact">
      <a href="tel:0901234567" class="float-btn phone-btn" title="Hotline 0901 234 567" aria-label="Hotline">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <button class="float-btn chat-btn" id="btn-toggle-chat" title="Tư vấn dụng cụ vệ sinh SoraHome" aria-label="Khung chat tư vấn">
        <span class="chat-online-dot"></span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </button>
    </div>

    <!-- SoraHome Live Chat Box -->
    <div class="live-chat-box" id="live-chat-box">
      <div class="live-chat-header">
        <div class="live-chat-stylist-info">
          <div class="live-chat-avatar">SH</div>
          <div>
            <div class="live-chat-name">Chuyên viên SoraHome</div>
            <div class="live-chat-status"><span class="chat-status-green"></span>Trực tuyến • Phản hồi ngay</div>
          </div>
        </div>
        <button class="live-chat-close" id="btn-close-chat" aria-label="Đóng chat">×</button>
      </div>

      <div class="live-chat-body" id="live-chat-messages">
        <div class="chat-bubble-row bot">
          <div class="chat-bubble">
            Xin chào! Mình là Chuyên viên tư vấn SoraHome. Bạn cần hỗ trợ chọn dụng cụ vệ sinh hay thông tin đơn hàng cứ nhắn mình nhé!
          </div>
          <span class="chat-timestamp">Vừa xong</span>
        </div>

        <!-- Suggestion Chips (Horizontal Scrollable) -->
        <div class="chat-suggestion-chips" id="chat-suggestion-chips">
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Cây lau nhà tự vắt có dùng được cho sàn gỗ không?')">Lau sàn gỗ & gạch</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Cây chà sàn 3in1 có kèm nhíp gắp tóc không?')">Cây chà sàn 3in1</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Cây gạt nước 360 độ dùng cho kính nào?')">Gạt nước xoay 360°</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Phí giao hàng và thời gian nhận?')">Phí ship & Giao nhanh</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Có được kiểm tra hàng trước khi thanh toán không?')">Đồng kiểm COD</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Chính sách bảo hành khớp nối và chốt khóa?')">Bảo hành 30 ngày</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Địa chỉ cửa hàng xem trực tiếp?')">Địa chỉ cửa hàng</button>
        </div>
      </div>

      <form class="live-chat-footer" id="live-chat-form" onsubmit="handleLiveChatSend(event)">
        <input type="text" id="live-chat-input" placeholder="Hỏi về cây lau nhà, gạt nước, chà sàn 3in1..." autocomplete="off"/>
        <button type="submit" class="live-chat-send-btn" aria-label="Gửi">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(wrap);

  const toggleBtn = document.getElementById('btn-toggle-chat');
  const closeBtn = document.getElementById('btn-close-chat');
  const chatBox = document.getElementById('live-chat-box');

  if (toggleBtn && chatBox) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatBox.classList.toggle('open');
      if (chatBox.classList.contains('open')) {
        const chatInp = document.getElementById('live-chat-input');
        if (chatInp) chatInp.focus();
      }
    });
  }

  if (closeBtn && chatBox) {
    closeBtn.addEventListener('click', () => {
      chatBox.classList.remove('open');
    });
  }
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

  // 1. Free Shipping Progress Bar
  const diff = FREE_SHIP_THRESHOLD - subtotal;
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

  if (subtotal === 0) {
    shipWrap.innerHTML = `
      <div class="drawer-freeship-text">Miễn phí giao hàng cho đơn từ <span>${fmt(FREE_SHIP_THRESHOLD)}</span></div>
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
        <p style="font-size:13px; color:var(--apple-secondary); margin-bottom:20px;">Hãy dạo một vòng và chọn dụng cụ vệ sinh phù hợp cho tổ ấm nhé.</p>
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
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit; display:block;" />` : `
              <svg width="34" height="34" viewBox="0 0 84 84" fill="none">
                <ellipse cx="42" cy="34" rx="30" ry="20" fill="${item.cardBg || '#ffffff'}" stroke="${item.cardAccent || '#1d1d1f'}" stroke-width="2.5"/>
                <rect x="36" y="50" width="12" height="20" rx="6" fill="${item.cardAccent || '#1d1d1f'}"/>
              </svg>
            `}
          </div>
          <div class="drawer-item-info">
            <div class="drawer-item-name">${item.name}</div>
            ${item.swatch ? `<div class="drawer-item-swatch">Màu: ${item.swatch}</div>` : ''}
            ${item.customEngraving && item.customEngraving.text ? `
              <div class="drawer-item-engraving" style="margin-top:4px; font-size:12px; color:var(--apple-secondary); background:var(--apple-surface-secondary); border:1px solid var(--apple-border); padding:2px 8px; border-radius:6px; display:inline-block;">
                Khắc tên: <strong>${item.customEngraving.text}</strong> <span style="font-size:11px; color:var(--apple-tertiary);">(${item.customEngraving.finish || 'Tiêu chuẩn'})</span>
              </div>
            ` : ''}
            <div class="drawer-item-price" style="margin-top:4px;">${fmt(item.price * item.qty)}</div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-remove" onclick="removeFromCart(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${(item.customEngraving && item.customEngraving.text) ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})" aria-label="Xóa">×</button>
            <div class="cart-qty-ctrl">
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty - 1}, ${(item.customEngraving && item.customEngraving.text) ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty + 1}, ${(item.customEngraving && item.customEngraving.text) ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // 3. Footer
  const total = getTotal();
  footerEl.innerHTML = `
    <div class="drawer-subtotal-row">
      <span>Tạm tính</span>
      <span style="font-weight:600; color:var(--apple-black);">${fmt(subtotal)}</span>
    </div>
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
  catch (e) { return []; }
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

// ── Angle 1: Unique High-Craft Product Illustrations or Real Photos ──
function productVisualSVG(p, size = 84) {
  if (p && p.image) {
    return `<img src="${p.image}" alt="${p.name}" class="product-real-img" loading="lazy" style="width:100%; height:100%; object-fit:contain; padding:12px; box-sizing:border-box; border-radius:inherit; display:block;" />`;
  }
  const id = Number(p.id);
  const bg = p.cardBg || '#fefae0';
  const ac = p.cardAccent || '#d6336c';

  switch (id) {
    case 1: // Kẹp Càng Cua Hoa Sứ Pastel
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="30" rx="14" ry="20" fill="#ffffff" stroke="${ac}" stroke-width="2.2"/>
        <ellipse cx="68" cy="42" rx="14" ry="20" fill="#ffffff" stroke="${ac}" stroke-width="2.2" transform="rotate(72 68 42)"/>
        <ellipse cx="62" cy="66" rx="14" ry="20" fill="#ffffff" stroke="${ac}" stroke-width="2.2" transform="rotate(144 62 66)"/>
        <ellipse cx="38" cy="66" rx="14" ry="20" fill="#ffffff" stroke="${ac}" stroke-width="2.2" transform="rotate(216 38 66)"/>
        <ellipse cx="32" cy="42" rx="14" ry="20" fill="#ffffff" stroke="${ac}" stroke-width="2.2" transform="rotate(288 32 42)"/>
        <circle cx="50" cy="50" r="10" fill="#ffd166" opacity="0.85"/>
        <circle cx="50" cy="50" r="5" fill="${ac}"/>
        <path d="M38 78 Q50 88 62 78" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
        <line x1="44" y1="78" x2="44" y2="84" stroke="${ac}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="50" y1="79" x2="50" y2="85" stroke="${ac}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="56" y1="78" x2="56" y2="84" stroke="${ac}" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;

    case 2: // Kẹp Càng Cua Kim Loại Tối Giản
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <path d="M25 65 C25 35, 75 35, 75 65" stroke="${ac}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M34 65 C34 44, 66 44, 66 65" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
        <rect x="44" y="32" width="12" height="10" rx="3" fill="${ac}"/>
        <line x1="47" y1="34" x2="47" y2="40" stroke="#ffffff" stroke-width="1.8"/>
        <line x1="53" y1="34" x2="53" y2="40" stroke="#ffffff" stroke-width="1.8"/>
        <path d="M30 68 L30 82 M40 68 L40 84 M50 68 L50 85 M60 68 L60 84 M70 68 L70 82" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="37" r="2.5" fill="#ffffff"/>
      </svg>`;

    case 3: // Kẹp Càng Cua Lông Nhung Mịn
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <rect x="22" y="28" width="56" height="38" rx="19" fill="#fceef5" stroke="${ac}" stroke-width="3"/>
        <path d="M24 47 Q50 36 76 47" stroke="${ac}" stroke-width="2" stroke-dasharray="3 3"/>
        <path d="M32 30 Q50 56 68 30" stroke="${ac}" stroke-width="1.8" opacity="0.6"/>
        <path d="M32 64 Q50 40 68 64" stroke="${ac}" stroke-width="1.8" opacity="0.6"/>
        <path d="M30 66 C30 80, 36 82, 38 72 C40 82, 46 82, 48 72 C50 82, 56 82, 58 72 C60 82, 66 82, 68 66" fill="${ac}" opacity="0.85"/>
      </svg>`;

    case 4: // Kẹp Càng Cua Vân Đá Marble
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <path d="M22 40 C22 24, 78 24, 78 40 C78 52, 68 64, 60 68 L40 68 C32 64, 22 52, 22 40 Z" fill="#e0f2fe" stroke="${ac}" stroke-width="2.5"/>
        <path d="M28 36 Q42 46 54 32 T74 42" stroke="${ac}" stroke-width="2" opacity="0.75" stroke-linecap="round"/>
        <path d="M34 50 Q48 58 64 48" stroke="${ac}" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
        <path d="M32 68 L32 80 M42 68 L42 83 M50 68 L50 84 M58 68 L58 83 M66 68 L66 80" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="27" r="4" fill="${ac}"/>
      </svg>`;

    case 5: // Set 5 Kẹp Tăm Ngọc Trai
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <path d="M20 70 L78 30" stroke="#e6a817" stroke-width="3" stroke-linecap="round"/>
        <path d="M22 76 L82 46" stroke="#e6a817" stroke-width="3" stroke-linecap="round"/>
        <path d="M26 84 L86 64" stroke="#e6a817" stroke-width="3" stroke-linecap="round"/>
        <circle cx="34" cy="60" r="7.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
        <circle cx="32" cy="58" r="2.5" fill="#f8fafc"/>
        <circle cx="48" cy="51" r="6.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
        <circle cx="46" cy="49" r="2" fill="#f8fafc"/>
        <circle cx="61" cy="42" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
        <circle cx="72" cy="34" r="4.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
        <circle cx="42" cy="72" r="6" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
        <circle cx="58" cy="60" r="6" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
      </svg>`;

    case 6: // Set 3 Kẹp Nơ Lụa Satin
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <path d="M50 42 C40 24, 18 28, 22 46 C24 58, 42 50, 50 46 Z" fill="#ffe3ec" stroke="${ac}" stroke-width="2.5"/>
        <path d="M50 42 C60 24, 82 28, 78 46 C76 58, 58 50, 50 46 Z" fill="#ffe3ec" stroke="${ac}" stroke-width="2.5"/>
        <ellipse cx="50" cy="44" rx="6" ry="7" fill="${ac}"/>
        <path d="M46 48 C42 62, 30 76, 26 84 C34 82, 44 72, 48 52 Z" fill="#ff8787" stroke="${ac}" stroke-width="2"/>
        <path d="M54 48 C58 62, 70 76, 74 84 C66 82, 56 72, 52 52 Z" fill="#ff8787" stroke="${ac}" stroke-width="2"/>
      </svg>`;

    case 7: // Kẹp Bấm Giọt Nước Men Sứ
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <path d="M50 20 C68 20, 78 38, 74 65 C70 82, 56 86, 50 86 C44 86, 30 82, 26 65 C22 38, 32 20, 50 20 Z" fill="#e6fcf5" stroke="${ac}" stroke-width="3"/>
        <path d="M50 35 C58 35, 62 44, 60 58 C58 68, 52 72, 50 72 C48 72, 42 68, 40 58 C38 44, 42 35, 50 35 Z" fill="#ffffff" stroke="${ac}" stroke-width="2.2"/>
        <line x1="50" y1="28" x2="50" y2="76" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="27" r="3.5" fill="${ac}"/>
      </svg>`;

    case 8: // Set 10 Kẹp Mini Hoa Cúc Nhí
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <g transform="translate(50, 42)">
          <circle cx="0" cy="-14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="10" cy="-10" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="10" cy="10" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="0" cy="14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="-10" cy="10" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="-14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="-10" cy="-10" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="1.8"/>
          <circle cx="0" cy="0" r="8" fill="#ffd43b" stroke="${ac}" stroke-width="2"/>
        </g>
        <g transform="translate(26, 68) scale(0.65)">
          <circle cx="0" cy="-14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="0" cy="14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="-14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="0" cy="0" r="8" fill="#ffd43b" stroke="${ac}" stroke-width="2"/>
        </g>
        <g transform="translate(74, 68) scale(0.65)">
          <circle cx="0" cy="-14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="0" cy="14" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="-14" cy="0" r="5.5" fill="#ffffff" stroke="${ac}" stroke-width="2"/>
          <circle cx="0" cy="0" r="8" fill="#ffd43b" stroke="${ac}" stroke-width="2"/>
        </g>
        <path d="M44 60 L44 72 M50 60 L50 74 M56 60 L56 72" stroke="${ac}" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;

    default:
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="30" fill="${bg}" stroke="${ac}" stroke-width="3"/>
      </svg>`;
  }
}

// ── Angle 2: Secondary View / Răng Kẹp & Chi Tiết Lò Xo or Real Photo Angle ──
function productVisualSecondarySVG(p, size = 88) {
  if (p && p.hoverImage) {
    return `<img src="${p.hoverImage}" alt="${p.name} chi tiết" class="product-real-img" loading="lazy" style="width:100%; height:100%; object-fit:contain; padding:12px; box-sizing:border-box; border-radius:inherit; display:block;" />`;
  }
  const ac = p.cardAccent || '#d6336c';
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
    <rect x="24" y="24" width="52" height="52" rx="14" fill="#fafafc" stroke="${ac}" stroke-width="2.5"/>
    <circle cx="50" cy="38" r="9" fill="none" stroke="${ac}" stroke-width="3"/>
    <line x1="44" y1="38" x2="56" y2="38" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="32" y1="54" x2="42" y2="54" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="58" y1="54" x2="68" y2="54" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="36" y1="62" x2="46" y2="62" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="54" y1="62" x2="64" y2="62" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="76" font-size="7.5" text-anchor="middle" fill="${ac}" font-weight="700" letter-spacing="1">KHỚP XOAY 360°</text>
  </svg>`;
}

// Product Card HTML with Wishlist & Contextual Hover Action
function productCardHTML(p) {
  const tagClass = ['Bán chạy', 'Yêu thích', 'Độc quyền'].includes(p.tag) ? '' : 'yellow';
  const wishlisted = isWishlisted(p.id);
  const compared = typeof isCompared === 'function' ? isCompared(p.id) : false;
  const hasSecondary = false;
  const hoverHint = p.hoverHint || (p.hoverImage ? 'Xem chi tiết dụng cụ' : (p.image ? 'Xem trọn bộ' : 'Chi tiết sản phẩm'));

  return `
    <a href="product-detail.html?id=${p.id}" class="product-card ${!hasSecondary ? 'no-hover-swap' : ''}">
      <div class="product-card-img" style="background:${p.cardBg}; color:${p.cardAccent}">
        <div class="img-view-primary">
          ${productVisualSVG(p)}
        </div>
        
        ${hasSecondary ? `
          <div class="img-view-secondary">
            ${productVisualSecondarySVG(p)}
          </div>
        ` : ''}

        <button class="btn-compare ${compared ? 'active' : ''}" data-compare-id="${p.id}" onclick="event.preventDefault(); event.stopPropagation(); toggleCompare(${p.id})" title="So sánh sản phẩm">
          ${compared ? '✓ Đang so sánh' : '+ So sánh'}
        </button>

        <button class="btn-wishlist ${wishlisted ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); handleWishlist(${p.id}, this)" title="Lưu yêu thích">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="${wishlisted ? '#d6336c' : 'none'}" stroke="${wishlisted ? '#d6336c' : '#1d1d1f'}" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <div class="product-info">
        <div class="product-category">${p.categoryName}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">${fmt(p.price)}</span>
          <span class="product-original">${fmt(p.originalPrice)}</span>
        </div>
      </div>
      <button class="btn-add" onclick="event.preventDefault(); event.stopPropagation(); quickAdd(${p.id})">Thêm vào giỏ</button>
    </a>
  `;
}

// Quick Add to Cart: Adds to cart quietly without intrusive drawer opening
function quickAdd(id) {
  addToCart(id, 1, null);
  showToast('Đã thêm vào giỏ hàng');
}

// ── Administrative Locations & Cascading Select ──
const VN_CITIES = {
  "TP. Hồ Chí Minh": {
    "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao", "Phường Tân Định", "Phường Phạm Ngũ Lão", "Phường Cầu Kho"],
    "Quận 3": ["Phường Võ Thị Sáu", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 9", "Phường 11"],
    "Quận 5": ["Phường 1", "Phường 2", "Phường 4", "Phường 5", "Phường 7", "Phường 9", "Phường 11", "Phường 12"],
    "Quận 7": ["Phường Tân Thuận Đông", "Phường Tân Phong", "Phường Tân Quy", "Phường Phú Thuận", "Phường Phú Mỹ"],
    "Quận 10": ["Phường 1", "Phường 2", "Phường 4", "Phường 6", "Phường 10", "Phường 12", "Phường 14"],
    "TP. Thủ Đức": ["Phường Thảo Điền", "Phường An Phú", "Phường Hiệp Phú", "Phường Linh Trung", "Phường Linh Chiểu", "Phường Tam Phú"],
    "Quận Bình Thạnh": ["Phường 1", "Phường 2", "Phường 12", "Phường 15", "Phường 19", "Phường 21", "Phường 25", "Phường 26"],
    "Quận Phú Nhuận": ["Phường 1", "Phường 2", "Phường 3", "Phường 7", "Phường 9", "Phường 11", "Phường 15"],
    "Quận Gò Vấp": ["Phường 1", "Phường 3", "Phường 5", "Phường 8", "Phường 10", "Phường 11", "Phường 16"],
    "Quận Tân Bình": ["Phường 1", "Phường 2", "Phường 4", "Phường 10", "Phường 12", "Phường 13", "Phường 15"],
    "Huyện Hóc Môn": ["Thị trấn Hóc Môn", "Xã Bà Điểm", "Xã Đông Thạnh", "Xã Tân Xuân", "Xã Thới Tam Thôn"],
    "Huyện Bình Chánh": ["Thị trấn Tân Túc", "Xã Bình Hưng", "Xã Phong Phú", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B"]
  },
  "Hà Nội": {
    "Quận Hoàn Kiếm": ["Phường Hàng Bạc", "Phường Hàng Bồ", "Phường Hàng Đào", "Phường Tràng Tiền", "Phường Cửa Đông"],
    "Quận Ba Đình": ["Phường Cống Vị", "Phường Điện Biên", "Phường Đội Cấn", "Phường Giảng Võ", "Phường Kim Mã"],
    "Quận Cầu Giấy": ["Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Mai Dịch", "Phường Nghĩa Đô", "Phường Trung Hòa"],
    "Quận Đống Đa": ["Phường Cát Linh", "Phường Kim Liên", "Phường Láng Hạ", "Phường Ô Chợ Dừa", "Phường Văn Miếu"]
  },
  "Đà Nẵng": {
    "Quận Hải Châu": ["Phường Hải Châu I", "Phường Thạch Thang", "Phường Thanh Bình", "Phường Hòa Cường Bắc"],
    "Quận Thanh Khê": ["Phường Tam Thuận", "Phường Thanh Khê Tây", "Phường Vĩnh Trung", "Phường Thạc Gián"],
    "Quận Sơn Trà": ["Phường An Hải Bắc", "Phường Phước Mỹ", "Phường Thọ Quang", "Phường Nại Hiên Đông"]
  },
  "Bình Dương": {
    "TP. Thủ Dầu Một": ["Phường Phú Cường", "Phường Phú Hòa", "Phường Hiệp Thành", "Phường Chánh Nghĩa"],
    "TP. Thuận An": ["Phường Lái Thiêu", "Phường An Phú", "Phường Thuận Giao", "Phường Bình Hòa"]
  },
  "Đồng Nai": {
    "TP. Biên Hòa": ["Phường Quyết Thắng", "Phường Thống Nhất", "Phường Tân Phong", "Phường Trảng Dài", "Phường Tam Hiệp"]
  },
  "Cần Thơ": {
    "Quận Ninh Kiều": ["Phường Tân An", "Phường An Cư", "Phường An Khánh", "Phường Cái Khế", "Phường Xuân Khánh"]
  }
};

function setupAddressCascading(cityEl, districtEl, wardEl, initial = {}) {
  if (!cityEl || !districtEl || !wardEl) return;

  cityEl.innerHTML = '<option value="">-- Chọn Tỉnh / Thành phố --</option>' + 
    Object.keys(VN_CITIES).map(c => `<option value="${c}">${c}</option>`).join('');

  function updateDistricts(selectedCity, selectedDist = '') {
    districtEl.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';
    wardEl.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

    if (!selectedCity || !VN_CITIES[selectedCity]) return;
    const districts = Object.keys(VN_CITIES[selectedCity]);
    districtEl.innerHTML += districts.map(d => `<option value="${d}">${d}</option>`).join('');

    if (selectedDist && districts.includes(selectedDist)) {
      districtEl.value = selectedDist;
      updateWards(selectedCity, selectedDist, initial.ward || '');
    }
  }

  function updateWards(selectedCity, selectedDist, selectedWard = '') {
    wardEl.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';
    if (!selectedCity || !selectedDist || !VN_CITIES[selectedCity] || !VN_CITIES[selectedCity][selectedDist]) return;

    const wards = VN_CITIES[selectedCity][selectedDist];
    wardEl.innerHTML += wards.map(w => `<option value="${w}">${w}</option>`).join('');

    if (selectedWard && wards.includes(selectedWard)) {
      wardEl.value = selectedWard;
    }
  }

  cityEl.addEventListener('change', () => {
    updateDistricts(cityEl.value);
  });

  districtEl.addEventListener('change', () => {
    updateWards(cityEl.value, districtEl.value);
  });

  if (initial.city) {
    cityEl.value = initial.city;
    updateDistricts(initial.city, initial.district || '');
  }
}

// ── Account / User Profile & Orders Logic ──
const USERS_DB_KEY = 'nep_toc_users_db';
const USER_KEY = 'nep_toc_user';
const ORDERS_KEY = 'nep_toc_orders';

function getAllUsers() {
  try {
    const list = JSON.parse(localStorage.getItem(USERS_DB_KEY));
    if (Array.isArray(list) && list.length > 0) return list;
  } catch (e) {}
  const defaultUsers = [
    {
      account: '0901234567',
      password: 'password123',
      fullname: 'Phương Linh',
      phone: '0901234567',
      email: 'linh@gmail.com',
      city: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Thành',
      street: '123 Nguyễn Thị Minh Khai',
      fullAddress: '123 Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh'
    }
  ];
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function registerUser(account, password) {
  account = account.trim();
  password = password.trim();
  if (password.length < 6) {
    return { success: false, message: 'Mật khẩu phải có tối thiểu 6 ký tự.' };
  }
  const users = getAllUsers();
  const existing = users.find(u => u.account.toLowerCase() === account.toLowerCase());
  if (existing) {
    return { success: false, message: 'Số điện thoại hoặc Email này đã được đăng ký. Vui lòng chuyển sang Đăng nhập!' };
  }

  const isEmail = account.includes('@');
  const nameFromAcc = isEmail ? account.split('@')[0] : ('Khách hàng ' + account.slice(-4));
  const newUser = {
    account,
    password,
    fullname: nameFromAcc,
    phone: isEmail ? '' : account,
    email: isEmail ? account : '',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: '',
    street: '',
    fullAddress: '',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  saveUser(newUser);
  return { success: true, user: newUser };
}

function loginUser(account, password) {
  account = account.trim();
  password = password.trim();
  const users = getAllUsers();
  const found = users.find(u => u.account.toLowerCase() === account.toLowerCase());

  if (!found) {
    return { success: false, message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc tạo tài khoản mới.' };
  }
  if (found.password !== password) {
    return { success: false, message: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
  }

  saveUser(found);
  return { success: true, user: found };
}

function updateUserProfile(updated) {
  const current = getUser();
  if (!current) return;
  const merged = { ...current, ...updated };

  const parts = [];
  if (merged.street) parts.push(merged.street);
  if (merged.ward) parts.push(merged.ward);
  if (merged.district) parts.push(merged.district);
  if (merged.city) parts.push(merged.city);
  merged.fullAddress = parts.join(', ');
  merged.address = merged.fullAddress;

  saveUser(merged);

  const users = getAllUsers();
  const idx = users.findIndex(u => u.account.toLowerCase() === (merged.account || '').toLowerCase());
  if (idx !== -1) {
    users[idx] = merged;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch (e) {
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
  } catch (e) {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function updateAccountUI() {
  const btn = document.getElementById('open-account-btn');
  const user = getUser();
  if (btn) {
    if (user && user.fullname) {
      btn.classList.add('logged-in');
      btn.title = `Tài khoản: ${user.fullname}`;
    } else {
      btn.classList.remove('logged-in');
      btn.title = 'Tài khoản';
    }
  }
}

// ── Live Stylist Chat Knowledge Engine (SoraHome Home Living) ──
const STYLIST_KNOWLEDGE = [
  {
    keys: ['lau nha', 'cay lau', 'san nha', 'san go', 'microfiber', 'hut bui', 'toc rung', 'tu vat'],
    reply: 'Với sàn nhà và bụi mịn, SoraHome khuyên bạn nên dùng **Cây lau nhà tự vắt xoay 360°**. Cơ chế vắt khô trợ lực 2 chiều không bẩn tay, đầu lau sợi microfiber tĩnh điện gom sạch tóc rụng và bụi mịn mà không gây xước sàn gỗ hay gạch men.'
  },
  {
    keys: ['toilet', 'bon cau', 'co toilet', 've sinh toilet', 'silicon', 'nha tam', 'phong tam'],
    reply: 'Với bồn cầu và phòng tắm, sản phẩm tối ưu nhất là **Bộ cọ toilet silicon TPR treo tường**. Đầu cọ mềm dẻo 360° cọ sạch sâu mép vành bồn cầu, hoàn toàn không bám tóc hay đọng nước, đế treo tường thông thoáng tự khô ráo ngăn ngừa vi khuẩn.'
  },
  {
    keys: ['gat nuoc', 'kinh', 'lau kinh', 'bep', 'gian bep', 'khan lau', 'vet nuoc', 'guong'],
    reply: 'Với mặt kính, gương phòng tắm và quầy bếp, bạn hãy dùng **Cây gạt nước silicone đa năng** kết hợp khăn lau sợi kép. Lưỡi gạt cao su mềm lướt êm, gạt sạch bọt xà phòng và nước đọng chỉ trong một đường lướt.'
  },
  {
    keys: ['ship', 'giao', 'freeship', 'phi', 'van chuyen', 'bao lau', 'nhanh', '24h'],
    reply: 'SoraHome **miễn phí giao hàng toàn quốc cho đơn từ 99.000đ**. Với đơn dưới 99.000đ, phí ship đồng giá 20.000đ. Đơn nội thành TP.HCM được giao nhanh trong vòng **24h**, nhận hàng kiểm tra trước khi thanh toán.'
  },
  {
    keys: ['kiem tra', 'xem hang', 'dong kiem', 'cod', 'thanh toan', 'tien mat', 'chuyen khoan', 'tra tien'],
    reply: 'Bạn hoàn toàn yên tâm vì SoraHome áp dụng **Đồng kiểm 100%**: Khi shipper giao đến, bạn được mở hộp kiểm tra đúng mẫu mã, linh kiện phụ kiện đầy đủ và thử lắp ráp ưng ý mới thanh toán tiền mặt (COD). Nếu chưa vừa ý, bạn gửi lại shipper 0đ mà không mất bất kỳ chi phí nào!'
  },
  {
    keys: ['bao hanh', 'doi tra', 'loi', 'hong', 'gay', 'ben', 'hu'],
    reply: 'SoraHome cam kết: **Bảo hành khớp nối & cơ cấu 30 ngày** (đổi mới 1-1 miễn phí nếu có lỗi kỹ thuật) và **Đổi mới dịu êm trong 7 ngày tận nhà**. Shipper giao sản phẩm mới tận nơi và nhận lại sản phẩm cũ, bạn không cần ra bưu cục.'
  },
  {
    keys: ['hop', 'dong goi', 'chong soc', 'thung'],
    reply: 'Mỗi đơn hàng gửi đi từ SoraHome đều được đóng gói tỉ mỉ trong thùng carton chịu lực, chèn xốp bóng khí bảo vệ chống trầy xước và đính kèm phiếu hướng dẫn sử dụng chi tiết.'
  },
  {
    keys: ['dia chi', 'o dau', 'cua hang', 'shop', 'gio', 'truc tiep', 'xem truc tiep'],
    reply: 'Cửa hàng trải nghiệm SoraHome tọa lạc tại **123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM**. Giờ mở cửa từ **8:00 – 21:30** tất cả các ngày trong tuần. Mời bạn ghé tiệm để trải nghiệm trực tiếp các dụng cụ vệ sinh thông minh nha!'
  },
  {
    keys: ['chat lieu', 'nhua', 'thep', 'inox', 'nhom', 'silicon', 'tpr', 'abs'],
    reply: 'Các sản phẩm SoraHome được sản xuất từ **nhựa ABS/PP nguyên sinh cao cấp** chịu lực va đập, khớp nối gia cố hợp kim không gỉ, đầu cọ chất liệu **silicon TPR mềm dẻo kháng khuẩn** và bông lau **sợi Microfiber dệt xoắn** siêu thấm hút.'
  },
  {
    keys: ['khuyen mai', 'giam gia', 'voucher', 'ma', 'sale', 'uu dai'],
    reply: 'Hiện SoraHome đang áp dụng các ưu đãi: Miễn phí giao hàng đơn từ 99k, Đồng kiểm tận tay trước khi trả tiền COD, và Đổi mới 1-1 trong 7 ngày tận nhà.'
  },
  {
    keys: ['chao', 'hello', 'hi', 'alo', 'oi', 'ad', 'shop oi'],
    reply: 'Chào bạn! Mình là Chuyên viên tư vấn SoraHome. Bạn cần tìm dụng cụ vệ sinh nhà cửa hay tư vấn giao hàng cứ nhắn mình nhé!'
  },
  {
    keys: ['cam on', 'thank', 'tks', 'ok', 'oke', 'da', 'vang'],
    reply: 'Dạ, không có chi ạ! Chúc bạn tìm được giải pháp vệ sinh ưng ý cho tổ ấm tinh tươm của mình. Nếu cần hỗ trợ thêm bất cứ điều gì, bạn cứ nhắn SoraHome bất kỳ lúc nào nhé!'
  }
];

function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str.toLowerCase();
}

function findStylistReply(query) {
  const q = removeVietnameseTones(query);
  for (const item of STYLIST_KNOWLEDGE) {
    for (const key of item.keys) {
      if (q.includes(key)) {
        return item.reply;
      }
    }
  }
  return 'Cảm ơn bạn đã nhắn tin! Đội ngũ tư vấn SoraHome luôn sẵn sàng hỗ trợ bạn. Bạn có thể gọi Hotline hoặc Zalo **0901 234 567** để được tư vấn chi tiết về từng dụng cụ vệ sinh nhà cửa thông minh nha!';
}

function handleLiveChatSend(e) {
  e.preventDefault();
  const input = document.getElementById('live-chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  postChatMessage(text, 'user');

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const reply = findStylistReply(text);
    postChatMessage(reply, 'bot');
  }, 500);
}

function sendChatChip(text) {
  postChatMessage(text, 'user');
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const reply = findStylistReply(text);
    postChatMessage(reply, 'bot');
  }, 450);
}

function postChatMessage(text, sender) {
  const container = document.getElementById('live-chat-messages');
  if (!container) return;
  const msgRow = document.createElement('div');
  msgRow.className = `chat-bubble-row ${sender}`;
  msgRow.innerHTML = `
    <div class="chat-bubble">${text}</div>
    <span class="chat-timestamp">${new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'})}</span>
  `;
  container.appendChild(msgRow);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('live-chat-messages');
  if (!container || document.getElementById('chat-typing')) return;
  const ind = document.createElement('div');
  ind.id = 'chat-typing';
  ind.className = 'chat-bubble-row bot';
  ind.innerHTML = `
    <div class="chat-bubble typing-bubble">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(ind);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const ind = document.getElementById('chat-typing');
  if (ind) ind.remove();
}

// ── Apple Scroll Transitions & Cinematic Reveal Engine ──
function initScrollReveal() {
  // 1. Scroll Progress Bar
  let progressLine = document.querySelector('.scroll-progress-line');
  if (!progressLine) {
    progressLine = document.createElement('div');
    progressLine.className = 'scroll-progress-line';
    document.body.appendChild(progressLine);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressLine.style.width = Math.min(100, Math.max(0, progress)) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 2. IntersectionObserver for Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Animate counter if available
        const counterEl = entry.target.querySelector('[data-counter]');
        if (counterEl && !counterEl.dataset.counted) {
          animateCounter(counterEl);
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

function animateCounter(el) {
  el.dataset.counted = 'true';
  const target = parseInt(el.getAttribute('data-counter'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1200;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * target);

    el.textContent = prefix + currentVal.toLocaleString('vi-VN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = prefix + target.toLocaleString('vi-VN') + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

// Global Navigation Helper: goBack & renderBackButton
function goBack(fallbackUrl = 'products.html') {
  if (window.history.length > 1 && document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
    window.history.back();
  } else {
    window.location.href = fallbackUrl;
  }
}

function renderBackButton(fallbackUrl = 'products.html', label = 'Quay lại') {
  return `
    <button class="btn-back" onclick="goBack('${fallbackUrl}')" aria-label="${label}" title="${label}">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  `;
}

// Global Floating Back Button Scroll Detection
window.addEventListener('scroll', () => {
  const floatBtn = document.getElementById('floating-back-btn');
  if (!floatBtn) return;
  if (window.scrollY > 280) {
    floatBtn.classList.add('visible');
  } else {
    floatBtn.classList.remove('visible');
  }
}, { passive: true });

// Auto-run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    renderCompareBar();
  });
} else {
  setTimeout(() => {
    initScrollReveal();
    renderCompareBar();
  }, 100);
}

// ── Feature: Product Comparison (Compare up to 2 products) ──
const COMPARE_KEY = 'sorahome_compare';

function getCompareList() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(COMPARE_KEY) || '[]');
    return Array.isArray(raw) ? raw.slice(0, 2) : [];
  } catch {
    return [];
  }
}

function saveCompareList(list) {
  sessionStorage.setItem(COMPARE_KEY, JSON.stringify(list.slice(0, 2)));
}

function isCompared(id) {
  return getCompareList().includes(Number(id));
}

function updateCompareButtonsUI() {
  const list = getCompareList();
  document.querySelectorAll('.btn-compare[data-compare-id]').forEach(btn => {
    const id = Number(btn.dataset.compareId);
    const active = list.includes(id);
    btn.classList.toggle('active', active);
    btn.textContent = active ? '✓ Đang so sánh' : '+ So sánh';
  });
}

function toggleCompare(id) {
  const numId = Number(id);
  let list = getCompareList();
  if (list.includes(numId)) {
    list = list.filter(x => x !== numId);
    showToast('Đã bỏ khỏi danh sách so sánh');
  } else {
    if (list.length >= 2) {
      showToast('Chỉ so sánh tối đa 2 sản phẩm cùng lúc', 'error');
      return;
    }
    list.push(numId);
    showToast(list.length === 2 ? 'Đã chọn đủ 2 sản phẩm để so sánh' : 'Chọn thêm 1 sản phẩm nữa để so sánh');
  }
  saveCompareList(list);
  updateCompareButtonsUI();
  renderCompareBar();
}

function clearCompare() {
  saveCompareList([]);
  updateCompareButtonsUI();
  renderCompareBar();
}

function renderCompareBar() {
  if (typeof PRODUCTS === 'undefined') return;
  const list = getCompareList();
  let bar = document.getElementById('compare-bar');

  if (list.length === 0) {
    if (bar) bar.remove();
    return;
  }

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'compare-bar';
    bar.className = 'compare-bar';
    document.body.appendChild(bar);
  }

  const items = list.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  bar.innerHTML = `
    <div class="compare-bar-items">
      ${items.map(p => `
        <div class="compare-chip">
          <img src="${p.image}" alt="${p.shortName || p.name}"/>
          <span>${p.shortName || p.name}</span>
          <button type="button" onclick="toggleCompare(${p.id})" aria-label="Bỏ ${p.name}">×</button>
        </div>
      `).join('')}
      ${items.length === 1 ? '<div class="compare-placeholder">Chọn thêm 1 món nữa...</div>' : ''}
    </div>
    <div class="compare-bar-actions">
      <button type="button" class="btn-compare-clear" onclick="clearCompare()">Xóa</button>
      <button type="button" class="btn-primary btn-compare-go" ${items.length < 2 ? 'disabled' : ''} onclick="openCompareModal()">
        So sánh (${items.length}/2)
      </button>
    </div>
  `;
}

function openCompareModal() {
  if (typeof PRODUCTS === 'undefined') return;
  const items = getCompareList().map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  if (items.length < 2) return;

  let modal = document.getElementById('compare-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'compare-modal';
    modal.className = 'modal-overlay';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCompareModal();
    });
    document.body.appendChild(modal);
  }

  const [a, b] = items;
  const discountPct = (p) => p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

  modal.innerHTML = `
    <div class="modal-box compare-modal-box">
      <div class="compare-modal-header">
        <div>
          <h3 style="font-size:20px; font-weight:800; color:var(--apple-black);">So sánh sản phẩm</h3>
          <p style="font-size:13px; color:var(--apple-secondary); margin-top:2px;">Đối chiếu thông số & chất liệu để chọn đúng dụng cụ</p>
        </div>
        <button type="button" class="compare-modal-close" onclick="closeCompareModal()" aria-label="Đóng">×</button>
      </div>
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Tiêu chí</th>
              ${items.map(p => `
                <th>
                  <img src="${p.image}" alt="${p.name}" class="compare-thumb"/>
                  <div class="compare-prod-name">${p.name}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Giá bán</td>
              ${items.map(p => `
                <td>
                  <strong style="color:var(--accent-rose); font-size:16px;">${fmt(p.price)}</strong>
                  ${discountPct(p) > 0 ? `<div style="font-size:12px; color:var(--apple-tertiary);"><span style="text-decoration:line-through;">${fmt(p.originalPrice)}</span> (-${discountPct(p)}%)</div>` : ''}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Danh mục</td>
              <td>${a.categoryName}</td>
              <td>${b.categoryName}</td>
            </tr>
            <tr>
              <td>Đánh giá</td>
              <td>⭐ ${a.rating} (${a.reviewsCount} lượt)</td>
              <td>⭐ ${b.rating} (${b.reviewsCount} lượt)</td>
            </tr>
            <tr>
              <td>Thông số</td>
              <td>${a.spec || 'Đang cập nhật'}</td>
              <td>${b.spec || 'Đang cập nhật'}</td>
            </tr>
            <tr>
              <td>Chất liệu</td>
              <td>${a.material || 'Đang cập nhật'}</td>
              <td>${b.material || 'Đang cập nhật'}</td>
            </tr>
            <tr>
              <td>Chọn mua</td>
              ${items.map(p => `
                <td>
                  <button type="button" class="btn-primary" style="width:100%; padding:9px 12px; font-size:13px;" onclick="quickAdd(${p.id}); closeCompareModal();">
                    Thêm vào giỏ
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  modal.classList.add('show');
}

function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  if (modal) modal.classList.remove('show');
}

// ── Feature 2: Smart 3-Step Tool Quiz & Space Combos ──
const QUIZ_STEPS = [
  {
    key: 'area',
    question: 'Bước 1/3: Bạn muốn làm sạch khu vực nào nhất?',
    options: [
      { value: 'floor', label: 'Phòng khách & Sàn nhà', desc: 'Sàn gỗ, gạch men, gầm bàn ghế' },
      { value: 'bathroom', label: 'Phòng tắm & Toilet', desc: 'Chân tường, ron gạch, bồn cầu' },
      { value: 'glass', label: 'Gian bếp & Mặt kính', desc: 'Gương soi, vách kính, mặt bàn đá' }
    ]
  },
  {
    key: 'need',
    question: 'Bước 2/3: Vấn đề khiến bạn khó chịu nhất là gì?',
    options: [
      { value: 'daily', label: 'Bụi mịn, tóc rụng hàng ngày', desc: 'Cần lau nhanh, khô ráo, không chạm tay' },
      { value: 'stain', label: 'Rêu mốc, cặn canxi & góc kẹt', desc: 'Cần cọ cứng chà sạch khe hẹp' },
      { value: 'water', label: 'Nước đọng & vệt ố trên mặt phẳng', desc: 'Cần gạt sạch nước tức thì' }
    ]
  },
  {
    key: 'priority',
    question: 'Bước 3/3: Bạn ưu tiên tiêu chí nào nhất?',
    options: [
      { value: 'fast', label: 'Nhanh gọn, tiết kiệm sức', desc: 'Bàn lau rộng, trợ lực nhẹ nhàng' },
      { value: 'deep', label: 'Sạch sâu từng ngóc ngách', desc: 'Đầu cọ chuyên dụng, len lỏi khe nhỏ' },
      { value: 'budget', label: 'Gọn nhẹ & tiết kiệm chi phí', desc: 'Đa năng, giá hợp lý nhất' }
    ]
  }
];

let quizStepIdx = 0;
let quizAnswers = {};

function renderQuiz() {
  const body = document.getElementById('quiz-body');
  const bar = document.getElementById('quiz-progress-bar');
  if (!body || typeof PRODUCTS === 'undefined') return;

  if (quizStepIdx < QUIZ_STEPS.length) {
    if (bar) bar.style.width = `${((quizStepIdx + 1) / QUIZ_STEPS.length) * 100}%`;
    const step = QUIZ_STEPS[quizStepIdx];
    body.innerHTML = `
      <div class="quiz-question">${step.question}</div>
      <div class="quiz-options">
        ${step.options.map(opt => `
          <button type="button" class="quiz-opt-btn" onclick="selectQuizOption('${step.key}', '${opt.value}')">
            <div class="quiz-opt-title">${opt.label}</div>
            <div class="quiz-opt-desc">${opt.desc}</div>
          </button>
        `).join('')}
      </div>
      ${quizStepIdx > 0 ? `<button type="button" class="quiz-back-btn" onclick="prevQuizStep()">← Quay lại bước trước</button>` : ''}
    `;
    return;
  }

  if (bar) bar.style.width = '100%';
  const rec = getQuizRecommendation();
  body.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-badge">Gợi ý phù hợp nhất cho bạn</div>
      <div class="quiz-result-reason">${rec.reason}</div>
      <div class="quiz-result-items">
        ${rec.items.map(p => `
          <div class="quiz-rec-item">
            <img src="${p.image}" alt="${p.shortName || p.name}"/>
            <div style="flex:1; min-width:0;">
              <a href="product-detail.html?id=${p.id}" class="quiz-rec-name">${p.name}</a>
              <div class="quiz-rec-price">${fmt(p.price)}</div>
            </div>
            <button type="button" class="btn-primary" style="padding:8px 14px; font-size:12.5px;" onclick="quickAdd(${p.id})">+ Giỏ</button>
          </div>
        `).join('')}
      </div>
      <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
        <button type="button" class="btn-primary" style="flex:1;" onclick="addComboToCart([${rec.items.map(i => i.id).join(',')}], 'bộ gợi ý')">Thêm cả ${rec.items.length} món vào giỏ</button>
        <button type="button" class="btn-outline" onclick="resetQuiz()">Chọn lại</button>
      </div>
    </div>
  `;
}

function selectQuizOption(key, value) {
  quizAnswers[key] = value;
  quizStepIdx += 1;
  renderQuiz();
}

function prevQuizStep() {
  if (quizStepIdx > 0) {
    quizStepIdx -= 1;
    renderQuiz();
  }
}

function resetQuiz() {
  quizStepIdx = 0;
  quizAnswers = {};
  renderQuiz();
}

function getQuizRecommendation() {
  const { area, need, priority } = quizAnswers;
  let primaryId = 4;
  let secondaryId = 1;
  let reason = 'Bộ đôi lau sàn và gạt nước giúp dọn dẹp nhanh gấp đôi mà không cần chạm tay vào nước bẩn.';

  if (area === 'bathroom') {
    if (need === 'stain' || priority === 'deep') {
      primaryId = 2;
      secondaryId = 5;
      reason = 'Đầu cọ chữ V 90° xử lý sạch ron gạch & chân tường, kết hợp Bộ Cọ Toilet 3in1 kháng khuẩn.';
    } else {
      primaryId = 3;
      secondaryId = 2;
      reason = 'Cây Chà Sàn 3in1 vừa cọ sạch cặn canxi vừa gạt khô sàn nhà tắm chống trơn trượt tức thì.';
    }
  } else if (area === 'glass') {
    primaryId = 1;
    secondaryId = need === 'stain' ? 3 : 4;
    reason = 'Lưỡi silicon 35cm khớp xoay 360° gạt sạch 100% bọt xà phòng, dầu mỡ và vệt nước trên kính & bàn bếp.';
  } else {
    primaryId = priority === 'budget' ? 1 : 4;
    secondaryId = priority === 'budget' ? 3 : 1;
    reason = 'Bàn lau 45cm tự vắt kiệt 95% nước, hút sạch bụi mịn & tóc rụng trên sàn gỗ và gạch men.';
  }

  const items = [primaryId, secondaryId]
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);
  return { items, reason };
}

const SPACE_COMBOS = [
  {
    id: 'combo-bathroom',
    title: 'Combo Nhà Tắm Sạch Khuẩn',
    desc: 'Chà góc tường + Chà sàn 3in1 + Bộ cọ Toilet 3in1',
    productIds: [2, 3, 5]
  },
  {
    id: 'combo-living',
    title: 'Combo Sàn Nhà & Kính Sáng Bóng',
    desc: 'Cây lau nhà tự vắt 45cm + Cây gạt nước xoay 360°',
    productIds: [4, 1]
  },
  {
    id: 'combo-full',
    title: 'Combo Toàn Diện Tổ Ấm',
    desc: 'Cây lau nhà 45cm + Chà sàn 3in1 + Gạt nước 360°',
    productIds: [4, 3, 1]
  }
];

function renderSpaceCombos() {
  const container = document.getElementById('combo-list');
  if (!container || typeof PRODUCTS === 'undefined') return;

  container.innerHTML = SPACE_COMBOS.map(combo => {
    const items = combo.productIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const total = items.reduce((s, p) => s + p.price, 0);
    return `
      <div class="combo-item">
        <div class="combo-thumbs">
          ${items.map(p => `<img src="${p.image}" alt="${p.shortName || p.name}"/>`).join('')}
        </div>
        <div style="flex:1; min-width:0;">
          <div class="combo-name">${combo.title}</div>
          <div class="combo-desc">${combo.desc}</div>
          <div class="combo-meta">
            <span class="combo-price">${fmt(total)}</span>
            <span class="combo-ship-tag">Freeship</span>
          </div>
        </div>
        <button type="button" class="btn-primary combo-add-btn" onclick="addComboToCart([${combo.productIds.join(',')}], '${combo.title}')">
          Thêm cả bộ
        </button>
      </div>
    `;
  }).join('');
}

function addComboToCart(ids, label) {
  if (!Array.isArray(ids) || typeof addToCart !== 'function') return;
  ids.forEach(id => addToCart(id, 1, null));
  showToast(`Đã thêm ${label || 'combo'} (${ids.length} món) vào giỏ hàng`);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    renderSpaceCombos();
  });
} else {
  renderQuiz();
  renderSpaceCombos();
}
