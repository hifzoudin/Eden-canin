import { supabase, supabaseConfigured } from "./supabase";

function ageWeeks(birthDate) {
  if (!birthDate) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(birthDate)) / (1000 * 60 * 60 * 24 * 7)));
}

function canPurchase(puppy, settings) {
  if (puppy.status === "sold" || puppy.status === "cancelled") return false;
  if (puppy.status === "pending" && settings.disablePurchaseWhenPending) return false;
  return puppy.status === "available" || puppy.status === "pending";
}

function assertConfigured() {
  if (!supabaseConfigured) throw new Error("config");
}

export async function getPublicSettings() {
  assertConfigured();
  const { data, error } = await supabase.from("public_settings").select("*").single();
  if (error) throw error;
  const whatsapp = data.whatsapp || "";
  return {
    siteName: data.site_name || "Eden Canine",
    logo: data.logo_url || "/logo.jpeg",
    whatsapp,
    email: data.email || "",
    address: data.address || "",
    phone: data.phone || "",
    hours: data.hours || "",
    socials: { instagram: data.instagram || "", facebook: data.facebook || "" },
    hasWhatsApp: Boolean(String(whatsapp).replace(/\D/g, "")),
    languages: data.languages || ["fr", "en", "de"],
    disablePurchaseWhenPending: !!data.disable_purchase_when_pending
  };
}

function mapPuppy(row, settings) {
  const photos = [...(row.puppy_photos || [])].sort((a, b) => a.sort_order - b.sort_order).map((photo) => photo.url);
  const parents = {};
  for (const parent of row.puppy_parents || []) {
    parents[parent.role] = { name: parent.name, info: parent.info, photo: parent.photo_url };
  }
  const puppy = {
    id: row.id,
    slug: row.slug,
    name: row.name,
    breed: row.breeds?.slug || "",
    breedName: row.breeds?.name || {},
    variety: row.variety,
    sex: row.sex,
    birthDate: row.birth_date,
    color: row.color,
    size: row.size,
    weight: row.weight,
    personality: row.personality,
    description: row.description,
    health: row.health,
    vaccinations: row.vaccinations,
    identification: row.identification,
    pedigree: row.pedigree,
    location: row.location,
    price: Number(row.price),
    status: row.status,
    photos,
    parents
  };
  return { ...puppy, ageWeeks: ageWeeks(puppy.birthDate), canPurchase: canPurchase(puppy, settings) };
}

export async function getPuppies() {
  assertConfigured();
  const settings = await getPublicSettings();
  const { data, error } = await supabase
    .from("puppies")
    .select("*, breeds(slug, name), puppy_photos(url, sort_order), puppy_parents(role, name, info, photo_url)")
    .neq("status", "cancelled")
    .order("name");
  if (error) throw error;
  return (data || []).map((row) => mapPuppy(row, settings));
}

export async function getBreeds() {
  assertConfigured();
  const { data, error } = await supabase.from("breeds").select("slug, name, image_url, sort_order").order("sort_order");
  if (error) throw error;
  return (data || []).map((breed) => ({
    id: breed.slug,
    slug: breed.slug,
    name: breed.name,
    image: breed.image_url
  }));
}

export async function getContent() {
  assertConfigured();
  const [testimonials, photos] = await Promise.all([
    supabase.from("testimonials").select("*").eq("published", true).order("sort_order"),
    supabase.from("gallery_photos").select("*").eq("category", "breeding").order("sort_order")
  ]);
  if (testimonials.error) throw testimonials.error;
  if (photos.error) throw photos.error;
  return {
    testimonials: (testimonials.data || []).map((item) => ({
      id: item.id,
      name: item.name,
      city: item.city,
      puppy: item.puppy_name,
      rating: item.rating,
      photo: item.photo_url,
      text: item.text
    })),
    kennelPhotos: (photos.data || []).map((item) => item.url)
  };
}

function loc(value, lang) {
  return value && typeof value === "object" ? value[lang] || value.fr || "" : value || "";
}

