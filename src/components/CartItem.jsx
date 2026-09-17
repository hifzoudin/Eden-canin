import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/LanguageContext";
import { formatPrice } from "../translations";

export default function CartItem({ item, livePuppy }) {
  const { t, lang } = useI18n();
  const { remove } = useCart();
  const status = livePuppy?.status || item.status;
  const canPurchase = livePuppy ? livePuppy.canPurchase : status === "available";

  return (
    <article className="cart-item">
      <img src={item.photo} alt={item.name} />
      <div>
        <h3><Link to={`/chiots/${item.id}`}>{item.name}</Link></h3>
        <p>{t.breedNames[item.breed]} · {t.sex[item.sex]}</p>
        <p className={`status-pill ${status}`}>{t.status[status]}</p>
        {!canPurchase && <p className="warn">{t.cart.unavailableItem}</p>}
        <p>{t.cart.quantity}: 1</p>
      </div>
      <div className="cart-item-price">
        <p>{formatPrice(item.price, lang)}</p>
        <p>{t.cart.subtotal}: {formatPrice(item.price, lang)}</p>
        <button type="button" className="linkish" onClick={() => remove(item.id)}>{t.cart.remove}</button>
      </div>
    </article>
  );
}
