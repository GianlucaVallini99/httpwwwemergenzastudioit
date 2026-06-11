import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, GraduationCap, FlaskConical, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Supporto Semestre Filtro Medicina | Emergenza Studio Mogliano Veneto",
  description:
    "Supporto al semestre filtro di Medicina da settembre: chimica, biologia e fisica con tutor specializzati a Mogliano Veneto. Lezioni mirate sugli esami nazionali.",
  alternates: { canonical: `${SITE_URL}/corsi/semestre-filtro/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Supporto Semestre Filtro", href: "/corsi/semestre-filtro" },
];

const PUNTI = [
  "Programma allineato ai syllabus nazionali degli esami del semestre filtro",
  "Lezioni focalizzate su esercizi e domande tipo esame, non solo teoria",
  "Puoi seguire una, due o tutte e tre le materie: chimica, biologia, fisica",
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
          __html: JSON.stringify(courseJsonLd([{
            name: "Supporto Semestre Filtro",
            description: "Lezioni di supporto per gli esami del semestre filtro di Medicina: chimica, biologia e fisica. Da settembre.",
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
              Supporto Semestre Filtro
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Chimica, biologia e fisica: il semestre filtro di Medicina decide chi
              entra. Preparati con un percorso strutturato, non da solo.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Inizio da settembre
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <FlaskConical className="w-4 h-4" /> Chimica · Biologia · Fisica
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
              Come funziona
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center">
              Con il nuovo accesso a Medicina, tutto si gioca sugli esami di chimica,
              biologia e fisica del primo semestre. Il nostro supporto ti accompagna
              dall&apos;inizio: lezioni regolari, esercizi mirati e simulazioni, senza
              perdere settimane a capire da dove cominciare.
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
              Iscriviti al supporto
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Seleziona le materie che vuoi seguire: costruiamo il percorso su di te.
            </p>
            <CourseSignupForm
              corso="Supporto Semestre Filtro (da settembre)"
              extraFields={[
                { type: "multiselect", name: "materie", label: "Materie (puoi sceglierne più di una)", options: ["Chimica", "Biologia", "Fisica"] },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
