"use client";

import { useState } from "react";
import {
  PRICING, PACKAGE_MIN_LESSONS, DETRAZIONE_ALIQUOTA, DETRAZIONE_MASSIMALE, PHONE_INTL,
} from "@/lib/constants";
import { MessageCircle } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("it-IT", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function PreventivoCalculator() {
  const [livello, setLivello] = useState<(typeof PRICING)[number]["level"]>("Superiori");
  const [lezioni, setLezioni] = useState(10);

  const row = PRICING.find((p) => p.level === livello)!;
  const isPacchetto = lezioni >= PACKAGE_MIN_LESSONS;
  const prezzoOra = isPacchetto ? row.pacchetto : row.individuale;
  const totale = prezzoOra * lezioni;
  const spesaDetraibile = Math.min(totale, DETRAZIONE_MASSIMALE);
  const detrazione = spesaDetraibile * DETRAZIONE_ALIQUOTA;
  const costoEffettivo = totale - detrazione;

  const whatsappPreventivo = `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(
    `Ciao! Vorrei un preventivo per ${lezioni} lezioni (livello ${livello}). Ho calcolato sul sito un totale indicativo di €${fmt(totale)}.`
  )}`;

  return (
    <div className="bg-card rounded-[32px] p-8 md:p-10 border border-border shadow-[0_30px_60px_-30px_rgba(21,50,79,0.25)]">
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div>
          <label htmlFor="livello" className="block text-sm font-bold text-foreground mb-2">
            Livello scolastico
          </label>
          <select
            id="livello"
            value={livello}
            onChange={(e) => setLivello(e.target.value as typeof livello)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {PRICING.map((p) => (
              <option key={p.level} value={p.level}>{p.level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lezioni" className="block text-sm font-bold text-foreground mb-2">
            Numero di lezioni (da 1 ora)
          </label>
          <input
            id="lezioni"
            type="number"
            min={1}
            max={200}
            value={lezioni}
            onChange={(e) => setLezioni(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {isPacchetto ? (
        <p className="text-sm font-semibold text-accent mb-6">
          ✓ Con {PACKAGE_MIN_LESSONS} o più lezioni si applica la tariffa pacchetto: €{row.pacchetto}/h invece di €{row.individuale}/h.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground mb-6">
          Con almeno {PACKAGE_MIN_LESSONS} lezioni si attiva la tariffa pacchetto (€{row.pacchetto}/h invece di €{row.individuale}/h).
        </p>
      )}

      <div className="rounded-2xl bg-muted p-6 mb-6 space-y-3">
        <div className="flex justify-between text-sm font-semibold text-foreground/80">
          <span>Tariffa oraria applicata</span>
          <span>€{fmt(prezzoOra)}/h</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-primary border-t border-border pt-3">
          <span>Totale ({lezioni} {lezioni === 1 ? "lezione" : "lezioni"})</span>
          <span>€{fmt(totale)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-secondary">
          <span>Detrazione 19% a fine anno{totale > DETRAZIONE_MASSIMALE ? ` (su massimale di €${fmt(DETRAZIONE_MASSIMALE)})` : ""}</span>
          <span>−€{fmt(detrazione)}</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-secondary border-t border-border pt-3">
          <span>Costo effettivo dopo la detrazione</span>
          <span>€{fmt(costoEffettivo)}</span>
        </div>
      </div>

      {totale > DETRAZIONE_MASSIMALE && (
        <p className="text-xs text-muted-foreground mb-6">
          La detrazione si applica fino a un massimale di spesa di €{fmt(DETRAZIONE_MASSIMALE)} annui per studente:
          la detrazione massima recuperabile è di €{fmt(DETRAZIONE_MASSIMALE * DETRAZIONE_ALIQUOTA)}.
        </p>
      )}

      <a
        href={whatsappPreventivo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <MessageCircle className="w-5 h-5" /> Richiedi questo preventivo
      </a>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Il calcolo è indicativo e non costituisce consulenza fiscale: la detraibilità effettiva
        dipende dalla situazione del contribuente. Verifica con il tuo commercialista o CAF.
      </p>
    </div>
  );
}
