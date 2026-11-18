// main.js — shared nav, toast, và cart badge
document.addEventListener('DOMContentLoaded', () => {
  // Active nav link
  const links = document.querySelectorAll('nav a');
  links.forEach(a => {
    if (a.href === location.href || (a.pathname !== '/' && location.pathname.endsWith(a.pathname))) {
      a.classList.add('active');
    }
  });

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('open');
    });
  }

  // Cart badge
  updateCartBadge();
});

// Toast notification
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

// Header HTML được inject bằng component
function renderHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  h.innerHTML = `
    <div class="topbar">🚚 Miễn phí ship đơn từ 300.000đ — Giao hàng toàn TP.HCM</div>
    <header>
      <div class="nav-inner">
        <a href="/index.html" class="logo">Nếp <span>Tóc</span></a>
        <nav id="main-nav">
          <a href="/index.html">Trang chủ</a>
          <a href="/products.html">Sản phẩm</a>
          <a href="/about.html">Về chúng tôi</a>
          <a href="/policy.html">Chính sách</a>
        </nav>
        <div class="nav-actions">
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <a href="/cart.html" class="cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Giỏ hàng
            <span id="cart-badge">0</span>
          </a>
        </div>
      </div>
    </header>
  `;
  // Re-run active link detection after inject
  const links = h.querySelectorAll('nav a');
  links.forEach(a => {
    if (location.pathname === '/' || location.pathname === '/index.html') {
      if (a.getAttribute('href') === '/index.html') a.classList.add('active');
    } else if (location.pathname.includes(a.getAttribute('href').replace('/', ''))) {
      a.classList.add('active');
    }
  });
  // Mobile toggle re-bind
  const toggle = h.querySelector('#nav-toggle');
  const nav = h.querySelector('#main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('open');
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
          <p class="footer-desc">Kẹp tóc & phụ kiện tóc chất lượng cao cho các nàng TP.HCM. Nhỏ nhưng sang — cài vào là khác.</p>
        </div>
        <div class="footer-col">
          <h4>Liên kết</h4>
          <a href="/index.html">Trang chủ</a>
          <a href="/products.html">Sản phẩm</a>
          <a href="/about.html">Về chúng tôi</a>
          <a href="/policy.html">Chính sách</a>
        </div>
        <div class="footer-col">
          <h4>Liên hệ</h4>
          <p>📍 TP. Hồ Chí Minh</p>
          <p>📱 0901 234 567</p>
          <p>✉️ hello@neptoc.vn</p>
          <p>⏰ 8:00–21:00 mỗi ngày</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Nếp Tóc. All rights reserved.</p>
        <p>Thiết kế với 🩷 tại TP.HCM</p>
      </div>
    </footer>
  `;
}

// Render product card HTML
function productCardHTML(p) {
  const tagClass = ['Bán chạy','Yêu thích','Độc quyền'].includes(p.tag) ? '' : 'yellow';
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

function productVisualSVG(p) {
  // CSS art placeholder — không dùng emoji
  if (p.category === 'claw') {
    return `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="30" rx="30" ry="20" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="3"/>
      <rect x="34" y="48" width="12" height="22" rx="6" fill="${p.cardAccent}"/>
      <ellipse cx="40" cy="30" rx="20" ry="12" fill="${p.cardAccent}" opacity="0.3"/>
      <line x1="20" y1="30" x2="60" y2="30" stroke="${p.cardAccent}" stroke-width="2" stroke-dasharray="5 3"/>
    </svg>`;
  } else {
    return `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect x="10" y="30" width="60" height="12" rx="6" fill="${p.cardAccent}" opacity="0.3" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="20" cy="36" r="8" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="40" cy="36" r="8" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <circle cx="60" cy="36" r="8" fill="${p.cardBg}" stroke="${p.cardAccent}" stroke-width="2"/>
      <line x1="20" y1="44" x2="20" y2="58" stroke="${p.cardAccent}" stroke-width="2.5"/>
      <line x1="40" y1="44" x2="40" y2="58" stroke="${p.cardAccent}" stroke-width="2.5"/>
      <line x1="60" y1="44" x2="60" y2="58" stroke="${p.cardAccent}" stroke-width="2.5"/>
    </svg>`;
  }
}

function quickAdd(id) {
  addToCart(id, 1, null);
  showToast('Đã thêm vào giỏ hàng! 🛍️', 'success');
}
