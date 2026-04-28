import { useState } from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const PHONE_NUMBER    = '+918072138264';
const WHATSAPP_NUMBER = '919566774351';

export default function FloatingWidget() {
  const { language } = useLanguage();
  const t = translations[language].floating;

  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {open && (
        <div className="bounce-in bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-56 mb-1">
          {/* Brand */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
            <Logo height={28} />
          </div>
          <p className="text-gray-500 text-xs mb-4">{t.tagline}</p>

          {/* Call */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 w-full bg-navy hover:bg-navy-light text-white px-4 py-3 rounded-xl
              font-semibold text-sm transition-colors duration-200 mb-2"
          >
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base flex-shrink-0">
              📞
            </span>
            <div className="text-left">
              <div className="text-[10px] text-white/70 font-normal">{t.call}</div>
              <div className="text-xs font-bold">+91 80721 38264</div>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UniLoans, I am interested in a Home Loan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 rounded-xl
              font-semibold text-sm transition-colors duration-200"
          >
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base flex-shrink-0">
              💬
            </span>
            <div className="text-left">
              <div className="text-[10px] text-white/70 font-normal">{t.whatsapp}</div>
              <div className="text-xs font-bold">Chat Now</div>
            </div>
          </a>

          {/* Arrow */}
          <div className="absolute -bottom-2 right-7 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close contact widget' : 'Open contact widget'}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl
          transition-all duration-300 border-2 ${
            open
              ? 'bg-gray-100 border-gray-200 rotate-45'
              : 'bg-navy border-gold hover:scale-110 animate-pulse-slow'
          }`}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Quick action bubbles (visible when closed) */}
      {!open && (
        <>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UniLoans, I need help with a Home Loan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-xl shadow-lg
              hover:scale-110 transition-transform duration-200 border-2 border-white"
          >
            💬
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            title="Call Us"
            className="w-11 h-11 rounded-full bg-gold flex items-center justify-center text-xl shadow-lg
              hover:scale-110 transition-transform duration-200 border-2 border-white"
          >
            📞
          </a>
        </>
      )}
    </div>
  );
}
