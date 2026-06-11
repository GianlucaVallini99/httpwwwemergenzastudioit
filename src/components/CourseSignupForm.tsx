"use client";

import { useState } from "react";
import { PHONE_INTL } from "@/lib/constants";
import { Send } from "lucide-react";

export type ExtraField =
  | { type: "select"; name: string; label: string; options: string[] }
  | { type: "multiselect"; name: string; label: string; options: string[] };

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50";

export default function CourseSignupForm({
  corso,
  extraFields = [],
  buttonText = "Invia la richiesta di iscrizione",
}: {
  corso: string;
  extraFields?: ExtraField[];
  buttonText?: string;
}) {
  const [base, setBase] = useState({ nome: "", cognome: "", telefono: "" });
  const [extra, setExtra] = useState<Record<string, string | string[]>>(
    Object.fromEntries(extraFields.map((f) => [f.name, f.type === "multiselect" ? [] : ""]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleMulti = (name: string, option: string) => {
    setExtra((prev) => {
      const current = (prev[name] as string[]) ?? [];
      return {
        ...prev,
        [name]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of extraFields) {
      if (f.type === "multiselect" && (extra[f.name] as string[]).length === 0) {
        setError(`Seleziona almeno una voce per "${f.label}".`);
        return;
      }
    }
    setError("");
    const lines = [
      `Iscrizione — ${corso}`,
      `Nome: ${base.nome}`,
      `Cognome: ${base.cognome}`,
      `Telefono: ${base.telefono}`,
      ...extraFields.map((f) => {
        const v = extra[f.name];
        return `${f.label}: ${Array.isArray(v) ? v.join(", ") : v}`;
      }),
    ];
    const url = `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center">
        <p className="text-lg font-semibold text-accent mb-2">Richiesta pronta!</p>
        <p className="text-muted-foreground">
          Abbiamo aperto WhatsApp con i tuoi dati: invia il messaggio per completare
          l&apos;iscrizione. Ti ricontatteremo entro 24 ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-1">Nome</label>
          <input
            type="text"
            id="nome"
            required
            value={base.nome}
            onChange={(e) => setBase({ ...base, nome: e.target.value })}
            className={inputCls}
            placeholder="Il tuo nome"
          />
        </div>
        <div>
          <label htmlFor="cognome" className="block text-sm font-medium text-foreground mb-1">Cognome</label>
          <input
            type="text"
            id="cognome"
            required
            value={base.cognome}
            onChange={(e) => setBase({ ...base, cognome: e.target.value })}
            className={inputCls}
            placeholder="Il tuo cognome"
          />
        </div>
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">Numero di telefono</label>
        <input
          type="tel"
          id="telefono"
          required
          value={base.telefono}
          onChange={(e) => setBase({ ...base, telefono: e.target.value })}
          className={inputCls}
          placeholder="Il tuo numero"
        />
      </div>

      {extraFields.map((f) =>
        f.type === "select" ? (
          <div key={f.name}>
            <label htmlFor={f.name} className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
            <select
              id={f.name}
              required
              value={extra[f.name] as string}
              onChange={(e) => setExtra({ ...extra, [f.name]: e.target.value })}
              className={inputCls}
            >
              <option value="">Seleziona…</option>
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        ) : (
          <fieldset key={f.name}>
            <legend className="block text-sm font-medium text-foreground mb-2">{f.label}</legend>
            <div className="flex flex-wrap gap-3">
              {f.options.map((o) => {
                const checked = (extra[f.name] as string[]).includes(o);
                return (
                  <label
                    key={o}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold cursor-pointer transition-colors ${
                      checked
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-white text-foreground border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMulti(f.name, o)}
                      className="sr-only"
                    />
                    {o}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )
      )}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <Send className="w-5 h-5" /> {buttonText}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Premendo il pulsante si apre WhatsApp con il messaggio di iscrizione già compilato.
      </p>
    </form>
  );
}
