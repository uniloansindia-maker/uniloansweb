import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const PHONE_NUMBER    = '+919944633059';
const PHONE_NUMBER_2  = '+918072138264';
const WHATSAPP_NUMBER = '919944633059';

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section id="contact" className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t.title}</h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center
            transition-all duration-300 hover:-translate-y-1 hover:border-gold">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">
              📞
            </div>
            <h3 className="text-white font-bold mb-1">{t.callBtn}</h3>
            <p className="text-white/60 text-sm mb-3">{language === 'en' ? 'Mon–Sat, 9 AM – 7 PM' : 'திங்கள்–சனி, காலை 9 – மாலை 7'}</p>
            <a href={`tel:${PHONE_NUMBER}`} className="block text-gold font-semibold text-sm hover:text-gold/80 transition-colors">
              +91 99446 33059
            </a>
            <a href={`tel:${PHONE_NUMBER_2}`} className="block text-gold font-semibold text-sm hover:text-gold/80 transition-colors mt-1">
              +91 80721 38264
            </a>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi UniLoans, I need help with a Home Loan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 hover:bg-[#25D366]/20 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center
              transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]"
          >
            <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-white font-bold mb-1">{t.waBtn}</h3>
            <p className="text-white/60 text-sm mb-3">{language === 'en' ? 'Instant reply during business hours' : 'வணிக நேரத்தில் உடனடி பதில்'}</p>
            <span className="text-[#25D366] font-semibold text-sm">{t.whatsapp}</span>
          </a>

          {/* Email + Address */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 text-3xl">
              📍
            </div>
            <h3 className="text-white font-bold mb-1">{language === 'en' ? 'Visit / Write' : 'வருகை / எழுதுங்கள்'}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-2">{t.address}</p>
            <a href={`mailto:${t.email}`} className="text-gold font-semibold text-sm break-all hover:underline">
              {t.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
