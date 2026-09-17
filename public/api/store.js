import { defaultSettings, kennelPhotos, puppies as seedPuppies, testimonials } from "../../src/data/catalog";

const KEY = "eden-canine-store";

function ageWeeks(birthDate) {
  if (!birthDate) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(birthDate)) / (1000 * 60 * 60 * 24 * 7)));
}

function canPurchase(puppy, settings) {
  if (puppy.status === "sold") return false;
  if (puppy.status === "pending" && settings.disablePurchaseWhenPending) return false;
  return puppy.status === "available" || puppy.status === "pending";
}

function withMeta(puppy, settings) {
  return { ...puppy, ageWeeks: ageWeeks(puppy.birthDate), canPurchase: canPurchase(puppy, settings) };
}

function emptyState() {
  return {
    puppies: JSON.parse(JSON.stringify(seedPuppies)),
    orders: [],
    settings: { ...defaultSettings },
    testimonials: JSON.parse(JSON.stringify(testimonials)),
    kennelPhotos: [...kennelPhotos]
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    return emptyState();
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getPublicSettings() {
  const { settings } = load();
  return {
    siteName: settings.siteName || "Eden Canine",
    logo: settings.logo || "",
    whatsapp: settings.whatsapp || "",
    email: settings.email || "hello@eden-canine.fr",
    address: settings.address || "France",
    phone: settings.phone || "",
    hours: settings.hours || "Lun. - Sam. • 9h - 18h",
    socials: settings.socials || { instagram: "", facebook: "" },
    hasWhatsApp: Boolean(String(settings.whatsapp || "").replace(/\D/g, "")),
    languages: settings.languages || ["fr", "en", "de"],
    disablePurchaseWhenPending: !!settings.disablePurchaseWhenPending
  };
}

export function getPuppies() {
  const state = load();
  return state.puppies.map((p) => withMeta(p, state.settings));
}

export function getContent() {
  const state = load();
  return { testimonials: state.testimonials, kennelPhotos: state.kennelPhotos };
}

export function createOrder({ puppyIds, customer, lang = "fr", acceptedTerms }) {
  if (!acceptedTerms) throw new Error("terms");
  if (!customer?.phone) throw new Error("phone");
  const state = load();
  const uniqueIds = [...new Set(puppyIds || [])];
  const selected = uniqueIds.map((id) => state.puppies.find((p) => p.id === id)).filter(Boolean);
  if (!selected.length || selected.some((p) => !canPurchase(p, state.settings))) {
    throw new Error("unavailable");
  }
  const year = new Date().getFullYear();
  const count = state.orders.filter((o) => String(o.orderNumber).includes(String(year))).length + 1;
  const order = {
    id: crypto.randomUUID(),
    orderNumber: `EC-${year}-${String(count).padStart(4, "0")}`,
    puppyIds: selected.map((p) => p.id),
    puppies: selected.map((p) => ({
      id: p.id,
      name: p.name,
      breed: p.breed,
      variety: p.variety,
      sex: p.sex,
      price: p.price,
      photo: p.photos?.[0]
    })),
    total: selected.reduce((sum, p) => sum + Number(p.price), 0),
    status: "whatsapp",
    lang,
    createdAt: new Date().toISOString()
  };
  state.orders.unshift(order);
  state.puppies = state.puppies.map((p) =>
    uniqueIds.includes(p.id) && p.status === "available" ? { ...p, status: "pending" } : p
  );
  save(state);
  const phone = String(state.settings.whatsapp || "").replace(/\D/g, "");
  const message = buildWhatsAppMessage({ order, puppies: selected, customer, lang });
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  return { order, whatsappUrl };
}

function loc(value, lang) {
  return value && typeof value === "object" ? value[lang] || value.fr || "" : value || "";
}

function buildWhatsAppMessage({ order, puppies, customer, lang }) {
  const labels = {
    fr: { hello: "Bonjour, je souhaite acheter le(s) chiot(s) suivant(s) :", puppy: "Chiot", breed: "Race", variety: "Type", sex: "Sexe", price: "Prix", customer: "Informations client", firstName: "Prénom", lastName: "Nom", phone: "Téléphone", email: "Email", country: "Pays", city: "Ville", address: "Adresse", extra: "Message", ref: "Référence de commande", thanks: "Merci de m'indiquer les étapes pour finaliser mon achat.", male: "Mâle", female: "Femelle", "border-collie": "Border Collie", poodle: "Caniche" },
    en: { hello: "Hello, I would like to purchase the following puppy/puppies:", puppy: "Puppy", breed: "Breed", variety: "Type", sex: "Sex", price: "Price", customer: "Customer details", firstName: "First name", lastName: "Last name", phone: "Phone", email: "Email", country: "Country", city: "City", address: "Address", extra: "Message", ref: "Order reference", thanks: "Please let me know the next steps to complete my purchase.", male: "Male", female: "Female", "border-collie": "Border Collie", poodle: "Poodle" },
    de: { hello: "Guten Tag, ich möchte den/die folgenden Welpen kaufen:", puppy: "Welpe", breed: "Rasse", variety: "Typ", sex: "Geschlecht", price: "Preis", customer: "Kundendaten", firstName: "Vorname", lastName: "Nachname", phone: "Telefon", email: "E-Mail", country: "Land", city: "Stadt", address: "Adresse", extra: "Nachricht", ref: "Bestellnummer", thanks: "Bitte teilen Sie mir die nächsten Schritte zur Finalisierung mit.", male: "Rüde", female: "Hündin", "border-collie": "Border Collie", poodle: "Pudel" }
  };
  const t = labels[lang] || labels.fr;
  const lines = [t.hello, ""];
  for (const puppy of puppies) {
    lines.push(`🐶 ${t.puppy} : ${puppy.name}`);
    lines.push(`${t.breed} : ${t[puppy.breed] || puppy.breed}`);
    lines.push(`${t.variety} : ${loc(puppy.variety, lang)}`);
    lines.push(`${t.sex} : ${t[puppy.sex]}`);
    lines.push(`${t.price} : ${Number(puppy.price).toLocaleString("fr-FR")} €`);
    lines.push("");
  }
  lines.push(`👤 ${t.customer} :`);
  lines.push(`${t.firstName} : ${customer.firstName}`);
  lines.push(`${t.lastName} : ${customer.lastName}`);
  lines.push(`${t.phone} : ${customer.phone}`);
  lines.push(`${t.email} : ${customer.email}`);
  lines.push(`${t.country} : ${customer.country}`);
  lines.push(`${t.city} : ${customer.city}`);
  lines.push(`${t.address} : ${customer.address}, ${customer.postalCode}`);
  if (customer.message) lines.push(`${t.extra} : ${customer.message}`);
  lines.push(`${t.ref} : ${order.orderNumber}`);
  lines.push("");
  lines.push(t.thanks);
  return lines.join("\n");
}

export function whatsappHref(text) {
  const phone = String(load().settings.whatsapp || "").replace(/\D/g, "");
  const encoded = text ? `?text=${encodeURIComponent(text)}` : "";
  return phone ? `https://wa.me/${phone}${encoded}` : `https://wa.me/${encoded}`;
}
