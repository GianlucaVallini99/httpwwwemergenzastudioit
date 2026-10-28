"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  EVENTO_APRI_PREFERENZE,
  attivaAnalytics,
  leggiConsenso,
  ricordaCampagna,
  salvaConsenso,
  suClic,
  type Consenso,
} from "@/lib/analytics";

/**
 * Banner dei cookie (linee guida del Garante privacy, 10 giugno 2021, §7.1):
 * X in alto a destra = rifiuto (restano solo i cookie tecnici), Accetta e
 * Rifiuta con la stessa evidenza, link alla cookie policy, area «Personalizza»
 * con le categorie preimpostate sul no. Non blocca la pagina: sul telefono
 * lascia uno spazio in fondo, così nessun contenuto resta coperto.
 */

const bottone =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 bg-primary text-primary-foreground font-extrabold text-sm shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40";
const chiudi =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40";

/**
 * Se lo spazio degli elementi fissi è più grande della parte visibile dello schermo (contenuto più
 * largo dello schermo, o zoom), aggancia l'elemento alla parte visibile (visualViewport): «basso» per
 * il banner, «pieno» per il pannello delle preferenze. Restituisce la funzione di pulizia.
 */
function agganciaAllaParteVisibile(el: HTMLElement, modo: "basso" | "pieno"): () => void {
  const vv = window.visualViewport;
  if (!vv) return () => {};
  const chiavi = ["left", "right", "top", "bottom", "width", "height"] as const;
  const aggiorna = () => {
    const allargata = window.innerWidth > vv.width + 1 || window.innerHeight > vv.height + 1;
    if (!allargata) {
      for (const k of chiavi) el.style[k] = "";
      return;
    }
    el.style.right = "auto";
    el.style.bottom = "auto";
    if (modo === "pieno") {
      el.style.left = `${vv.offsetLeft}px`;
      el.style.top = `${vv.offsetTop}px`;
      el.style.width = `${vv.width}px`;
      el.style.height = `${vv.height}px`;
      return;
    }
    el.style.width = `${Math.min(vv.width - 24, 440)}px`;
    el.style.left = `${vv.offsetLeft + 12}px`;
    el.style.top = `${vv.offsetTop + vv.height - el.offsetHeight - 12}px`;
  };
  aggiorna();
  vv.addEventListener("resize", aggiorna);
  vv.addEventListener("scroll", aggiorna);
  return () => {
    vv.removeEventListener("resize", aggiorna);
    vv.removeEventListener("scroll", aggiorna);
  };
}

export default function CookieConsent() {
  // undefined = non ancora letto (lato server e primo render): niente banner.
  const [consenso, setConsenso] = useState<Consenso | null | undefined>(undefined);
  const [pannello, setPannello] = useState(false);
  const [altezza, setAltezza] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const daRiattivare = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ricordaCampagna(location.href);
    const c = leggiConsenso(document.cookie);
    // Lettura di un cookie del browser al montaggio: lo stato iniziale non è noto lato server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsenso(c);
    if (c?.statistiche) attivaAnalytics();
    const apri = () => {
      daRiattivare.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPannello(true);
    };
    window.addEventListener(EVENTO_APRI_PREFERENZE, apri);
    document.addEventListener("click", suClic, true);
    return () => {
      window.removeEventListener(EVENTO_APRI_PREFERENZE, apri);
      document.removeEventListener("click", suClic, true);
    };
  }, []);

  const mostraBanner = consenso === null && !pannello;

  // Spazio in fondo alla pagina grande quanto il banner (e il pulsante WhatsApp sale).
  // ResizeObserver chiama subito la callback con la misura iniziale.
  useLayoutEffect(() => {
    const el = bannerRef.current;
    if (!mostraBanner || !el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const h = Math.ceil(r.height) + 12;
      setAltezza(h);
      // Il pulsante WhatsApp (in basso a destra) sale solo se il banner arriva fin lì (telefono).
      if (r.right > window.innerWidth - 110) document.documentElement.style.setProperty("--altezza-banner-cookie", `${h}px`);
      else document.documentElement.style.removeProperty("--altezza-banner-cookie");
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--altezza-banner-cookie");
    };
  }, [mostraBanner]);

  // Su alcune pagine (es. la home sui telefoni) il contenuto è più largo dello schermo e Chrome
  // allarga lo spazio degli elementi fissi oltre la parte visibile: vedi agganciaAllaParteVisibile.
  useEffect(() => {
    const el = bannerRef.current;
    if (!mostraBanner || !el) return;
    return agganciaAllaParteVisibile(el, "basso");
  }, [mostraBanner]);

  const scegli = useCallback((statistiche: boolean) => {
    setConsenso(salvaConsenso(statistiche));
    setPannello(false);
    daRiattivare.current?.focus?.();
  }, []);

  if (consenso === undefined) return null;

  return (
    <>
      {mostraBanner ? (
        // div e non section: globals.css dà position: relative a ogni section (fuori dai layer di Tailwind)
        <div
          ref={bannerRef}
          role="region"
          aria-labelledby="cookie-titolo"
          aria-describedby="cookie-testo"
          data-testid="banner-cookie"
          className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl border border-border bg-card p-4 text-card-foreground shadow-[0_30px_60px_-20px_rgba(21,50,79,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] sm:p-6"
        >
          <div className="flex items-start gap-2">
            <h2 id="cookie-titolo" className="flex-1 pt-2.5 text-base sm:text-lg">
              Cookie solo se vuoi
            </h2>
            <button type="button" onClick={() => scegli(false)} aria-label="Chiudi e continua senza cookie statistici" className={`${chiudi} -mr-1 -mt-1`}>
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <p id="cookie-testo" className="mt-0.5 text-sm text-muted-foreground">
            Usiamo cookie tecnici e, solo se accetti, Google Analytics per contare le visite in forma aggregata. Con la X
            continui senza cookie statistici.{" "}
            <Link href="/cookie-policy" className="font-bold text-secondary underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => scegli(false)} className={bottone}>
              Rifiuta
            </button>
            <button type="button" onClick={() => scegli(true)} className={bottone}>
              Accetta
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              daRiattivare.current = null;
              setPannello(true);
            }}
            className="mt-1 w-full rounded-full py-1.5 text-center text-sm font-bold text-secondary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
          >
            Personalizza
          </button>
        </div>
      ) : null}
      {pannello ? (
        <PannelloPreferenze
          statisticheIniziali={consenso?.statistiche ?? false}
          onScelta={scegli}
          onChiudi={() => {
            setPannello(false);
            daRiattivare.current?.focus?.();
          }}
        />
      ) : null}
      {mostraBanner && altezza ? <div aria-hidden style={{ height: altezza }} /> : null}
    </>
  );
}

