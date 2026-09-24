import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BreedCard from "../components/BreedCard";
import PuppyCard from "../components/PuppyCard";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { loc } from "../translations";

export default function Home() {
  const { t, lang } = useI18n();
  const { puppies, breeds, content, loading } = useStore();
  const featured = puppies.filter((p) => p.status !== "sold").slice(0, 6);

  return (
    <div className="home">
      <section className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
        <div className="hero-overlay" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">{t.brand}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/chiots">{t.hero.ctaPuppies}</Link>
            <a className="btn btn-light" href="#races">{t.hero.ctaBreeds}</a>
          </div>
        </motion.div>
      </section>

      <section id="races" className="section">
        <div className="section-heading">
          <h2>{t.breeds.title}</h2>
          <p>{t.breeds.intro}</p>
        </div>
        <div className="breed-grid">
          {(breeds || []).map((breed) => (
            <BreedCard
              key={breed.slug}
              breed={breed.slug}
              title={loc(breed.name, lang)}
              text={t.breeds.line.replace("{name}", loc(breed.name, lang))}
              to={`/chiots?race=${breed.slug}`}
              image={breed.image}
            />
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-heading">
          <h2>{t.available.title}</h2>
          <p>{t.available.intro}</p>
        </div>
        <div className="puppy-grid">
          {!loading && featured.map((puppy) => <PuppyCard key={puppy.id} puppy={puppy} />)}
        </div>
        <div className="center">
          <Link className="btn btn-dark" to="/chiots">{t.available.viewAll}</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t.why.title}</h2>
        </div>
        <div className="why-grid">
          {t.why.items.map((item) => (
            <article key={item.title} className="why-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section kennel-section">
        <div className="section-heading">
          <h2>{t.kennel.title}</h2>
          <p>{t.kennel.intro}</p>
        </div>
        <div className="photo-mosaic">
          {(content.kennelPhotos || []).map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-heading">
          <h2>{t.testimonials.title}</h2>
          <p>{t.testimonials.intro}</p>
        </div>
        <div className="testimonial-grid">
          {(content.testimonials || []).map((item) => (
            <article key={item.id} className="testimonial-card">
              <img src={item.photo} alt="" />
              <p>“{loc(item.text, lang)}”</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t.faq.title}</h2>
        </div>
        <div className="faq-list">
          {t.faq.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
