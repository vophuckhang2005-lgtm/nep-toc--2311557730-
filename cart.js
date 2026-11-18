// cart.js — shared cart logic, dùng localStorage
const CART_KEY = 'nep_toc_cart';
const FREE_SHIP_THRESHOLD = 300000;
const SHIP_FEE = 25000;

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1, swatch = null) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.swatch === swatch);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99);
  } else {
    const p = PRODUCTS.find(p => p.id === productId);
    if (!p) return;
    cart.push({ id: productId, name: p.name, price: p.price, qty, swatch, cardBg: p.cardBg, cardAccent: p.cardAccent });
  }
  saveCart(cart);
}

function removeFromCart(productId, swatch = null) {
  const cart = getCart().filter(i => !(i.id === productId && i.swatch === swatch));
  saveCart(cart);
}

function updateQty(productId, swatch, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.swatch === swatch);
  if (item) {
    if (newQty < 1) { removeFromCart(productId, swatch); return; }
    item.qty = Math.min(newQty, 99);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
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
  return getSubtotal() + getShipFee();
}

function fmt(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

// Chạy ngay khi load
document.addEventListener('DOMContentLoaded', updateCartBadge);
