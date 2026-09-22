import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SempreDrittoForm from "@/components/SempreDrittoForm";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, SubjectCourseCard, TintedList, FormShell, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { SEMPRE_DRITTO, SEMPRE_DRITTO_CLASSI } from "@/lib/corsi-data";
import { Clock, Euro, Users, ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

export async function generateStaticParams() {
  return SEMPRE_DRITTO_CLASSI.map((c) => ({ classe: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classe: string }>;
}): Promise<Metadata> {
  const { classe } = await params;
  const corso = SEMPRE_DRITTO_CLASSI.find((c) => c.slug === classe);
  if (!corso) return {};
  return {
    title: `Sempre Dritto ${corso.classe}: corso di matematica annuale | Emergenza Studio`,
    description: `Corso di matematica per la ${corso.classe} a Mogliano Veneto: ${SEMPRE_DRITTO.oreSettimana} ore a settimana dal ${SEMPRE_DRITTO.inizio} all'${SEMPRE_DRITTO.fine}, gruppi da ${SEMPRE_DRITTO.gruppoMin} a ${SEMPRE_DRITTO.gruppoMax} studenti dello stesso indirizzo, €${SEMPRE_DRITTO.prezzoOra}/h invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}. Iscrizione online.`,
    alternates: { canonical: `${SITE_URL}/corsi/sempre-dritto/${corso.slug}/` },
  };
}

export default async function SempreDrittoClasse({
  params,
}: {
  params: Promise<{ classe: string }>;
}) {
  const { classe } = await params;
  const corso = SEMPRE_DRITTO_CLASSI.find((c) => c.slug === classe);
  if (!corso) notFound();

  const titolo = `${SEMPRE_DRITTO.titolo} — ${corso.classe}`;
  const breadcrumbs = [
    { label: "Corsi", href: "/corsi" },
    { label: "Sempre Dritto", href: "/corsi/sempre-dritto" },
    { label: corso.classe, href: `/corsi/sempre-dritto/${corso.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Sempre Dritto", href: "/corsi/sempre-dritto" },
            { name: corso.classe, href: `/corsi/sempre-dritto/${corso.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([
            {
              name: titolo,
              description: `Corso annuale di matematica per la ${corso.classe}: ${corso.sottotitolo}`,
              price: String(SEMPRE_DRITTO.prezzoTotale),
              startDate: SEMPRE_DRITTO.inizioISO,
              endDate: SEMPRE_DRITTO.fineISO,
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            },
          ])),
        }}
      />
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <SectionBlobs variant="a" />
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 mb-6 reveal">
              Sempre Dritto · Si parte il {SEMPRE_DRITTO.inizio}
            </span>
            <h1 className="text-[clamp(32px,5vw,54px)] mb-5 reveal d1">{titolo}</h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-4 font-semibold leading-snug max-w-3xl reveal d2">
              {corso.sottotitolo}
            </p>
            <p className="text-base text-foreground/60 mb-8 leading-relaxed max-w-3xl reveal d2">
              {`${SEMPRE_DRITTO.oreSettimana} ore di matematica a settimana dal ${SEMPRE_DRITTO.inizio} all'${SEMPRE_DRITTO.fine}, in un gruppo di ${SEMPRE_DRITTO.gruppoMin}–${SEMPRE_DRITTO.gruppoMax} studenti di ${corso.classe.toLowerCase()}: `}
              <strong className="text-secondary">
                {`€${SEMPRE_DRITTO.prezzoOra} l'ora invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}`}
              </strong>
              {", materiale didattico incluso."}
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${SEMPRE_DRITTO.prezzoOra}/h`, small: `${SEMPRE_DRITTO.rate} rate da €${SEMPRE_DRITTO.importoRata}` },
                  { icon: <Clock className="w-4 h-4" />, big: `${SEMPRE_DRITTO.oreTotali} ore`, small: `${SEMPRE_DRITTO.oreSettimana}h a settimana` },
                  { icon: <Users className="w-4 h-4" />, big: `${SEMPRE_DRITTO.gruppoMin}–${SEMPRE_DRITTO.gruppoMax}`, small: "studenti per gruppo" },
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
              Gli argomenti che affronteremo in {corso.classe.toLowerCase()}, seguendo
              il ritmo del programma della tua scuola: ogni lezione arriva in parallelo
              a quello che state facendo in classe.
            </p>
            <div className="grid gap-4 sm:gap-5 mb-5 reveal d1">
              <SubjectCourseCard
                nome={SEMPRE_DRITTO.materia}
                items={[...corso.programma]}
                meta={`${SEMPRE_DRITTO.oreTotali}h · €${SEMPRE_DRITTO.prezzoOra}/h`}
              />
            </div>
            <div className="reveal d2">
              <TintedList title="Materiale didattico incluso" items={SEMPRE_DRITTO.materiale} />
            </div>
            <div className="mt-5 rounded-[26px] bg-white border border-border p-5 sm:p-6 flex items-start gap-3 reveal d3">
              <span className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5" />
              </span>
              <p className="text-sm text-foreground leading-relaxed [font-variant-numeric:tabular-nums]">
                <strong>Dal {SEMPRE_DRITTO.inizio} all&apos;{SEMPRE_DRITTO.fine}:</strong>{" "}
                circa {SEMPRE_DRITTO.settimane} settimane di lezione per{" "}
                {SEMPRE_DRITTO.oreTotali} ore complessive, cioè €{SEMPRE_DRITTO.prezzoTotale}{" "}
                in {SEMPRE_DRITTO.rate} rate da €{SEMPRE_DRITTO.importoRata}. Il gruppo
                parte con almeno {SEMPRE_DRITTO.gruppoMin} iscritti e si chiude a{" "}
                {SEMPRE_DRITTO.gruppoMax}.
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
              Compila il form indicando i giorni in cui saresti disponibile:
              registriamo subito la tua iscrizione e ti ricontattiamo entro 24 ore
              per confermare il giorno fisso del gruppo.
            </p>
            <div className="reveal d2">
              <FormShell>
                <SempreDrittoForm
                  corso={titolo}
                  corsoSlug={`sempre-dritto/${corso.slug}`}
                  annoScolasticoDefault={corso.annoScolastico}
                />
              </FormShell>
            </div>
            <p className="text-center mt-8">
              <Link href="/corsi/sempre-dritto" className="inline-flex items-center gap-2 text-sm text-secondary font-extrabold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Sempre Dritto per tutte le classi
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
