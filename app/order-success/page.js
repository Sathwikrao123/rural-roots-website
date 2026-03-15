'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Home, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'Customer';
  const total = params.get('total') || '0';
  const invoice = params.get('invoice') || 'RR-000000';
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#fdf5e4,#fffbf0)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'all 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ maxWidth:560, width:'100%' }}>

        {/* Success icon */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:96, height:96, borderRadius:'50%', background:'linear-gradient(135deg,#f5c842,#d4870a)', display:'inline-flex', alignItems:'center', justifyContent:'center', boxShadow:'0 16px 48px rgba(212,135,10,0.35)', animation:'bounceIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both', marginBottom:20 }}>
            <CheckCircle size={48} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(2rem,5vw,2.8rem)', color:'#1a0f0a', marginBottom:10, animation:'slideUp 0.5s 0.3s both' }}>
            Order Placed! 🎉
          </h1>
          <p style={{ color:'#888', fontSize:'1.05rem', animation:'slideUp 0.5s 0.45s both' }}>
            Thank you, <strong style={{ color:'#4a3728' }}>{name}</strong>! Your order is confirmed.
          </p>
        </div>

        {/* Invoice card */}
        <div style={{ background:'white', borderRadius:24, overflow:'hidden', boxShadow:'0 12px 48px rgba(74,55,40,0.12)', marginBottom:24, animation:'slideUp 0.5s 0.55s both' }}>
          <div style={{ background:'linear-gradient(135deg,#1a0f0a,#4a3728)', padding:'20px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:'var(--font-playfair)', color:'#f5c842', fontSize:'1.05rem' }}>Order Details</span>
            <span style={{ background:'rgba(245,200,66,0.15)', color:'#f5c842', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>{invoice}</span>
          </div>
          <div style={{ padding:'24px 28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14 }}>
              <span style={{ color:'#888' }}>Invoice No.</span>
              <span style={{ fontWeight:700, color:'#4a3728' }}>{invoice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14 }}>
              <span style={{ color:'#888' }}>Payment</span>
              <span style={{ fontWeight:700, color:'#22c55e' }}>Cash on Delivery</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'1.2rem', fontWeight:800, borderTop:'2px dashed #f0e8dc', paddingTop:16, marginTop:4 }}>
              <span style={{ color:'#1a0f0a' }}>Total Amount</span>
              <span style={{ color:'#d4870a', fontFamily:'var(--font-dm)' }}>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Order progress */}
        <div style={{ background:'white', borderRadius:24, padding:'24px 28px', boxShadow:'0 8px 32px rgba(74,55,40,0.08)', marginBottom:24, animation:'slideUp 0.5s 0.7s both' }}>
          <h3 style={{ fontFamily:'var(--font-playfair)', color:'#1a0f0a', marginBottom:20, fontSize:'1rem' }}>Order Progress</h3>
          <div style={{ display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,#f5c842,#d4870a)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <CheckCircle size={22} color="white" />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:15, color:'#1a0f0a', marginBottom:2 }}>Order Confirmed</p>
              <p style={{ fontSize:13, color:'#aaa' }}>We received your order and will contact you soon!</p>
            </div>
            <div style={{ background:'#dcfce7', color:'#16a34a', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700, flexShrink:0 }}>✓ Done</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, animation:'slideUp 0.5s 0.85s both' }}>
          <Link href="/" style={{ textDecoration:'none' }}>
            <button style={{ width:'100%', padding:'14px', borderRadius:50, border:'2px solid #ead8b8', background:'white', color:'#4a3728', fontWeight:600, cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#fdf5e4'; e.currentTarget.style.borderColor='#d4870a'; }}
              onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#ead8b8'; }}>
              <Home size={16} /> Back to Home
            </button>
          </Link>
          <Link href="/products" style={{ textDecoration:'none' }}>
            <button className="btn-primary" style={{ width:'100%', padding:'14px', borderRadius:50, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              Shop More <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        <style>{`
          @keyframes bounceIn { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.15) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
          @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>Loading...</div>}><SuccessContent /></Suspense>;
}