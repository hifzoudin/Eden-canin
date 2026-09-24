import { useI18n } from "../context/LanguageContext";
import SEO from "../seo/SEO.jsx";

export function Privacy() {
  const { t } = useI18n();
  return (
    <>
      <SEO title="Politique de confidentialité | Eden Canin" description="Consultez la politique de confidentialité du site Eden Canin et le traitement des informations de commande." path="/confidentialite" />
      <section className="page prose"><h1>{t.legal.privacyTitle}</h1><p>{t.legal.privacy}</p></section>
    </>
  );
}

export function Legal() {
  const { t } = useI18n();
  return (
    <>
      <SEO title="Mentions légales | Eden Canin" description="Consultez les mentions légales d’Eden Canin et les informations juridiques du site." path="/mentions-legales" />
      <section className="page prose"><h1>{t.legal.legalTitle}</h1><p>{t.legal.legal}</p></section>
    </>
  );
}

export function Terms() {
  const { t } = useI18n();
  return (
    <>
      <SEO title="Conditions générales | Eden Canin" description="Consultez les conditions générales de vente et les informations relatives à l’achat de chiot chez Eden Canin." path="/conditions" />
      <section className="page prose"><h1>{t.legal.termsTitle}</h1><p>{t.legal.terms}</p></section>
    </>
  );
}
