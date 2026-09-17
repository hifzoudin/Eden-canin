import { useI18n } from "../context/LanguageContext";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-switch ${className}`}>
      <span className="sr-only">{t.language.label}</span>
      {[
        { id: "fr", flag: "🇫🇷", label: t.language.fr },
        { id: "en", flag: "🇬🇧", label: t.language.en },
        { id: "de", flag: "🇩🇪", label: t.language.de }
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          className={lang === item.id ? "active" : ""}
          onClick={() => setLang(item.id)}
          aria-label={item.label}
        >
          {item.flag} {item.id.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