export function buildWhatsAppMessage({ orderNumber, puppies, customer, lang }) {
  const labels = {
    fr: { hello: "Bonjour, je souhaite acheter le(s) chiot(s) suivant(s) :", puppy: "Chiot", breed: "Race", variety: "Type", sex: "Sexe", price: "Prix", customer: "Informations client", firstName: "Prénom", lastName: "Nom", phone: "Téléphone", email: "Email", country: "Pays", city: "Ville", address: "Adresse", extra: "Message", ref: "Référence de commande", thanks: "Merci de m'indiquer les étapes pour finaliser mon achat.", male: "Mâle", female: "Femelle" },
    en: { hello: "Hello, I would like to purchase the following puppy/puppies:", puppy: "Puppy", breed: "Breed", variety: "Type", sex: "Sex", price: "Price", customer: "Customer details", firstName: "First name", lastName: "Last name", phone: "Phone", email: "Email", country: "Country", city: "City", address: "Address", extra: "Message", ref: "Order reference", thanks: "Please let me know the next steps to complete my purchase.", male: "Male", female: "Female" },
    de: { hello: "Guten Tag, ich möchte den/die folgenden Welpen kaufen:", puppy: "Welpe", breed: "Rasse", variety: "Typ", sex: "Geschlecht", price: "Preis", customer: "Kundendaten", firstName: "Vorname", lastName: "Nachname", phone: "Telefon", email: "E-Mail", country: "Land", city: "Stadt", address: "Adresse", extra: "Nachricht", ref: "Bestellnummer", thanks: "Bitte teilen Sie mir die nächsten Schritte zur Finalisierung mit.", male: "Rüde", female: "Hündin" }
  };
  const breedNames = {
    fr: { "border-collie": "Border Collie", poodle: "Caniche" },
    en: { "border-collie": "Border Collie", poodle: "Poodle" },
    de: { "border-collie": "Border Collie", poodle: "Pudel" }
  };
  const t = labels[lang] || labels.fr;
  const names = breedNames[lang] || breedNames.fr;
  const lines = [t.hello, ""];
  for (const puppy of puppies) {
    lines.push(`🐶 ${t.puppy} : ${puppy.name}`);
    lines.push(`${t.breed} : ${loc(puppy.breedName, lang) || names[puppy.breed] || puppy.breed}`);
    lines.push(`${t.variety} : ${loc(puppy.variety, lang)}`);
    lines.push(`${t.sex} : ${t[puppy.sex] || puppy.sex}`);
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
  lines.push(`${t.ref} : ${orderNumber}`);
  lines.push("");
  lines.push(t.thanks);
  return lines.join("\n");
}

export async function createOrder({ puppyIds, customer, lang = "fr", acceptedTerms, catalog = [] }) {
  assertConfigured();
  const settings = await getPublicSettings();
  const phone = String(settings.whatsapp || "").replace(/\D/g, "");
  if (!phone) {
    const error = new Error("whatsapp");
    throw error;
  }
  const selected = puppyIds.map((id) => catalog.find((puppy) => puppy.id === id)).filter(Boolean);
  const draft = buildWhatsAppMessage({
    orderNumber: "__ORDER_NUMBER__",
    puppies: selected,
    customer,
    lang
  });
  const { data, error } = await supabase.rpc("create_order", {
    p_puppy_ids: puppyIds,
    p_first_name: customer.firstName,
    p_last_name: customer.lastName,
    p_email: customer.email,
    p_phone: customer.phone,
    p_country: customer.country,
    p_city: customer.city,
    p_address: customer.address,
    p_postal_code: customer.postalCode,
    p_message: customer.message || "",
    p_lang: lang,
    p_accepted_terms: acceptedTerms,
    p_whatsapp_text: draft
  });
  if (error) throw error;
  const text = data.whatsapp_text || draft.replace("__ORDER_NUMBER__", data.order_number);
  return {
    order: { id: data.id, orderNumber: data.order_number, total: data.total },
    whatsappUrl: `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  };
}

export function whatsappHref(text, whatsappNumber) {
  const phone = String(whatsappNumber || "").replace(/\D/g, "");
  if (!phone) return "";
  const encoded = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${phone}${encoded}`;
}
