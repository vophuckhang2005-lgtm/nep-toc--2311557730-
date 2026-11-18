// main.js — shared nav, toast, cart badge & Apple fluid interactions

function renderHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  h.innerHTML = `
    <div class="topbar">
      <span>🚚 Miễn phí ship đơn từ 300.000đ</span>
      <span>•</span>
      <span>Giao nhanh nội thành TP.HCM</span>
    </div>
    <header id="app-header">
      <div class="nav-inner">
        <a href="/index.html" class="logo">Nếp <span>Tóc</span></a>
        <nav id="main-nav">
          <a href="/index.html">Trang chủ</a>
          <a href="/products.html">Sản phẩm</a>
          <a href="/about.html">Về chúng tôi</a>
          <a href="/policy.html">Chính sách</a>
        </nav>
        <div class="nav-actions">
          <a href="/cart.html" class="cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span>Giỏ hàng</span>
            <span id="cart-badge">0</span>
          </a>
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

  // Mobile toggle handler — Apple direct response
  const btn = h.querySelector('#nav-toggle');
  const navEl = h.querySelector('#main-nav');

  if (btn && navEl) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navEl.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
    });

    // Close when clicking nav link
    navEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navEl.classList.remove('open');
        btn.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !navEl.contains(e.target)) {
        navEl.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  updateCartBadge();
}

function renderFooter() {
  const f = document.getElementById('site-footer');
  if (!f) return;
  f.innerHTML = `
    <footer>
      <div class="footer-inner">
        <div>
          <div class="footer-logo">Nếp <span>Tóc</span></div>
          <p class="footer-desc">Phụ kiện tóc & kẹp càng cua thiết kế tối giản, chất liệu cao cấp. Tinh tế trên từng nếp tóc của bạn.</p>
        </div>
        <div class="footer-col">
          <h4>Khám phá</h4>
          <a href="/index.html">Trang chủ</a>
          <a href="/products.html">Tất cả sản phẩm</a>
          <a href="/about.html">Về chúng tôi</a>
          <a href="/policy.html">Chính sách bảo hành</a>
        </div>
        <div class="footer-col">
          <h4>Hỗ trợ</h4>
          <p>📍 TP. Hồ Chí Minh</p>
          <p>📱 Hotline: 0901 234 567</p>
          <p>✉️ Email: hello@neptoc.vn</p>
          <p>⏰ Hỗ trợ: 8:00 – 21:00 hàng ngày</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Nếp Tóc. Thiết kế theo tiêu chuẩn Apple Human Interface.</p>
        <p>Thanh toán COD toàn TP.HCM</p>
      </div>
    </footer>
  `;
}

// Apple Fluid Toast Notification
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

// Apple Minimalist Product Card SVG
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

// Product Card HTML
function productCardHTML(p) {
  const tagClass = ['Bán chạy', 'Yêu thích', 'Độc quyền'].includes(p.tag) ? '' : 'yellow';
  return `
    <div class="product-card" onclick="location.href='/product-detail.html?id=${p.id}'">
      <div class="product-card-img" style="background:${p.cardBg}; color:${p.cardAccent}">
        ${productVisualSVG(p)}
        <div class="product-tag ${tagClass}">${p.tag}</div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryName}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}</span>
          <span>${p.rating} (${p.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${fmt(p.price)}</span>
          <span class="product-original">${fmt(p.originalPrice)}</span>
        </div>
      </div>
      <button class="btn-add" onclick="event.stopPropagation(); quickAdd(${p.id})">Thêm vào giỏ</button>
    </div>
  `;
}

function quickAdd(id) {
  addToCart(id, 1, null);
  showToast('Đã thêm vào giỏ hàng', 'success');
}
