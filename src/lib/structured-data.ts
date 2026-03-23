import {
  SITE_NAME, SITE_URL, PHONE_INTL, EMAIL,
  ADDRESS_STREET, ADDRESS_CITY, ADDRESS_PROVINCE, ADDRESS_CAP,
  GEO_LAT, GEO_LNG, ORARI_OPEN, ORARI_CLOSE,
  INSTAGRAM_URL, FACEBOOK_URL,
} from "./constants";

// ── LocalBusiness (global) ──────────────────────────
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    name: SITE_NAME,
    description:
      "Centro ripetizioni e preparazione test a Mogliano Veneto. Ripetizioni individuali e di gruppo per medie, superiori e università. Pacchetti multi-materia flessibili.",
    url: SITE_URL,
    telephone: PHONE_INTL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_CITY,
      addressRegion: ADDRESS_PROVINCE,
      postalCode: ADDRESS_CAP,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LAT,
      longitude: GEO_LNG,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    priceRange: "€16 - €30/ora",
    image: `${SITE_URL}/images/centro-emergenza-studio.jpg`,
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    areaServed: [
      { "@type": "City", name: "Mogliano Veneto" },
      { "@type": "City", name: "Preganziol" },
      { "@type": "City", name: "Casale sul Sile" },
      { "@type": "City", name: "Marcon" },
      { "@type": "City", name: "Quinto di Treviso" },
    ],
  };
}

// ── BreadcrumbList ──────────────────────────────────
export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ── FAQPage ─────────────────────────────────────────
export function faqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── Service + OfferCatalog ──────────────────────────
export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ripetizioni Individuali",
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: "Mogliano Veneto",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pacchetti Ripetizioni",
      itemListElement: [
        { "@type": "Offer", name: "Ripetizioni Elementari", price: "16", priceCurrency: "EUR", unitText: "ora" },
        { "@type": "Offer", name: "Ripetizioni Medie", price: "18", priceCurrency: "EUR", unitText: "ora" },
        { "@type": "Offer", name: "Ripetizioni Superiori", price: "22", priceCurrency: "EUR", unitText: "ora" },
        { "@type": "Offer", name: "Ripetizioni Università", price: "30", priceCurrency: "EUR", unitText: "ora" },
      ],
    },
  };
}

// ── Course ──────────────────────────────────────────
export function courseJsonLd(
  courses: { name: string; description: string; startDate?: string }[]
) {
  return courses.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(c.startDate ? { startDate: c.startDate } : {}),
  }));
}

// ── Article ─────────────────────────────────────────
export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(article.image ? { image: article.image } : {}),
  };
}
