import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useCart } from "./context/CartContext";
import { useI18n } from "./context/LanguageContext";
import { useStore } from "./context/StoreContext";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import { Legal, Privacy, Terms } from "./pages/Legal";
import Puppies from "./pages/Puppies";
import PuppyDetails from "./pages/PuppyDetails";
import { whatsappHref } from "./lib/store";

export default function App() {
  const location = useLocation();
  const { message, setMessage } = useCart();
  const { t } = useI18n();
  const { settings, error } = useStore();

  return (
    <>
      <Header />
      {error && (
        <p className="warn" style={{ margin: "16px auto", maxWidth: 720 }}>
          {error === "config"
            ? "Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY, puis redémarrez."
            : "Impossible de charger le catalogue."}
        </p>
      )}
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/chiots" element={<Puppies />} />
              <Route path="/chiots/:id" element={<PuppyDetails />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/commande" element={<Checkout />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/confidentialite" element={<Privacy />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/conditions" element={<Terms />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      {settings?.hasWhatsApp && (
        <a className="floating-wa" href={whatsappHref("", settings.whatsapp)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          WA
        </a>
      )}
      {message && (
        <button type="button" className="toast" onClick={() => setMessage("")}>
          {t.toast[message] || message}
        </button>
      )}
    </>
  );
}
