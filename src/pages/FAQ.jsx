import { useI18n } from "../context/LanguageContext";
import SEO from "../seo/SEO.jsx";

export default function FAQ() {
  const { t } = useI18n();
  return (
    <>
      <SEO title="FAQ | Eden Canin" description="Questions fréquentes sur les chiots, les races, la commande et le paiement chez Eden Canin." path="/faq" />
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
    </>
  );
}
