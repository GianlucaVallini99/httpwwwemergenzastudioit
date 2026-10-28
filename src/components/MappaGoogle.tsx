"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Mappa di Google Maps caricata solo su richiesta: l'iframe di Google può
 * impostare cookie di terze parti, quindi prima del clic non parte nessuna
 * richiesta verso Google (vedi /cookie-policy).
 */
export default function MappaGoogle({ src, titolo, indirizzo }: { src: string; titolo: string; indirizzo: string }) {
  const [mostra, setMostra] = useState(false);
  if (mostra) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 400 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={titolo}
      />
    );
  }
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 bg-muted p-8 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_24px_-10px_rgba(21,50,79,0.5)]">
        <MapPin className="h-7 w-7" aria-hidden />
      </span>
      <p className="font-extrabold text-primary">{indirizzo}</p>
      <button
        type="button"
        onClick={() => setMostra(true)}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)] transition-transform hover:-translate-y-0.5"
      >
        Mostra la mappa
      </button>
      <p className="max-w-xs text-xs text-muted-foreground">
        La mappa è di Google Maps: caricandola, Google può impostare i suoi cookie.{" "}
        <Link href="/cookie-policy" className="underline underline-offset-2">
          Cookie policy
        </Link>
      </p>
    </div>
  );
}
