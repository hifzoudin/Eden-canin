import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_OG_IMAGE, SITE_URL, buildBreadcrumbs, getBreedMeta, getDefaultSeoMetadata } from "./seo.js";

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
  const href = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/"}`;
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setAlternateLanguageLink(hreflang, href) {
  const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(data) {
  if (!data) return;
  let element = document.head.querySelector("#eden-seo-jsonld");
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
    title: "Eden Canin | Chiots à vendre – French Bulldog, Dachshund, Border Collie, Caniche",
    description: "Découvrez les chiots disponibles chez Eden Canin : French Bulldog, Dachshund, Border Collie, Caniche et Épagneul Breton. Consultez leurs détails et contactez-nous directement.",
    ogImage: DEFAULT_OG_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Eden Canin",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.jpeg`,
          sameAs: ["https://wa.me/33746426294", "https://www.instagram.com/"],
          contactPoint: [{
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["French", "English", "German"],
            telephone: "+33746426294",
            url: `${SITE_URL}/contact`
          }],
          areaServed: "France"
        },
        {
          "@type": "WebSite",
          name: "Eden Canin",
          url: SITE_URL,
          inLanguage: ["fr", "en", "de"],
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/puppies?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      ]
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
    const finalUrl = `${SITE_URL}${resolvedPath}`;

    document.title = resolvedTitle;
    document.documentElement.lang = "fr";
    setMetaTag("description", resolvedDescription);
    setMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setCanonical(resolvedPath);
    setMetaTag("og:title", resolvedTitle, true);
    setMetaTag("og:description", resolvedDescription, true);
    setMetaTag("og:type", resolvedType, true);
    setMetaTag("og:url", finalUrl, true);
    setMetaTag("og:image", resolvedImage, true);
    setMetaTag("og:site_name", "Eden Canin", true);
    setMetaTag("og:locale", "fr_FR", true);
    setMetaTag("og:locale:alternate", "fr_FR, en_US, de_DE", true);
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", resolvedTitle);
    setMetaTag("twitter:description", resolvedDescription);
    setMetaTag("twitter:image", resolvedImage);
    setMetaTag("twitter:site", "@EdenCanin");
    setAlternateLanguageLink("fr", finalUrl);
    setAlternateLanguageLink("en", finalUrl);
    setAlternateLanguageLink("de", finalUrl);
    setAlternateLanguageLink("x-default", finalUrl);

    if (breedSlug) {
      const breadcrumbItems = (breadcrumbs || buildBreadcrumbs({ lang: "fr", breedSlug, route: resolvedPath })).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `${SITE_URL}${item.href}`
      }));
      setJsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems
      });
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
          url: finalUrl
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
      removeMetaTag("og:site_name", true);
      removeMetaTag("og:locale", true);
      removeMetaTag("og:locale:alternate", true);
      removeMetaTag("twitter:card");
      removeMetaTag("twitter:title");
      removeMetaTag("twitter:description");
      removeMetaTag("twitter:image");
      removeMetaTag("twitter:site");
      const alternates = document.head.querySelectorAll('link[rel="alternate"]');
      alternates.forEach((link) => link.remove());
      const script = document.head.querySelector("#eden-seo-jsonld");
      if (script) script.remove();
    };
  }, [breedSlug, description, image, location.pathname, noIndex, path, puppy, title, type]);

  return null;
}
