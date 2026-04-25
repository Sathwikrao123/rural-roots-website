'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import { ArrowRight, Leaf, ShieldCheck, Truck, Users } from 'lucide-react';
import toast from 'react-hot-toast';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr,.sr-l,.sr-r');
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('in'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const IMGS = { Honey: '/honey.png', Oil: '/coconut-oil.png', Spices: '/pepper.png' };
function getBg(cat) {
  if (cat === 'Honey')  return 'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)';
  if (cat === 'Oil')    return 'linear-gradient(145deg,#f1f8e9,#dcedc8 60%,#aed581)';
  return 'linear-gradient(145deg,#efebe9,#d7ccc8 60%,#bcaaa4)';
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  useReveal();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const MARQUEE = ['🍯 Wild Forest Honey','🫙 Cold Pressed Coconut Oil','🌶 Black Pepper','🌿 100% Natural','🚜 Farm Direct','📦 Cash on Delivery','🇮🇳 Made in Karnataka'];

  const features = [
    { emoji:'🌿', t:'100% Natural',    d:'No pesticides, no additives. Pure goodness from the Western Ghats.' },
    { emoji:'✅', t:'Quality Assured', d:'Every batch hand-checked before it leaves our farm.' },
    { emoji:'🚚', t:'On-Time Delivery',d:'Packed fresh and delivered to your doorstep, every time.' },
    { emoji:'🧑‍🌾', t:'Farm Direct',    d:'Straight from our farmers — honest prices, no middlemen.' },
  ];

  const products = [
    { emoji:'🍯', name:'Pure Honey',   desc:'Pure honey', price:'from ₹299', bg:'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)', img:'/honey.png' },
    { emoji:'🫙', name:'Coconut Oil',  desc:'Cold pressed  coconut oil',    price:'from ₹299', bg:'linear-gradient(145deg,#f1f8e9,#dcedc8 60%,#aed581)', img:'/coconut-oil.png' },
    { emoji:'🌶', name:'Black Pepper', desc:'Sun-dried black pepper',  price:'from ₹599', bg:'linear-gradient(145deg,#efebe9,#d7ccc8 60%,#bcaaa4)', img:'/pepper.png' },
  ];

  return (
    <div style={{ fontFamily:'var(--font-body, Jost, sans-serif)', overflowX:'hidden' }}>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', background:'#0e0905', overflow:'hidden', paddingTop:64 }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(150deg,#0e0905 0%,#1e0d06 20%,#3a1a08 50%,#6b3818 75%,#7a4520 100%)', transform:`translateY(${scrollY*.2}px)` }} />
        <div style={{ position:'absolute', top:'10%', right:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(184,131,42,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', left:'5%', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(44,74,40,.25) 0%,transparent 65%)', pointerEvents:'none' }} />

        {[...Array(6)].map((_,i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', width:4+(i%3)*3, height:4+(i%3)*3, background:i%2===0?'rgba(184,131,42,.5)':'rgba(255,255,255,.12)', left:`${10+i*15}%`, top:`${20+(i*19)%60}%`, animation:`gfloat ${5+i*.9}s ${i*.5}s ease-in-out infinite` }} />
        ))}

        <div className="hero-grid" style={{ position:'relative', zIndex:2, width:'100%', maxWidth:1200, margin:'0 auto', padding:'60px 24px 60px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>

          {/* Left */}
          <div style={{ opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(28px)', transition:'all .9s ease' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(184,131,42,.15)', border:'1px solid rgba(184,131,42,.3)', borderRadius:30, padding:'7px 16px', marginBottom:24 }}>
              <Leaf size={12} color="#b8832a" />
              <span style={{ fontSize:11, letterSpacing:'.14em', color:'#b8832a', textTransform:'uppercase', fontWeight:500 }}>From Farm to Your Door</span>
            </div>

            <h1 className="hero-h1" style={{ fontFamily:'var(--font-head, Playfair Display, serif)', fontSize:'clamp(2.4rem,5vw,4.2rem)', fontWeight:400, color:'white', lineHeight:1.1, marginBottom:20 }}>
              <span style={{ display:'block', fontStyle:'italic', color:'#b8832a' }}>Pure & Natural</span>
              <span style={{ display:'block' }}>Farm Products</span>
              <span style={{ display:'block', fontSize:'55%', color:'rgba(255,255,255,.5)', fontStyle:'normal', marginTop:4 }}>from Rural Karnataka</span>
            </h1>

            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'rgba(255,255,255,.62)', lineHeight:1.85, maxWidth:420, marginBottom:32 }}>
              Pure honey, cold-pressed coconut oil and black pepper — sourced directly from village. <strong style={{ color:'rgba(255,255,255,.9)', fontWeight:500 }}>No middlemen. No chemicals.</strong>
            </p>

            <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
              <Link href="/products" style={{ textDecoration:'none' }}>
                <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#b8832a', color:'white', padding:'14px 28px', border:'none', borderRadius:6, fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', transition:'all .3s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#d4961e'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(184,131,42,.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#b8832a'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                  Shop Now <ArrowRight size={14}/>
                </button>
              </Link>
              <Link href="#about" style={{ textDecoration:'none' }}>
                <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:'rgba(255,255,255,.7)', padding:'13px 22px', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', transition:'all .3s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.5)'; e.currentTarget.style.color='white'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; e.currentTarget.style.color='rgba(255,255,255,.7)'; }}>
                  Our Story
                </button>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="hero-chips" style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {[['🍯','Wild Honey','from ₹299'],['🫙','Coconut Oil','from ₹299'],['🌶','Black Pepper','from ₹599']].map(([e,n,p]) => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.09)', borderRadius:8, padding:'8px 14px', transition:'all .25s' }}
                  onMouseEnter={e2 => { e2.currentTarget.style.background='rgba(184,131,42,.12)'; e2.currentTarget.style.borderColor='rgba(184,131,42,.3)'; }}
                  onMouseLeave={e2 => { e2.currentTarget.style.background='rgba(255,255,255,.06)'; e2.currentTarget.style.borderColor='rgba(255,255,255,.09)'; }}>
                  <span style={{ fontSize:18 }}>{e}</span>
                  <div>
                    <p style={{ fontSize:11, fontWeight:500, color:'rgba(255,255,255,.8)', marginBottom:1 }}>{n}</p>
                    <p style={{ fontSize:10, color:'#b8832a', fontWeight:500 }}>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hidden on mobile via CSS */}
          <div className="hero-right" style={{ display:'flex', justifyContent:'center', alignItems:'center', opacity:loaded?1:0, transition:'opacity 1s .4s ease' }}>
            <div style={{ position:'relative', width:280 }}>
              <div style={{ position:'absolute', inset:-40, borderRadius:'50%', border:'1px dashed rgba(184,131,42,.2)', animation:'spinSlow 40s linear infinite' }} />
              <div style={{ position:'absolute', inset:-20, borderRadius:'50%', border:'1px dashed rgba(184,131,42,.1)', animation:'spinSlowR 25s linear infinite' }} />
              <div style={{ background:'rgba(255,255,255,.07)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,.12)', borderRadius:16, padding:'24px 20px 20px', textAlign:'center', boxShadow:'0 40px 80px rgba(0,0,0,.5)', animation:'gfloat 6s ease-in-out infinite' }}>
                <div style={{ background:'linear-gradient(145deg,#fff8e1,#ffe082 60%,#ffc107)', borderRadius:10, height:180, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, overflow:'hidden' }}>
                  <img src="/honey.png" alt="Pure Honey" style={{ width:'75%', height:'100%', objectFit:'contain', filter:'drop-shadow(0 16px 32px rgba(0,0,0,.3))' }} />
                </div>
                <p style={{ fontFamily:'var(--font-head)', color:'white', fontSize:'1.1rem', marginBottom:4 }}>Pure Honey</p>
                <p style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>Karnataka</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--font-head)', color:'#b8832a', fontSize:'1.25rem' }}>₹299</span>
                  <span style={{ fontSize:10, color:'rgba(255,255,255,.35)', letterSpacing:'.08em' }}>500g</span>
                </div>
              </div>
              <div style={{ position:'absolute', top:-14, right:-24, background:'linear-gradient(135deg,#b8832a,#d4961e)', color:'white', padding:'8px 14px', borderRadius:8, fontSize:11, fontWeight:600, boxShadow:'0 8px 24px rgba(184,131,42,.4)', animation:'gfloat 4s .5s ease-in-out infinite', whiteSpace:'nowrap' }}>🌿 100% Natural</div>
              <div style={{ position:'absolute', bottom:20, left:-40, background:'white', color:'#4a3424', padding:'8px 14px', borderRadius:8, fontSize:11, fontWeight:600, boxShadow:'0 8px 24px rgba(0,0,0,.18)', animation:'gfloat 5s 1.2s ease-in-out infinite', whiteSpace:'nowrap' }}>⭐ Top Seller</div>
              <div style={{ position:'absolute', bottom:-10, right:-10, background:'rgba(44,74,40,.9)', color:'#a8d5a2', padding:'7px 12px', borderRadius:8, fontSize:10, fontWeight:600, backdropFilter:'blur(8px)', animation:'gfloat 4.5s .9s ease-in-out infinite', whiteSpace:'nowrap' }}>✓ Zero Chemicals</div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:.4, animation:'gfloat 2.5s ease-in-out infinite', zIndex:3 }}>
          <div style={{ width:1, height:36, background:'rgba(255,255,255,.4)' }} />
          <span style={{ fontSize:9, letterSpacing:'.2em', color:'white', textTransform:'uppercase' }}>scroll</span>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top,#0e0905,transparent)', pointerEvents:'none' }} />
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:'#1c1410', borderTop:'1px solid #2e1e14', borderBottom:'1px solid #2e1e14', padding:'11px 0', overflow:'hidden' }}>
        <div className="mq">
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} style={{ whiteSpace:'nowrap', padding:'0 28px', fontSize:11, fontWeight:400, letterSpacing:'.07em', color:'var(--sand,#c8a87c)' }}>
              {t} <span style={{ color:'#3e2a1a', margin:'0 4px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ background:'var(--cream,#faf6f0)', padding:'80px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p className="sr" style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:12 }}>Why Choose Rural Roots</p>
            <h2 className="sr d1" style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)' }}>Our <em>Promise</em> to You</h2>
          </div>
          <div className="features-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {features.map((f,i) => (
              <div key={i} className={`sr d${i+1}`}
                style={{ background:'white', borderRadius:12, padding:'28px 22px', boxShadow:'0 2px 16px rgba(28,20,16,.05)', transition:'all .35s cubic-bezier(.25,1,.5,1)', border:'1px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(28,20,16,.12)'; e.currentTarget.style.borderColor='var(--linen,#f2e8d8)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(28,20,16,.05)'; e.currentTarget.style.borderColor='transparent'; }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{f.emoji}</div>
                <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.1rem', fontWeight:500, color:'var(--ink,#1c1410)', marginBottom:8 }}>{f.t}</h3>
                <p style={{ fontSize:13, color:'var(--clay,#8c6848)', lineHeight:1.7 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ background:'var(--linen,#f2e8d8)', padding:'80px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="products-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:44, flexWrap:'wrap', gap:12 }}>
            <div>
              <p className="sr" style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:12 }}>Farm Fresh</p>
              <h2 className="sr d1" style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)' }}>Our <em>Products</em></h2>
            </div>
            <Link href="/products" className="sr d2" style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none', fontSize:12, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink,#1c1410)', borderBottom:'1px solid var(--sand,#c8a87c)', paddingBottom:3 }}
              onMouseEnter={e => e.currentTarget.style.color='var(--gold,#b8832a)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--ink,#1c1410)'}>
              View All <ArrowRight size={13}/>
            </Link>
          </div>

          <div className="products-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {products.map((p,i) => (
              <Link key={i} href="/products" style={{ textDecoration:'none' }} className={`sr d${i+1}`}>
                <div style={{ background:'white', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 16px rgba(28,20,16,.06)', transition:'all .35s cubic-bezier(.25,1,.5,1)', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(28,20,16,.13)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(28,20,16,.06)'; }}>
                  <div style={{ height:220, background:p.bg, display:'flex', alignItems:'flex-end', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.3)', filter:'blur(32px)' }} />
                    <img src={p.img} style={{ width:'58%', height:'88%', objectFit:'contain', objectPosition:'bottom center', filter:'drop-shadow(0 16px 24px rgba(28,20,16,.2))', position:'relative', zIndex:1, transition:'transform .4s cubic-bezier(.25,1,.5,1)' }}
                      onMouseEnter={e => e.target.style.transform='scale(1.08) translateY(-8px)'}
                      onMouseLeave={e => e.target.style.transform='scale(1) translateY(0)'} />
                  </div>
                  <div style={{ padding:'18px 20px 22px' }}>
                    <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.15rem', fontWeight:500, color:'var(--ink,#1c1410)', marginBottom:5 }}>{p.name}</h3>
                    <p style={{ fontSize:13, color:'var(--clay,#8c6848)', lineHeight:1.6, marginBottom:14 }}>{p.desc}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-head)', fontSize:'1.3rem', color:'var(--gold,#b8832a)', fontWeight:500 }}>{p.price}</span>
                      <span style={{ fontSize:11, fontWeight:500, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink,#1c1410)', display:'flex', alignItems:'center', gap:4 }}>Shop <ArrowRight size={11}/></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA banner */}
          <div className="cta-banner sr" style={{ marginTop:48, background:'var(--ink,#1c1410)', borderRadius:12, padding:'40px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-head)', color:'white', fontSize:'clamp(1.3rem,3vw,1.6rem)', fontWeight:400, fontStyle:'italic', marginBottom:8 }}>Ready to taste the difference?</h3>
              <p style={{ fontSize:13, color:'rgba(242,232,216,.55)', lineHeight:1.7 }}>Free delivery on orders above ₹500 · Cash on delivery available.</p>
            </div>
            <Link href="/products" style={{ textDecoration:'none' }}>
              <button style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#b8832a', color:'white', padding:'13px 26px', border:'none', borderRadius:6, fontSize:11, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'inherit', whiteSpace:'nowrap', transition:'all .3s', cursor:'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background='#d4961e'; e.currentTarget.style.transform='scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#b8832a'; e.currentTarget.style.transform='scale(1)'; }}>
                Browse All Products <ArrowRight size={13}/>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:'var(--ink,#1c1410)', padding:'60px 24px' }}>
        <div className="stats-grid" style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[['3','Farm Products'],['100%','Natural & Pure'],['Zero','Middlemen'],['100%','Farm Direct']].map(([v,l],i) => (
            <div key={i} className={`sr d${i+1} stats-item`} style={{ textAlign:'center', padding:'0 20px', borderRight:i<3?'1px solid rgba(255,255,255,.08)':'none' }}>
              <p style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, color:'var(--gold,#b8832a)', lineHeight:1, marginBottom:8 }}>{v}</p>
              <p style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(200,168,124,.45)' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background:'var(--cream,#faf6f0)', padding:'80px 24px' }}>
        <div className="about-grid" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div className="sr-l">
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:14 }}>Our Story</p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:400, color:'var(--ink,#1c1410)', lineHeight:1.15, marginBottom:18 }}>
              Rooted in the farms<br /><em>of Karnataka</em>
            </h2>
            <div style={{ width:40, height:2, background:'var(--gold,#b8832a)', marginBottom:20 }} />
            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'var(--clay,#8c6848)', lineHeight:1.85, marginBottom:14 }}>
              Rural Roots was born from a simple belief — the best products come directly from nature. We work hand-in-hand with local farmers in the Western Ghats.
            </p>
            <p style={{ fontSize:'clamp(0.9rem,2.5vw,1rem)', color:'var(--clay,#8c6848)', lineHeight:1.85, marginBottom:32 }}>
              Every bottle of honey, every drop of coconut oil, every grain of black pepper is carefully sourced and delivered fresh to your doorstep.
            </p>
            <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
              {[['🌲','Western Ghats'],['🧑‍🌾','Local Farmers'],['✅','Zero Chemicals']].map(([e,l]) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>{e}</div>
                  <p style={{ fontSize:10, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--earth,#4a3424)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sr-r about-mosaic" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { bg:'linear-gradient(145deg,#fff3c4,#ffd54f)', img:'/honey.png',       label:'Honey' },
              { bg:'linear-gradient(145deg,#dcedc8,#aed581)', img:'/coconut-oil.png', label:'Coconut Oil' },
              { bg:'linear-gradient(145deg,#d7ccc8,#a1887f)', img:'/pepper.png',       label:'Black Pepper' },
              { bg:'var(--ink,#1c1410)',                       isText:true,            label:'More Soon' },
            ].map((item,i) => (
              <div key={i} style={{ background:item.bg, borderRadius:10, height:150, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:14, overflow:'hidden', transition:'transform .4s cubic-bezier(.25,1,.5,1)', boxShadow:'0 4px 16px rgba(28,20,16,.1)' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05) translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1) translateY(0)'}>
                {item.img && <img src={item.img} style={{ width:62, height:72, objectFit:'contain', filter:'drop-shadow(0 6px 12px rgba(0,0,0,.2))' }} />}
                {item.isText && <span style={{ fontSize:26, marginBottom:8 }}>🌱</span>}
                <span style={{ marginTop:8, fontSize:9, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:item.isText?'var(--gold,#b8832a)':'var(--earth,#4a3424)', background:item.isText?'transparent':'rgba(255,255,255,.4)', backdropFilter:'blur(6px)', padding:'3px 10px', borderRadius:20 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background:'var(--ink,#1c1410)', padding:'80px 24px' }}>
        <div className="contact-grid" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 2fr', gap:60, alignItems:'center' }}>
          <div className="sr-l">
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:14 }}>Get in Touch</p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:400, color:'white', lineHeight:1.15 }}>
              We'd love<br /><em style={{ color:'var(--gold,#b8832a)' }}>to hear from you</em>
            </h2>
          </div>
          <div className="sr-r contact-cards" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { emoji:'📞', label:'Phone',   value:'+91 91875 43765',              href:'tel:+919187543765' },
              { emoji:'✉️', label:'Email',   value:'officialruralroots@gmail.com', href:'mailto:officialruralroots@gmail.com' },
              { emoji:'📍', label:'Address', value:'Hathyadka Village, Belthangady, D.K.', href:'#' },
            ].map((c,i) => (
              <a key={i} href={c.href} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'24px 18px', textDecoration:'none', display:'block', transition:'all .3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(184,131,42,.1)'; e.currentTarget.style.borderColor='rgba(184,131,42,.3)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{ fontSize:26, marginBottom:14 }}>{c.emoji}</div>
                <p style={{ fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--gold,#b8832a)', marginBottom:8 }}>{c.label}</p>
                <p style={{ fontSize:13, color:'rgba(242,232,216,.6)', lineHeight:1.65 }}>{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#080604', borderTop:'1px solid #1c1410', padding:'28px 24px' }}>
        <div className="footer-inner" style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
          <div>
            <p style={{ fontFamily:'var(--font-head)', fontSize:'1.05rem', color:'var(--linen,#f2e8d8)', letterSpacing:'.05em', marginBottom:3 }}>Rural Roots</p>
            <p style={{ fontSize:10, color:'rgba(200,168,124,.35)', letterSpacing:'.12em', textTransform:'uppercase' }}>Karnataka</p>
          </div>
          <div className="footer-links" style={{ display:'flex', gap:24 }}>
            {[['/','/products','/#about','/#contact'],['Home','Products','About','Contact']].reduce((acc,_,i,arr) => i===0 ? arr[0].map((href,j) => (
              <Link key={href} href={href} style={{ fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(200,168,124,.35)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='var(--gold,#b8832a)'}
                onMouseLeave={e => e.target.style.color='rgba(200,168,124,.35)'}>
                {arr[1][j]}
              </Link>
            )) : acc, [])}
          </div>
          <p style={{ fontSize:11, color:'rgba(200,168,124,.25)' }}>© 2025 Rural Roots · Made with 🌿 in Karnataka</p>
        </div>
      </footer>

      <style>{`
        @keyframes gfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow  { to{transform:rotate(360deg)} }
        @keyframes spinSlowR { to{transform:rotate(-360deg)} }

        /* Mobile overrides */
        @media(max-width:768px) {
          .hero-grid  { grid-template-columns:1fr !important; padding:40px 20px 52px !important; }
          .hero-right { display:none !important; }
          .hero-h1    { font-size:2.2rem !important; }
          .hero-chips { gap:8px !important; }
          .hero-chips > div { padding:7px 12px !important; }
          .features-grid { grid-template-columns:1fr 1fr !important; gap:12px !important; }
          .products-grid { grid-template-columns:1fr !important; }
          .products-header { flex-direction:column !important; align-items:flex-start !important; }
          .cta-banner { flex-direction:column !important; text-align:center !important; align-items:center !important; padding:28px 20px !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; gap:24px 0 !important; }
          .stats-item { border-right:none !important; padding-bottom:20px !important; border-bottom:1px solid rgba(255,255,255,.08); }
          .about-grid { grid-template-columns:1fr !important; gap:36px !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-cards { grid-template-columns:1fr !important; gap:10px !important; }
          .footer-inner { flex-direction:column !important; text-align:center !important; }
          .footer-links { justify-content:center !important; flex-wrap:wrap !important; gap:16px !important; }
        }
        @media(max-width:480px) {
          .features-grid { grid-template-columns:1fr !important; }
          .hero-chips { flex-direction:column !important; }
          .about-mosaic { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
