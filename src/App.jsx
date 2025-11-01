
import { useState } from "react";

import { useEffect } from "react";

function useMenu() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch('/menu.json').then(r => r.json()).then(setMenu).catch(()=>{});
  }, []);
  return menu;
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Phone, MessageCircle, MapPin, Clock, Star, UtensilsCrossed, Facebook, Instagram, Mail, Bike, ChevronRight } from "lucide-react";

// --- Utility data ---
const LOGO_URL = "/logo.png"; // Replace with your hosted logo URL (e.g., Cloudinary/Vercel public folder)

const MENU = [];

const TESTIMONIALS = [
  { name: "Nisha", quote: "Consistently delicious and always on time. My go-to late work dinner!", rating: 5 },
  { name: "Ahmed", quote: "Loved the spice balance. Portions are generous and packaging is premium.", rating: 5 },
  { name: "Omar", quote: "Great value bowls. The shawarma rice is a must-try.", rating: 4 },
];


  const menu = useMenu();
  const [cart, setCart] = useState({}); // { name: { price, qty } }
  const addToCart = (item) => setCart(prev => ({ ...prev, [item.name]: { price: item.price, qty: (prev[item.name]?.qty||0)+1 } }));
  const decFromCart = (item) => setCart(prev => {
    const q = (prev[item.name]?.qty||0)-1;
    const n = { ...prev };
    if(q<=0) delete n[item.name]; else n[item.name] = { price: item.price, qty: q };
    return n;
  });
  const clearCart = () => setCart({});
  const cartItems = Object.entries(cart).map(([name, v]) => ({ name, ...v }));
  const total = cartItems.reduce((s,i)=>s + i.price*i.qty, 0);

  // Razorpay Checkout (replace with your live key when ready)
  const RAZORPAY_KEY_ID = "rzp_test_xxxxxxxxxxxxx"; // TODO: replace
  const payNow = () => {
    if (total <= 0) { alert("Cart is empty."); return; }
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: total * 100, // paise
      currency: "INR",
      name: "Monika's Rasoi",
      description: "Online Order",
      image: "/logo.png",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id + "\\nWe will confirm your order on WhatsApp.");
        // Optional: auto-open WhatsApp with cart details
        const lines = cartItems.map(i => `${i.name} x${i.qty} = ₹${i.price*i.qty}`).join('%0A');
        const msg = `Online payment success. Items:%0A${lines}%0ATotal: ₹${total}%0AName/Phone/Address: `;
        window.open(`https://wa.me/918287306197?text=${msg}`, "_blank");
        clearCart();
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#111111" }
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

const DELIVERY_ZONES = [
  "Gomti Nagar", "Indira Nagar", "Hazratganj", "Aliganj", "Charbagh", "Ashiyana", "Alambagh", "Lucknow, UP, India"
];

