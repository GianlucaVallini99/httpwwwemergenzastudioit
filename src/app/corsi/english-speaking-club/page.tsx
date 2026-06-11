import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, Globe, Users, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "English Speaking Club | Emergenza Studio Mogliano Veneto",
  description:
    "Incontri settimanali di conversazione in inglese in piccoli gruppi a Mogliano Veneto, da settembre. Solo pratica orale, per tutti i livelli: da zero a buono.",
  alternates: { canonical: `${SITE_URL}/corsi/english-speaking-club/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "English Speaking Club", href: "/corsi/english-speaking-club" },
];

const PUNTI = [
  "Niente libro di grammatica: solo conversazione guidata su argomenti reali",
  "Piccoli gruppi divisi per livello, così nessuno resta indietro o si annoia",
  "Tutor madrelingua o bilingue che corregge senza interrompere il flusso",
  "Adatto a studenti e adulti: l'inglese parlato serve a tutti",
];

export default function EnglishSpeakingClubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "English Speaking Club", href: "/corsi/english-speaking-club" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "English Speaking Club",
            description: "Incontri settimanali di conversazione in inglese in piccoli gruppi divisi per livello, da settembre.",
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
              English Speaking Club
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              L&apos;inglese si impara parlandolo. Incontri settimanali di sola
              conversazione, in piccoli gruppi divisi per livello.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Da settembre, un incontro a settimana
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Piccoli gruppi per livello
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Globe className="w-4 h-4" /> Da livello zero a buono
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
              A scuola si studia la grammatica, ma quasi nessuno arriva a parlare con
              scioltezza. Lo Speaking Club ribalta l&apos;approccio: ogni incontro è
              un&apos;ora di conversazione vera, su temi di attualità, viaggi, lavoro e
              vita quotidiana.
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
              Iscriviti allo Speaking Club
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Indica il tuo livello di partenza: ti inseriamo nel gruppo giusto.
              Nessun test d&apos;ingresso, nessuna ansia.
            </p>
            <CourseSignupForm
              corso="English Speaking Club (da settembre)"
              extraFields={[
                { type: "select", name: "livello", label: "Livello di inglese", options: ["Zero", "Base", "Medio", "Buono"] },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
