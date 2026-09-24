import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { createOrder } from "../lib/store";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { breedLabel, formatPrice } from "../translations";
import SEO from "../seo/SEO.jsx";

export default function Checkout() {
  const { t, lang } = useI18n();
  const { items, total, clear } = useCart();
  const { refresh, puppies, settings } = useStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+34678908754",
    country: "France",
    city: "",
    address: "",
    postalCode: "",
    message: "",
    acceptedTerms: false
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && !done) return <Navigate to="/panier" replace />;

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.phone) return setError(t.checkout.phoneRequired);
    if (!form.acceptedTerms) return setError(t.checkout.termsRequired);
    if (!settings?.hasWhatsApp) return setError(t.checkout.whatsappMissing);
    setLoading(true);
    try {
      const data = await createOrder({
        puppyIds: items.map((i) => i.id),
        customer: form,
        lang,
        acceptedTerms: form.acceptedTerms,
        catalog: puppies
      });
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      setDone(data);
      clear();
      refresh();
    } catch (err) {
      setError(err?.message === "whatsapp" ? t.checkout.whatsappMissing : t.checkout.error);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <>
        <SEO title="Commande | Eden Canin" description="Préparez votre commande Eden Canin et finalisez le paiement via WhatsApp." path="/commande" noIndex />
        <section className="page checkout-page confirmation">
        <h1>{t.checkout.confirmTitle}</h1>
        <p>{t.checkout.confirmText}</p>
        <p>{done.order?.orderNumber}</p>
        <a className="btn btn-whatsapp" href={done.whatsappUrl} target="_blank" rel="noreferrer">
          {t.checkout.whatsapp}
        </a>
        <Link className="btn btn-ghost" to="/chiots">{t.cart.continue}</Link>
      </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Commande | Eden Canin" description="Préparez votre commande Eden Canin et finalisez le paiement via WhatsApp." path="/commande" noIndex />
      <section className="page checkout-page">
      <h1>{t.checkout.title}</h1>
      <form onSubmit={submit} className="checkout-layout">
        <CheckoutForm t={t} form={form} setForm={setForm} />
        <aside className="summary">
          <h2>{t.checkout.summary}</h2>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>{item.name}</span>
              <small>{breedLabel(puppies.find((puppy) => puppy.id === item.id) || item, lang, t)} · {t.sex[item.sex]}</small>
              <strong>{formatPrice(item.price, lang)}</strong>
            </div>
          ))}
          <p className="summary-total">{t.cart.total}: {formatPrice(total, lang)}</p>
          <p className="hint">{t.checkout.privateNote}</p>
          {error && <p className="warn">{error}</p>}
          <button className="btn btn-whatsapp" type="submit" disabled={loading}>
            {t.checkout.whatsapp}
          </button>
        </aside>
      </form>
    </section>
    </>
  );
}
