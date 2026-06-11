import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, Clock, Euro, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Corso di Preparazione alla Classe Successiva | Emergenza Studio Mogliano Veneto",
  description:
    "6 lezioni da un'ora dal 1 al 9 settembre per ripassare e iniziare il nuovo anno scolastico senza lacune. €15/h, tutte le materie e classi delle superiori. Mogliano Veneto.",
  alternates: { canonical: `${SITE_URL}/corsi/preparazione-classe-successiva/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Preparazione alla Classe Successiva", href: "/corsi/preparazione-classe-successiva" },
];

const A_CHI_SERVE = [
  "Studenti che vogliono ripassare gli argomenti chiave prima di iniziare la nuova classe",
  "Chi ha chiuso l'anno con qualche incertezza, anche senza debito formativo",
  "Chi cambia indirizzo o scuola e vuole allinearsi al nuovo programma",
];

const MATERIE = [
  "Matematica", "Fisica", "Chimica", "Italiano", "Latino", "Greco",
  "Inglese", "Francese", "Spagnolo", "Tedesco", "Altro",
];

const CLASSI = ["1ª superiore", "2ª superiore", "3ª superiore", "4ª superiore", "5ª superiore"];

export default function PreparazioneClasseSuccessivaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Preparazione alla Classe Successiva", href: "/corsi/preparazione-classe-successiva" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Corso di Preparazione alla Classe Successiva",
            description: "6 lezioni da un'ora dal 1 al 9 settembre per ripassare gli argomenti fondamentali e iniziare la nuova classe senza lacune.",
            startDate: "2026-09-01",
            endDate: "2026-09-09",
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            price: "90",
            priceCurrency: "EUR",
          }])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              1–9 settembre · Iscrizioni aperte
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
              Corso di Preparazione alla Classe Successiva
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Sei lezioni nei primi giorni di settembre per ripassare ciò che conta
              e iniziare il nuovo anno un passo avanti, non un passo indietro.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Dal 1 al 9 settembre
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4" /> 6 lezioni da un&apos;ora
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Euro className="w-4 h-4" /> €15/h — €90 il corso completo
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              A chi serve
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center">
              Le prime settimane di scuola decidono il tono dell&apos;intero anno. Questo corso
              concentra in 6 ore il ripasso degli argomenti fondamentali della classe appena
              conclusa, nella materia che scegli tu.
            </p>
            <div className="bg-white rounded-2xl border border-border p-8">
              <ul className="space-y-4">
                {A_CHI_SERVE.map((item) => (
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
              Iscriviti al corso
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Compila il modulo: ti ricontatteremo per confermare orari e gruppo.
            </p>
            <CourseSignupForm
              corso="Corso di Preparazione alla Classe Successiva (1–9 settembre)"
              extraFields={[
                { type: "select", name: "materia", label: "Materia", options: MATERIE },
                { type: "select", name: "classe", label: "Classe che inizierai a settembre", options: CLASSI },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
