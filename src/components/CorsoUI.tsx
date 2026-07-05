// Elementi grafici condivisi dalle pagine corso — server components.
import { CheckCircle, Sigma, Atom } from "lucide-react";

export const EASE = "transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)]";

// Statistiche in evidenza sotto il titolo: cornice esterna tinta + cuore bianco
export function StatPills({
  stats,
}: {
  stats: { icon: React.ReactNode; big: string; small: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 max-w-md sm:max-w-none">
      {stats.map((s) => (
        <div key={s.small + s.big} className="rounded-[22px] bg-secondary/10 p-1.5">
          <div className="h-full rounded-[16px] bg-white/85 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_10px_24px_-18px_rgba(21,50,79,.5)] px-3 py-2.5 sm:px-4 text-center sm:text-left sm:flex sm:items-center sm:gap-3">
            <span className="hidden sm:flex w-9 h-9 rounded-full bg-secondary/10 text-secondary items-center justify-center shrink-0">
              {s.icon}
            </span>
            <div>
              <div className="font-black text-primary text-base sm:text-lg leading-tight [font-variant-numeric:tabular-nums]" style={{ fontFamily: "var(--font-display)" }}>
                {s.big}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-muted-foreground">{s.small}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Card di una materia con elenco argomenti
export function ProgramCard({ nome, items }: { nome: string; items: string[] }) {
  return (
    <div className={`bg-white rounded-[26px] border border-border p-5 sm:p-6 ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] hover:-translate-y-0.5`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center">
          {nome === "Matematica" ? <Sigma className="w-5 h-5" /> : <Atom className="w-5 h-5" />}
        </div>
        <h3 className="text-lg">{nome}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((arg) => (
          <li key={arg} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
            <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{arg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Come ProgramCard ma con eyebrow "Corso di" e badge prezzo/durata: rende
// esplicito che ogni materia è un corso separato con il suo costo.
export function SubjectCourseCard({
  nome,
  items,
  meta,
}: {
  nome: string;
  items: string[];
  meta?: string;
}) {
  return (
    <div className={`flex flex-col bg-white rounded-[26px] border border-border p-5 sm:p-6 ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
            {nome === "Matematica" ? <Sigma className="w-5 h-5" /> : <Atom className="w-5 h-5" />}
          </div>
          <div>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-secondary">Corso di</span>
            <h3 className="text-lg leading-tight">{nome}</h3>
          </div>
        </div>
        {meta && (
          <span className="shrink-0 rounded-full bg-secondary/10 text-secondary px-3 py-1.5 text-xs font-bold [font-variant-numeric:tabular-nums]">
            {meta}
          </span>
        )}
      </div>
      <ul className="space-y-2.5">
        {items.map((arg) => (
          <li key={arg} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
            <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{arg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Elenco puntato in card tinta (materiale fornito, punti chiave)
export function TintedList({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="rounded-[26px] bg-secondary/8 border border-secondary/15 p-5 sm:p-6">
      {title && <h3 className="text-base mb-3">{title}</h3>}
      <ul className="space-y-2.5">
        {items.map((m) => (
          <li key={m} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
            <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Cornice del form di iscrizione: doppio bordo morbido, ombra diffusa
export function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] bg-secondary/8 p-2">
      <div className="rounded-[24px] bg-white border border-border p-5 sm:p-7 shadow-[0_35px_60px_-40px_rgba(21,50,79,.45)]">
        {children}
      </div>
    </div>
  );
}
