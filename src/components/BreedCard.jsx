import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "../context/LanguageContext";

export default function BreedCard({ breed, image, title, text, to }) {
  const { t } = useI18n();
  return (
    <motion.article className="breed-card" whileHover={{ y: -6 }} transition={{ duration: 0.35 }}>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link className="btn btn-dark" to={to}>{t.breeds.discover}</Link>
      </div>
    </motion.article>
  );
}
