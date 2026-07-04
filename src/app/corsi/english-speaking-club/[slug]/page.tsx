import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { ENGLISH_CLUB } from "@/lib/corsi-data";
import { Clock, Euro, CheckCircle, CalendarDays, ArrowLeft } from "lucide-react";

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
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              English Speaking Club · Livello {corso.livello}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-5 leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              {corso.titolo}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              {corso.sottotitolo}
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 max-w-md sm:max-w-none">
              {[
                { icon: <Euro className="w-5 h-5" />, big: `€${corso.prezzo}`, small: "totali" },
                { icon: <Clock className="w-5 h-5" />, big: `${corso.ore} ore`, small: "di corso" },
                { icon: <CalendarDays className="w-5 h-5" />, big: `${corso.lezioni}`, small: "lezioni da 2h" },
              ].map((s) => (
                <div key={s.small} className="rounded-2xl bg-secondary/10 text-secondary px-3 py-3 sm:px-5 text-center sm:text-left sm:flex sm:items-center sm:gap-3">
                  <span className="hidden sm:block">{s.icon}</span>
                  <div>
                    <div className="font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>{s.big}</div>
                    <div className="text-[11px] sm:text-xs font-medium opacity-80">{s.small}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Cosa farai nel corso
            </h2>
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
              <ul className="space-y-4">
                {corso.contenuti?.map((item) => (
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

      <section id="iscrizione" className="section-spacing">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Iscriviti a {corso.titoloBreve}
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Compila il form: registriamo subito la tua iscrizione e ti
              ricontattiamo entro 24 ore per confermare gruppo e calendario.
            </p>
            <CourseSignupForm corso={corso.titolo} corsoSlug={`english-speaking-club/${corso.slug}`} />
            <p className="text-center mt-8">
              <Link href="/corsi/english-speaking-club" className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Tutti i livelli dello Speaking Club
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
