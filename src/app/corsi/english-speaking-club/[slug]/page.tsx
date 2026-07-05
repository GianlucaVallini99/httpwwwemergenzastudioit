import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, TintedList, FormShell, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { ENGLISH_CLUB } from "@/lib/corsi-data";
import { Clock, Euro, CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return ENGLISH_CLUB.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const corso = ENGLISH_CLUB.find((c) => c.slug === slug);
  if (!corso) return {};
  return {
    title: `${corso.titolo} | English Speaking Club Mogliano Veneto`,
    description: `${corso.sottotitolo} ${corso.ore} ore in ${corso.lezioni} lezioni da 2 ore a Mogliano Veneto, €${corso.prezzo} con dispense incluse. Iscrizione online.`,
    alternates: { canonical: `${SITE_URL}/corsi/english-speaking-club/${corso.slug}/` },
  };
}

export default async function EnglishClubDettaglio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const corso = ENGLISH_CLUB.find((c) => c.slug === slug);
  if (!corso) notFound();

  const breadcrumbs = [
    { label: "Corsi", href: "/corsi" },
    { label: "English Speaking Club", href: "/corsi/english-speaking-club" },
    { label: corso.titoloBreve, href: `/corsi/english-speaking-club/${corso.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "English Speaking Club", href: "/corsi/english-speaking-club" },
            { name: corso.titoloBreve, href: `/corsi/english-speaking-club/${corso.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: corso.titolo,
            description: corso.sottotitolo,
            price: String(corso.prezzo),
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
              English Speaking Club · Livello {corso.livello}
            </span>
            <h1 className="text-[clamp(32px,5vw,54px)] mb-5 reveal d1">
              {corso.titolo}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-semibold leading-snug max-w-3xl reveal d2">
              {corso.sottotitolo}
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${corso.prezzo}`, small: "totali" },
                  { icon: <Clock className="w-4 h-4" />, big: `${corso.ore} ore`, small: "di corso" },
                  { icon: <CalendarDays className="w-4 h-4" />, big: `${corso.lezioni}`, small: "lezioni da 2h" },
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
            <h2 className="text-2xl md:text-4xl mb-8 text-center reveal">Cosa farai nel corso</h2>
            <div className="reveal d1">
              <TintedList items={corso.contenuti ?? []} />
            </div>
          </div>
        </div>
      </section>

      <section id="iscrizione" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl mb-4 text-center reveal">
              Iscriviti a {corso.titoloBreve}
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed reveal d1">
              Compila il form: registriamo subito la tua iscrizione e ti
              ricontattiamo entro 24 ore per confermare gruppo e calendario.
            </p>
            <div className="reveal d2">
              <FormShell>
                <CourseSignupForm corso={corso.titolo} corsoSlug={`english-speaking-club/${corso.slug}`} />
              </FormShell>
            </div>
            <p className="text-center mt-8">
              <Link href="/corsi/english-speaking-club" className="inline-flex items-center gap-2 text-sm text-secondary font-extrabold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Tutti i livelli dello Speaking Club
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
