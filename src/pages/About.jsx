import { useI18n } from "../context/LanguageContext";

export default function About() {
  const { t } = useI18n();
  return (
    <section className="page prose">
      <h1>{t.about.title}</h1>
      <p>{t.about.p1}</p>
      <p>{t.about.p2}</p>
      <p>{t.about.p3}</p>
    </section>
  );
}