function PannelloPreferenze({
  statisticheIniziali,
  onScelta,
  onChiudi,
}: {
  statisticheIniziali: boolean;
  onScelta: (statistiche: boolean) => void;
  onChiudi: () => void;
}) {
  const [statistiche, setStatistiche] = useState(statisticheIniziali);
  const ref = useRef<HTMLDivElement>(null);
  const fondo = useRef<HTMLDivElement>(null);

  useEffect(() => (fondo.current ? agganciaAllaParteVisibile(fondo.current, "pieno") : undefined), []);

  useEffect(() => {
    const el = ref.current;
    el?.querySelector<HTMLElement>("h2")?.focus();
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onChiudi();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const f = [...el.querySelectorAll<HTMLElement>("button, a[href], [role=switch]")].filter((x) => !x.hasAttribute("disabled"));
      if (!f.length) return;
      const primo = f[0]!;
      const ultimo = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === primo) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primo.focus();
      }
    };
    document.addEventListener("keydown", tasto);
    return () => document.removeEventListener("keydown", tasto);
  }, [onChiudi]);

  return (
    <div ref={fondo} className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-deep/50 p-0 sm:items-center sm:p-6" onClick={onChiudi}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferenze-titolo"
        data-testid="preferenze-cookie"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92%] w-full overflow-y-auto rounded-t-3xl border border-border bg-card p-5 text-card-foreground shadow-[0_30px_60px_-20px_rgba(21,50,79,0.45)] sm:max-w-lg sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start gap-2">
          <h2 id="preferenze-titolo" tabIndex={-1} className="flex-1 pt-2 text-xl outline-none">
            Preferenze cookie
          </h2>
          <button type="button" onClick={onChiudi} aria-label="Chiudi senza cambiare le scelte" className={`${chiudi} -mr-2 -mt-1`}>
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Scegli tu. Puoi cambiare idea quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina.{" "}
          <Link href="/cookie-policy" onClick={onChiudi} className="font-bold text-secondary underline underline-offset-2">
            Cookie policy
          </Link>
        </p>

        <ul className="mt-5 divide-y divide-border rounded-2xl border border-border">
          <li className="flex items-start gap-4 p-4">
            <div className="flex-1">
              <p className="font-extrabold text-primary">Tecnici</p>
              <p className="text-sm text-muted-foreground">Servono al sito e ricordano questa scelta. Non tracciano. Sempre attivi.</p>
            </div>
            <Interruttore acceso disabilitato etichetta="Cookie tecnici, sempre attivi" />
          </li>
          <li className="flex items-start gap-4 p-4">
            <div className="flex-1">
              <p className="font-extrabold text-primary">Statistici · Google Analytics 4</p>
              <p className="text-sm text-muted-foreground">
                Contano visite, pagine viste, provenienza (anche dai QR dei volantini) e clic su WhatsApp, telefono e moduli, in
                forma aggregata. Mai i dati che scrivi nei moduli. Fornitore: Google Ireland Ltd.
              </p>
            </div>
            <Interruttore acceso={statistiche} onCambia={setStatistiche} etichetta="Cookie statistici di Google Analytics 4" />
          </li>
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onScelta(false)} className={bottone}>
            Rifiuta tutti
          </button>
          <button type="button" onClick={() => onScelta(true)} className={bottone}>
            Accetta tutti
          </button>
        </div>
        <button
          type="button"
          onClick={() => onScelta(statistiche)}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-primary px-5 py-2 text-sm font-extrabold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
        >
          Salva le scelte
        </button>
      </div>
    </div>
  );
}

function Interruttore({
  acceso,
  onCambia,
  disabilitato,
  etichetta,
}: {
  acceso: boolean;
  onCambia?: (v: boolean) => void;
  disabilitato?: boolean;
  etichetta: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={acceso}
      aria-label={etichetta}
      disabled={disabilitato}
      onClick={() => onCambia?.(!acceso)}
      className={`relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 ${
        acceso ? "bg-accent" : "bg-muted-foreground/40"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${acceso ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}
