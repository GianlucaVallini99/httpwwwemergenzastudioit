"use client";

import { useState } from "react";
import { PHONE_INTL } from "@/lib/constants";
import { INDIRIZZI_SCOLASTICI, MATERIA_ENTRAMBE, MATERIE_SINGOLE } from "@/lib/corsi-data";
import { CheckCircle, Loader2, Send, Sigma, Atom, BookOpen } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-border bg-muted/60 px-4 py-3.5 text-base font-semibold text-foreground placeholder:font-medium placeholder:text-muted-foreground/60 transition-all duration-300 focus:outline-none focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/15";

const EMPTY = {
  nome: "",
  cognome: "",
  indirizzoResidenza: "",
  codiceFiscale: "",
  telefono: "",
  indirizzoScolastico: "",
  scuola: "",
};

function materiaIcon(m: string) {
  if (m === "Matematica") return <Sigma className="w-4 h-4" />;
  if (m === "Fisica") return <Atom className="w-4 h-4" />;
  return <BookOpen className="w-4 h-4" />;
}

export default function CourseSignupForm({
  corso,
  corsoSlug,
  conCampiScuola = false,
  materie,
  buttonText = "Invia l'iscrizione",
}: {
  corso: string;
  corsoSlug: string;
  conCampiScuola?: boolean;
  materie?: string[];
  buttonText?: string;
}) {
  const [data, setData] = useState(EMPTY);
  const [materia, setMateria] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const hasMaterie = !!materie && materie.length > 0;
  const isEntrambe = hasMaterie && materia === MATERIA_ENTRAMBE;
  // Corsi a cui iscriversi. "Entrambe" genera due iscrizioni separate, una per
  // materia: nel gestionale risultano come due righe distinte.
  const corsiSelezionati = !hasMaterie
    ? [corso]
    : isEntrambe
      ? MATERIE_SINGOLE.map((m) => `${corso} — ${m}`)
      : materia
        ? [`${corso} — ${materia}`]
        : [];
  // Etichetta leggibile per messaggio di conferma e WhatsApp.
  const corsoLabel = !hasMaterie
    ? corso
    : isEntrambe
      ? `i corsi di ${MATERIE_SINGOLE.join(" e ")} (${corso})`
      : materia
        ? `${corso} — ${materia}`
        : corso;

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setData({ ...data, [field]: e.target.value });

  const whatsappFallbackUrl = () => {
    const lines = [
      `Iscrizione — ${corsoLabel}`,
      ...(hasMaterie ? [`Materia: ${isEntrambe ? MATERIE_SINGOLE.join(" + ") : materia}`] : []),
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
    if (hasMaterie && !materia) {
      setError("Scegli la materia del corso a cui vuoi iscriverti.");
      return;
    }
    const cf = data.codiceFiscale.trim().toUpperCase();
    if (!/^[A-Z0-9]{16}$/.test(cf)) {
      setError("Il codice fiscale deve avere 16 caratteri (lettere e numeri).");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      // Un POST per ogni corso selezionato (due se si sceglie "Entrambe").
      const results = await Promise.all(
        corsiSelezionati.map((c) =>
          fetch("/api/iscrizioni", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ corso: c, corsoSlug, ...data, codiceFiscale: cf }),
          })
        )
      );
      const fallita = results.find((r) => !r.ok);
      if (fallita) {
        const body = await fallita.json().catch(() => null);
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
        <p className="text-lg font-extrabold text-accent mb-2" style={{ fontFamily: "var(--font-display)" }}>Iscrizione registrata</p>
        <p className="text-muted-foreground">
          Abbiamo salvato la tua richiesta per <strong>{corsoLabel}</strong>.{" "}
          {isEntrambe ? "Sono due iscrizioni distinte, una per materia. " : ""}Ti
          ricontatteremo entro 24 ore per confermare il gruppo e i dettagli di
          pagamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {hasMaterie && (
        <fieldset>
          <legend className="block text-sm font-medium text-foreground mb-2">
            Quale corso vuoi seguire?
          </legend>
          <div className="grid sm:grid-cols-3 gap-2.5">
            {materie!.map((m) => {
              const active = materia === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMateria(m)}
                  aria-pressed={active}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    active
                      ? "bg-accent text-accent-foreground border-accent shadow-[0_14px_28px_-16px_rgba(45,138,138,.8)]"
                      : "bg-muted/60 text-foreground border-border hover:border-accent/40"
                  }`}
                >
                  {materiaIcon(m)} {m}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Matematica e Fisica sono due corsi separati: scegli quello che ti
            interessa (o entrambi).
          </p>
        </fieldset>
      )}

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
        className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 bg-accent text-accent-foreground font-extrabold uppercase tracking-wider text-sm shadow-[0_18px_35px_-18px_rgba(45,138,138,.8)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-teal-deep hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
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
