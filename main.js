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
          <a href="studio.html" class="nav-studio-link">Studio Thử Kẹp <span class="studio-sparkle">✨</span></a>
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
          <a href="studio.html">Studio Thử Kẹp & Khắc Laser ✨</a>
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

// Floating Quick Contact & Emi Jay Live Chat Widget (Icon Only)
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
      <button class="float-btn chat-btn" id="btn-toggle-chat" title="Tư vấn chọn kẹp tóc" aria-label="Khung chat tư vấn">
        <span class="chat-online-dot"></span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </button>
    </div>

    <!-- Emi Jay Live Chat Box -->
    <div class="live-chat-box" id="live-chat-box">
      <div class="live-chat-header">
        <div class="live-chat-stylist-info">
          <div class="live-chat-avatar">NT</div>
          <div>
            <div class="live-chat-name">Stylist Nếp Tóc</div>
            <div class="live-chat-status"><span class="chat-status-green"></span>Trực tuyến • Phản hồi ngay</div>
          </div>
        </div>
        <button class="live-chat-close" id="btn-close-chat" aria-label="Đóng chat">×</button>
      </div>

      <div class="live-chat-body" id="live-chat-messages">
        <div class="chat-bubble-row bot">
          <div class="chat-bubble">
            Chào bạn! Mình là Stylist của Nếp Tóc. Bạn cần tìm kẹp cho chất tóc dày hay mỏng, hoặc cần tư vấn kẹp giữ nếp đi làm, đi chơi thì nhắn mình nhé!
          </div>
          <span class="chat-timestamp">Vừa xong</span>
        </div>

        <!-- Suggestion Chips -->
        <div class="chat-suggestion-chips" id="chat-suggestion-chips">
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Tóc dày & dài nên chọn kẹp nào?')">Tóc dày & dài</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Tóc mỏng kẹp mẫu nào không bị tuột?')">Tóc mỏng/ngắn</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Màu kẹp nào tôn da sáng mặt nhất?')">Màu tôn da</button>
          <button type="button" class="chat-chip-btn" onclick="sendChatChip('Tư vấn đóng gói hộp quà nơ lụa')">Gói hộp quà</button>
        </div>
      </div>

      <form class="live-chat-footer" id="live-chat-form" onsubmit="handleLiveChatSend(event)">
        <input type="text" id="live-chat-input" placeholder="Hỏi về chất tóc, size kẹp..." autocomplete="off"/>
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
        document.getElementById('live-chat-input')?.focus();
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
            ${item.customEngraving && item.customEngraving.text ? `
              <div class="drawer-item-engraving" style="margin-top:4px; font-size:12px; color:#b45309; background:#fef3c7; border:1px solid #fde68a; padding:3px 7px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">
                <span>✨ Khắc:</span> <strong>"${item.customEngraving.text}"</strong>
                <span style="font-size:11px; opacity:0.85;">(${item.customEngraving.finish || 'Gold Foil'})</span>
              </div>
            ` : ''}
            <div class="drawer-item-price" style="margin-top:4px;">${fmt(item.price * item.qty)}</div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-remove" onclick="removeFromCart(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.customEngraving?.text ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})" aria-label="Xóa">×</button>
            <div class="cart-qty-ctrl">
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty - 1}, ${item.customEngraving?.text ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty(${item.id}, ${item.swatch ? `'${item.swatch.replace(/'/g, "\\'")}'` : 'null'}, ${item.qty + 1}, ${item.customEngraving?.text ? `'${item.customEngraving.text.replace(/'/g, "\\'")}'` : 'null'})">+</button>
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

// ── Angle 1: Unique High-Craft Product Illustrations (Impeccable Design) ──
function productVisualSVG(p, size = 84) {
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

// ── Angle 2: Secondary View / Răng Kẹp & Chi Tiết Lò Xo ──
function productVisualSecondarySVG(p, size = 88) {
  const ac = p.cardAccent || '#d6336c';
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
    <rect x="24" y="24" width="52" height="52" rx="14" fill="#fafafc" stroke="${ac}" stroke-width="2.5"/>
    <circle cx="50" cy="38" r="9" fill="none" stroke="${ac}" stroke-width="3"/>
    <line x1="44" y1="38" x2="56" y2="38" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="32" y1="54" x2="42" y2="54" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="58" y1="54" x2="68" y2="54" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="36" y1="62" x2="46" y2="62" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <line x1="54" y1="62" x2="64" y2="62" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="76" font-size="7.5" text-anchor="middle" fill="${ac}" font-weight="700" letter-spacing="1">LÒ XO TITAN</text>
  </svg>`;
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
  } catch {}
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

// ── Emi Jay Style Live Stylist Chat Logic ──
const STYLIST_ANSWERS = {
  'day': 'Với tóc dày hoặc uốn xoăn bồng bềnh, bạn nên chọn kẹp càng cua cỡ lớn 10.5cm – 11cm như mẫu **Kẹp Hoa Sứ Pastel (45k)** hoặc **Kẹp Càng Cua Nâu Trà Hổ Phách (50k)**. Cốt lò xo thép Titan chịu lực cao, ôm trọn tóc suốt ngày dài không bị tuột nha!',
  'mong': 'Với tóc mỏng hoặc tóc tơ mềm, bạn nên chọn các mẫu kẹp kích cỡ vừa 8.5cm – 9cm như **Kẹp Bán Nguyệt Tối Giản (65k)** hoặc set kẹp mái mini. Răng kẹp ôm sát nhẹ nhàng, không gây nặng đầu hay gãy nếp tóc.',
  'mau': 'Nếu bạn thích màu tôn da sáng mặt, gam màu **Nâu Trà Hổ Phách** và **Hồng Phấn Pastel** là 2 tông màu bán chạy nhất tại Nếp Tóc. Màu sắc trong trẻo tự nhiên, phối đồ công sở hay đi chơi đều rất thanh lịch!',
  'qua': 'Khi đặt hàng, bạn chỉ cần tích chọn *"Đóng gói hộp quà nơ lụa & thiệp viết tay"* (+15.000đ). Tụi mình sẽ chuẩn bị hộp nơ lụa tinh tế và nắn nót viết lời chúc riêng của bạn gửi đến người thương nhé!',
  'default': 'Cảm ơn bạn đã nhắn tin! Bạn có thể gọi Hotline hoặc nhắn Zalo **0901 234 567** để được Stylist Nếp Tóc tư vấn gửi video cận cảnh từng mẫu kẹp trên tóc nha!'
};

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
    const lower = text.toLowerCase();
    let reply = STYLIST_ANSWERS['default'];
    if (lower.includes('dày') || lower.includes('nhiều') || lower.includes('dài')) {
      reply = STYLIST_ANSWERS['day'];
    } else if (lower.includes('mỏng') || lower.includes('ngắn') || lower.includes('ít')) {
      reply = STYLIST_ANSWERS['mong'];
    } else if (lower.includes('màu') || lower.includes('da')) {
      reply = STYLIST_ANSWERS['mau'];
    } else if (lower.includes('quà') || lower.includes('hộp') || lower.includes('thiệp')) {
      reply = STYLIST_ANSWERS['qua'];
    }
    postChatMessage(reply, 'bot');
  }, 650);
}

function sendChatChip(text) {
  postChatMessage(text, 'user');
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    let reply = STYLIST_ANSWERS['default'];
    if (text.includes('dày')) reply = STYLIST_ANSWERS['day'];
    else if (text.includes('mỏng')) reply = STYLIST_ANSWERS['mong'];
    else if (text.includes('màu')) reply = STYLIST_ANSWERS['mau'];
    else if (text.includes('quà')) reply = STYLIST_ANSWERS['qua'];
    postChatMessage(reply, 'bot');
  }, 500);
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

// Auto-run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  setTimeout(initScrollReveal, 100);
}
