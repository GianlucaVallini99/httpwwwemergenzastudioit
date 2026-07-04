import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { PIEDE_GIUSTO, GRUPPO_MIN, GRUPPO_MAX, MATERIALE_PIEDE_GIUSTO } from "@/lib/corsi-data";
import { Clock, Euro, Users, CheckCircle, Sigma, Atom, ArrowLeft } from "lucide-react";

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
    description: `${corso.sottotitolo} ${corso.ore} ore di matematica e fisica in ${corso.lezioni} lezioni da 2 ore, gruppi da ${GRUPPO_MIN} a ${GRUPPO_MAX} studenti, €${corso.prezzo}. Iscrizione online.`,
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
              Piede Giusto · Iscrizioni aperte
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
                { icon: <Clock className="w-5 h-5" />, big: `${corso.ore} ore`, small: `${corso.lezioni} lezioni da 2h` },
                { icon: <Users className="w-5 h-5" />, big: `${GRUPPO_MIN}–${GRUPPO_MAX}`, small: "studenti per gruppo" },
              ].map((s) => (
                <div key={s.big} className="rounded-2xl bg-secondary/10 text-secondary px-3 py-3 sm:px-5 text-center sm:text-left sm:flex sm:items-center sm:gap-3">
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
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Il programma
            </h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-10 leading-relaxed">
              Gli argomenti che affronterai lezione dopo lezione, scelti per farti
              arrivare preparato al nuovo anno.
            </p>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              {corso.materie?.map((m) => (
                <div key={m.nome} className="bg-white rounded-2xl border border-border p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                      {m.nome === "Matematica" ? <Sigma className="w-5 h-5" /> : <Atom className="w-5 h-5" />}
                    </div>
                    <h3 className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{m.nome}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {m.programma.map((arg) => (
                      <li key={arg} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{arg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary/10 border border-secondary/20 p-5 sm:p-6">
              <h3 className="text-base font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Materiale fornito
              </h3>
              <ul className="space-y-2">
                {MATERIALE_PIEDE_GIUSTO.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{m}</span>
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
              Iscriviti al corso
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Compila il form: registriamo subito la tua iscrizione e ti
              ricontattiamo entro 24 ore per confermare gruppo e calendario.
            </p>
            <CourseSignupForm corso={corso.titolo} corsoSlug={`piede-giusto/${corso.slug}`} conCampiScuola />
            <p className="text-center mt-8">
              <Link href="/corsi/piede-giusto" className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4" /> Tutti i corsi Piede Giusto
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
