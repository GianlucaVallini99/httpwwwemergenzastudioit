import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { TintedList, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { ENGLISH_CLUB, ENGLISH_PREZZO, ENGLISH_ORE, ENGLISH_LEZIONI } from "@/lib/corsi-data";
import { Clock, Euro, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "English Speaking Club: corsi di inglese su 3 livelli | Emergenza Studio Mogliano Veneto",
  description:
    `Corsi di inglese a Mogliano Veneto su tre livelli: English Restart, English Progress ed English Fluency. ${ENGLISH_ORE} ore in ${ENGLISH_LEZIONI} lezioni da 2 ore, €${ENGLISH_PREZZO}, dispense incluse. Iscrizione online.`,
  alternates: { canonical: `${SITE_URL}/corsi/english-speaking-club/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "English Speaking Club", href: "/corsi/english-speaking-club" },
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
          __html: JSON.stringify(courseJsonLd(
            ENGLISH_CLUB.map((c) => ({
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
              Tre livelli · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(34px,5.5vw,60px)] mb-5 reveal d1">
              English Speaking Club
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-8 font-semibold leading-snug max-w-3xl reveal d2">
              L&apos;inglese si impara usandolo. Tre corsi divisi per livello, con
              grammatica, conversazione e listening: trovi il gruppo giusto sia che
              tu parta da zero, sia che tu voglia perfezionare la pronuncia.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 reveal d3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <Euro className="w-4 h-4" /> €{ENGLISH_PREZZO} a corso
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <Clock className="w-4 h-4" /> {ENGLISH_ORE} ore · {ENGLISH_LEZIONI} lezioni da 2h
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold">
                <BookOpen className="w-4 h-4" /> Dispense ed esercizi inclusi
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing section-tint !py-16 md:!py-24">
        <div className="container-custom">
          <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
            Scegli il tuo livello
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed reveal d1">
            Nessun test d&apos;ingresso e nessuna ansia: leggi le descrizioni e
            scegli il corso che ti somiglia. In caso di dubbi ti consigliamo noi.
          </p>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {ENGLISH_CLUB.map((c, i) => (
              <Link
                key={c.slug}
                href={`/corsi/english-speaking-club/${c.slug}`}
                className={`group relative flex flex-col rounded-[26px] bg-white border border-border p-5 sm:p-6 overflow-hidden ${EASE} hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,.35)] active:scale-[0.99] reveal d${i + 1}`}
              >
                <span aria-hidden className="absolute -top-1 right-4 text-[56px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.12)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-max rounded-full bg-secondary text-secondary-foreground text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 mb-4">
                  Livello {i + 1} · {c.livello}
                </span>
                <h3 className="text-lg mb-2 leading-snug pr-10">
                  {c.titoloBreve}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.sottotitolo}</p>
                <span className="mt-auto inline-flex items-center justify-between gap-2 text-primary font-extrabold text-sm">
                  Programma e iscrizione
                  <span className={`w-8 h-8 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0 ${EASE} group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-6 text-center reveal">
              Come funziona
            </h2>
            <div className="reveal d1">
              <TintedList
                items={[
                  `${ENGLISH_LEZIONI} incontri da 2 ore, in piccoli gruppi dello stesso livello`,
                  "Ogni lezione mescola grammatica, conversazione e ascolto: niente ore passate solo sul libro",
                  "Dispense riassuntive ed esercizi per lo studio individuale e di gruppo, inclusi nel prezzo",
                  "Adatto a studenti e adulti: l'inglese parlato serve a tutti",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
