import { useI18n } from "../context/LanguageContext";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="page prose about-page">
      <header className="page-header">
        <p className="section-kicker">{t.about.kicker || "Notre élevage"}</p>
        <h1>{t.about.title}</h1>
      </header>

      <div className="about-grid">
        <div>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>

        <div className="about-panel">
          <h2>{t.about.valuesTitle || "Nos engagements"}</h2>
          <ul>
            <li>{t.about.value1 || "Sélection rigoureuse des lignées pour la santé et le caractère."}</li>
            <li>{t.about.value2 || "Socialisation douce et environnement familial dès les premières semaines."}</li>
            <li>{t.about.value3 || "Suivi vétérinaire, transparence et accompagnement pour chaque famille."}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
