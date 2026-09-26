import { useState } from "react";
import { useI18n } from "../context/LanguageContext";
import { useStore } from "../context/StoreContext";
import { whatsappHref } from "../lib/store";
import SEO from "../seo/SEO.jsx";

export default function Contact() {
  const { t } = useI18n();
  const { settings } = useStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const socials = settings?.socials || {};
  const email = settings?.email || "edencanine@gmail.com";
  const address = settings?.address || "France";
  const hours = settings?.hours || t.contact.hoursDefault;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const lines = [
      "Bonjour,",
      "",
      `${t.contact.form.firstName}: ${form.firstName}`,
      `${t.contact.form.lastName}: ${form.lastName}`,
      `${t.contact.form.email}: ${form.email}`,
      `${t.contact.form.phone}: ${form.phone}`,
      `${t.contact.form.subject}: ${form.subject}`,
      "",
      `${t.contact.form.message}:`,
      form.message || ""
    ];
    const text = lines.join("\n");
    const href = whatsappHref(text, settings?.whatsapp);
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <SEO title="Contact | Eden Canin" description="Contactez Eden Canin par WhatsApp, email ou via notre formulaire pour obtenir des informations sur nos chiots et notre élevage." path="/contact" />
      <section className="page contact-page">
      <header className="contact-header">
        <p className="section-kicker">{t.contact.kicker}</p>
        <h1>{t.contact.title}</h1>
        <p>{t.contact.intro}</p>
      </header>

      <div className="contact-grid">
        <div className="contact-panel">
          <div className="contact-info-list">
            <div className="contact-card">
              <span className="contact-icon">📱</span>
              <div>
                <h3>{t.contact.whatsapp}</h3>
                {settings?.hasWhatsApp ? (
                  <a className="btn btn-whatsapp contact-btn" href={whatsappHref("", settings.whatsapp)} target="_blank" rel="noreferrer">
                    {t.contact.whatsappButton}
                  </a>
                ) : (
                  <p>{t.checkout.whatsappMissing}</p>
                )}
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📧</span>
              <div>
                <h3>{t.contact.email}</h3>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <div>
                <h3>{t.contact.address}</h3>
                <p>{address}</p>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-icon">🕐</span>
              <div>
                <h3>{t.contact.hours}</h3>
                <p>{hours}</p>
              </div>
            </div>

            {Object.entries(socials).filter(([, value]) => value).length > 0 && (
              <div className="contact-card">
                <span className="contact-icon">🌐</span>
                <div>
                  <h3>{t.contact.socials}</h3>
                  <div className="social-links">
                    {Object.entries(socials)
                      .filter(([, value]) => value)
                      .map(([key, value]) => (
                        <a key={key} href={value} target="_blank" rel="noreferrer">
                          {key}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="contact-panel form-panel">
          <h2>{t.contact.form.title}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                <span>{t.contact.form.firstName}</span>
                <input name="firstName" value={form.firstName} onChange={handleChange} />
              </label>
              <label>
                <span>{t.contact.form.lastName}</span>
                <input name="lastName" value={form.lastName} onChange={handleChange} />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>{t.contact.form.email}</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </label>
              <label>
                <span>{t.contact.form.phone}</span>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
              </label>
            </div>

            <label>
              <span>{t.contact.form.subject}</span>
              <input name="subject" value={form.subject} onChange={handleChange} />
            </label>

            <label>
              <span>{t.contact.form.message}</span>
              <textarea name="message" rows="6" value={form.message} onChange={handleChange} />
            </label>

            <button type="submit" className="btn btn-primary contact-submit">
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
