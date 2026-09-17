export default function CheckoutForm({ t, form, setForm }) {
  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="checkout-form">
      <h2>{t.checkout.customer}</h2>
      <p className="hint">{t.checkout.privateNote}</p>
      <div className="form-grid">
        <label>{t.checkout.firstName}<input required autoComplete="off" value={form.firstName} onChange={update("firstName")} /></label>
        <label>{t.checkout.lastName}<input required autoComplete="off" value={form.lastName} onChange={update("lastName")} /></label>
        <label>{t.checkout.email}<input type="email" required autoComplete="off" value={form.email} onChange={update("email")} /></label>
        <label>{t.checkout.phone}<input type="tel" required autoComplete="off" value={form.phone} onChange={update("phone")} /></label>
        <label>{t.checkout.country}<input required value={form.country} onChange={update("country")} /></label>
        <label>{t.checkout.city}<input required value={form.city} onChange={update("city")} /></label>
        <label className="full">{t.checkout.address}<input required value={form.address} onChange={update("address")} /></label>
        <label>{t.checkout.postalCode}<input required value={form.postalCode} onChange={update("postalCode")} /></label>
        <label className="full">{t.checkout.message}<textarea rows="4" value={form.message} onChange={update("message")} /></label>
      </div>
      <label className="terms">
        <input type="checkbox" checked={form.acceptedTerms} onChange={(e) => setForm((p) => ({ ...p, acceptedTerms: e.target.checked }))} />
        {t.checkout.terms}
      </label>
    </div>
  );
}
