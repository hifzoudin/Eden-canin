import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import LanguageSwitcher from "./LanguageSwitcher";

const breedLinks = [
  { label: "French Bulldog Puppies", to: "/puppies/french-bulldog" },
  { label: "Dachshund Puppies", to: "/puppies/dachshund" },
  { label: "Épagneul Breton", to: "/puppies/epagneul-breton" },
  { label: "Border Collie", to: "/puppies/border-collie" },
  { label: "Poodle", to: "/puppies/poodle" },
  { label: "Chihuahua", to: "/puppies/chihuahua" }
];

export default function Header() {
  const { t } = useI18n();
  const { items } = useCart();
  const { settings } = useStore();
  const [open, setOpen] = useState(false);
  const [breedMenuOpen, setBreedMenuOpen] = useState(false);
  const name = settings?.siteName || t.brand;
  const logoSrc = settings?.logo && settings.logo !== "/Gemini_Generated_Image_d25d08d25d08d25d.jpeg" ? settings.logo : "/logo.jpeg";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={logoSrc} alt={name} />
          <span>
            <strong>{name}</strong>
            <em>{t.tagline}</em>
          </span>
        </Link>
        <button className="nav-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span />
          <span />
        </button>
        <nav className={open ? "open" : ""}>
          <NavLink to="/" onClick={() => setOpen(false)}>{t.nav.home}</NavLink>
          <NavLink to="/chiots" onClick={() => setOpen(false)}>{t.nav.puppies}</NavLink>
          <div className={`breed-menu ${breedMenuOpen ? "open" : ""}`}>
            <button
              type="button"
              className="breed-menu-button"
              onClick={() => setBreedMenuOpen((v) => !v)}
              aria-expanded={breedMenuOpen}
              aria-haspopup="true"
            >
              {t.breeds.title}
            </button>
            <div className="breed-menu-panel">
              {breedLinks.map((breed) => (
                <Link key={breed.to} to={breed.to} onClick={() => { setOpen(false); setBreedMenuOpen(false); }}>
                  {breed.label}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/a-propos" onClick={() => setOpen(false)}>{t.nav.about}</NavLink>
          <NavLink to="/faq" onClick={() => setOpen(false)}>{t.nav.faq}</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>{t.nav.contact}</NavLink>
          <LanguageSwitcher />
          <NavLink to="/panier" className="cart-link" onClick={() => setOpen(false)}>
            {t.nav.cart}
            <span>{items.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
