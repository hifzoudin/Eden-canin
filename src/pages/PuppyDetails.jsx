import { useParams } from "react-router-dom";
import PuppyGallery from "../components/PuppyGallery";
import PuppyInfo from "../components/PuppyInfo";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { breedLabel, formatPrice, loc } from "../translations";
import SEO from "../seo/SEO.jsx";

export default function PuppyDetails() {
  const { id, breed, puppy: puppyParam } = useParams();
  const { puppies } = useStore();
  const { t, lang } = useI18n();
  const { add } = useCart();
  const target = puppyParam || id;
  const puppy = puppies.find((p) => p.id === target || p.slug === target || (breed && p.breed === breed && p.slug === target))
    || puppies.find((p) => p.id === target || p.slug === target)
    || puppies.find((p) => p.breed === breed && p.slug === target);

  if (!puppy) return <section className="page"><p>{t.puppies.empty}</p></section>;

  const breedLabel = t.breedNames[puppy.breed] || puppy.breed;
  const title = `${puppy.name} – ${breedLabel} Puppy | Eden Canin`;
  const description = `Découvrez ${puppy.name}, un chiot ${breedLabel} disponible chez Eden Canin. Consultez ses photos, caractéristiques, prix et disponibilité.`;

  return (
    <>
      <SEO
        title={title}
        description={description}
        image={puppy.photos?.[0]}
        type="product"
        path={`/puppies/${puppy.breed}/${puppy.slug || puppy.id}`}
        puppy={puppy}
      />
      <section className="page puppy-details">
      <div className="details-grid">
        <PuppyGallery photos={puppy.photos} name={puppy.name} />
        <div>
          <span className={`status-pill ${puppy.status}`}>{t.status[puppy.status]}</span>
          <h1>{puppy.name}</h1>
          <p className="lead">{breedLabel(puppy, lang, t)} · {loc(puppy.variety, lang)}</p>
          <p className="price">{formatPrice(puppy.price, lang)}</p>
          <PuppyInfo puppy={puppy} />
          {puppy.status === "sold" || !puppy.canPurchase ? (
            <button className="btn btn-disabled" type="button" disabled>
              {puppy.status === "sold" ? t.card.sold : t.card.pending}
            </button>
          ) : (
            <button className="btn btn-primary" type="button" onClick={() => add(puppy)}>
              {t.card.add}
            </button>
          )}
        </div>
      </div>

      <article className="prose">
        <h2>{t.details.about}</h2>
        <p>{loc(puppy.description, lang)}</p>
        <h3>{t.details.personality}</h3>
        <p>{loc(puppy.personality, lang)}</p>
        <h3>{t.details.health}</h3>
        <p>{loc(puppy.health, lang)}</p>
        <h3>{t.details.vaccinations}</h3>
        <p>{loc(puppy.vaccinations, lang)}</p>
        <h3>{t.details.identification}</h3>
        <p>{loc(puppy.identification, lang)}</p>
        <h3>{t.details.pedigree}</h3>
        <p>{loc(puppy.pedigree, lang)}</p>
      </article>

      {puppy.parents && (
        <div className="parents">
          <h2>{t.details.parents}</h2>
          <div className="parents-grid">
            {["mother", "father"].map((role) => {
              const parent = puppy.parents[role];
              if (!parent) return null;
              return (
                <article key={role}>
                  <img src={parent.photo} alt={parent.name} />
                  <h3>{t.details[role]} — {parent.name}</h3>
                  <p>{loc(parent.info, lang)}</p>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <div className="gallery-block">
        <h2>{t.details.gallery}</h2>
        <PuppyGallery photos={puppy.photos} name={puppy.name} />
      </div>

      <aside className="sticky-buy">
        <div>
          <strong>{puppy.name}</strong>
          <span className={`status-pill ${puppy.status}`}>{t.status[puppy.status]}</span>
        </div>
        <p>{formatPrice(puppy.price, lang)}</p>
        {puppy.status === "sold" || !puppy.canPurchase ? (
          <button className="btn btn-disabled" type="button" disabled>
            {puppy.status === "sold" ? t.card.sold : t.card.pending}
          </button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={() => add(puppy)}>
            {t.card.add}
          </button>
        )}
      </aside>
    </section>
    </>
  );
}
