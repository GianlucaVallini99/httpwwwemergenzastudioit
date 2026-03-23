import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ripetizioni Inglese Mogliano Veneto",
  description:
    "Ripetizioni di inglese a Mogliano Veneto: grammatica, conversazione, preparazione PET, FCE, IELTS. Prossimamente English Speaking Club. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/inglese` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Inglese", href: "/materie/inglese" },
];

export default function InglesePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Inglese", href: "/materie/inglese" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Inglese a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            L&apos;inglese è una materia trasversale: serve a scuola, serve all&apos;università, serve nel lavoro. A Emergenza Studio offriamo ripetizioni di inglese per tutti i livelli, dalla grammatica di base alla preparazione per le certificazioni internazionali.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Cosa offriamo</h2>

          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Supporto scolastico</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Grammatica, comprensione del testo, produzione scritta, letteratura inglese per le superiori. Preparazione per verifiche, interrogazioni e seconda prova di maturità.
          </p>

          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Conversazione e speaking</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Sessioni dedicate alla pratica orale per migliorare fluidità, pronuncia e sicurezza nel parlare. Ideali come complemento alle lezioni scolastiche, dove spesso la parte orale viene trascurata.
          </p>

          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Preparazione certificazioni</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Supporto per PET (B1), FCE (B2), IELTS, TOEFL. Esercitazioni mirate su tutte le sezioni dell&apos;esame: reading, writing, listening, speaking.
          </p>

          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Inglese universitario</h3>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Preparazione esami di lingua inglese e supporto per la comprensione di testi accademici in inglese.
          </p>

          {/* English Speaking Club */}
          <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 p-8 mb-8">
            <div className="inline-block rounded-full bg-accent/20 text-accent text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Prossimamente
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>English Speaking Club</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Stiamo preparando un corso serale di conversazione in inglese, aperto a studenti e adulti, in piccoli gruppi. Un&apos;occasione informale per praticare l&apos;inglese parlato con regolarità.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Iscriviti alla waiting list
            </a>
          </div>
        </div>
      </section>

      <CtaSection
        title="Prenota una lezione di inglese"
        buttonText="Prenota una lezione di inglese"
      />
    </>
  );
}
