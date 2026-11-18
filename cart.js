// cart.js — shared cart logic & gift packaging, dùng localStorage
const CART_KEY = 'nep_toc_cart';
const GIFT_KEY = 'nep_toc_gift_option';
const FREE_SHIP_THRESHOLD = 300000;
const SHIP_FEE = 25000;
const GIFT_FEE = 15000;

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  if (typeof renderCartDrawerContent === 'function') {
    renderCartDrawerContent();
  }
}

function getGiftOption() {
  try {
    return JSON.parse(localStorage.getItem(GIFT_KEY)) || { enabled: false, note: '' };
  } catch {
    return { enabled: false, note: '' };
  }
}

function setGiftOption(enabled, note = '') {
  localStorage.setItem(GIFT_KEY, JSON.stringify({ enabled, note }));
  if (typeof renderCartDrawerContent === 'function') {
    renderCartDrawerContent();
  }
}

function addToCart(productId, qty = 1, swatch = null, customEngraving = null) {
  const cleanSwatch = (swatch === 'null' || swatch === 'undefined' || !swatch) ? null : swatch;
  const pId = Number(productId);
  const cart = getCart();
  const engText = (customEngraving && customEngraving.text) ? customEngraving.text.trim() : null;

  const existing = cart.find(i => {
    const itemSwatch = (i.swatch === 'null' || i.swatch === 'undefined' || !i.swatch) ? null : i.swatch;
    const itemEngText = (i.customEngraving && i.customEngraving.text) ? i.customEngraving.text.trim() : null;
    return Number(i.id) === pId && itemSwatch === cleanSwatch && itemEngText === engText;
  });

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99);
  } else {
    const p = PRODUCTS.find(p => Number(p.id) === pId);
    if (!p) return;
    cart.push({ 
      id: pId, 
      name: p.name, 
      price: p.price, 
      qty, 
      swatch: cleanSwatch, 
      cardBg: p.cardBg, 
      cardAccent: p.cardAccent,
      customEngraving: customEngraving || null 
    });
  }
  saveCart(cart);
}

function removeFromCart(productId, swatch = null, engravingText = null) {
  const cleanSwatch = (swatch === 'null' || swatch === 'undefined' || !swatch) ? null : swatch;
  const pId = Number(productId);
  const engText = (engravingText === 'null' || engravingText === 'undefined' || !engravingText) ? null : engravingText.trim();

  const cart = getCart().filter(i => {
    const itemSwatch = (i.swatch === 'null' || i.swatch === 'undefined' || !i.swatch) ? null : i.swatch;
    const itemEngText = (i.customEngraving && i.customEngraving.text) ? i.customEngraving.text.trim() : null;
    return !(Number(i.id) === pId && itemSwatch === cleanSwatch && itemEngText === engText);
  });
  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast('Đã xóa khỏi giỏ hàng');
  }
  if (typeof renderCart === 'function') {
    renderCart();
  }
}

function updateQty(productId, swatch, newQty, engravingText = null) {
  const cleanSwatch = (swatch === 'null' || swatch === 'undefined' || !swatch) ? null : swatch;
  const pId = Number(productId);
  const engText = (engravingText === 'null' || engravingText === 'undefined' || !engravingText) ? null : engravingText.trim();
  const cart = getCart();

  const item = cart.find(i => {
    const itemSwatch = (i.swatch === 'null' || i.swatch === 'undefined' || !i.swatch) ? null : i.swatch;
    const itemEngText = (i.customEngraving && i.customEngraving.text) ? i.customEngraving.text.trim() : null;
    return Number(i.id) === pId && itemSwatch === cleanSwatch && itemEngText === engText;
  });

  if (item) {
    if (newQty < 1) {
      removeFromCart(productId, swatch, engravingText);
      return;
    }
    item.qty = Math.min(newQty, 99);
    saveCart(cart);
    if (typeof renderCart === 'function') {
      renderCart();
    }
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(GIFT_KEY);
  updateCartBadge();
  if (typeof renderCartDrawerContent === 'function') {
    renderCartDrawerContent();
  }
  if (typeof renderCart === 'function') {
    renderCart();
  }
}

function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function getSubtotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function getShipFee() {
  const sub = getSubtotal();
  return sub === 0 ? 0 : sub >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FEE;
}

function getTotal() {
  const gift = getGiftOption();
  const giftCost = (gift.enabled && getCart().length > 0) ? GIFT_FEE : 0;
  return getSubtotal() + getShipFee() + giftCost;
}

function fmt(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const cartBtn = document.getElementById('open-cart-btn') || document.querySelector('.cart-btn');
  const count = getCartCount();

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (cartBtn && count > 0) {
    cartBtn.classList.remove('cart-bump');
    void cartBtn.offsetWidth;
    cartBtn.classList.add('cart-bump');
  }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
