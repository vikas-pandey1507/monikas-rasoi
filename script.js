function waEncode(s){return encodeURIComponent(s).replace(/%20/g,'%20')}
function sendOrder(e){
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const address = f.address.value.trim();
  const items = f.items.value.trim();
  if(!name || !phone || !address || !items){ alert('Please fill all fields.'); return false; }
  const msg = `New order:%0AName: ${waEncode(name)}%0APhone: ${waEncode(phone)}%0AAddress: ${waEncode(address)}%0AItems: ${waEncode(items)}`;
  const url = `https://wa.me/918287306197?text=${msg}`;
  // also set mailto link
  const body = `Name: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AItems: ${items}`;
  document.getElementById('emailLink').href = `mailto:vikaspandey092015@gmail.com?subject=New Order&body=${body}`;
  window.open(url, '_blank');
  return false;
}
document.getElementById('y').textContent = new Date().getFullYear();
