import { useState, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const EMAILJS = {
  serviceId:  'service_18x6p9k',
  templateId: 'template_wl63h0h',
  publicKey:  'bPyF8hWw05p-lCafE',
};

function fmt(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);
}

function calcEMI(principal, annualRate, tenureYears) {
  if (!principal || !annualRate || !tenureYears) return null;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return { emi: principal / n, total: principal, interest: 0 };
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { emi, total: emi * n, interest: emi * n - principal };
}

function calcEligibility(monthlyIncome, annualRate, tenureYears, existingEmi) {
  if (!monthlyIncome || !annualRate || !tenureYears) return null;
  const maxPermissibleEmi = monthlyIncome * 0.5 - (existingEmi || 0);
  if (maxPermissibleEmi <= 0) return { eligible: 0, maxEmi: 0 };
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  const eligible = (maxPermissibleEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  return { eligible: Math.max(0, eligible), maxEmi: maxPermissibleEmi };
}

/* ─── Range Slider Input ─────────────────────────────── */
function SliderInput({ label, name, value, onChange, min, max, step = 1, prefix = '', suffix = '' }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="label mb-0">{label}</label>
        <span className="text-navy font-bold text-sm bg-navy-50 px-3 py-1 rounded-lg">
          {prefix}{fmt(value)}{suffix}
        </span>
      </div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          bg-gradient-to-r from-navy to-navy-light
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gold
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white"
      />
      <div className="flex justify-between text-gray-400 text-[11px] mt-1">
        <span>{prefix}{fmt(min)}</span>
        <span>{prefix}{fmt(max)}{suffix}</span>
      </div>
    </div>
  );
}

/* ─── Result Card ─────────────────────────────────────── */
function ResultCard({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-4 text-center ${highlight ? 'bg-navy text-white' : 'bg-gray-50 text-navy'}`}>
      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${highlight ? 'text-white/70' : 'text-gray-500'}`}>
        {label}
      </div>
      <div className={`text-xl font-extrabold ${highlight ? 'text-gold' : ''}`}>₹{fmt(value)}</div>
    </div>
  );
}

/* ─── Lead Lock Modal ─────────────────────────────────── */
function LeadLock({ t, onUnlock, calcType, calcSummary }) {
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(phone)) {
      setErr(true); return;
    }
    setBusy(true);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          user_name:   name,
          user_dob:    `CALCULATOR LEAD — ${calcType}`,
          user_mobile: phone,
          user_email:  'calculator-lead@uniloans',
          district:    `Calc Type: ${calcType}`,
          user_state:  calcSummary,
          pincode:     'N/A',
        },
        EMAILJS.publicKey
      );
    } catch { /* non-blocking */ }
    setBusy(false);
    onUnlock(name, phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 text-3xl">
            🔓
          </div>
          <h3 className="text-2xl font-extrabold text-navy mb-2">{t.lockTitle}</h3>
          <p className="text-gray-500 text-sm">{t.lockSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="label">{t.lockName}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t.lockNamePlaceholder}
              className={`input-field ${err && !name.trim() ? 'border-red-400' : ''}`}
            />
          </div>
          <div>
            <label className="label">{t.lockPhone}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t.lockPhonePlaceholder}
                maxLength={10}
                className={`input-field pl-12 ${err && !/^\d{10}$/.test(phone) ? 'border-red-400' : ''}`}
              />
            </div>
            {err && <p className="text-red-400 text-xs mt-1">Please enter valid details.</p>}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full text-base py-3.5 disabled:opacity-60"
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Unlocking…
              </span>
            ) : t.lockSubmit}
          </button>
          <p className="text-gray-400 text-xs text-center flex items-center justify-center gap-1">
            🔒 {t.lockPrivacy}
          </p>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Calculator ─────────────────────────────────── */
