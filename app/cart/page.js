'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../../lib/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

function getImg(category) {
  if (category === 'Honey') return '/honey.png';
  if (category === 'Oil')   return '/coconut-oil.png';
  return '/pepper.png';
}
function getBg(category) {
  if (category === 'Honey') return 'radial-gradient(#ffe082,#f9a825)';
  if (category === 'Oil')   return 'radial-gradient(#c8e6c9,#a5d6a7)';
  return 'radial-gradient(#d7ccc8,#bcaaa4)';
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [removing, setRemoving] = useState(null);
  const delivery = 50;
  const grandTotal = totalPrice + delivery;

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  function handleRemove(id) {
    setRemoving(id);
    setTimeout(() => { removeFromCart(id); setRemoving(null); }, 350);
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg, #fdf5e4 0%, #fffbf0 100%)', opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(20px)', transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#1a0f0a,#4a3728)', padding:'52px 24px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:280, height:280, borderRadius:'50%', background:'rgba(245,200,66,0.05)', border:'1px solid rgba(245,200,66,0.1)' }} />
        <h1 style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(2rem,4vw,2.8rem)', color:'white', marginBottom:10 }}>Your Cart</h1>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'1rem' }}>{cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length>1?'s':''} in your cart`}</p>
      </div>

      <div style={{ maxWidth:1100, margin:'-32px auto 0', padding:'0 24px 80px' }}>

        {cart.length === 0 ? (
          <div style={{ background:'white', borderRadius:24, padding:'80px 40px', textAlign:'center', boxShadow:'0 8px 40px rgba(74,55,40,0.1)', animation:'slideUp 0.5s both' }}>
            <ShoppingBag size={72} color="#d4b896" style={{ marginBottom:20 }} />
            <h2 style={{ fontFamily:'var(--font-playfair)', color:'#4a3728', marginBottom:12 }}>Nothing here yet!</h2>
            <p style={{ color:'#aaa', marginBottom:32 }}>Explore our farm fresh products and add them to your cart.</p>
            <Link href="/products"><button className="btn-primary" style={{ fontSize:'1rem', display:'inline-flex', alignItems:'center', gap:8 }}>Shop Now <ArrowRight size={16} /></button></Link>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:28, alignItems:'start' }}>

            {/* Items */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {cart.map((item, idx) => (
                <div key={item.id} style={{
                  background:'white', borderRadius:20, padding:'20px', display:'flex', gap:18, alignItems:'center',
                  boxShadow:'0 4px 20px rgba(74,55,40,0.08)',
                  opacity: removing === item.id ? 0 : 1,
                  transform: removing === item.id ? 'translateX(60px) scale(0.95)' : 'translateX(0) scale(1)',
                  transition:'all 0.35s cubic-bezier(0.34,1.2,0.64,1)',
                  animation:`slideUp 0.4s ${idx*0.08}s both`
                }}>
                  {/* Thumbnail */}
                  <div style={{ width:80, height:80, borderRadius:14, flexShrink:0, background:getBg(item.category), display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    <img src={getImg(item.category)} style={{ width:'80%', height:'80%', objectFit:'contain', filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.18))' }} />
                  </div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:'var(--font-playfair)', fontWeight:700, fontSize:'1rem', color:'#1a0f0a', marginBottom:4 }}>{item.name}</p>
                    <p style={{ fontSize:12, color:'#aaa', marginBottom:8 }}>{item.category}</p>
                    <p style={{ fontSize:'1.2rem', fontWeight:700, color:'#d4870a', fontFamily:'var(--font-dm)' }}>₹{item.price}</p>
                  </div>

                  {/* Qty controls */}
                  <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fdf5e4', borderRadius:50, padding:'8px 14px' }}>
                    <button onClick={() => updateQty(item.id, item.qty-1)} style={{ width:28, height:28, borderRadius:'50%', border:'1.5px solid #ead8b8', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', color:'#4a3728' }}
                      onMouseEnter={e => { e.currentTarget.style.background='#4a3728'; e.currentTarget.style.color='#f5c842'; }}
                      onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.color='#4a3728'; }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight:800, fontSize:16, minWidth:22, textAlign:'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty+1)} style={{ width:28, height:28, borderRadius:'50%', border:'1.5px solid #ead8b8', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', color:'#4a3728' }}
                      onMouseEnter={e => { e.currentTarget.style.background='#4a3728'; e.currentTarget.style.color='#f5c842'; }}
                      onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.color='#4a3728'; }}>
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Line total */}
                  <div style={{ textAlign:'right', minWidth:70 }}>
                    <p style={{ fontSize:11, color:'#bbb', marginBottom:2 }}>Total</p>
                    <p style={{ fontWeight:800, fontSize:'1.1rem', color:'#1a0f0a', fontFamily:'var(--font-dm)' }}>₹{(item.price * item.qty).toFixed(0)}</p>
                  </div>

                  <button onClick={() => handleRemove(item.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'#e63946', padding:6, borderRadius:'50%', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#fde8e8'; e.currentTarget.style.transform='scale(1.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.transform='scale(1)'; }}>
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}

              <button onClick={clearCart} style={{ alignSelf:'flex-end', background:'none', border:'none', color:'#bbb', fontSize:13, cursor:'pointer', textDecoration:'underline', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='#e63946'}
                onMouseLeave={e => e.target.style.color='#bbb'}>
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div style={{ background:'white', borderRadius:24, overflow:'hidden', boxShadow:'0 8px 40px rgba(74,55,40,0.1)', position:'sticky', top:90, animation:'slideUp 0.5s 0.2s both' }}>
              <div style={{ background:'linear-gradient(135deg,#1a0f0a,#4a3728)', padding:'24px 24px 20px' }}>
                <h3 style={{ fontFamily:'var(--font-playfair)', color:'#f5c842', fontSize:'1.2rem' }}>Order Summary</h3>
              </div>
              <div style={{ padding:'24px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', color:'#888', fontSize:14, marginBottom:12 }}>
                  <span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span>
                  <span style={{ fontWeight:600, color:'#4a3728' }}>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', color:'#888', fontSize:14, marginBottom:20, paddingBottom:20, borderBottom:'2px dashed #f0e8dc', alignItems:'center' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:6 }}><Tag size={13} /> Delivery</span>
                  <span style={{ fontWeight:600, color:'#d4870a' }}>₹{delivery}.00</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'1.25rem', color:'#1a0f0a', marginBottom:24 }}>
                  <span>Grand Total</span>
                  <span style={{ color:'#d4870a', fontFamily:'var(--font-dm)' }}>₹{grandTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" style={{ display:'block' }}>
                  <button className="btn-primary pulse" style={{ width:'100%', fontSize:'1rem', padding:'14px', borderRadius:50, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/products" style={{ display:'block', textAlign:'center', color:'#aaa', fontSize:13, marginTop:14, textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='#4a3728'}
                  onMouseLeave={e => e.target.style.color='#aaa'}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@media(max-width:768px){.cart-layout{grid-template-columns:1fr!important}.cart-summary{position:static!important}}`}</style>
    </div>
  );
}