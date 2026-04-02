import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Preparazione TOLC e Test Ingresso – Mogliano Veneto",
  description:
    "Corsi di preparazione TOLC e test d'ingresso universitari a Mogliano Veneto. Lezioni mirate con simulazioni e materiale dedicato.",
  alternates: { canonical: `${SITE_URL}/preparazione-test/` },
};

const breadcrumbs = [{ label: "Preparazione Test", href: "/preparazione-test" }];

export default function PreparazioneTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Preparazione Test", href: "/preparazione-test" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Preparazione TOLC e Test d&apos;Ingresso Universitari a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            I test d&apos;ingresso universitari richiedono una preparazione specifica e mirata. Non basta conoscere le materie: bisogna allenarsi sul formato delle domande, gestire il tempo e sviluppare strategie di risposta efficaci.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            A Emergenza Studio prepariamo gli studenti ai TOLC (TOLC-I, TOLC-E, TOLC-F, TOLC-S, TOLC-MED) e ai principali test d&apos;ammissione universitari con un percorso strutturato che combina teoria, esercitazioni e simulazioni.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>Come funziona la preparazione</h2>

          <div className="space-y-8 mb-16">
            {[
              {
                phase: "Fase 1",
                title: "Valutazione iniziale",
                desc: "Analizziamo il livello di partenza dello studente con un test diagnostico per identificare i punti di forza e le aree da rafforzare.",
              },
              {
                phase: "Fase 2",
                title: "Studio mirato",
                desc: "Lezioni individuali o in piccolo gruppo focalizzate sulle sezioni del test: logica, comprensione verbale, matematica, scienze, inglese (a seconda del TOLC specifico).",
              },
              {
                phase: "Fase 3",
                title: "Simulazioni",
                desc: "Esercitazioni su test degli anni precedenti in condizioni realistiche: tempo limitato, ambiente silenzioso, correzione dettagliata con analisi degli errori.",
              },
            ].map((p) => (
              <div key={p.phase} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {p.phase.split(" ")[1]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 border border-secondary/20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Supporto al Semestre Filtro</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hai superato il test d&apos;ingresso ma il primo semestre è un muro? Analisi Matematica I, Fisica I, Chimica generale: sono gli esami che bloccano migliaia di matricole ogni anno.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Emergenza Studio offriamo supporto specifico per gli esami del primo anno universitario, con tutor che conoscono i programmi delle principali università del Veneto.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Informati sulla preparazione TOLC"
        buttonText="Informati sulla preparazione TOLC"
      />
    </>
  );
}
