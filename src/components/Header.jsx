import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { loc } from "../translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t, lang } = useI18n();
  const { items } = useCart();
  const { settings, breeds } = useStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [breedMenuOpen, setBreedMenuOpen] = useState(false);
  const name = settings?.siteName || t.brand;
  const logoSrc = settings?.logo && settings.logo !== "/Gemini_Generated_Image_d25d08d25d08d25d.jpeg" ? settings.logo : "/logo.jpeg";
  const onPuppies = location.pathname === "/chiots" || location.pathname === "/puppies";

  // Close the mobile drawer and the breed list together.
  const closeMenus = () => {
    setOpen(false);
    setBreedMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenus}>
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
          <NavLink to="/" onClick={closeMenus}>{t.nav.home}</NavLink>
          <div className={`breed-menu${breedMenuOpen ? " open" : ""}`}>
            <button
              type="button"
              className={`breed-menu-button${onPuppies ? " active" : ""}`}
              aria-expanded={breedMenuOpen}
              aria-haspopup="true"
              onClick={() => {
                // Desktop opens on hover. This click is for the phone menu.
                if (window.matchMedia("(max-width: 900px)").matches) setBreedMenuOpen((v) => !v);
              }}
            >
              {t.nav.puppies}
            </button>
            <div className="breed-menu-panel">
              <Link to="/chiots" onClick={closeMenus}>{t.puppies.all}</Link>
              {(breeds || []).map((breed) => (
                <Link key={breed.slug} to={`/chiots?race=${breed.slug}`} onClick={closeMenus}>
                  {loc(breed.name, lang)}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/a-propos" onClick={closeMenus}>{t.nav.about}</NavLink>
          <NavLink to="/faq" onClick={closeMenus}>{t.nav.faq}</NavLink>
          <NavLink to="/contact" onClick={closeMenus}>{t.nav.contact}</NavLink>
          <LanguageSwitcher />
          <NavLink to="/panier" className="cart-link" onClick={closeMenus}>
            {t.nav.cart}
            <span>{items.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
