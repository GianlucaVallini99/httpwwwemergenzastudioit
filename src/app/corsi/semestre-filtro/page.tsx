import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, GraduationCap, FlaskConical, CheckCircle, Euro, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Supporto Semestre Filtro Medicina | Emergenza Studio Mogliano Veneto",
  description:
    "Supporto al semestre filtro di Medicina da settembre: 3 corsi serali separati di chimica (lunedì), biologia (mercoledì) e fisica (venerdì). 2 ore a serata, €15/h. Iscriviti anche a una sola materia.",
  alternates: { canonical: `${SITE_URL}/corsi/semestre-filtro/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Supporto Semestre Filtro", href: "/corsi/semestre-filtro" },
];

const SOTTOCORSI = [
  { materia: "Chimica", giorno: "Lunedì sera", colore: "from-accent/10 to-secondary/10" },
  { materia: "Biologia", giorno: "Mercoledì sera", colore: "from-secondary/10 to-accent/10" },
  { materia: "Fisica", giorno: "Venerdì sera", colore: "from-accent/10 to-secondary/10" },
];

const PUNTI = [
  "Tre corsi indipendenti: ti iscrivi solo alle materie che ti servono, anche una sola",
  "Programma allineato ai syllabus nazionali degli esami del semestre filtro",
  "Lezioni focalizzate su esercizi e domande tipo esame, non solo teoria",
  "Tutor che hanno superato questi esami e ne conoscono le trappole",
];

export default function SemestreFiltroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Supporto Semestre Filtro", href: "/corsi/semestre-filtro" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([
            { name: "Semestre Filtro — Corso di Chimica", description: "Corso serale di chimica per il semestre filtro di Medicina: lunedì sera, 2 ore a lezione, €15/h. Da settembre.", startDate: "2026-09-01", location: "Via Francesco Barbiero 84g, Mogliano Veneto", price: "30", priceCurrency: "EUR" },
            { name: "Semestre Filtro — Corso di Biologia", description: "Corso serale di biologia per il semestre filtro di Medicina: mercoledì sera, 2 ore a lezione, €15/h. Da settembre.", startDate: "2026-09-01", location: "Via Francesco Barbiero 84g, Mogliano Veneto", price: "30", priceCurrency: "EUR" },
            { name: "Semestre Filtro — Corso di Fisica", description: "Corso serale di fisica per il semestre filtro di Medicina: venerdì sera, 2 ore a lezione, €15/h. Da settembre.", startDate: "2026-09-01", location: "Via Francesco Barbiero 84g, Mogliano Veneto", price: "30", priceCurrency: "EUR" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Da settembre · Iscrizioni aperte
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
              Supporto Semestre Filtro
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Il semestre filtro di Medicina decide chi entra. Tre corsi serali
              separati — chimica, biologia e fisica — a cui puoi iscriverti anche
              singolarmente.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Inizio da settembre · serale
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <FlaskConical className="w-4 h-4" /> 3 corsi: Chimica · Biologia · Fisica
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Euro className="w-4 h-4" /> €15/h — lezioni da 2 ore
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <GraduationCap className="w-4 h-4" /> Per aspiranti matricole di Medicina
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Tre corsi, un calendario settimanale
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center">
              Con il nuovo accesso a Medicina, tutto si gioca sugli esami di chimica,
              biologia e fisica del primo semestre. Il supporto è diviso in tre corsi
              serali indipendenti: scegli solo le materie in cui ti serve una mano,
              oppure seguile tutte e tre.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {SOTTOCORSI.map((c) => (
                <div
                  key={c.materia}
                  className={`rounded-2xl bg-gradient-to-br ${c.colore} border border-accent/20 p-6 text-center`}
                >
                  <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {c.materia}
                  </h3>
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary mb-3">
                    <Calendar className="w-4 h-4" /> {c.giorno}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-1 w-full justify-center">
                    <Clock className="w-4 h-4" /> 2 ore a lezione
                  </p>
                  <p className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                    €15<span className="text-sm font-normal text-muted-foreground">/h</span>
                    <span className="block text-xs font-normal text-muted-foreground">€30 a serata</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-border p-8">
              <ul className="space-y-4">
                {PUNTI.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Iscriviti al supporto
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Seleziona i corsi che vuoi seguire — anche uno solo. Non serve
              iscriversi a tutte e tre le materie.
            </p>
            <CourseSignupForm
              corso="Supporto Semestre Filtro (da settembre)"
              extraFields={[
                {
                  type: "multiselect",
                  name: "materie",
                  label: "Corsi (scegline anche solo uno)",
                  options: ["Chimica (lunedì sera)", "Biologia (mercoledì sera)", "Fisica (venerdì sera)"],
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
