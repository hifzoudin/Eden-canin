import { Link } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import LanguageSwitcher from "./LanguageSwitcher";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  const { t } = useI18n();
  const { settings } = useStore();
  const year = new Date().getFullYear();
  const name = settings?.siteName || t.brand;
  const logoSrc = settings?.logo && settings.logo !== "/Gemini_Generated_Image_d25d08d25d08d25d.jpeg" ? settings.logo : "/logo.jpeg";

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark"><img src={logoSrc} alt={name} /></span>
            <span>
              <strong>{name}</strong>
              <em>{t.tagline}</em>
            </span>
          </div>
          <WhatsAppButton />
        </div>
        <div>
          <h4>{t.nav.home}</h4>
          <Link to="/">{t.nav.home}</Link>
          <Link to="/chiots">{t.nav.puppies}</Link>
          <Link to="/a-propos">{t.nav.about}</Link>
          <Link to="/faq">{t.nav.faq}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
        </div>
        <div>
          <h4>{t.nav.breeds}</h4>
          <Link to="/puppies/french-bulldog">French Bulldog Puppies</Link>
          <Link to="/puppies/dachshund">Dachshund Puppies</Link>
          <Link to="/puppies/epagneul-breton">Épagneul Breton</Link>
          <Link to="/puppies/chihuahua">Chihuahua</Link>
        </div>
        <div>
          <h4>{t.nav.contact}</h4>
          <Link to="/confidentialite">{t.footer.privacy}</Link>
          <Link to="/mentions-legales">{t.footer.legal}</Link>
          <Link to="/conditions">{t.footer.terms}</Link>
          <LanguageSwitcher />
        </div>
      </div>
      <p className="copyright">© {year} {name}. {t.footer.rights}</p>
    </footer>
  );
}
