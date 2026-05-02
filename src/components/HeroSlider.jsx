import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

/* Per-slide durations: Slide1=6s, Slide2=5s, Slide3=5s */
const INTERVALS = [6000, 5000, 5000];

const EMAILJS = {
  serviceId:  'service_18x6p9k',
  templateId: 'template_wl63h0h',
  publicKey:  'bPyF8hWw05p-lCafE',
};

/* ── Unsplash backgrounds ─────────────────────────────── */
const IMG = {
  slide1: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
  slide3: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80',
};

/* ── Bank data — local logos from /public/banks/ ── */
const BANKS = [
  {
    id: 'sbi',    name: 'SBI',           full: 'State Bank of India',
    abbr: 'SBI',  bg: '#1a3a8b', text: '#fff',
    logoUrl: '/banks/sbi.png',
  },
  {
    id: 'lichfl', name: 'LIC HFL',       full: 'LIC Housing Finance',
    abbr: 'LIC',  bg: '#c47f00', text: '#fff',
    logoUrl: '/banks/lic.png',
  },
  {
    id: 'hdfc',   name: 'HDFC Bank',     full: 'HDFC Bank Ltd',
    abbr: 'HDFC', bg: '#004c8f', text: '#fff',
    logoUrl: '/banks/hdfc.png',
  },
  {
    id: 'icici',  name: 'ICICI Bank',    full: 'ICICI Bank Ltd',
    abbr: 'ICICI',bg: '#c8401a', text: '#fff',
    logoUrl: '/banks/icici.png',
  },
  {
    id: 'axis',   name: 'Axis Bank',     full: 'Axis Bank Ltd',
    abbr: 'AXIS', bg: '#8b1a4a', text: '#fff',
    logoUrl: '/banks/axis.png',
  },
  {
    id: 'ib',     name: 'Indian Bank',   full: 'Indian Bank',
    abbr: 'IB',   bg: '#1a4a8b', text: '#fff',
    logoUrl: '/banks/indian.png',
  },
  {
    id: 'canara', name: 'Canara Bank',   full: 'Canara Bank',
    abbr: 'CAN',  bg: '#1a6b3a', text: '#fff',
    logoUrl: '/banks/canara.png',
  },
  {
    id: 'kvb',    name: 'KVB',           full: 'Karur Vysya Bank',
    abbr: 'KVB',  bg: '#9a1428', text: '#fff',
    logoUrl: '/banks/kvb.png',
  },
  {
    id: 'bob',    name: 'Bank of Baroda',full: 'Bank of Baroda',
    abbr: 'BOB',  bg: '#f47920', text: '#fff',
    logoUrl: '/banks/bob.png',
  },
  {
    id: 'boi',    name: 'Bank of India', full: 'Bank of India',
    abbr: 'BOI',  bg: '#003f7f', text: '#fff',
    logoUrl: '/banks/boi.png',
  },
  {
    id: 'pnb',    name: 'PNB Housing',   full: 'PNB Housing Finance',
    abbr: 'PNB',  bg: '#e31e24', text: '#fff',
    logoUrl: '/banks/pnb.png',
  },
  {
    id: 'sib',    name: 'South Indian',  full: 'South Indian Bank',
    abbr: 'SIB',  bg: '#1a3a8b', text: '#fff',
    logoUrl: '/banks/sib.png',
  },
];

