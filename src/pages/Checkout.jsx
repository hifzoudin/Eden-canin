import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { createOrder } from "../../public/api/store";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../translations";

export default function Checkout() {
  const { t, lang } = useI18n();
  const { items, total, clear } = useCart();
  const { refresh } = useStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.phone) return setError(t.checkout.phoneRequired);
    if (!form.acceptedTerms) return setError(t.checkout.termsRequired);
    setLoading(true);
    try {
      const data = createOrder({
        puppyIds: items.map((i) => i.id),
        customer: form,
        lang,
        acceptedTerms: form.acceptedTerms
      });
      window.open(data.whatsappUrl, "_blank");
      setDone(data);
      clear();
      refresh();
    } catch {
      setError(t.checkout.error);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <section className="page checkout-page confirmation">
        <h1>{t.checkout.confirmTitle}</h1>
        <p>{t.checkout.confirmText}</p>
        <p>{done.order?.orderNumber}</p>
        <a className="btn btn-whatsapp" href={done.whatsappUrl} target="_blank" rel="noreferrer">
          {t.checkout.whatsapp}
        </a>
        <Link className="btn btn-ghost" to="/chiots">{t.cart.continue}</Link>
      </section>
    );
  }

  return (
    <section className="page checkout-page">
      <h1>{t.checkout.title}</h1>
      <form onSubmit={submit} className="checkout-layout">
        <CheckoutForm t={t} form={form} setForm={setForm} />
        <aside className="summary">
          <h2>{t.checkout.summary}</h2>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>{item.name}</span>
              <small>{t.breedNames[item.breed]} · {t.sex[item.sex]}</small>
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
  );
}
