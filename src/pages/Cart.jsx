import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import SEO from "../seo/SEO.jsx";
import { formatPrice } from "../translations";

export default function Cart() {
  const { t, lang } = useI18n();
  const { items, total } = useCart();
  const { puppies } = useStore();
  const blocked = items.some((item) => {
    const live = puppies.find((p) => p.id === item.id);
    return live && !live.canPurchase;
  });

  return (
    <>
      <SEO title="Panier | Eden Canin" description="Votre panier Eden Canin. Consultez les chiots sélectionnés avant de passer la commande via WhatsApp." path="/panier" noIndex />
      <section className="page cart-page">
      <h1>{t.cart.title}</h1>
      {items.length === 0 ? (
        <p className="empty">{t.cart.empty}</p>
      ) : (
        <>
          <p className="hint">{t.cart.unique}</p>
          {items.map((item) => (
            <CartItem key={item.id} item={item} livePuppy={puppies.find((p) => p.id === item.id)} />
          ))}
          {blocked && <p className="warn">{t.cart.blocked}</p>}
          <div className="cart-total">
            <span>{t.cart.total}</span>
            <strong>{formatPrice(total, lang)}</strong>
          </div>
          <div className="cart-actions">
            <Link className="btn btn-ghost" to="/chiots">{t.cart.continue}</Link>
            <Link className={`btn btn-primary ${blocked ? "disabled-link" : ""}`} to={blocked ? "#" : "/commande"}>
              {t.cart.checkout}
            </Link>
          </div>
        </>
      )}
    </section>
    </>
  );
}
