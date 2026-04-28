import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const PHONE_NUMBER = '+918072138264';

const SECTION_MAP = {
  'Home': 'home', 'About Us': 'features', 'Services': 'features',
  'Govt Schemes': 'schemes', 'EMI Calculator': 'calculator',
  'Apply Now': 'apply', 'Contact': 'contact',
  // Tamil
  'முகப்பு': 'home', 'எங்களை பற்றி': 'features', 'சேவைகள்': 'features',
  'அரசு திட்டங்கள்': 'schemes', 'EMI கால்குலேட்டர்': 'calculator',
  'விண்ணப்பிக்கவும்': 'apply', 'தொடர்பு': 'contact',
};

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo height={40} light={true} className="mb-4" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t.tagline}</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-gold mt-0.5 flex-shrink-0">📍</span>
                <span>{t.address}</span>
              </div>
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors">
                <span className="text-gold">📞</span>
                <span>{t.phone}</span>
              </a>
              <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors">
                <span className="text-gold">✉️</span>
                <span>{t.email}</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.quickLinks}</h4>
            <ul className="space-y-2.5">
              {t.links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(SECTION_MAP[link] || 'home')}
                    className="text-white/60 hover:text-gold text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors flex-shrink-0" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.services}</h4>
            <ul className="space-y-2.5">
              {t.serviceList.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('apply')}
                    className="text-white/60 hover:text-gold text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors flex-shrink-0" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & connect */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.connect}</h4>
            <div className="space-y-3 mb-6">
              {/* Instagram placeholder */}
              <a
                href="#"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                onClick={(e) => e.preventDefault()}
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex items-center justify-center text-white text-sm shadow-lg group-hover:scale-110 transition-transform">
                  📸
                </span>
                <div>
                  <div className="text-xs font-semibold text-white/80">Instagram</div>
                  <div className="text-[11px] text-white/40">@uniloansindia</div>
                </div>
              </a>
              {/* Facebook placeholder */}
              <a
                href="#"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                onClick={(e) => e.preventDefault()}
              >
                <span className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center text-white text-sm shadow-lg group-hover:scale-110 transition-transform">
                  📘
                </span>
                <div>
                  <div className="text-xs font-semibold text-white/80">Facebook</div>
                  <div className="text-[11px] text-white/40">UniLoans India</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => scrollTo('apply')}
              className="btn-primary text-sm py-2.5 px-6"
            >
              {language === 'en' ? 'Apply Now →' : 'இப்போது விண்ணப்பிக்கவும் →'}
            </button>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-px bg-gold/20 mx-8" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-white/40 text-xs">{t.rights}</p>
          <p className="text-white/30 text-[11px] max-w-2xl leading-relaxed text-right hidden md:block">
            {t.disclaimer}
          </p>
        </div>
        <p className="text-white/30 text-[11px] leading-relaxed mt-4 md:hidden">{t.disclaimer}</p>
      </div>
    </footer>
  );
}
