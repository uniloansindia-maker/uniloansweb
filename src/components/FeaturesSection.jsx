import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function FeaturesSection() {
  const { language } = useLanguage();
  const t = translations[language].features;

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-badge">{t.badge}</span>
          <h2 className="section-title mb-4">{t.title}</h2>
          <p className="section-subtitle mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="group card-shadow p-7 rounded-2xl hover:border-navy hover:border border border-transparent transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center text-3xl mb-5 group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:grayscale-0">{item.icon}</span>
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
