// --- MENU PRICES ---
const MENU = {
  paneer: { name: "Paneer Butter Masala", price: 179 },
  biryani: { name: "Veg Biryani", price: 159 },
  paratha: { name: "Aloo Paratha Combo", price: 129 },
  wrap: { name: "Paneer Tikka Wrap", price: 139 },
  jamun: { name: "Gulab Jamun (2pcs)", price: 69 }
};
const DELIVERY_FEE = 29;

// --- HELPERS ---
function formatINR(n){ return "₹" + n.toLocaleString("en-IN"); }
function waEncode(s){ return encodeURIComponent(s); }

function getCart(){ return JSON.parse(localStorage.getItem('cart') || '{}'); }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }
function getCartCount(){
  const cart = getCart();
  return Object.values(cart).reduce((a,b)=> a + (parseInt(b||0,10)), 0);
}
function updateCartBadge(){
  const el = document.getElementById('cart-count');
  if(!el) return;
  el.textContent = getCartCount();
}
// --- ADD TO CART LOGIC ---
function addToCart(key, qty){
  const cart = getCart();
  cart[key] = (cart[key] || 0) + qty;
  saveCart(cart);
  renderCart();
  updateCartBadge();   // <-- ensure this line exists
}

document.addEventListener('DOMContentLoaded', ()=>{
  updateCartBadge();   // <-- ensure badge initializes on load
});
// --- RENDER CART ---
function renderCart(){
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totals = document.getElementById('cart-totals');
  container.innerHTML = '';
  let subtotal = 0;
  Object.keys(cart).forEach(k=>{
    const item = MENU[k];
    if(!item) return;
    const qty = cart[k];
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <span>${item.name} x${qty}</span>
      <strong>${formatINR(item.price * qty)}</strong>
    `;
    container.appendChild(row);
    subtotal += item.price * qty;
  });
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const grand = subtotal + delivery;
  document.getElementById('cart-subtotal').textContent = formatINR(subtotal);
  document.getElementById('cart-delivery').textContent = formatINR(delivery);
  document.getElementById('cart-grand').textContent = formatINR(grand);
  updateCartBadge();
}

// --- CHECKOUT (WhatsApp) ---
function checkoutCart(){
  const cart = getCart();
  const keys = Object.keys(cart);
  if(keys.length === 0){ alert("Your cart is empty."); return; }
  let msg = "New Order:%0A";
  keys.forEach(k=>{
    msg += `${MENU[k].name} x${cart[k]}%0A`;
  });
  msg += `Delivery Fee: ${formatINR(DELIVERY_FEE)}%0A`;
  const total = keys.reduce((sum,k)=> sum + MENU[k].price*cart[k], 0) + DELIVERY_FEE;
  msg += `Total: ${formatINR(total)}%0A`;
  const url = `https://wa.me/918287306197?text=${msg}`;
  window.open(url, "_blank");
}

// --- BIND BUTTONS ---
document.getElementById('checkout-btn').addEventListener('click', checkoutCart);
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('y').textContent = new Date().getFullYear();

// Render cart on load
renderCart();