function Header() {
  const waText = encodeURIComponent("Hi! I want to order from Monika's Rasoi");
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Monika's Rasoi" className="w-8 h-8 rounded-xl object-cover" onError={(e)=>{e.currentTarget.style.display='none';}} />
          <span className="font-semibold text-lg">Monika's Rasoi</span>
          <Badge variant="secondary" className="ml-2">Lucknow</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#menu" className="hover:text-black/80">Menu</a>
          <a href="#how" className="hover:text-black/80">How it works</a>
          <a href="#areas" className="hover:text-black/80">Delivery areas</a>
          <a href="#about" className="hover:text-black/80">About</a>
          <a href="#contact" className="hover:text-black/80">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+918287306197" className="hidden sm:flex items-center gap-2 text-sm px-3 py-2 rounded-xl border hover:bg-gray-50">
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
          <Button asChild className="rounded-xl">
            <a href={`https://wa.me/918287306197?text=${waText}`} target="_blank" rel="noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" /> Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="mb-4 w-fit" variant="secondary">Made Fresh • Delivered Fast</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Lucknow’s Friendly <span className="text-orange-600">Cloud Kitchen</span></h1>
          <p className="mt-4 text-lg text-black/70">Wholesome vegetarian bowls, wraps, and North Indian favorites—crafted in a certified kitchen and delivered hot across the city.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <a href="#menu"><ShoppingBag className="w-4 h-4 mr-2" /> Browse Menu</a>
            </Button>
            <Button asChild variant="secondary" className="rounded-xl">
              <a href="#how"><Bike className="w-4 h-4 mr-2" /> How it works</a>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-black/60">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Daily 08:00–20:00 (IST)</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8/5 from 1,200+ orders</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="relative aspect-square rounded-3xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#fecaca_0%,transparent_40%),radial-gradient(circle_at_30%_70%,#fed7aa_0%,transparent_35%)]" />
            <div className="absolute inset-4 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center">
              <div className="text-center p-6">
                <UtensilsCrossed className="w-12 h-12 mx-auto" />
                <p className="mt-3 text-black/70">Add your hero image or food collage here.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Menu Highlights</h2>
            <p className="text-black/60">Chef-curated bestsellers. Full menu available on request.</p>
          </div>
          <Button asChild variant="secondary" className="rounded-xl">
            <a href={"https://wa.me/918287306197?text=" + encodeURIComponent("Please share the full menu")} target="_blank" rel="noreferrer">Get Full Menu</a>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU.map((item, idx) => (
            <Card key={idx} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-orange-600 font-semibold">₹ {item.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="aspect-video w-full object-cover rounded-xl border" />
                ) : (
                  <div className="aspect-video rounded-xl bg-orange-50 flex items-center justify-center text-black/40 text-sm">Add dish photo here</div>
                )}
                <p className="text-sm text-black/70">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <Button asChild size="sm" className="rounded-xl">
                    <a href={`https://wa.me/918287306197?text=${encodeURIComponent("I'd like to order " + item.name + " (₹ " + item.price + ").")}`} target="_blank" rel="noreferrer">
                      <ShoppingBag className="w-4 h-4 mr-2" /> Order
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="rounded-xl">
                    <a href="#contact">Customize</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Pick your meal", desc: "Choose bowls, wraps, or combos.", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { title: "Place your order", desc: "WhatsApp, phone, or website form.", icon: <MessageCircle className="w-5 h-5" /> },
    { title: "We cook fresh", desc: "Prepared in a certified kitchen.", icon: <Clock className="w-5 h-5" /> },
    { title: "Doorstep delivery", desc: "Fast riders across Lucknow.", icon: <Bike className="w-5 h-5" /> },
  ];
  return (
    <section id="how" className="py-16 bg-orange-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">{s.icon} {s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/70">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section id="areas" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Delivery Areas</h2>
            <p className="text-black/60">We currently deliver across Lucknow. Pickup available on request.</p>
          </div>
          <a href="#contact" className="text-sm inline-flex items-center gap-1 hover:underline">Need catering? <ChevronRight className="w-4 h-4" /></a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DELIVERY_ZONES.map((z) => (
            <div key={z} className="flex items-center gap-2 p-3 rounded-xl border">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{z}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Catering() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", headcount: "", notes: "" });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const send = () => {
    if(!form.name || !form.phone || !form.date || !form.headcount){
      alert("Please fill name, phone, date, and headcount."); return;
    }
    const msg = `Catering enquiry:%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0ADate: ${encodeURIComponent(form.date)}%0AHeadcount: ${encodeURIComponent(form.headcount)}%0ANotes: ${encodeURIComponent(form.notes||'')}`;
    window.open(`https://wa.me/918287306197?text=${msg}`, "_blank");
    setSent(true);
  };
  return (
    <section id="catering" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Catering & Events</h2>
            <p className="text-black/60">Office lunch, family functions, or special events—prebook and we’ll handle the rest.</p>
          </div>
          <a href="#contact" className="text-sm inline-flex items-center gap-1 hover:underline">Talk to us</a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-4 bg-white">
            <div className="grid grid-cols-1 gap-3">
              <input className="h-10 px-3 rounded-lg border" name="name" placeholder="Your name" value={form.name} onChange={handle} />
              <input className="h-10 px-3 rounded-lg border" name="phone" placeholder="Phone" value={form.phone} onChange={handle} />
              <input className="h-10 px-3 rounded-lg border" name="date" placeholder="Event date (e.g., 2025-11-20)" value={form.date} onChange={handle} />
              <input className="h-10 px-3 rounded-lg border" name="headcount" placeholder="Headcount (e.g., 50)" value={form.headcount} onChange={handle} />
              <textarea className="px-3 py-2 rounded-lg border" name="notes" placeholder="Cuisine preferences, delivery time, special requests" rows={4} value={form.notes} onChange={handle}></textarea>
              <div className="flex gap-3">
                <button className="h-10 px-4 rounded-xl bg-black text-white" onClick={send}>Send on WhatsApp</button>
                <a className="h-10 px-4 rounded-xl bg-gray-100 flex items-center" href={`mailto:vikaspandey092015@gmail.com?subject=${encodeURIComponent('Catering Enquiry')}&body=${encodeURIComponent('Name: '+form.name+'\\nPhone: '+form.phone+'\\nDate: '+form.date+'\\nHeadcount: '+form.headcount+'\\nNotes: '+(form.notes||''))}`}>Also Email</a>
              </div>
              {sent && <p className="text-sm text-green-600">Thanks! We’ll reply shortly.</p>}
            </div>
          </div>
          <div className="rounded-2xl border p-4 text-sm text-black/70">
            <p className="mb-2"><strong>Popular trays:</strong> Paneer Butter Masala, Veg Biryani, Aloo Paratha, Chole, Gulab Jamun.</p>
            <p className="mb-2">Minimum 24 hours’ notice for 30+ guests. Warmers & serving bowls available on request.</p>
            <p className="mb-2">Delivery across: Gomti Nagar, Indira Nagar, Hazratganj, Aliganj, Charbagh, Ashiyana, Alambagh.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="py-16 bg-orange-50/40">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-black/70">We’re a delivery-first kitchen focused on fresh ingredients, bold flavors, and reliable service. From corporate lunches to evening cravings, we’ve got your back—sustainably packaged and quality assured.</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-black/70">
            <li className="flex items-center gap-2"><Badge variant="outline">Veg</Badge> 100% Vegetarian</li>
            <li className="flex items-center gap-2"><Badge variant="outline">Hygiene</Badge> HACCP-minded</li>
            <li className="flex items-center gap-2"><Badge variant="outline">Eco</Badge> Recyclable packaging</li>
            <li className="flex items-center gap-2"><Badge variant="outline">Fast</Badge> 30–45 min average</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[4/5] rounded-2xl bg-white border" />
          <div className="aspect-[4/5] rounded-2xl bg-white border mt-8" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Loved by foodies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="w-5 h-5" /> {t.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black/70">“{t.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", items: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const sendOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.items) {
      alert("Please fill all fields before sending your order.");
      return;
    }
    const msg = `New order request:%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AAddress: ${encodeURIComponent(form.address)}%0AItems: ${encodeURIComponent(form.items)}%0A%0ASource: Website`;
    const url = `https://wa.me/918287306197?text=${msg}`;
    window.open(url, "_blank");
    setSent(true);
  };
  return (
    <section id="contact" className="py-16 bg-orange-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Contact & Orders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Place an Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
              <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
              <Textarea name="address" value={form.address} onChange={handleChange} placeholder="Delivery address" rows={3} />
              <Textarea name="items" value={form.items} onChange={handleChange} placeholder="Items (e.g., Paneer Butter Masala x1, Veg Biryani x2)" rows={5} />
              <div className="flex gap-3">
                <Button className="rounded-xl" onClick={sendOrder}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Send to WhatsApp
                </Button>
                <Button asChild variant="secondary" className="rounded-xl">
                  <a href={`mailto:vikaspandey092015@gmail.com?subject=${encodeURIComponent("New Order from Website")}&body=${encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nItems: ${form.items}`)}`}>Also Email</a>
                </Button>
              </div>
              {sent && <p className="text-sm text-green-600">Thanks! We’ll confirm shortly on WhatsApp.</p>}
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card className="rounded-2xl">
              <CardContent className="p-4 text-sm text-black/70 flex flex-col gap-2">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 82873 06197</div>
                <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp: <a className="underline" href="https://wa.me/918287306197" target="_blank" rel="noreferrer">Chat now</a></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Kitchen: Ashraf Vihar Colony, Malhaur, Lucknow 226028</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email: <a className="underline" href="mailto:vikaspandey092015@gmail.com">vikaspandey092015@gmail.com</a></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Hours: Daily 08:00–20:00 (IST)</div>
              </CardContent>
            </Card>
            <div className="aspect-video w-full rounded-2xl border overflow-hidden">
              <iframe
                title="Monika's Rasoi Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent("Ashraf Vihar Colony, Malhaur, Lucknow 226028")}&output=embed`}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex gap-3">
              <Button asChild variant="secondary" className="rounded-xl"><a href="#"> <Facebook className="w-4 h-4 mr-2" /> Facebook</a></Button>
              <Button asChild variant="secondary" className="rounded-xl"><a href="#"> <Instagram className="w-4 h-4 mr-2" /> Instagram</a></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-black/60">© {new Date().getFullYear()} Monika's Rasoi — All rights reserved.</p>
        <div className="text-sm text-black/60 flex items-center gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Allergens</a>
        </div>
        <div className="flex flex-col items-center mt-6">
          <img src="/qr-monikasrasoi.png" alt="Scan to Order" className="w-28 h-28 rounded-xl border" />
          <p className="text-xs text-black/60 mt-2">Scan to visit Monika’s Rasoi online</p>
        </div>
      </div>
    </footer>
  );
}

