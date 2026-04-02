import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Chi Siamo | Emergenza Studio - Centro Ripetizioni Mogliano Veneto",
  description:
    "Emergenza Studio è il centro ripetizioni di Mogliano Veneto fondato con l'obiettivo di offrire supporto scolastico qualificato, flessibile e detraibile a studenti di ogni livello.",
  alternates: { canonical: `${SITE_URL}/chi-siamo/` },
};

const breadcrumbs = [{ label: "Chi Siamo", href: "/chi-siamo" }];

export default function ChiSiamoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Chi Siamo", href: "/chi-siamo" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Chi Siamo – Emergenza Studio, il Centro Ripetizioni di Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Emergenza Studio nasce nel 2026 con un&apos;idea semplice: creare a Mogliano Veneto uno spazio dedicato allo studio e alla crescita degli studenti, con la professionalità di un centro strutturato e la vicinanza di chi conosce le difficoltà scolastiche di ogni giorno.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Perché &quot;Emergenza&quot;</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Perché spesso le famiglie cercano supporto quando la situazione è già critica: il debito formativo è alle porte, la verifica è domani, l&apos;esame è tra una settimana. Noi ci siamo per le emergenze, ma lavoriamo perché quelle emergenze non si ripresentino più. Il nostro obiettivo è costruire autonomia e metodo, non dipendenza dalle ripetizioni.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>La nostra missione</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Crediamo che ogni studente possa migliorare se riceve il supporto giusto, nel modo giusto, al momento giusto. Per questo non ci limitiamo a rispiegare la lezione: lavoriamo sul metodo di studio, sulla comprensione profonda dei concetti e sulla costruzione di sicurezza e autonomia.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro spazio</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Il centro si trova nel cuore di Mogliano Veneto, a 50 metri dal Liceo Classico G. Berto e dalla scuola media. Uno spazio luminoso, tranquillo e attrezzato, pensato perché lo studente possa concentrarsi senza le distrazioni di casa. Quattro postazioni di lavoro permettono lo svolgimento simultaneo di più lezioni.
          </p>

          {/* Photo placeholders */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            <div className="rounded-2xl overflow-hidden aspect-video bg-muted flex items-center justify-center">
              <img
                src="/images/studio_individuale.png"
                alt="Postazione studio individuale Emergenza Studio Mogliano Veneto"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-muted flex items-center justify-center">
              <img
                src="/images/studio_gruppo.png"
                alt="Studio di gruppo Emergenza Studio Mogliano Veneto"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il team</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Il nostro team è composto da tutor qualificati, selezionati per competenza nella materia e capacità didattica. Ogni tutor viene scelto non solo per ciò che sa, ma per come riesce a trasmetterlo.
          </p>

          {/* Tutor placeholder cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Tutor 1", materie: "Matematica, Fisica" },
              { name: "Tutor 2", materie: "Italiano, Latino, Greco" },
              { name: "Tutor 3", materie: "Inglese, Francese" },
            ].map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-muted-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  {t.name.split(" ")[1]}
                </div>
                <h3 className="text-lg font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.materie}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Vieni a conoscerci"
        buttonText="Contattaci"
        href="/contatti"
      />
    </>
  );
}
