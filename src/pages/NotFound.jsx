import { Link } from "react-router-dom";
import SEO from "../seo/SEO.jsx";

export default function NotFound() {
  return (
    <section className="page">
      <SEO title="Page introuvable | Eden Canin" description="La page recherchée n’est plus disponible ou n’existe pas sur le site Eden Canin." noIndex />
      <h1>Page introuvable</h1>
      <p>La page demandée n’existe plus ou a été déplacée.</p>
      <Link className="btn btn-primary" to="/">Retour à l’accueil</Link>
    </section>
  );
}
