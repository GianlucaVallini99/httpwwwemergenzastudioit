/**
 * Google Analytics 4 con Consent Mode v2, nel modo «base»: gtag.js NON viene
 * caricato finché il visitatore non accetta i cookie statistici (linee guida
 * cookie del Garante privacy, 10 giugno 2021). Prima del consenso il sito non
 * fa nessuna richiesta a Google Analytics e non scrive cookie _ga.
 *
 * - Consenso salvato in un cookie tecnico di prima parte (es_consenso) per 6
 *   mesi: poi il banner si ripresenta (§6.2 delle linee guida). La scelta si
 *   cambia quando si vuole dal link «Preferenze cookie» nel piede.
 * - Al consenso: default «denied» su analytics_storage, ad_storage,
 *   ad_user_data e ad_personalization, poi update «granted» solo per
 *   analytics_storage. Pubblicità e segnali Google restano spenti.
 * - Alla revoca: update «denied», GA disattivato e cookie _ga cancellati.
 * - Eventi (solo con consenso): whatsapp_click, phone_click, email_click,
 *   outbound_click, generate_lead (con form_name). Mai i dati dei moduli: dei
 *   link si manda l'indirizzo senza query string (i link WhatsApp dei moduli
 *   contengono nome e codice fiscale nel testo del messaggio).
 * - UTM dei QR (materiali stampati): ricordati SOLO in memoria (niente
 *   scrittura sul dispositivo prima del consenso), così se il visitatore
 *   accetta dopo aver cambiato pagina la visita resta attribuita alla campagna.
 */
import { GA4_MEASUREMENT_ID } from "./constants";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    [chiave: `ga-disable-${string}`]: boolean | undefined;
  }
}

// ── Consenso ────────────────────────────────────────────────────

export const CONSENSO_COOKIE = "es_consenso";
/** Da aumentare se cambiano i cookie usati: il banner si ripresenta a tutti. */
export const CONSENSO_VERSIONE = 1;
/** 6 mesi (linee guida del Garante, §6.2). */
export const CONSENSO_DURATA_GIORNI = 180;
/** Durata dei cookie _ga: 13 mesi invece dei 2 anni predefiniti. */
export const GA_COOKIE_DURATA_S = 60 * 60 * 24 * 395;
/** Evento della finestra che riapre le preferenze (link nel piede). */
export const EVENTO_APRI_PREFERENZE = "es:preferenze-cookie";

export type Consenso = { v: number; statistiche: boolean; data: string };

