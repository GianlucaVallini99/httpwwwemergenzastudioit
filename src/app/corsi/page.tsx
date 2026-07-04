import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import {
  PIEDE_GIUSTO,
  ENGLISH_CLUB,
  ENGLISH_PREZZO,
  ENGLISH_ORE,
  ENGLISH_LEZIONI,
  POTENZIAMENTO,
  GRUPPO_MIN,
  GRUPPO_MAX,
} from "@/lib/corsi-data";
import { Rocket, Globe, GraduationCap, Clock, Euro, Users, ArrowRight, CalendarDays } from "lucide-react";

const breadcrumbs = [{ label: "Corsi", href: "/corsi" }];

const corsi = [
  {
    icon: <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />,
    tag: "Prima dell'inizio della scuola",
    title: "Piede Giusto: potenziamento per iniziare l'anno al meglio",
    desc: "Corsi intensivi di matematica e fisica per arrivare al primo giorno di scuola già preparato. Cinque percorsi, uno per ogni passaggio di classe: dalle medie fino alla quinta superiore.",
    href: "/corsi/piede-giusto",
    dettagli: [
      { icon: <Euro className="w-4 h-4" />, label: "Da €150" },
      { icon: <Clock className="w-4 h-4" />, label: "10–12 ore" },
      { icon: <Users className="w-4 h-4" />, label: `Gruppi di ${GRUPPO_MIN}–${GRUPPO_MAX}` },
    ],
  },
  {
    icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7" />,
    tag: "Per tutti i livelli",
    title: "English Speaking Club",
    desc: `Tre corsi di inglese divisi per livello — English Restart, English Progress ed English Fluency — con grammatica, conversazione e listening. ${ENGLISH_ORE} ore in ${ENGLISH_LEZIONI} lezioni da 2 ore.`,
    href: "/corsi/english-speaking-club",
    dettagli: [
      { icon: <Euro className="w-4 h-4" />, label: `€${ENGLISH_PREZZO}` },
      { icon: <Clock className="w-4 h-4" />, label: `${ENGLISH_ORE} ore` },
      { icon: <CalendarDays className="w-4 h-4" />, label: `${ENGLISH_LEZIONI} lezioni da 2h` },
    ],
  },
  {
    icon: <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />,
    tag: "Tutto l'anno scolastico",
    title: "Corso di Potenziamento Scolastico",
    desc: "Matematica e fisica ogni settimana, per tutto l'anno: 32 settimane di lezioni, esercizi e simulazioni di verifica per vivere la scuola senza la paura delle interrogazioni.",
    href: "/corsi/potenziamento-scolastico",
    dettagli: [
      { icon: <Euro className="w-4 h-4" />, label: "€15/h · 4 rate da €240" },
      { icon: <Clock className="w-4 h-4" />, label: `${POTENZIAMENTO.oreTotali} ore` },
      { icon: <CalendarDays className="w-4 h-4" />, label: "2 ore a settimana" },
    ],
  },
];

export default function CorsiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([
            ...PIEDE_GIUSTO.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
            })),
            ...ENGLISH_CLUB.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
            })),
            {
              name: POTENZIAMENTO.titolo,
              description: POTENZIAMENTO.sottotitolo,
              price: String(POTENZIAMENTO.prezzoTotale),
            },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Corsi a Mogliano Veneto
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10 md:mb-16">
            Emergenza Studio non è solo ripetizioni: sono percorsi di gruppo con un
            programma preciso, materiale incluso e iscrizione direttamente online.
            Scegli il corso giusto per te.
          </p>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-14 md:mb-20">
            {corsi.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col rounded-3xl p-6 sm:p-8 border border-accent/30 bg-gradient-to-br from-accent/5 to-secondary/5 shadow-md hover:shadow-xl active:scale-[0.99] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-accent/15 text-accent">
                    {c.icon}
                  </div>
                  <span className="rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ fontFamily: "var(--font-display)" }}>
                    {c.tag}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.desc}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {c.dettagli.map((d) => (
                      <span key={d.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-border px-3 py-1.5 text-xs font-semibold text-foreground">
                        {d.icon} {d.label}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-accent font-bold text-sm">
                    Scopri il corso e iscriviti
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="max-w-xl mx-auto text-center rounded-3xl bg-card border border-border p-6 sm:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Non sai quale corso scegliere?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Scrivici: ti consigliamo il percorso più adatto in base alla classe,
              agli obiettivi e al livello di partenza. Rispondiamo entro 24 ore.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg w-full sm:w-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Chiedi consiglio su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
