import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { formatPrice, loc } from "../translations";

export default function PuppyCard({ puppy }) {
  const { t, lang } = useI18n();
  const { add } = useCart();
  const statusLabel = t.status[puppy.status];

  return (
    <motion.article className="puppy-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Link to={`/chiots/${puppy.slug || puppy.id}`} className="puppy-photo">
        <img src={puppy.photos?.[0]} alt={puppy.name} />
        <span className={`status-pill ${puppy.status}`}>{statusLabel}</span>
      </Link>
      <div className="puppy-card-body">
        <h3>{puppy.name}</h3>
        <p className="meta">
          {t.breedNames[puppy.breed]} · {t.sex[puppy.sex]} · {puppy.ageWeeks} {t.puppies.weeks}
        </p>
        <p className="color">{loc(puppy.color, lang)}</p>
        <p className="price">{formatPrice(puppy.price, lang)}</p>
        <div className="card-actions">
          <Link className="btn btn-ghost" to={`/chiots/${puppy.slug || puppy.id}`}>{t.card.view}</Link>
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
    </motion.article>
  );
}
