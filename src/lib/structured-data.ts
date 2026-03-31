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
    name: "Emergenza Studio",
    alternateName: "Emergenza Studio Centro Ripetizioni",
    description:
      "Centro ripetizioni e doposcuola a Mogliano Veneto. Tutor qualificati per tutte le materie, dalle medie all'università. Pacchetti flessibili, fatturazione regolare e detraibile al 19%.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/images/hero_students.jpg`,
    telephone: PHONE_INTL,
    email: EMAIL,
    priceRange: "€€",
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
      latitude: 45.5607,
      longitude: 12.0545,
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
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    hasMap: "https://www.google.com/maps/place/Emergenza+Studio",
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
