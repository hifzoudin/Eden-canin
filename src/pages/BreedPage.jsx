import { Link, useParams } from "react-router-dom";
import PuppyCard from "../components/PuppyCard";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import SEO from "../seo/SEO.jsx";
import { buildBreadcrumbs, getBreedMeta } from "../seo/seo.js";

export default function BreedPage() {
  const { breed } = useParams();
  const { puppies } = useStore();
  const { lang } = useI18n();
  const breedMeta = getBreedMeta(breed, lang);
  const list = puppies.filter((puppy) => puppy.breed === breed && puppy.status !== "cancelled");
  const available = list.filter((puppy) => puppy.status === "available" || puppy.status === "pending");

  return (
    <>
      <SEO
        title={breedMeta.title}
        description={breedMeta.description}
        image={available[0]?.photos?.[0] || puppies[0]?.photos?.[0]}
        path={`/puppies/${breed}`}
        breedSlug={breed}
        breadcrumbs={buildBreadcrumbs({ lang, breedSlug: breed, route: `/puppies/${breed}` })}
      />
      <section className="page puppies-page">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            {buildBreadcrumbs({ lang, breedSlug: breed, route: `/puppies/${breed}` }).map((item, index) => (
              <li key={item.href}>
                {index < buildBreadcrumbs({ lang, breedSlug: breed, route: `/puppies/${breed}` }).length - 1 ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="page-header">
          <h1>{breedMeta.h1}</h1>
          <p>{breedMeta.intro}</p>
        </div>
        <div className="section-heading">
          <h2>{available.length ? "Chiots disponibles" : "Aucun chiot disponible"}</h2>
        </div>
        <div className="puppy-grid">
          {available.length ? available.map((puppy) => <PuppyCard key={puppy.id} puppy={puppy} />) : <p>Aucun chiot actuellement disponible pour cette race.</p>}
        </div>
        <div className="section-heading">
          <h2>Autres races</h2>
        </div>
        <div className="breed-grid">
          <Link className="btn btn-ghost" to="/puppies">Voir tous les chiots</Link>
          <Link className="btn btn-ghost" to="/puppies/border-collie">Voir les Border Collie</Link>
          <Link className="btn btn-ghost" to="/puppies/poodle">Voir les Caniches</Link>
        </div>
      </section>
    </>
  );
}