/* ── Shared grid texture overlay ─────────────────────── */
function GridOverlay({ opacity = 0.035 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          `linear-gradient(rgba(255,255,255,${opacity}) 1px,transparent 1px),` +
          `linear-gradient(90deg,rgba(255,255,255,${opacity}) 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 1 — Dream Home + Lead Capture Form
══════════════════════════════════════════════════════ */
function HeroLeadForm({ t, language }) {
  const [name,   setName]   = useState('');
  const [mobile, setMobile] = useState('');
  const [err,    setErr]    = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!name.trim())              e.name   = true;
    if (!/^\d{10}$/.test(mobile)) e.mobile = true;
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErr(errs); return; }
    setStatus('loading');
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        user_name:   name,
        user_mobile: mobile,
        user_dob:    'Hero Slider — Quick Lead',
        user_email:  'hero-form@uniloans',
        district:    'Hero Slider Form',
        user_state:  'N/A',
        pincode:     'N/A',
      }, EMAILJS.publicKey);
      setStatus('success');
      setName(''); setMobile('');
    } catch { setStatus('error'); }
  };

  const clrErr = (k) => setErr(p => { const n={...p}; delete n[k]; return n; });

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-white/20 p-8 text-center"
           style={{ background:'rgba(255,255,255,0.11)', backdropFilter:'blur(20px)' }}>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white font-extrabold text-xl mb-2"
            style={{ textShadow:'0 1px 6px rgba(0,0,0,0.4)' }}>
          {language==='en' ? "We'll call you within 30 mins!" : 'நாங்கள் 30 நிமிடத்தில் அழைக்கிறோம்!'}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {language==='en'
            ? 'Our home loan expert is ready to guide you. Keep your phone handy.'
            : 'எங்கள் கடன் நிபுணர் உங்களுக்கு வழிகாட்ட தயாராக உள்ளார்.'}
        </p>
        <button onClick={() => setStatus('idle')}
                className="mt-5 text-gold/80 hover:text-gold text-xs font-semibold underline underline-offset-2 transition-colors">
          {language==='en' ? 'Submit another' : 'மீண்டும் சமர்ப்பிக்கவும்'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate
          className="rounded-2xl border border-white/20 p-4 shadow-2xl"
          style={{ background:'rgba(255,255,255,0.11)', backdropFilter:'blur(22px)' }}>
      <p className="text-white font-bold text-lg leading-snug mb-5"
         style={{ textShadow:'0 1px 6px rgba(0,0,0,0.45)' }}>
        {t.formLabel}
      </p>

      {/* Name */}
      <div className="mb-3">
        <input type="text" value={name}
          onChange={e => { setName(e.target.value); clrErr('name'); }}
          placeholder={t.formNamePlaceholder} autoComplete="name"
          className={`w-full px-4 py-3.5 rounded-xl bg-white text-navy font-semibold text-sm
            placeholder-gray-400 focus:outline-none transition-all duration-200
            ${err.name ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-gold'}`} />
        {err.name && <p className="text-red-300 text-xs mt-1 ml-1">
          {language==='en' ? 'Please enter your name.' : 'பெயரை உள்ளிடவும்.'}
        </p>}
      </div>

      {/* Mobile */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold select-none">+91</span>
          <input type="tel" value={mobile}
            onChange={e => { setMobile(e.target.value.replace(/\D/g,'')); clrErr('mobile'); }}
            placeholder={t.formMobilePlaceholder} maxLength={10} autoComplete="tel"
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-navy font-semibold text-sm
              placeholder-gray-400 focus:outline-none transition-all duration-200
              ${err.mobile ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-gold'}`} />
        </div>
        {err.mobile && <p className="text-red-300 text-xs mt-1 ml-1">
          {language==='en' ? 'Enter a valid 10-digit number.' : 'சரியான 10 இலக்க எண் உள்ளிடவும்.'}
        </p>}
      </div>

      {status==='error' && (
        <p className="text-red-300 text-xs mb-4 flex items-center gap-1.5">
          ⚠️ {language==='en' ? 'Submission failed. Please try again.' : 'சமர்ப்பிக்கத் தவறிவிட்டது.'}
        </p>
      )}

      <button type="submit" disabled={status==='loading'}
        className="w-full py-3 rounded-xl font-extrabold text-navy text-sm transition-all duration-200
          disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98]"
        style={{ background:'linear-gradient(135deg,#D4AF37 0%,#f0d97a 100%)',
                 boxShadow:'0 6px 24px rgba(212,175,55,0.50)' }}>
        {status==='loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            {language==='en' ? 'Submitting…' : 'சமர்ப்பிக்கிறது…'}
          </span>
        ) : t.formCta}
      </button>

      <p className="text-white/45 text-[11px] text-center mt-3">
        🔒 {language==='en' ? '100% secure · No spam, ever.' : '100% பாதுகாப்பு · ஸ்பாம் இல்லை.'}
      </p>
      <p className="text-white/35 text-[10px] text-center mt-1.5">* {t.rateText}</p>
    </form>
  );
}

function Slide1({ data, language, onCalc }) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden"
         style={{ backgroundImage:`url(${IMG.slide1})`, backgroundSize:'cover', backgroundPosition:'center' }}>
      <div className="absolute inset-0"
           style={{ background:'linear-gradient(115deg,rgba(0,13,36,0.95) 0%,rgba(0,23,56,0.91) 55%,rgba(0,33,70,0.87) 100%)' }} />
      <GridOverlay />
      <div className="absolute -top-10 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{ background:'radial-gradient(circle,rgba(212,175,55,0.09) 0%,transparent 68%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: copy */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
              px-4 py-2 rounded-full mb-7 border border-gold/40"
              style={{ background:'rgba(212,175,55,0.16)', color:'#D4AF37' }}>
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              {data.badge}
            </span>

            {/* Slogan — split lines + brand tag */}
            <div className="mb-6">
              <h1 className="font-extrabold text-white leading-tight"
                  style={{ fontSize:'clamp(1.45rem,2.8vw,2.2rem)', textShadow:'0 2px 16px rgba(0,0,0,0.65)' }}>
                {data.titleLine1}
              </h1>
              <h1 className="font-extrabold text-white leading-tight"
                  style={{ fontSize:'clamp(1.45rem,2.8vw,2.2rem)', textShadow:'0 2px 16px rgba(0,0,0,0.65)' }}>
                {data.titleLine2}
              </h1>
              <p className="text-gold font-bold mt-2 text-lg tracking-wide"
                 style={{ textShadow:'0 1px 6px rgba(0,0,0,0.4)' }}>
                {data.brand}
              </p>
            </div>

            <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-lg"
               style={{ textShadow:'0 1px 8px rgba(0,0,0,0.50)' }}>
              {data.subtitle}
            </p>

            {/* Mobile-only secondary CTA */}
            <div className="flex flex-wrap gap-3 mb-10 lg:hidden">
              <button onClick={onCalc} className="btn-secondary text-sm px-6 py-3">{data.ctaSecondary}</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.stats.map(s => (
                <div key={s.label} className="rounded-2xl p-4 border border-white/15 text-center"
                     style={{ background:'rgba(255,255,255,0.09)', backdropFilter:'blur(8px)' }}>
                  <div className="text-xl sm:text-2xl font-extrabold mb-0.5" style={{ color:'#D4AF37' }}>{s.value}</div>
                  <div className="text-white/70 text-[11px] font-bold uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={onCalc}
              className="hidden lg:inline-flex items-center gap-2 mt-8 text-white/55
                hover:text-gold text-sm font-semibold transition-colors duration-200">
              <span className="w-5 h-px bg-current" />
              {data.ctaSecondary} →
            </button>
          </div>

          {/* Right: compact lead form */}
          <div className="lg:pt-6 animate-fade-in-up lg:max-w-md lg:ml-auto" style={{ animationDelay:'0.15s' }}>
            <HeroLeadForm t={data} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 2 — Bank Comparison Grid
══════════════════════════════════════════════════════ */
function BankCard({ bank, onApply }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <button
      onClick={onApply}
      className="group w-full flex flex-col items-center text-center rounded-2xl border border-white/15 p-4
        hover:border-gold/60 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(212,175,55,0.28)]
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
      style={{ background:'rgba(255,255,255,0.09)', backdropFilter:'blur(14px)' }}
      aria-label={`Apply for home loan via ${bank.name}`}
    >
      {/* ── Logo area — white background for maximum logo clarity ── */}
      <div className="w-full rounded-xl mb-4 px-3 py-2 flex items-center justify-center"
           style={{ background:'#ffffff', minHeight:'56px' }}>
        {!imgErr ? (
          <img
            src={bank.logoUrl}
            alt={`${bank.name} logo`}
            className="h-12 w-auto object-contain mx-auto"
            onError={() => setImgErr(true)}
            loading="eager"
          />
        ) : (
          /* Fallback coloured badge if the direct URL fails */
          <div
            className="w-full h-10 rounded-lg flex items-center justify-center font-black tracking-widest"
            style={{ background: bank.bg, color: bank.text, fontSize: '12px' }}
          >
            {bank.abbr}
          </div>
        )}
      </div>

      {/* Bank name */}
      <div className="text-white font-extrabold text-sm leading-tight mb-0.5">{bank.name}</div>
      <div className="text-white/55 text-[11px] leading-snug">{bank.full}</div>

      {/* Hover apply CTA */}
      <div className="mt-2.5 text-[11px] font-bold text-transparent group-hover:text-gold
                      transition-colors duration-200">
        Apply Now →
      </div>
    </button>
  );
}

function Slide2({ data, onApply }) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden"
         style={{ background:'linear-gradient(145deg,#050d1f 0%,#0a1630 45%,#0d1f42 100%)' }}>
      <GridOverlay opacity={0.04} />

      {/* Gold accent top line */}
      <div className="absolute top-0 left-0 w-full h-1"
           style={{ background:'linear-gradient(90deg,#D4AF37,#f0d97a,#D4AF37)' }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
           style={{ background:'radial-gradient(ellipse,rgba(212,175,55,0.06) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
            px-4 py-2 rounded-full mb-6 border border-gold/40"
            style={{ background:'rgba(212,175,55,0.15)', color:'#D4AF37' }}>
            🏦 {data.badge}
          </span>

          {/* Main slogan */}
          <h2 className="font-extrabold text-white mb-3"
              style={{ fontSize:'clamp(1.7rem,4vw,3rem)', textShadow:'0 2px 18px rgba(0,0,0,0.6)', lineHeight:1.2 }}>
            {data.sloganLine1}
          </h2>
          <p className="font-bold mb-8 max-w-2xl mx-auto"
             style={{ fontSize:'clamp(1rem,2.5vw,1.35rem)', color:'#D4AF37',
                      textShadow:'0 1px 8px rgba(0,0,0,0.5)', lineHeight:1.4 }}>
            {data.sloganLine2}
          </p>

          {/* Facilitate message */}
          <p className="font-extrabold text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-snug"
             style={{ textShadow:'0 1px 10px rgba(0,0,0,0.5)' }}>
            {data.facilitateMsg}
          </p>
        </div>

        {/* ── Bank Grid — 12 banks (2×6 mobile, 4×3 desktop) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10">
          {BANKS.map(bank => (
            <BankCard key={bank.id} bank={bank} onApply={onApply} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onApply}
            className="btn-primary text-base px-10 py-3.5 font-extrabold"
            style={{ boxShadow:'0 6px 28px rgba(212,175,55,0.45)' }}>
            {data.cta}
          </button>
          <button onClick={onApply}
            className="btn-secondary text-base px-10 py-3.5 font-bold">
            {data.ctaSecondary}
          </button>
        </div>

        <p className="text-white/35 text-xs text-center mt-6">{data.disclaimer}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 3 — PMAY-U 2.0 / Govt Schemes
══════════════════════════════════════════════════════ */
function Slide3({ data, onApply }) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden"
         style={{ backgroundImage:`url(${IMG.slide3})`, backgroundSize:'cover', backgroundPosition:'center top' }}>
      <div className="absolute inset-0"
           style={{ background:'linear-gradient(160deg,rgba(0,15,40,0.93) 0%,rgba(0,28,60,0.88) 50%,rgba(0,40,80,0.85) 100%)' }} />
      <GridOverlay />
      <div className="absolute top-0 left-0 w-full h-1"
           style={{ background:'linear-gradient(90deg,#D4AF37,#f0d97a,#D4AF37)' }} />

      {/* max-w-5xl keeps cards compact and elegant */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 w-full">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
            px-3 py-1.5 rounded-full mb-4 border border-gold/40"
            style={{ background:'rgba(212,175,55,0.18)', color:'#D4AF37' }}>
            🇮🇳 {data.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
              style={{ textShadow:'0 2px 16px rgba(0,0,0,0.6)' }}>
            {data.title}
          </h2>
          <p className="text-white/85 text-base max-w-xl mx-auto font-semibold"
             style={{ textShadow:'0 1px 8px rgba(0,0,0,0.45)' }}>
            {data.subtitle}
          </p>
        </div>

        {/* EWS / LIG / MIG cards — compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {data.categories.map(cat => (
            <div key={cat.key}
              className="rounded-xl overflow-hidden border border-white/15 backdrop-blur-sm
                hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              style={{ background:'rgba(255,255,255,0.09)' }}>
              {/* Card header */}
              <div className={`bg-gradient-to-r ${cat.color} p-3 flex items-center gap-3`}>
                <span className="text-2xl drop-shadow flex-shrink-0">{cat.icon}</span>
                <div>
                  <div className="text-white font-extrabold text-lg leading-tight"
                       style={{ textShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>{cat.key}</div>
                  <div className="text-white/90 text-[11px] font-bold leading-tight">{cat.full}</div>
                </div>
              </div>
              {/* Card body */}
              <div className="p-3 space-y-2">
                {[
                  { icon:'💰', label:'Income',       value:cat.income  },
                  { icon:'🎁', label:'Max Subsidy',  value:cat.subsidy },
                  { icon:'📊', label:'Subsidy Rate', value:cat.rate    },
                  { icon:'📐', label:'Carpet Area',  value:cat.carpet  },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0 mt-0.5">{row.icon}</span>
                    <div>
                      <div className="text-white/50 text-[9px] uppercase tracking-widest font-bold">{row.label}</div>
                      <div className="text-white font-bold text-xs">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Card footer */}
              <div className="px-3 pb-3">
                <button onClick={onApply}
                  className="w-full py-2 rounded-lg font-extrabold text-xs text-navy transition-colors duration-200"
                  style={{ background:'#D4AF37' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f0d97a'}
                  onMouseLeave={e => e.currentTarget.style.background='#D4AF37'}>
                  Apply for {cat.key} →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={onApply} className="btn-primary text-sm px-7 py-3 font-extrabold"
                  style={{ boxShadow:'0 6px 24px rgba(212,175,55,0.42)' }}>
            {data.cta}
          </button>
          <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior:'smooth' })}
                  className="btn-secondary text-sm px-7 py-3 font-bold">
            {data.ctaSecondary}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN SLIDER — 3 slides, auto-advance, progress bar
══════════════════════════════════════════════════════ */
const TOTAL = 3;

const DRAG_THRESHOLD = 50; // px needed to trigger a slide change

export default function HeroSlider() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const [current,    setCurrent]    = useState(0);
  const [paused,     setPaused]     = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef    = useRef(null);
  const progressRef = useRef(null);
  const dragStartX  = useRef(null);

  const next  = useCallback(() => setCurrent(c => (c + 1) % TOTAL), []);
  const prev  = useCallback(() => setCurrent(c => (c - 1 + TOTAL) % TOTAL), []);
  const goTo  = useCallback((i) => { setCurrent(i); setProgress(0); }, []);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const ms = INTERVALS[current];
    const start = Date.now();
    progressRef.current = setInterval(
      () => setProgress(Math.min(((Date.now() - start) / ms) * 100, 100)), 50);
    timerRef.current = setTimeout(next, ms);
    return () => { clearInterval(progressRef.current); clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  const onDragStart = (e) => {
    dragStartX.current = getClientX(e);
    setIsDragging(true);
    setPaused(true);
  };

  const onDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const delta = getClientX(e) - dragStartX.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      delta < 0 ? next() : prev();
      setProgress(0);
    }
    dragStartX.current = null;
    setIsDragging(false);
    setPaused(false);
  };

  const onDragCancel = () => {
    dragStartX.current = null;
    setIsDragging(false);
    setPaused(false);
  };

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  const slides = [
    <Slide1 key="s1" data={t.slide1} language={language} onCalc={() => scrollTo('calculator')} />,
    <Slide2 key="s2" data={t.slide2} onApply={() => scrollTo('apply')} />,
    <Slide3 key="s3" data={t.slide3} onApply={() => scrollTo('apply')} />,
  ];

  return (
    <section
      id="home"
      className="relative select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragCancel}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
    >

      {/* Active slide */}
      <div key={current} className="slide-enter" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>{slides[current]}</div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1"
           style={{ background:'rgba(255,255,255,0.12)' }}>
        <div className="h-full transition-none"
             style={{ width:`${progress}%`, background:'#D4AF37' }} />
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8' : 'w-2.5 bg-white/40 hover:bg-white/65'
            }`}
            style={i === current ? { background:'#D4AF37', boxShadow:'0 0 8px rgba(212,175,55,0.7)' } : {}} />
        ))}
      </div>

      {/* Prev arrow */}
      <button onClick={() => goTo((current - 1 + TOTAL) % TOTAL)}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          items-center justify-center text-white text-xl font-bold border border-white/20
          backdrop-blur-sm hover:border-white/50 hover:scale-110 transition-all duration-200"
        style={{ background:'rgba(255,255,255,0.11)' }} aria-label="Previous">
        ‹
      </button>

      {/* Next arrow */}
      <button onClick={() => { next(); setProgress(0); }}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          items-center justify-center text-white text-xl font-bold border border-white/20
          backdrop-blur-sm hover:border-white/50 hover:scale-110 transition-all duration-200"
        style={{ background:'rgba(255,255,255,0.11)' }} aria-label="Next">
        ›
      </button>
    </section>
  );
}
