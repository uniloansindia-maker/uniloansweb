import { useState, useEffect } from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const NAV_LINKS = ['home', 'services', 'schemes', 'calculator', 'contact'];
const SECTION_IDS = { home: 'home', services: 'features', schemes: 'schemes', calculator: 'calculator', contact: 'contact' };

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setActive(Object.keys(SECTION_IDS).find(k => SECTION_IDS[k] === id) || 'home');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_20px_rgba(0,51,102,0.12)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="focus:outline-none flex-shrink-0"
            aria-label="UniLoans Home"
          >
            <Logo height={42} light={!scrolled} />
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((key) => (
              <li key={key}>
                <button
                  onClick={() => scrollTo(SECTION_IDS[key])}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active === key
                      ? scrolled
                        ? 'text-navy bg-navy-50'
                        : 'text-gold'
                      : scrolled
                      ? 'text-gray-600 hover:text-navy hover:bg-gray-50'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {t[key]}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                scrolled
                  ? 'border-navy text-navy hover:bg-navy hover:text-white'
                  : 'border-white/50 text-white hover:bg-white/15'
              }`}
              aria-label="Toggle language"
            >
              <span className="text-base leading-none">{language === 'en' ? '🇮🇳' : '🔤'}</span>
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollTo('apply')}
              className="hidden sm:block btn-primary text-sm py-2 px-5"
            >
              {t.applyNow}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/15'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all duration-200" />
              <span className={`block h-0.5 bg-current mb-1.5 transition-all duration-200 ${mobileOpen ? 'w-3 ml-1' : 'w-5'}`} />
              <span className="block w-5 h-0.5 bg-current transition-all duration-200" />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`mt-3 rounded-2xl p-4 space-y-1 ${scrolled ? 'bg-white shadow-lg' : 'bg-navy/95 backdrop-blur-sm'}`}>
            {NAV_LINKS.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(SECTION_IDS[key])}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:bg-navy hover:text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {t[key]}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={toggleLanguage}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold border text-center transition-colors ${
                  scrolled
                    ? 'border-navy text-navy hover:bg-navy hover:text-white'
                    : 'border-white/40 text-white hover:bg-white/10'
                }`}
              >
                {language === 'en' ? '🇮🇳 தமிழ்' : '🔤 English'}
              </button>
              <button
                onClick={() => scrollTo('apply')}
                className="btn-primary text-sm py-2.5 text-center"
              >
                {t.applyNow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
