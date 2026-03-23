// ── Site-wide constants ────────────────────────────
export const SITE_NAME = "Emergenza Studio - Centro Ripetizioni";
export const SITE_URL = "https://emergenza.studio";
export const PHONE = "340 510 6467";
export const PHONE_INTL = "+393405106467";
export const EMAIL = "emergenza.studio26@gmail.com";
export const ADDRESS_STREET = "Via Francesco Barbiero 84g";
export const ADDRESS_CITY = "Mogliano Veneto";
export const ADDRESS_PROVINCE = "TV";
export const ADDRESS_CAP = "31021";
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_CITY} (${ADDRESS_PROVINCE})`;
export const PIVA = "P.IVA 05611010264";
export const ORARI = "Lun–Ven: 9:00–12:00 / 14:00–19:00 · Sab: 9:00–13:00";
export const ORARI_OPEN = "09:00";
export const ORARI_CLOSE = "19:00";
export const GEO_LAT = "45.5559";
export const GEO_LNG = "12.2429";

export const INSTAGRAM_URL = "https://www.instagram.com/emergenza_studio/";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100091858177275";

export const WHATSAPP_URL = `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(
  "Ciao! Vorrei informazioni sulle ripetizioni a Emergenza Studio"
)}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Materie", href: "/materie" },
  { label: "Corsi Serali", href: "/corsi-serali" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/contatti" },
];

export const PRICES = [
  { level: "Elementari", price: 16 },
  { level: "Medie", price: 18 },
  { level: "Superiori", price: 22 },
  { level: "Università", price: 30 },
];
