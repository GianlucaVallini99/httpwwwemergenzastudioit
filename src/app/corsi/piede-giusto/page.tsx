import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { TintedList, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { PIEDE_GIUSTO, GRUPPO_MIN, GRUPPO_MAX, MATERIALE_PIEDE_GIUSTO } from "@/lib/corsi-data";
import { Clock, Euro, Users, ArrowRight, BookOpen } from "lucide-react";

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
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <SectionBlobs variant="a" />
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 mb-6 reveal">
              Prima dell&apos;inizio della scuola · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(34px,5.5vw,60px)] mb-5 reveal d1">
              Piede Giusto: potenziamento per iniziare l&apos;anno al meglio
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-8 font-semibold leading-snug max-w-3xl reveal d2">
              Corsi intensivi di matematica e fisica in piccoli gruppi: ripassi ciò
              che serve e anticipi gli argomenti del nuovo anno, così da settembre
              parti in vantaggio.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4 reveal d3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <Users className="w-4 h-4" /> Gruppi da {GRUPPO_MIN} a {GRUPPO_MAX} studenti
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <Clock className="w-4 h-4" /> Lezioni da 2 ore
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <BookOpen className="w-4 h-4" /> Materiale incluso
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing section-tint !py-16 md:!py-24">
        <div className="container-custom">
          <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
            Scegli il tuo passaggio di classe
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed reveal d1">
            Cinque percorsi con programma su misura: scegli quello del tuo anno e
            guarda nel dettaglio gli argomenti di matematica e fisica.
          </p>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {PIEDE_GIUSTO.map((c, i) => (
              <Link
                key={c.slug}
                href={`/corsi/piede-giusto/${c.slug}`}
                className={`group relative flex flex-col rounded-[26px] bg-white border border-border p-5 sm:p-6 overflow-hidden ${EASE} hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,.35)] active:scale-[0.99] reveal d${(i % 3) + 1}`}
              >
                <span aria-hidden className="absolute -top-1 right-4 text-[56px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.12)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base sm:text-lg mb-2 leading-snug pr-10">
                  {c.titoloBreve}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.sottotitolo}</p>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-foreground [font-variant-numeric:tabular-nums]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Euro className="w-3.5 h-3.5" /> {c.prezzo}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Clock className="w-3.5 h-3.5" /> {c.ore}h · {c.lezioni} lezioni
                    </span>
                  </div>
                  <span className={`w-8 h-8 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0 ${EASE} group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-6 text-center reveal">
              Cosa è incluso
            </h2>
            <div className="reveal d1">
              <TintedList
                items={[
                  ...MATERIALE_PIEDE_GIUSTO,
                  `Piccoli gruppi da ${GRUPPO_MIN} a ${GRUPPO_MAX} studenti: tutti seguiti, nessuno lasciato indietro`,
                  "Docenti che insegnano matematica e fisica ogni giorno, tutto l'anno",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
