import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Storia e Filosofia Mogliano Veneto",
  description:
    "Ripetizioni di storia e filosofia a Mogliano Veneto per medie e superiori. Metodo di studio, schemi e preparazione orale. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/storia-filosofia/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Storia e Filosofia", href: "/materie/storia-filosofia" },
];

export default function StoriaFilosofiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Storia e Filosofia", href: "/materie/storia-filosofia" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Storia e Filosofia a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Storia e filosofia sono materie orali per eccellenza: non basta studiare, bisogna saper collegare, argomentare ed esporre. Molti studenti passano ore sui libri e poi all&apos;interrogazione si bloccano, perché manca un metodo di studio adatto a queste discipline.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            A Emergenza Studio lavoriamo proprio su questo: trasformare lo studio mnemonico in comprensione profonda, costruendo schemi, collegamenti e capacità espositiva che durano nel tempo.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Storia: dalle medie alla maturità</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Dalle civiltà antiche alla storia contemporanea, aiutiamo gli studenti a costruire un metodo di studio efficace: individuare cause e conseguenze, collocare gli eventi nel tempo, creare collegamenti tra epoche e contesti. Prepariamo interrogazioni, verifiche scritte e il colloquio di maturità, dove la capacità di collegare la storia alle altre discipline fa la differenza.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Filosofia per il liceo</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Dai presocratici al pensiero contemporaneo: Platone, Aristotele, la filosofia medievale, Cartesio, Kant, Hegel, Nietzsche e gli autori del Novecento. Lavoriamo sulla comprensione dei concetti, non sulla ripetizione a memoria: ogni autore viene inserito nel suo contesto e confrontato con chi lo precede e lo segue. Particolare attenzione al lessico specifico, indispensabile per esporre con precisione.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il metodo per le materie orali</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Per storia e filosofia il metodo conta quanto il contenuto. Insegniamo a costruire schemi e mappe concettuali che organizzano le informazioni, a sintetizzare capitoli interi in pochi punti chiave e a ripetere ad alta voce simulando l&apos;interrogazione.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            L&apos;esposizione si allena: durante le lezioni lo studente ripete con il tutor, che corregge imprecisioni, suggerisce collegamenti e aiuta a costruire un discorso fluido e argomentato.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per storia e filosofia</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor preparati nelle discipline umanistiche con esperienza didattica",
              "Metodo di studio specifico per le materie orali: schemi, mappe, esposizione",
              "Preparazione mirata per interrogazioni e colloquio di maturità",
              "Pacchetti ore utilizzabili anche per altre materie quando serve",
              "Ambiente tranquillo e dedicato, a 50 metri dal Liceo Berto",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="Prenota una lezione di storia o filosofia"
        buttonText="Prenota una lezione di storia o filosofia"
      />
    </>
  );
}
