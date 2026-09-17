import { useI18n } from "../context/LanguageContext";

export function Privacy() {
  const { t } = useI18n();
  return <section className="page prose"><h1>{t.legal.privacyTitle}</h1><p>{t.legal.privacy}</p></section>;
}

export function Legal() {
  const { t } = useI18n();
  return <section className="page prose"><h1>{t.legal.legalTitle}</h1><p>{t.legal.legal}</p></section>;
}

export function Terms() {
  const { t } = useI18n();
  return <section className="page prose"><h1>{t.legal.termsTitle}</h1><p>{t.legal.terms}</p></section>;
}