export function leggiConsenso(cookie: string): Consenso | null {
  const riga = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CONSENSO_COOKIE}=`));
  if (!riga) return null;
  try {
    const v = JSON.parse(decodeURIComponent(riga.slice(CONSENSO_COOKIE.length + 1))) as Partial<Consenso>;
    if (v.v !== CONSENSO_VERSIONE || typeof v.statistiche !== "boolean" || typeof v.data !== "string") return null;
    return { v: v.v, statistiche: v.statistiche, data: v.data };
  } catch {
    return null;
  }
}

export function cookieConsenso(statistiche: boolean, adesso = new Date(), https = true): string {
  const valore: Consenso = { v: CONSENSO_VERSIONE, statistiche, data: adesso.toISOString() };
  const maxAge = CONSENSO_DURATA_GIORNI * 24 * 60 * 60;
  return `${CONSENSO_COOKIE}=${encodeURIComponent(JSON.stringify(valore))}; Max-Age=${maxAge}; Path=/; SameSite=Lax${https ? "; Secure" : ""}`;
}

export function salvaConsenso(statistiche: boolean): Consenso {
  document.cookie = cookieConsenso(statistiche, new Date(), location.protocol === "https:");
  if (statistiche) attivaAnalytics();
  else disattivaAnalytics();
  return leggiConsenso(document.cookie) ?? { v: CONSENSO_VERSIONE, statistiche, data: new Date().toISOString() };
}

// ── UTM in memoria ──────────────────────────────────────────────

export const PARAMETRI_CAMPAGNA = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"] as const;

let campagnaIngresso: [string, string][] | null = null;

/** Parametri di campagna dell'URL d'ingresso (solo in memoria, mai salvati). */
export function ricordaCampagna(href: string): void {
  if (campagnaIngresso) return;
  const u = new URL(href);
  const trovati = PARAMETRI_CAMPAGNA.flatMap((k) => {
    const v = u.searchParams.get(k);
    return v ? ([[k, v]] as [string, string][]) : [];
  });
  if (trovati.length) campagnaIngresso = trovati;
}

/** URL attuale con gli UTM d'ingresso, se nel frattempo si è cambiata pagina. null = niente da aggiungere. */
export function urlConCampagna(href: string, campagna = campagnaIngresso): string | null {
  if (!campagna?.length) return null;
  const u = new URL(href);
  if (PARAMETRI_CAMPAGNA.some((k) => u.searchParams.has(k))) return null;
  for (const [k, v] of campagna) u.searchParams.set(k, v);
  return u.toString();
}

/** Solo per i test. */
export function _azzeraCampagna(): void {
  campagnaIngresso = null;
}

// ── gtag ────────────────────────────────────────────────────────

let caricato = false;

export function statisticheAttive(): boolean {
  return typeof window !== "undefined" && caricato && window[`ga-disable-${GA4_MEASUREMENT_ID}`] !== true;
}

export function attivaAnalytics(): void {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  if (caricato && window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  // La visita arriva da un QR ma il consenso è dato su un'altra pagina:
  // rimettiamo gli UTM nell'URL, così GA4 attribuisce la sessione alla campagna.
  const conCampagna = urlConCampagna(location.href);
  if (conCampagna) window.history.replaceState(null, "", conCampagna);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js vuole proprio l'oggetto arguments
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: GA_COOKIE_DURATA_S,
    cookie_flags: "SameSite=Lax;Secure",
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  caricato = true;
}

export function disattivaAnalytics(): void {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
  if (caricato && window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
  cancellaCookieGa();
}

/** Domini su cui GA può aver scritto i cookie: l'host e i domini padre. */
export function dominiCookie(host: string): string[] {
  const parti = host.split(".");
  const out: string[] = [];
  for (let i = 0; i < parti.length - 1; i++) out.push(`.${parti.slice(i).join(".")}`);
  return [host, ...out];
}

function cancellaCookieGa(): void {
  const nomi = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]!.trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid" || n.startsWith("_gat"));
  for (const n of nomi) {
    document.cookie = `${n}=; Max-Age=0; Path=/`;
    for (const d of dominiCookie(location.hostname)) document.cookie = `${n}=; Max-Age=0; Path=/; Domain=${d}`;
  }
}

// ── Eventi ──────────────────────────────────────────────────────

export type ParametriEvento = Record<string, string | number | undefined>;

export function traccia(evento: string, parametri: ParametriEvento = {}): void {
  if (!statisticheAttive() || !window.gtag) return;
  const puliti = Object.fromEntries(Object.entries(parametri).filter(([, v]) => v !== undefined && v !== ""));
  window.gtag("event", evento, puliti);
}

/** Invio riuscito di un modulo (iscrizione, contatto). Solo il nome del modulo, mai i dati inseriti. */
export function tracciaLead(modulo: string, parametri: ParametriEvento = {}): void {
  traccia("generate_lead", { form_name: modulo, ...parametri });
}

const HOST_WHATSAPP = new Set(["wa.me", "api.whatsapp.com", "web.whatsapp.com", "whatsapp.com", "www.whatsapp.com", "chat.whatsapp.com"]);

/** Stesso sito: lo stesso host o un sottodominio di emergenza.studio. */
function stessoSito(host: string, hostSito: string): boolean {
  const radice = (h: string) => h.replace(/^www\./, "");
  return radice(host) === radice(hostSito) || host.endsWith(".emergenza.studio") || host === "emergenza.studio";
}

/**
 * Che evento corrisponde al clic su un link. Funzione pura (testata): href
 * assoluto o relativo, hostSito = location.hostname. null = nessun evento.
 */
export function eventoDelLink(href: string, hostSito: string): { evento: string; parametri: ParametriEvento } | null {
  let u: URL;
  try {
    u = new URL(href, `https://${hostSito}/`);
  } catch {
    return null;
  }
  if (u.protocol === "tel:") return { evento: "phone_click", parametri: { link_url: "tel" } };
  if (u.protocol === "mailto:") return { evento: "email_click", parametri: { link_url: "mailto" } };
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  // Mai la query string: nei link WhatsApp dei moduli ci sono nome, telefono e codice fiscale.
  const senzaQuery = `${u.origin}${u.pathname}`;
  if (HOST_WHATSAPP.has(u.hostname)) return { evento: "whatsapp_click", parametri: { link_url: senzaQuery } };
  if (stessoSito(u.hostname, hostSito)) return null;
  return { evento: "outbound_click", parametri: { link_url: senzaQuery, link_domain: u.hostname } };
}

/** Dove sta il link nella pagina: data-ga-posizione, poi header/footer, poi id della sezione. */
export function posizioneDelLink(el: Element): string {
  const marcato = el.closest("[data-ga-posizione]")?.getAttribute("data-ga-posizione");
  if (marcato) return marcato;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const sezione = el.closest("section[id]")?.id;
  return sezione ? `sezione-${sezione}` : "pagina";
}

/** Clic delegato su tutta la pagina (fase di cattura). */
export function suClic(e: MouseEvent): void {
  if (!statisticheAttive()) return;
  const t = e.target;
  if (!(t instanceof Element)) return;
  const a = t.closest("a[href]");
  if (!(a instanceof HTMLAnchorElement)) return;
  const ev = eventoDelLink(a.getAttribute("href") ?? "", location.hostname);
  if (!ev) return;
  const testo = (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  traccia(ev.evento, { ...ev.parametri, link_text: testo, posizione: posizioneDelLink(a), pagina: location.pathname });
}
