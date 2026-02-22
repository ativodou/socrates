import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('socrates-lang') || 'fr'; } catch { return 'fr'; }
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'fr' ? 'ht' : 'fr';
      try { localStorage.setItem('socrates-lang', next); } catch {}
      return next;
    });
  }, []);

  const setLanguage = useCallback((l) => {
    setLang(l);
    try { localStorage.setItem('socrates-lang', l); } catch {}
  }, []);

  // t('key') returns translated string, t('key', {n: 5}) for interpolation
  const t = useCallback((key, vars) => {
    const val = translations[lang]?.[key] || translations['fr']?.[key] || key;
    if (!vars) return val;
    return Object.entries(vars).reduce((str, [k, v]) => str.replace(new RegExp(`{${k}}`, 'g'), v), val);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
