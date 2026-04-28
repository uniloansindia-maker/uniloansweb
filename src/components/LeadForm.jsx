import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import { translations, STATES } from '../translations';

const EMAILJS = {
  serviceId:  'service_18x6p9k',
  templateId: 'template_wl63h0h',
  publicKey:  'bPyF8hWw05p-lCafE',
};

const INITIAL = {
  user_name: '', user_dob: '', user_mobile: '', user_email: '',
  district: '', user_state: '', pincode: '',
};

export default function LeadForm() {
  const { language } = useLanguage();
  const t = translations[language].form;

  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.user_name.trim())   e.user_name  = true;
    if (!form.user_dob)           e.user_dob   = true;
    if (!/^\d{10}$/.test(form.user_mobile)) e.user_mobile = true;
    if (!/\S+@\S+\.\S+/.test(form.user_email)) e.user_email = true;
    if (!form.district.trim())    e.district   = true;
    if (!form.user_state)         e.user_state = true;
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = true;
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, form, EMAILJS.publicKey);
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  const fieldCls = (name) =>
    `input-field ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`;

  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-navy-50 via-white to-gold-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-badge">{t.badge}</span>
          <h2 className="section-title mb-4">{t.title}</h2>
          <p className="section-subtitle mx-auto">{t.subtitle}</p>
        </div>

        <div className="card-shadow rounded-3xl p-8 md:p-12 bg-white">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 text-4xl">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-navy mb-3">{t.success}</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {language === 'en'
                  ? 'Thank you for trusting UniLoans. Our specialist will contact you within 24 hours.'
                  : 'UniLoansஐ நம்பியதற்கு நன்றி. எங்கள் நிபுணர் 24 மணி நேரத்தில் தொடர்பு கொள்வார்.'}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-navy text-sm py-2.5 px-7"
              >
                {language === 'en' ? 'Submit Another' : 'மீண்டும் சமர்ப்பிக்கவும்'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="label">{t.name} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="user_name"
                    value={form.user_name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className={fieldCls('user_name')}
                    autoComplete="name"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="label">{t.dob} <span className="text-red-400">*</span></label>
                  <input
                    type="date"
                    name="user_dob"
                    value={form.user_dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={fieldCls('user_dob')}
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="label">{t.mobile} <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+91</span>
                    <input
                      type="tel"
                      name="user_mobile"
                      value={form.user_mobile}
                      onChange={handleChange}
                      placeholder={t.mobilePlaceholder}
                      maxLength={10}
                      className={`${fieldCls('user_mobile')} pl-12`}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="label">{t.email} <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    name="user_email"
                    value={form.user_email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className={fieldCls('user_email')}
                    autoComplete="email"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="label">{t.district} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder={t.districtPlaceholder}
                    className={fieldCls('district')}
                  />
                </div>

                {/* State */}
                <div>
                  <label className="label">{t.state} <span className="text-red-400">*</span></label>
                  <select
                    name="user_state"
                    value={form.user_state}
                    onChange={handleChange}
                    className={fieldCls('user_state')}
                  >
                    <option value="">{t.statePlaceholder}</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Pincode */}
                <div className="md:col-span-2">
                  <label className="label">{t.pincode} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder={t.pincodePlaceholder}
                    maxLength={6}
                    className={`${fieldCls('pincode')} max-w-xs`}
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              {/* Error summary */}
              {Object.keys(errors).length > 0 && (
                <p className="text-red-500 text-sm mt-4 flex items-center gap-1.5">
                  <span>⚠️</span>
                  {language === 'en'
                    ? 'Please fill all required fields correctly.'
                    : 'அனைத்து கட்டாய புலங்களையும் சரியாக நிரப்பவும்.'}
                </p>
              )}

              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {t.error}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full sm:w-auto text-base py-3.5 px-10 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      {t.submitting}
                    </span>
                  ) : t.submit}
                </button>
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <span>🔒</span> {t.privacy}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
