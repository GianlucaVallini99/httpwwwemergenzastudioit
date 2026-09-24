"use client";

import { useState } from "react";
import { PHONE_INTL } from "@/lib/constants";
import {
  CLASSI_SETTEMBRE,
  GIORNI_PREFERITI_MIN,
  GIORNI_SETTIMANA,
  INDIRIZZI_SCOLASTICI,
  SEMPRE_DRITTO,
} from "@/lib/corsi-data";
import { CheckCircle, Loader2, Send } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-border bg-muted/60 px-4 py-3.5 text-base font-semibold text-foreground placeholder:font-medium placeholder:text-muted-foreground/60 transition-all duration-300 focus:outline-none focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/15";

const labelCls = "block text-sm font-medium text-foreground mb-1";

// Sempre Dritto è un corso delle superiori: la scuola media non è un'opzione.
const INDIRIZZI = INDIRIZZI_SCOLASTICI.filter((i) => i !== "Scuola media");

const EMPTY = {
  nome: "",
  cognome: "",
  annoScolastico: "",
  indirizzoAccademico: "",
  telefono: "",
  email: "",
};

export default function SempreDrittoForm({
  corso,
  corsoSlug,
  annoScolasticoDefault = "",
}: {
  corso: string;
  corsoSlug: string;
  annoScolasticoDefault?: string;
}) {
  const [data, setData] = useState({ ...EMPTY, annoScolastico: annoScolasticoDefault });
  const [giorni, setGiorni] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setData({ ...data, [field]: e.target.value });

  // L'ordine dei giorni scelti non conta: li rimettiamo sempre da lunedì a
  // venerdì, così arrivano leggibili nel gestionale.
  const giorniOrdinati = GIORNI_SETTIMANA.filter((g) => giorni.includes(g));
  const mancanti = GIORNI_PREFERITI_MIN - giorni.length;

  const toggleGiorno = (g: string) =>
    setGiorni((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const whatsappFallbackUrl = () => {
    const lines = [
      `Iscrizione — ${corso}`,
      `Nome: ${data.nome}`,
      `Cognome: ${data.cognome}`,
      `Anno scolastico: ${data.annoScolastico}`,
      `Indirizzo accademico: ${data.indirizzoAccademico}`,
      `Telefono: ${data.telefono}`,
      `Giorni preferiti: ${giorniOrdinati.join(", ")}`,
      ...(data.email ? [`Email: ${data.email}`] : []),
    ];
    return `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (giorni.length < GIORNI_PREFERITI_MIN) {
      setError(`Indica almeno ${GIORNI_PREFERITI_MIN} giorni disponibili: ci servono per formare i gruppi.`);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/iscrizioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          corso,
          corsoSlug,
          materia: SEMPRE_DRITTO.materia,
          nome: data.nome,
          cognome: data.cognome,
          telefono: data.telefono,
          email: data.email,
          // L'anno scolastico viaggia nel campo classe: è quello su cui il
          // gestionale filtra le iscrizioni.
          classeSettembre: data.annoScolastico,
          indirizzoScolastico: data.indirizzoAccademico,
          giorniPreferiti: giorniOrdinati,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Invio non riuscito");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Invio non riuscito");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-accent/10 border border-accent/20 p-6 sm:p-8 text-center">
        <span className="inline-flex w-14 h-14 rounded-full bg-accent/15 text-accent items-center justify-center mb-4">
          <CheckCircle className="w-7 h-7" />
        </span>
        <p className="text-lg font-extrabold text-accent mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Iscrizione registrata
        </p>
        <p className="text-muted-foreground">
          Abbiamo salvato la tua richiesta per <strong>{corso}</strong>. Ti
          ricontattiamo entro 24 ore per confermare il giorno del gruppo e i
          dettagli di pagamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className={labelCls}>Nome</label>
          <input type="text" id="nome" required autoComplete="given-name" value={data.nome} onChange={set("nome")} className={inputCls} placeholder="Il tuo nome" />
        </div>
        <div>
          <label htmlFor="cognome" className={labelCls}>Cognome</label>
          <input type="text" id="cognome" required autoComplete="family-name" value={data.cognome} onChange={set("cognome")} className={inputCls} placeholder="Il tuo cognome" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="annoScolastico" className={labelCls}>Anno scolastico</label>
          <select id="annoScolastico" required value={data.annoScolastico} onChange={set("annoScolastico")} className={inputCls}>
            <option value="">Seleziona…</option>
            {CLASSI_SETTEMBRE.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="indirizzoAccademico" className={labelCls}>Indirizzo accademico</label>
          <select id="indirizzoAccademico" required value={data.indirizzoAccademico} onChange={set("indirizzoAccademico")} className={inputCls}>
            <option value="">Seleziona…</option>
            {INDIRIZZI.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-muted-foreground -mt-1">
        Formiamo i gruppi per classe e, quando i numeri lo permettono, per
        indirizzo: così il programma segue davvero quello della tua scuola.
      </p>

      <div>
        <label htmlFor="telefono" className={labelCls}>Numero di telefono</label>
        <input type="tel" id="telefono" required autoComplete="tel" value={data.telefono} onChange={set("telefono")} className={inputCls} placeholder="Il numero su cui ti richiamiamo" />
      </div>

      <fieldset>
        <legend className={`${labelCls} mb-2`}>
          Giorni in cui saresti disponibile{" "}
          <span className="font-medium text-muted-foreground">(almeno {GIORNI_PREFERITI_MIN})</span>
        </legend>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {GIORNI_SETTIMANA.map((g) => {
            const active = giorni.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleGiorno(g)}
                aria-pressed={active}
                className={`inline-flex items-center justify-center rounded-2xl border px-2 py-3.5 sm:px-3 sm:py-3 text-[13px] sm:text-sm font-bold transition-all duration-300 ${
                  active
                    ? "bg-accent text-accent-foreground border-accent shadow-[0_14px_28px_-16px_rgba(45,138,138,.8)]"
                    : "bg-muted/60 text-foreground border-border hover:border-accent/40"
                }`}
              >
                {/* Sul telefono le tre lettere bastano e stanno su una riga */}
                <span className="sm:hidden">{g.slice(0, 3)}</span>
                <span className="hidden sm:inline">{g}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {mancanti > 0
            ? `Selezionane ancora ${mancanti}: più disponibilità ci dai, più è facile trovarti il gruppo giusto.`
            : `${giorni.length} giorni selezionati. Il corso è di ${SEMPRE_DRITTO.oreSettimana} ore a settimana: sceglieremo noi il giorno fisso tra quelli che hai indicato.`}
        </p>
      </fieldset>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email <span className="font-medium text-muted-foreground">(facoltativa)</span>
        </label>
        <input type="email" id="email" autoComplete="email" value={data.email} onChange={set("email")} className={inputCls} placeholder="Per ricevere il materiale didattico" />
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 bg-accent text-accent-foreground font-extrabold uppercase tracking-wider text-sm shadow-[0_18px_35px_-18px_rgba(45,138,138,.8)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-teal-deep hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {status === "sending" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Invio in corso…</>
        ) : (
          <><Send className="w-5 h-5" /> Iscrivimi a Sempre Dritto</>
        )}
      </button>

      {status === "error" && (
        <a
          href={whatsappFallbackUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 border-2 border-accent text-accent font-bold transition-all duration-300 hover:bg-accent/10 active:scale-[0.98]"
        >
          In alternativa, invia l&apos;iscrizione su WhatsApp
        </a>
      )}

      <p className="text-xs text-muted-foreground text-center">
        I dati vengono usati solo per gestire l&apos;iscrizione al corso e non
        vengono condivisi con terzi.
      </p>
    </form>
  );
}
