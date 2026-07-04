import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { PIEDE_GIUSTO, GRUPPO_MIN, GRUPPO_MAX, MATERIALE_PIEDE_GIUSTO } from "@/lib/corsi-data";
import { Clock, Euro, Users, ArrowRight, CheckCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Piede Giusto: corsi di potenziamento estivo | Emergenza Studio Mogliano Veneto",
  description:
    "Corsi intensivi di matematica e fisica per iniziare l'anno scolastico al meglio: cinque percorsi dalle medie alla quinta superiore, in piccoli gruppi da 4 a 6 studenti. Da €150.",
  alternates: { canonical: `${SITE_URL}/corsi/piede-giusto/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Piede Giusto", href: "/corsi/piede-giusto" },
];

export default function PiedeGiustoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Piede Giusto", href: "/corsi/piede-giusto" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd(
            PIEDE_GIUSTO.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            }))
          )),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Prima dell&apos;inizio della scuola · Iscrizioni aperte
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-5 leading-[1.02]" style={{ fontFamily: "var(--font-display)" }}>
              Piede Giusto: potenziamento per iniziare l&apos;anno al meglio
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Corsi intensivi di matematica e fisica in piccoli gruppi: ripassi ciò
              che serve e anticipi gli argomenti del nuovo anno, così da settembre
              parti in vantaggio.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Gruppi da {GRUPPO_MIN} a {GRUPPO_MAX} studenti
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4" /> Lezioni da 2 ore
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <BookOpen className="w-4 h-4" /> Materiale incluso
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Scegli il tuo passaggio di classe
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Cinque percorsi con programma su misura: scegli quello del tuo anno e
            guarda nel dettaglio gli argomenti di matematica e fisica.
          </p>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {PIEDE_GIUSTO.map((c) => (
              <Link
                key={c.slug}
                href={`/corsi/piede-giusto/${c.slug}`}
                className="group flex flex-col rounded-2xl bg-white border border-border p-5 sm:p-6 hover:border-accent/50 hover:shadow-lg active:scale-[0.99] transition-all"
              >
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {c.titoloBreve}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.sottotitolo}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Euro className="w-3.5 h-3.5" /> {c.prezzo}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Clock className="w-3.5 h-3.5" /> {c.ore}h · {c.lezioni} lezioni
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Cosa è incluso
            </h2>
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <ul className="space-y-4">
                {[
                  ...MATERIALE_PIEDE_GIUSTO,
                  `Piccoli gruppi da ${GRUPPO_MIN} a ${GRUPPO_MAX} studenti: tutti seguiti, nessuno lasciato indietro`,
                  "Docenti che insegnano matematica e fisica ogni giorno, tutto l'anno",
                ].map((item) => (
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
    </>
  );
}
