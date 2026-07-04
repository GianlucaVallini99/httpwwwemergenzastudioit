"use client";

import { useState } from "react";
import { PHONE_INTL } from "@/lib/constants";
import { INDIRIZZI_SCOLASTICI } from "@/lib/corsi-data";
import { CheckCircle, Loader2, Send } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50";

const EMPTY = {
  nome: "",
  cognome: "",
  indirizzoResidenza: "",
  codiceFiscale: "",
  telefono: "",
  indirizzoScolastico: "",
  scuola: "",
};

export default function CourseSignupForm({
  corso,
  corsoSlug,
  conCampiScuola = false,
  buttonText = "Invia l'iscrizione",
}: {
  corso: string;
  corsoSlug: string;
  conCampiScuola?: boolean;
  buttonText?: string;
}) {
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setData({ ...data, [field]: e.target.value });

  const whatsappFallbackUrl = () => {
    const lines = [
      `Iscrizione — ${corso}`,
      `Nome: ${data.nome}`,
      `Cognome: ${data.cognome}`,
      `Indirizzo di residenza: ${data.indirizzoResidenza}`,
      `Codice fiscale: ${data.codiceFiscale.toUpperCase()}`,
      `Telefono: ${data.telefono}`,
      ...(conCampiScuola
        ? [`Indirizzo scolastico: ${data.indirizzoScolastico}`, `Scuola: ${data.scuola}`]
        : []),
    ];
    return `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cf = data.codiceFiscale.trim().toUpperCase();
    if (!/^[A-Z0-9]{16}$/.test(cf)) {
      setError("Il codice fiscale deve avere 16 caratteri (lettere e numeri).");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/iscrizioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ corso, corsoSlug, ...data, codiceFiscale: cf }),
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
      <div className="rounded-2xl bg-accent/10 border border-accent/20 p-6 sm:p-8 text-center">
        <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
        <p className="text-lg font-semibold text-accent mb-2">Iscrizione registrata!</p>
        <p className="text-muted-foreground">
          Abbiamo salvato la tua richiesta per <strong>{corso}</strong>. Ti
          ricontatteremo entro 24 ore per confermare il gruppo e i dettagli di
          pagamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-1">Nome</label>
          <input type="text" id="nome" required autoComplete="given-name" value={data.nome} onChange={set("nome")} className={inputCls} placeholder="Il tuo nome" />
        </div>
        <div>
          <label htmlFor="cognome" className="block text-sm font-medium text-foreground mb-1">Cognome</label>
          <input type="text" id="cognome" required autoComplete="family-name" value={data.cognome} onChange={set("cognome")} className={inputCls} placeholder="Il tuo cognome" />
        </div>
      </div>
      <div>
        <label htmlFor="indirizzoResidenza" className="block text-sm font-medium text-foreground mb-1">Indirizzo di residenza</label>
        <input type="text" id="indirizzoResidenza" required autoComplete="street-address" value={data.indirizzoResidenza} onChange={set("indirizzoResidenza")} className={inputCls} placeholder="Via, numero civico, città" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="codiceFiscale" className="block text-sm font-medium text-foreground mb-1">Codice fiscale</label>
          <input
            type="text"
            id="codiceFiscale"
            required
            minLength={16}
            maxLength={16}
            value={data.codiceFiscale}
            onChange={set("codiceFiscale")}
            className={`${inputCls} uppercase`}
            placeholder="RSSMRA10A01F999X"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">Numero di telefono</label>
          <input type="tel" id="telefono" required autoComplete="tel" value={data.telefono} onChange={set("telefono")} className={inputCls} placeholder="Il tuo numero" />
        </div>
      </div>

      {conCampiScuola && (
        <>
          <div>
            <label htmlFor="indirizzoScolastico" className="block text-sm font-medium text-foreground mb-1">Indirizzo scolastico</label>
            <select id="indirizzoScolastico" required value={data.indirizzoScolastico} onChange={set("indirizzoScolastico")} className={inputCls}>
              <option value="">Seleziona…</option>
              {INDIRIZZI_SCOLASTICI.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="scuola" className="block text-sm font-medium text-foreground mb-1">Scuola a cui sei iscritto</label>
            <input type="text" id="scuola" required value={data.scuola} onChange={set("scuola")} className={inputCls} placeholder="Nome della scuola" />
          </div>
        </>
      )}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-60"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {status === "sending" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Invio in corso…</>
        ) : (
          <><Send className="w-5 h-5" /> {buttonText}</>
        )}
      </button>

      {status === "error" && (
        <a
          href={whatsappFallbackUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-colors"
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
