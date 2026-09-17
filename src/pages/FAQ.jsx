import { useI18n } from "../context/LanguageContext";

export default function FAQ() {
  const { t } = useI18n();
  return (
    <section className="page">
      <h1>{t.faq.title}</h1>
      <div className="faq-list">
        {t.faq.items.map((item) => (
          <details key={item.q} open>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
