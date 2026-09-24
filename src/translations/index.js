import de from "./de";
import en from "./en";
import fr from "./fr";

export const dictionaries = { fr, en, de };

export function loc(value, lang = "fr") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] || value.fr || "";
  }
  return value ?? "";
}

export function breedLabel(item, lang, dictionary) {
  return loc(item?.breedName, lang) || dictionary?.breedNames?.[item?.breed] || item?.breed || "";
}

export function formatPrice(value, lang = "fr") {
  const locale = lang === "en" ? "en-GB" : lang === "de" ? "de-DE" : "fr-FR";
  return `${Number(value).toLocaleString(locale)} €`;
}

export function formatDate(value, lang = "fr") {
  if (!value) return "";
  const locale = lang === "en" ? "en-GB" : lang === "de" ? "de-DE" : "fr-FR";
  return new Date(value).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}