export default function Calculator() {
  const { language } = useLanguage();
  const t = translations[language].calculator;

  const [tab, setTab]       = useState('emi');
  const [locked, setLocked] = useState(true);
  const [showLock, setShowLock] = useState(false);

  /* EMI state */
  const [loanAmt, setLoanAmt]   = useState(3000000);
  const [rate, setRate]         = useState(8.5);
  const [tenure, setTenure]     = useState(20);

  /* Eligibility state */
  const [income, setIncome]       = useState(50000);
  const [eRate, setERate]         = useState(8.5);
  const [eTenure, setETenure]     = useState(20);
  const [existingEmi, setExistingEmi] = useState(0);

  const emiResult  = useMemo(() => calcEMI(loanAmt, rate, tenure), [loanAmt, rate, tenure]);
  const eligResult = useMemo(() => calcEligibility(income, eRate, eTenure, existingEmi), [income, eRate, eTenure, existingEmi]);

  const handleCalculate = () => {
    if (locked) setShowLock(true);
  };

  const onUnlock = () => {
    setLocked(false);
    setShowLock(false);
  };

  const calcSummary =
    tab === 'emi'
      ? `Loan:₹${fmt(loanAmt)} Rate:${rate}% Tenure:${tenure}Y | EMI:₹${fmt(emiResult?.emi || 0)}`
      : `Income:₹${fmt(income)} Rate:${eRate}% Tenure:${eTenure}Y | Eligible:₹${fmt(eligResult?.eligible || 0)}`;

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-badge">{t.badge}</span>
          <h2 className="section-title mb-4">{t.title}</h2>
          <p className="section-subtitle mx-auto">{t.subtitle}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1.5">
            {(['emi', 'eligibility']).map((key) => (
              <button
                key={key}
                onClick={() => { setTab(key); setLocked(true); }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  tab === key
                    ? 'bg-navy text-white shadow-md'
                    : 'text-gray-500 hover:text-navy'
                }`}
              >
                {key === 'emi' ? t.emi : t.eligibility}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Inputs ── */}
          <div className="card-shadow rounded-2xl p-8 space-y-7">
            {tab === 'emi' ? (
              <>
                <SliderInput label={t.loanAmount}   name="loanAmt" value={loanAmt}  onChange={e=>setLoanAmt(+e.target.value)}  min={100000}  max={10000000} step={50000}  prefix="₹" />
                <SliderInput label={t.interestRate}  name="rate"    value={rate}     onChange={e=>setRate(+e.target.value)}     min={6}       max={20}       step={0.1}   suffix="%" />
                <SliderInput label={t.tenure}        name="tenure"  value={tenure}   onChange={e=>setTenure(+e.target.value)}   min={1}       max={30}                     suffix=" Yr" />
              </>
            ) : (
              <>
                <SliderInput label={t.monthlyIncome} name="income"  value={income}   onChange={e=>setIncome(+e.target.value)}   min={15000}   max={500000}  step={5000}  prefix="₹" />
                <SliderInput label={t.interestRate}  name="eRate"   value={eRate}    onChange={e=>setERate(+e.target.value)}    min={6}       max={20}       step={0.1}   suffix="%" />
                <SliderInput label={t.tenure}        name="eTenure" value={eTenure}  onChange={e=>setETenure(+e.target.value)}  min={1}       max={30}                     suffix=" Yr" />
                <SliderInput label={t.existingEmi}   name="emi"     value={existingEmi} onChange={e=>setExistingEmi(+e.target.value)} min={0} max={100000} step={1000} prefix="₹" />
              </>
            )}

            <button
              onClick={handleCalculate}
              className={`btn-primary w-full py-3.5 text-base ${!locked ? 'opacity-50 cursor-default' : ''}`}
              disabled={!locked}
            >
              {!locked ? '✓ Results Unlocked' : t.calculate}
            </button>
          </div>

          {/* ── Results ── */}
          <div className="card-shadow rounded-2xl p-8 flex flex-col">
            <h3 className="font-bold text-navy text-lg mb-6">
              {tab === 'emi' ? t.emi : t.eligibility} — Results
            </h3>

            {locked ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
                <div className="w-20 h-20 rounded-full bg-gold/15 flex items-center justify-center text-4xl">🔒</div>
                <p className="text-gray-500 text-sm max-w-xs">
                  {language === 'en'
                    ? 'Click "Calculate" and enter your details to view your personalised results.'
                    : '"கணக்கிடு" கிளிக் செய்து உங்கள் முடிவுகளைப் பாருங்கள்.'}
                </p>
              </div>
            ) : tab === 'emi' && emiResult ? (
              <div className="flex-1 flex flex-col gap-4">
                <ResultCard label={t.emiResult}    value={emiResult.emi}      highlight />
                <ResultCard label={t.totalInterest} value={emiResult.interest} />
                <ResultCard label={t.totalPayment}  value={emiResult.total}    />

                {/* Pie-like breakdown bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Principal: ₹{fmt(loanAmt)}</span>
                    <span>Interest: ₹{fmt(emiResult.interest)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden flex">
                    <div
                      className="h-full bg-navy rounded-l-full"
                      style={{ width: `${(loanAmt / emiResult.total) * 100}%` }}
                    />
                    <div className="h-full bg-gold flex-1 rounded-r-full" />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-navy-50 rounded-xl text-sm text-navy">
                  <span className="font-bold">Tip:</span>{' '}
                  {language === 'en'
                    ? 'A shorter tenure reduces total interest but increases monthly EMI.'
                    : 'குறுகிய காலம் மொத்த வட்டியை குறைக்கும், ஆனால் மாதாந்திர EMI அதிகரிக்கும்.'}
                </div>
              </div>
            ) : eligResult ? (
              <div className="flex-1 flex flex-col gap-4">
                <ResultCard label={t.eligibleAmount} value={eligResult.eligible} highlight />
                <ResultCard label={t.maxEmi}          value={eligResult.maxEmi}  />

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-emerald-700 text-sm font-medium">
                    {language === 'en'
                      ? `Based on 50% income rule. You can afford up to ₹${fmt(eligResult.maxEmi)}/month towards EMI.`
                      : `50% வருமான விதியின்படி. மாதாந்திர EMI ₹${fmt(eligResult.maxEmi)} வரை செலுத்தலாம்.`}
                  </p>
                </div>

                <button
                  onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-navy w-full py-3 text-sm mt-auto"
                >
                  {language === 'en' ? 'Apply for This Loan →' : 'இந்த கடனுக்கு விண்ணப்பிக்கவும் →'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showLock && (
        <LeadLock
          t={t}
          onUnlock={onUnlock}
          calcType={tab === 'emi' ? 'EMI Calculator' : 'Eligibility Calculator'}
          calcSummary={calcSummary}
        />
      )}
    </section>
  );
}
