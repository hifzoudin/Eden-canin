import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("eden-lang") || "fr");

  useEffect(() => {
    localStorage.setItem("eden-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const t = dictionaries[lang] || dictionaries.fr;
    return { lang, setLang, t, languages: ["fr", "en", "de"] };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}
