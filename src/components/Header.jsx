import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useI18n();
  const { items } = useCart();
  const { settings } = useStore();
  const [open, setOpen] = useState(false);
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
          <NavLink to="/chiots?race=border-collie" onClick={() => setOpen(false)}>{t.breeds.border}</NavLink>
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
