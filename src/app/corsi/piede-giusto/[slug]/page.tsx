import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, SubjectCourseCard, TintedList, FormShell, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { PIEDE_GIUSTO, GRUPPO_MIN, GRUPPO_MAX, MATERIALE_PIEDE_GIUSTO, MATERIE_SCELTA } from "@/lib/corsi-data";
import { Clock, Euro, Users, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return PIEDE_GIUSTO.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const corso = PIEDE_GIUSTO.find((c) => c.slug === slug);
  if (!corso) return {};
  return {
    title: `${corso.titolo} | Emergenza Studio Mogliano Veneto`,
    description: `${corso.sottotitolo} Due corsi separati, matematica e fisica, ${corso.ore} ore ciascuno in ${corso.lezioni} lezioni da 2 ore, gruppi da ${GRUPPO_MIN} a ${GRUPPO_MAX} studenti, €${corso.prezzo} a materia. Iscrizione online.`,
    alternates: { canonical: `${SITE_URL}/corsi/piede-giusto/${corso.slug}/` },
  };
}

export default async function PiedeGiustoDettaglio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const corso = PIEDE_GIUSTO.find((c) => c.slug === slug);
  if (!corso) notFound();

  const breadcrumbs = [
    { label: "Corsi", href: "/corsi" },
    { label: "Piede Giusto", href: "/corsi/piede-giusto" },
    { label: corso.titoloBreve, href: `/corsi/piede-giusto/${corso.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Piede Giusto", href: "/corsi/piede-giusto" },
            { name: corso.titoloBreve, href: `/corsi/piede-giusto/${corso.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd(
            (corso.materie ?? []).map((m) => ({
              name: `${corso.titolo} — ${m.nome}`,
              description: `Corso di ${m.nome.toLowerCase()}: ${corso.sottotitolo}`,
              price: String(corso.prezzo),
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
              Piede Giusto · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(32px,5vw,54px)] mb-5 reveal d1">
              {corso.titolo}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-4 font-semibold leading-snug max-w-3xl reveal d2">
              {corso.sottotitolo}
            </p>
            <p className="text-base text-foreground/60 mb-8 leading-relaxed max-w-3xl reveal d2">
              <strong className="text-secondary">Matematica e Fisica sono due corsi
              separati:</strong> puoi iscriverti solo a matematica, solo a fisica o a
              entrambi. Ogni corso ha il suo programma e costa €{corso.prezzo}.
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${corso.prezzo}`, small: "a materia" },
                  { icon: <Clock className="w-4 h-4" />, big: `${corso.ore} ore`, small: `${corso.lezioni} lezioni da 2h` },
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
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">Due corsi, due programmi</h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-10 leading-relaxed reveal d1">
              Matematica e Fisica sono percorsi distinti, ciascuno di {corso.ore} ore
              in {corso.lezioni} lezioni da 2 ore a €{corso.prezzo}. Scegli quello che
              ti serve — o entrambi.
            </p>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 mb-5">
              {corso.materie?.map((m, i) => (
                <div key={m.nome} className={`reveal d${i + 1}`}>
                  <SubjectCourseCard
                    nome={m.nome}
                    items={[...m.programma]}
                    meta={`€${corso.prezzo} · ${corso.ore}h`}
                  />
                </div>
              ))}
            </div>
            <div className="reveal d2">
              <TintedList title="Materiale fornito (in ogni corso)" items={MATERIALE_PIEDE_GIUSTO} />
            </div>
          </div>
        </div>
      </section>

      <section id="iscrizione" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl mb-4 text-center reveal">Iscriviti al corso</h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed reveal d1">
              Scegli la materia, compila il form e registriamo subito la tua
              iscrizione: ti ricontattiamo entro 24 ore per confermare gruppo e
              calendario.
            </p>
            <div className="reveal d2">
              <FormShell>
                <CourseSignupForm
                  corso={corso.titolo}
                  corsoSlug={`piede-giusto/${corso.slug}`}
                  conCampiScuola
                  materie={MATERIE_SCELTA}
                />
              </FormShell>
            </div>
            <p className="text-center mt-8">
              <Link href="/corsi/piede-giusto" className="inline-flex items-center gap-2 text-sm text-secondary font-extrabold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Tutti i corsi Piede Giusto
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