export default function CloudKitchenWebsite() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <MenuSection />
      <HowItWorks />
      <Testimonials />
      <Areas />
      <Catering />
      <About />
      
        <section id="cart" className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-black/60 text-sm">No items yet. Add dishes from the menu.</p>
            ) : (
              <div className="border rounded-2xl p-4 bg-white">
                <div className="space-y-2 text-sm">
                  {cartItems.map(i => (
                    <div key={i.name} className="flex items-center justify-between">
                      <span>{i.name} × {i.qty}</span>
                      <span>₹ {i.price * i.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 font-semibold">
                  <span>Total</span><span>₹ {total}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button className="rounded-xl" onClick={payNow}>Pay via Razorpay</Button>
                  <Button variant="secondary" className="rounded-xl" onClick={clearCart}>Clear</Button>
                </div>
              </div>
            )}
          </div>
        </section>

      <Contact />
      <Footer />
      <a
        href={`https://wa.me/918287306197?text=${encodeURIComponent("Hi! I want to order from Monika's Rasoi")}`}
        className="fixed bottom-6 right-6 shadow-lg"
        target="_blank"
        rel="noreferrer"
      >
        <Button size="lg" className="rounded-2xl h-14 px-6">
          <MessageCircle className="w-5 h-5 mr-2" /> Order on WhatsApp
        </Button>
      </a>
    </div>
  );
}
