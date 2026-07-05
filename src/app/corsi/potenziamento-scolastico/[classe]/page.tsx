import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, ProgramCard, TintedList, FormShell, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import {
  POTENZIAMENTO,
  POTENZIAMENTO_CLASSI,
  GRUPPO_MIN,
  GRUPPO_MAX,
  MATERIALE_PIEDE_GIUSTO,
} from "@/lib/corsi-data";
import { Clock, Euro, Users, ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

export async function generateStaticParams() {
  return POTENZIAMENTO_CLASSI.map((c) => ({ classe: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classe: string }>;
}): Promise<Metadata> {
  const { classe } = await params;
  const corso = POTENZIAMENTO_CLASSI.find((c) => c.slug === classe);
  if (!corso) return {};
  return {
    title: `Potenziamento Scolastico ${corso.classe} | Emergenza Studio Mogliano Veneto`,
    description: `Corso annuale di matematica e fisica per la ${corso.classe}: ${POTENZIAMENTO.settimane} settimane, ${POTENZIAMENTO.oreTotali} ore, gruppi da ${GRUPPO_MIN} a ${GRUPPO_MAX} studenti, €${POTENZIAMENTO.prezzoOra}/h in ${POTENZIAMENTO.rate} rate. Iscrizione online.`,
    alternates: { canonical: `${SITE_URL}/corsi/potenziamento-scolastico/${corso.slug}/` },
  };
}

export default async function PotenziamentoClasse({
  params,
}: {
  params: Promise<{ classe: string }>;
}) {
  const { classe } = await params;
  const corso = POTENZIAMENTO_CLASSI.find((c) => c.slug === classe);
  if (!corso) notFound();

  const titolo = `Potenziamento Scolastico — ${corso.classe}`;
  const breadcrumbs = [
    { label: "Corsi", href: "/corsi" },
    { label: "Potenziamento Scolastico", href: "/corsi/potenziamento-scolastico" },
    { label: corso.classe, href: `/corsi/potenziamento-scolastico/${corso.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Potenziamento Scolastico", href: "/corsi/potenziamento-scolastico" },
            { name: corso.classe, href: `/corsi/potenziamento-scolastico/${corso.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: titolo,
            description: corso.sottotitolo,
            price: String(POTENZIAMENTO.prezzoTotale),
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
          }])),
        }}
      />
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <SectionBlobs variant="a" />
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 mb-6 reveal">
              Potenziamento Scolastico · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(32px,5vw,54px)] mb-5 reveal d1">
              {titolo}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-semibold leading-snug max-w-3xl reveal d2">
              {corso.sottotitolo}
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${POTENZIAMENTO.prezzoOra}/h`, small: `${POTENZIAMENTO.rate} rate da €${POTENZIAMENTO.importoRata}` },
                  { icon: <Clock className="w-4 h-4" />, big: `${POTENZIAMENTO.oreTotali} ore`, small: `${POTENZIAMENTO.oreSettimana} ore a settimana` },
                  { icon: <Users className="w-4 h-4" />, big: `${GRUPPO_MIN}–${GRUPPO_MAX}`, small: "studenti per gruppo" },
                ]}
              />
            </div>
            <a
              href="#iscrizione"
              className={`inline-flex items-center gap-2.5 mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(21,50,79,.7)] ${EASE} hover:-translate-y-0.5 hover:bg-navy-deep active:scale-[0.98] reveal d3`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vai all&apos;iscrizione
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing section-tint !py-16 md:!py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
              Il programma dell&apos;anno
            </h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-10 leading-relaxed reveal d1">
              Segui in parallelo il programma della tua classe:{" "}
              {POTENZIAMENTO.settimane} settimane, {POTENZIAMENTO.oreSettimana} ore
              a settimana, con esercizi e simulazioni prima di ogni verifica.
            </p>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 mb-5">
              {corso.materie.map((m, i) => (
                <div key={m.nome} className={`reveal d${i + 1}`}>
                  <ProgramCard nome={m.nome} items={[...m.programma]} />
                </div>
              ))}
            </div>
            <div className="reveal d2">
              <TintedList title="Materiale fornito" items={MATERIALE_PIEDE_GIUSTO} />
            </div>
            <div className="mt-5 rounded-[26px] bg-white border border-border p-5 sm:p-6 flex items-start gap-3 reveal d3">
              <span className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5" />
              </span>
              <p className="text-sm text-foreground leading-relaxed [font-variant-numeric:tabular-nums]">
                <strong>€{POTENZIAMENTO.prezzoOra} all&apos;ora, {POTENZIAMENTO.oreTotali} ore totali:</strong>{" "}
                {`€${POTENZIAMENTO.prezzoTotale} pagabili in ${POTENZIAMENTO.rate} rate da €${POTENZIAMENTO.importoRata} distribuite lungo l'anno scolastico.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="iscrizione" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl mb-4 text-center reveal">
              Iscriviti per la {corso.classe}
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed reveal d1">
              Compila il form: registriamo subito la tua iscrizione e ti
              ricontattiamo entro 24 ore per confermare orario e partenza del
              gruppo.
            </p>
            <div className="reveal d2">
              <FormShell>
                <CourseSignupForm
                  corso={titolo}
                  corsoSlug={`potenziamento-scolastico/${corso.slug}`}
                  conCampiScuola
                />
              </FormShell>
            </div>
            <p className="text-center mt-8">
              <Link href="/corsi/potenziamento-scolastico" className="inline-flex items-center gap-2 text-sm text-secondary font-extrabold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Il Potenziamento Scolastico per tutte le classi
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
