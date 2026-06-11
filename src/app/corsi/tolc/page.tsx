import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, Target, ClipboardCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Corso Preparazione TOLC | Emergenza Studio Mogliano Veneto",
  description:
    "Corso intensivo di preparazione ai TOLC (TOLC-I, TOLC-E, TOLC-MED e altri) da settembre a Mogliano Veneto. Lezioni serali, materiale dedicato e simulazioni settimanali.",
  alternates: { canonical: `${SITE_URL}/corsi/tolc/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Preparazione TOLC", href: "/corsi/tolc" },
];

const TIPOLOGIE_TOLC = [
  "TOLC-I (Ingegneria)",
  "TOLC-E (Economia)",
  "TOLC-MED (Medicina e Odontoiatria)",
  "TOLC-AV (Agraria e Veterinaria)",
  "TOLC-B (Biologia)",
  "TOLC-F (Farmacia)",
  "TOLC-S (Scienze)",
  "TOLC-SU (Studi Umanistici)",
  "TOLC-PSI (Psicologia)",
  "Non so ancora quale",
];

const PUNTI = [
  "Lezioni serali compatibili con il quinto anno di superiori",
  "Materiale dedicato e simulazioni settimanali con punteggio reale",
  "Focus sulle sezioni che pesano di più: matematica, logica, comprensione",
  "Strategia di gestione del tempo: nei TOLC vale quanto la preparazione",
];

export default function TolcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Preparazione TOLC", href: "/corsi/tolc" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Preparazione TOLC – Corso Intensivo",
            description: "Corso intensivo di preparazione ai test d'ingresso universitari TOLC con lezioni serali, materiale dedicato e simulazioni settimanali. Da settembre.",
            startDate: "2026-09-01",
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
          }])),
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
              Preparazione TOLC — Corso Intensivo
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Il TOLC decide a quale università entri. Un percorso intensivo con
              simulazioni settimanali per arrivarci con un punteggio competitivo.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Inizio da settembre
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Target className="w-4 h-4" /> Tutte le tipologie di TOLC
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <ClipboardCheck className="w-4 h-4" /> Simulazioni settimanali
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Come funziona
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center">
              Il corso copre le sezioni del TOLC che scegli: matematica di base,
              logica, comprensione del testo, scienze. Ogni settimana una simulazione
              completa per misurare i progressi e abituarsi al formato della prova.
            </p>
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
              Iscriviti al corso TOLC
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Indica quale TOLC devi sostenere: organizziamo i gruppi per tipologia di test.
            </p>
            <CourseSignupForm
              corso="Preparazione TOLC — Corso Intensivo (da settembre)"
              extraFields={[
                { type: "select", name: "tolc", label: "Tipologia di TOLC", options: TIPOLOGIE_TOLC },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
