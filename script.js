// --- Menu & pricing (INR)
const MENU = {
  paneer: 179,
  biryani: 159,
  paratha: 129,
  wrap: 139,
  jamun: 69
};
const DELIVERY_FEE = 29;

function formatINR(n){ return "₹" + n.toLocaleString("en-IN"); }

function calcTotals(){
  let subtotal = 0;
  document.querySelectorAll('.items .row').forEach(row=>{
    const cb = row.querySelector('input[type="checkbox"]');
    const key = cb.dataset.key;
    const qty = parseInt(row.querySelector('.qty').value || "0", 10);
    if(cb.checked && qty>0){
      subtotal += (MENU[key] || 0) * qty;
    }
  });
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const grand = subtotal + delivery;
  document.getElementById('subtotal').textContent = formatINR(subtotal);
  document.getElementById('delivery').textContent = formatINR(delivery);
  document.getElementById('grand').textContent = formatINR(grand);
  return {subtotal, delivery, grand};
}

function buildItemsText(){
  const lines = [];
  document.querySelectorAll('.items .row').forEach(row=>{
    const cb = row.querySelector('input[type="checkbox"]');
    const key = cb.dataset.key;
    const qty = parseInt(row.querySelector('.qty').value || "0", 10);
    if(cb.checked && qty>0){
      const name = row.querySelector('label').innerText.replace(/\s*\(₹.*\)/,'').trim();
      lines.push(`${name} x${qty}`);
    }
  });
  return lines.join(', ');
}

function waEncode(s){ return encodeURIComponent(s); }

function sendOrder(e){
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const address = f.address.value.trim();

  const {subtotal, delivery, grand} = calcTotals();
  const itemsText = buildItemsText();

  if(!name || !phone || !address){
    alert('Please fill all fields.'); return false;
  }
  if(!itemsText){
    alert('Please select at least one item.'); return false;
  }
  const msg =
    `New order from ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Address: ${waEncode(address)}%0A` +
    `Items: ${waEncode(itemsText)}%0A` +
    `Subtotal: ${formatINR(subtotal)}%0A` +
    `Delivery: ${formatINR(delivery)}%0A` +
    `Total: ${formatINR(grand)}%0A` +
    `Preferred time: ____`;

  // WhatsApp
  const url = `https://wa.me/918287306197?text=${msg}`;
  window.open(url, '_blank');

  // Email (also set)
  const body =
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Address: ${waEncode(address)}%0A` +
    `Items: ${waEncode(itemsText)}%0A` +
    `Total: ${formatINR(grand)}`;
  document.getElementById('emailLink').href =
    `mailto:vikaspandey092015@gmail.com?subject=New Order&body=${body}`;

  return false;
}

// bind recalculation
document.addEventListener('input', (e)=>{
  if(e.target.matches('.items input')) calcTotals();
});
document.getElementById('y').textContent = new Date().getFullYear();
calcTotals();
