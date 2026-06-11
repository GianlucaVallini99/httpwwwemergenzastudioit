import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, PHONE_INTL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, Users, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Recupero Debiti Estivi | Emergenza Studio Mogliano Veneto",
  description:
    "Corsi estivi di recupero debiti a Mogliano Veneto, da giugno. Iscriviti con i tuoi compagni di classe (2-4 studenti, stessa materia): €15/h invece di €25/h.",
  alternates: { canonical: `${SITE_URL}/corsi/recupero-debiti/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Recupero Debiti Estivi", href: "/corsi/recupero-debiti" },
];

const WHATSAPP_CORSO = `https://wa.me/${PHONE_INTL.replace("+", "")}?text=${encodeURIComponent(
  "Ciao! Vorrei informazioni sul recupero debiti estivo"
)}`;

const PERCHE_GRUPPO = [
  "Stesso programma, stesso libro, stesso professore: il tutor lavora su esattamente ciò che chiede la vostra scuola",
  "Il confronto tra compagni rende lo studio più attivo e meno pesante",
  "Vi motivate a vicenda: studiare il debito da soli in estate è la cosa più difficile",
  "Il costo si abbassa per tutti: €15/h a studente invece di €25/h",
];

export default function RecuperoDebitiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Recupero Debiti Estivi", href: "/corsi/recupero-debiti" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Recupero Debiti Estivi",
            description: "Percorsi estivi di recupero dei debiti formativi in tutte le materie, individuali o in piccoli gruppi di compagni di classe (2-4 studenti).",
            startDate: "2026-06-15",
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            price: "15",
            priceCurrency: "EUR",
          }])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Da giugno · Iscrizioni aperte
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
              Recupero Debiti Estivi
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Hai preso un debito? Recuperalo insieme ai tuoi compagni di classe:
              piccoli gruppi, stesso programma, costo dimezzato.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Da giugno, fino all&apos;esame di recupero
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Gruppi di 2-4 compagni di classe
              </span>
            </div>
            <a
              href={WHATSAPP_CORSO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Organizza il tuo gruppo <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              La formula: compagni di classe, stesso debito
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-center">
              Gli studenti della stessa classe che hanno preso il debito nella stessa materia
              possono iscriversi insieme, da un minimo di 2 a un massimo di 4. Si crea così un
              gruppo di lavoro efficiente: il tutor prepara un unico percorso sul programma
              esatto della vostra classe e ognuno paga meno.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto my-8">
              <div className="rounded-2xl bg-white border border-border p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Lezione individuale</p>
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>€25<span className="text-base font-normal text-muted-foreground">/h</span></p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border-2 border-accent/30 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">In gruppo con i compagni</p>
                <p className="text-3xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>€15<span className="text-base font-normal text-muted-foreground">/h a studente</span></p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-8">
              <h3 className="text-lg font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Perché funziona così bene
              </h3>
              <ul className="space-y-4">
                {PERCHE_GRUPPO.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-8 text-center text-sm">
              Sei da solo o nessun compagno ha il debito nella tua materia? Nessun problema:
              organizziamo anche percorsi individuali di recupero (€25/h) o ti inseriamo in un
              gruppo compatibile per programma e livello.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Mettetevi d&apos;accordo e scriveteci
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            Basta un messaggio con materia, classe e numero di studenti: pensiamo noi a
            organizzare calendario e tutor prima dell&apos;esame di recupero.
          </p>
          <a
            href={WHATSAPP_CORSO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground text-lg font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <MessageCircle className="w-5 h-5" /> Scrivici su WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
