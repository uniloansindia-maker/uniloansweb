import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => setLanguage(l => (l === 'en' ? 'ta' : 'en'));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div className={language === 'ta' ? 'lang-ta' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
