import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildBreadcrumbs, getBreedMeta, getDefaultSeoMetadata } from "./seo.js";

function setMetaTag(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (property) element.setAttribute("property", name);
    else element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content || "");
}

function removeMetaTag(name, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const element = document.head.querySelector(selector);
  if (element) element.remove();
}

function setCanonical(pathname) {
  const href = `https://www.eden-canin.fr${pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/"}`;
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(data) {
  if (!data) return;
  let element = document.head.querySelector('#eden-seo-jsonld');
  if (!element) {
    element = document.createElement("script");
    element.id = "eden-seo-jsonld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data, null, 0);
}

function getHomeMetadata() {
  return {
    title: "Eden Canin | Chiots à vendre – French Bulldog, Dachshund, Poodle & plus",
    description: "Découvrez les chiots disponibles chez Eden Canin : French Bulldog, Dachshund, Épagneul Breton, Border Collie et Poodle. Consultez leurs détails et contactez-nous sur WhatsApp.",
    ogImage: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=1200&q=80",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Eden Canin",
      url: "https://www.eden-canin.fr/",
      logo: "https://www.eden-canin.fr/logo.jpeg",
      sameAs: ["https://wa.me/", "https://www.instagram.com/"],
      contactPoint: [{
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["French", "English", "German"],
        url: "https://www.eden-canin.fr/contact"
      }]
    }
  };
}

export default function SEO({ title, description, image, type = "website", path, noIndex = false, schema, breedSlug, puppy, breadcrumbs }) {
  const location = useLocation();

  useEffect(() => {
    const pathname = path || location.pathname;
    const resolvedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
    const defaults = getHomeMetadata();
    const resolvedTitle = title || defaults.title;
    const resolvedDescription = description || defaults.description;
    const resolvedImage = image || defaults.ogImage;
    const resolvedType = type || "website";

    document.title = resolvedTitle;
    setMetaTag("description", resolvedDescription);
    setMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setCanonical(resolvedPath);
    setMetaTag("og:title", resolvedTitle, true);
    setMetaTag("og:description", resolvedDescription, true);
    setMetaTag("og:type", resolvedType, true);
    setMetaTag("og:url", `https://www.eden-canin.fr${resolvedPath}`, true);
    setMetaTag("og:image", resolvedImage, true);
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", resolvedTitle);
    setMetaTag("twitter:description", resolvedDescription);
    setMetaTag("twitter:image", resolvedImage);

    if (breedSlug) {
      const breedMeta = getBreedMeta(breedSlug, "fr");
      const breedSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: (breadcrumbs || buildBreadcrumbs({ lang: "fr", breedSlug, route: resolvedPath })).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `https://www.eden-canin.fr${item.href}`
        }))
      };
      setJsonLd(breedSchema);
    } else if (puppy) {
      const availability = puppy.status === "available" ? "InStock" : puppy.status === "pending" ? "PreOrder" : "OutOfStock";
      const puppySchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${puppy.name} – ${puppy.breed ? puppy.breed.replace(/-/g, " ") : "Puppy"}`,
        description: puppy.description?.fr || puppy.description?.en || "Puppy available at Eden Canin.",
        image: (puppy.photos || []).slice(0, 5),
        brand: { "@type": "Brand", name: "Eden Canin" },
        sku: puppy.id,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: Number(puppy.price || 0),
          availability: `https://schema.org/${availability}`,
          url: `https://www.eden-canin.fr${resolvedPath}`
        }
      };
      setJsonLd(puppySchema);
    } else if (schema) {
      setJsonLd(schema);
    } else {
      setJsonLd(defaults.schema);
    }

    return () => {
      removeMetaTag("description");
      removeMetaTag("robots");
      removeMetaTag("og:title", true);
      removeMetaTag("og:description", true);
      removeMetaTag("og:type", true);
      removeMetaTag("og:url", true);
      removeMetaTag("og:image", true);
      removeMetaTag("twitter:card");
      removeMetaTag("twitter:title");
      removeMetaTag("twitter:description");
      removeMetaTag("twitter:image");
      const script = document.head.querySelector("#eden-seo-jsonld");
      if (script) script.remove();
    };
  }, [breedSlug, description, image, location.pathname, noIndex, path, puppy, title, type]);

  return null;
}
