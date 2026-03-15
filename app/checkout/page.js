'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useCart } from '../../lib/CartContext';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, MapPin, CheckCircle, Loader, ArrowRight, Edit2 } from 'lucide-react';

function getImg(cat) {
  if (cat === 'Honey') return '/honey.png';
  if (cat === 'Oil')   return '/coconut-oil.png';
  return '/pepper.png';
}
function getBg(cat) {
  if (cat === 'Honey') return 'linear-gradient(135deg,#fff8e1,#ffd54f)';
  if (cat === 'Oil')   return 'linear-gradient(135deg,#f1f8e9,#aed581)';
  return 'linear-gradient(135deg,#efebe9,#a1887f)';
}

function Field({ f, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#8c6848', marginBottom:8 }}>
        {f.label} {f.required && <span style={{ color:'#e53935' }}>*</span>}
      </label>
      <div style={{ position:'relative' }}>
        <div style={{ position:'absolute', left:14, top: f.type==='textarea'?14:'50%', transform: f.type==='textarea'?'none':'translateY(-50%)', color: focused?'#b8832a':'#c8a87c', transition:'color 0.2s', zIndex:1 }}>
          {f.icon}
        </div>
        {f.type === 'textarea' ? (
          <textarea name={f.name} value={value} onChange={onChange} placeholder={f.placeholder} rows={3}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ width:'100%', padding:'12px 14px 12px 42px', border:`1.5px solid ${focused?'#b8832a':'#e8d8c0'}`, borderRadius:8, fontSize:14, outline:'none', background: focused?'#fffdf9':'#faf6f0', transition:'all 0.2s', fontFamily:'inherit', color:'#1c1410', resize:'none' }} />
        ) : (
          <input name={f.name} type={f.type} value={value} onChange={onChange} placeholder={f.placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ width:'100%', padding:'12px 14px 12px 42px', border:`1.5px solid ${focused?'#b8832a':'#e8d8c0'}`, borderRadius:8, fontSize:14, outline:'none', background: focused?'#fffdf9':'#faf6f0', transition:'all 0.2s', fontFamily:'inherit', color:'#1c1410' }} />
        )}
      </div>
    </div>
  );
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm]       = useState({ name:'', phone:'', email:'', address:'' });
  const [loading, setLoading] = useState(false);
  const [step, setStep]       = useState(1);
  const [visible, setVisible] = useState(false);
  const delivery   = 50;
  const grandTotal = totalPrice + delivery;

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);
  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })); }

  async function handleSubmit() {
    if (!form.name || !form.phone || !form.address) { alert('Please fill all required fields'); return; }
    setLoading(true);
    try {
      const { data: cust } = await supabase.from('customers')
        .insert({ name:form.name, phone:form.phone, email:form.email||null, address:form.address })
        .select().single();
      const invoiceNo = 'RR-' + Date.now().toString().slice(-6);
      const { data: order } = await supabase.from('orders')
        .insert({ customer_id:cust.id, total:grandTotal, status:'pending' })
        .select().single();
      await supabase.from('order_items')
        .insert(cart.map(i => ({ order_id:order.id, product_id:i.id, quantity:i.qty, price:i.price })));
      await supabase.from('invoices')
        .insert({ order_id:order.id, invoice_no:invoiceNo, subtotal:totalPrice, cgst:0, sgst:0, grand_total:grandTotal });
      clearCart();
      router.push(`/order-success?name=${encodeURIComponent(form.name)}&total=${grandTotal}&invoice=${invoiceNo}`);
    } catch(e) { alert('Error placing order. Please try again.'); setLoading(false); }
  }

  const fields = [
    { name:'name',    label:'Full Name',       icon:<User size={15}/>,   placeholder:'Your full name',        type:'text',     required:true },
    { name:'phone',   label:'Phone Number',     icon:<Phone size={15}/>,  placeholder:'+91 XXXXX XXXXX',       type:'tel',      required:true },
    { name:'email',   label:'Email (optional)', icon:<Mail size={15}/>,   placeholder:'your@email.com',        type:'email',    required:false },
    { name:'address', label:'Delivery Address', icon:<MapPin size={15}/>, placeholder:'Full delivery address', type:'textarea', required:true },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#f5ede0', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(16px)', transition:'all 0.5s ease', paddingTop:64 }}>

      {/* ── HEADER ── */}
      <div style={{ background:'linear-gradient(135deg,#1c1410 0%,#3a2010 50%,#5c3018 100%)', padding:'52px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%', border:'1px solid rgba(184,131,42,0.12)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-40, left:-40, width:180, height:180, borderRadius:'50%', border:'1px solid rgba(184,131,42,0.08)', pointerEvents:'none' }} />

        <p style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#b8832a', marginBottom:12, fontWeight:500 }}>Secure Checkout</p>
        <h1 style={{ fontFamily:'var(--font-head, Playfair Display, serif)', fontSize:'clamp(2rem,5vw,2.8rem)', color:'white', marginBottom:28, fontWeight:400 }}>
          Complete Your Order
        </h1>

        {/* Progress bar */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:0, background:'rgba(255,255,255,0.06)', borderRadius:50, padding:'6px 6px', border:'1px solid rgba(255,255,255,0.1)' }}>
          {['Your Details', 'Review & Place'].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'8px 18px', borderRadius:50,
                background: step === i+1 ? '#b8832a' : step > i+1 ? 'rgba(184,131,42,0.2)' : 'transparent',
                transition:'all 0.3s'
              }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background: step >= i+1 ? 'white' : 'rgba(255,255,255,0.15)', color: step >= i+1 ? '#b8832a' : 'rgba(255,255,255,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0, transition:'all 0.3s' }}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span style={{ fontSize:12, fontWeight:500, color: step === i+1 ? 'white' : 'rgba(255,255,255,0.45)', letterSpacing:'0.04em', transition:'color 0.3s', whiteSpace:'nowrap' }}>{s}</span>
              </div>
              {i === 0 && <div style={{ width:24, height:1, background:'rgba(255,255,255,0.15)', margin:'0 2px' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:980, margin:'0 auto 0', padding:'32px 20px 80px', display:'grid', gridTemplateColumns:'1fr 340px', gap:20, alignItems:'start' }}>

        {/* ── LEFT — FORM / REVIEW ── */}
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 8px 40px rgba(28,20,16,0.1)' }}>

          {/* Card header */}
          <div style={{ padding:'22px 28px', borderBottom:'1px solid #f5ede0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background: step===1?'#1c1410':'linear-gradient(135deg,#b8832a,#d4961e)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {step === 1 ? <MapPin size={16} color="#b8832a" /> : <CheckCircle size={16} color="white" />}
              </div>
              <div>
                <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.15rem', fontWeight:500, color:'#1c1410' }}>
                  {step === 1 ? 'Delivery Details' : 'Review Your Order'}
                </h2>
                <p style={{ fontSize:11, color:'#8c6848', marginTop:1 }}>
                  {step === 1 ? 'Where should we deliver?' : 'Everything look good?'}
                </p>
              </div>
            </div>
            {step === 2 && (
              <button onClick={() => setStep(1)} style={{ display:'flex', alignItems:'center', gap:6, background:'#f5ede0', border:'none', borderRadius:20, padding:'7px 14px', fontSize:11, fontWeight:600, color:'#4a3424', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='#e8d8c0'}
                onMouseLeave={e => e.currentTarget.style.background='#f5ede0'}>
                <Edit2 size={12}/> Edit
              </button>
            )}
          </div>

          {/* STEP 1 — Form */}
          {step === 1 && (
            <div style={{ padding:'28px' }}>
              {fields.map(f => (
                <Field key={f.name} f={f} value={form[f.name]} onChange={handleChange} />
              ))}

              {/* COD notice */}
              <div style={{ display:'flex', alignItems:'center', gap:14, background:'linear-gradient(135deg,#f5ede0,#fffdf9)', border:'1px solid #e8d8c0', borderRadius:10, padding:'14px 18px', marginTop:8, marginBottom:24 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#22c55e,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:18 }}>💵</span>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:600, color:'#1c1410', fontSize:14, marginBottom:2 }}>Cash on Delivery</p>
                  <p style={{ fontSize:12, color:'#8c6848' }}>Pay in cash when your order arrives</p>
                </div>
                <span style={{ background:'#dcfce7', color:'#16a34a', padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:700, flexShrink:0 }}>ACTIVE</span>
              </div>

              <button
                onClick={() => { if(!form.name||!form.phone||!form.address){alert('Please fill required fields');return;} setStep(2); }}
                style={{ width:'100%', padding:'15px', background:'#1c1410', color:'#f2e8d8', border:'none', borderRadius:10, fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.25s', fontFamily:'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.background='#b8832a'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(184,131,42,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#1c1410'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                Continue to Review <ArrowRight size={15}/>
              </button>
            </div>
          )}

          {/* STEP 2 — Review */}
          {step === 2 && (
            <div style={{ padding:'28px' }}>
              {/* Details summary */}
              <div style={{ background:'#faf6f0', borderRadius:12, padding:'20px 22px', marginBottom:24, border:'1px solid #f0e4d0' }}>
                <p style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#b8832a', marginBottom:16, fontWeight:600 }}>Delivery Information</p>
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'12px 20px' }}>
                  {[
                    ['name',    <User size={14}/>,   'Name',    form.name],
                    ['phone',   <Phone size={14}/>,  'Phone',   form.phone],
                    ['email',   <Mail size={14}/>,   'Email',   form.email||'—'],
                    ['address', <MapPin size={14}/>, 'Address', form.address],
                  ].map(([key, icon, label, value]) => (
                    <div key={key} style={{ display:'contents' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, color:'#b8832a', paddingTop:1 }}>
                        {icon}
                        <span style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#8c6848', whiteSpace:'nowrap' }}>{label}</span>
                      </div>
                      <div style={{ fontSize:14, fontWeight:500, color:'#1c1410', lineHeight:1.5 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div style={{ display:'flex', alignItems:'center', gap:12, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'14px 18px', marginBottom:24 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#22c55e,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:16 }}>💵</span>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:'#15803d' }}>Cash on Delivery</p>
                  <p style={{ fontSize:11, color:'#16a34a' }}>Pay when your order arrives</p>
                </div>
                <span style={{ marginLeft:'auto', background:'#dcfce7', color:'#16a34a', padding:'3px 10px', borderRadius:20, fontSize:10, fontWeight:700 }}>✓ Selected</span>
              </div>

              {/* Place order btn */}
              <button onClick={handleSubmit} disabled={loading}
                style={{ width:'100%', padding:'16px', background: loading?'#8c6848':'linear-gradient(135deg,#b8832a,#d4961e)', color:'white', border:'none', borderRadius:10, fontSize:13, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', cursor: loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontFamily:'inherit', transition:'all 0.25s', boxShadow:'0 4px 20px rgba(184,131,42,0.3)' }}
                onMouseEnter={e => { if(!loading){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(184,131,42,0.45)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(184,131,42,0.3)'; }}>
                {loading
                  ? <><Loader size={16} style={{ animation:'spin 1s linear infinite' }}/> Placing your order...</>
                  : <><CheckCircle size={16}/> Place Order Now</>}
              </button>
              <p style={{ textAlign:'center', fontSize:11, color:'#c4a882', marginTop:14 }}>🔒 Your information is safe and secure</p>
            </div>
          )}
        </div>

        {/* ── RIGHT — ORDER SUMMARY ── */}
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 8px 40px rgba(28,20,16,0.1)', position:'sticky', top:84 }}>
          <div style={{ padding:'20px 22px', borderBottom:'1px solid #f5ede0', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'#1c1410', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:14 }}>🛒</span>
            </div>
            <div>
              <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1rem', fontWeight:500, color:'#1c1410' }}>Order Summary</h3>
              <p style={{ fontSize:11, color:'#8c6848' }}>{cart.length} item{cart.length!==1?'s':''}</p>
            </div>
          </div>

          {/* Items */}
          <div style={{ padding:'16px 22px', maxHeight:280, overflowY:'auto' }}>
            {cart.map((item, i) => (
              <div key={item.id} style={{ display:'flex', gap:12, alignItems:'center', paddingBottom:14, marginBottom:14, borderBottom: i < cart.length-1 ? '1px solid #f5ede0' : 'none' }}>
                <div style={{ width:52, height:52, borderRadius:10, background:getBg(item.category), display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 2px 8px rgba(28,20,16,0.1)' }}>
                  <img src={getImg(item.category)} style={{ width:'80%', height:'80%', objectFit:'contain', filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:'#1c1410', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</p>
                  <p style={{ fontSize:11, color:'#8c6848' }}>Qty: {item.qty}</p>
                </div>
                <p style={{ fontWeight:700, color:'#b8832a', fontSize:14, flexShrink:0 }}>₹{(item.price*item.qty).toFixed(0)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ padding:'16px 22px 22px', borderTop:'1px solid #f5ede0', background:'#faf6f0' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#8c6848', marginBottom:8 }}>
              <span>Subtotal</span><span style={{ fontWeight:500, color:'#4a3424' }}>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#8c6848', marginBottom:14, paddingBottom:14, borderBottom:'1px dashed #e8d8c0' }}>
              <span>🚚 Delivery</span><span style={{ fontWeight:500, color:'#b8832a' }}>₹{delivery}.00</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:'var(--font-head)', fontSize:'1.1rem', fontWeight:500, color:'#1c1410' }}>Total</span>
              <span style={{ fontFamily:'var(--font-head)', fontSize:'1.35rem', fontWeight:600, color:'#b8832a' }}>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:768px){
          div[style*="gridTemplateColumns: '1fr 340px'"] { grid-template-columns:1fr !important; }
          div[style*="position:'sticky'"] { position:static !important; }
        }
      `}</style>
    </div>
  );
}