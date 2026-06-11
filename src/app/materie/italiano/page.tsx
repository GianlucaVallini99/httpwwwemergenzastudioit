import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Italiano Mogliano Veneto",
  description:
    "Ripetizioni di italiano a Mogliano Veneto per medie e superiori: grammatica, analisi del testo, temi, prima prova di maturità. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/italiano/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Italiano", href: "/materie/italiano" },
];

export default function ItalianoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Italiano", href: "/materie/italiano" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Italiano a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            L&apos;italiano viene spesso sottovalutato, ma è la materia che pesa su tutto il percorso scolastico: un tema scritto male o un&apos;analisi del testo superficiale abbassano la media tanto quanto un&apos;insufficienza in matematica.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di italiano lavorano con studenti delle medie e delle superiori, con un approccio che unisce il rigore della grammatica al lavoro concreto sulla scrittura e sull&apos;interpretazione dei testi.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Grammatica, analisi logica e analisi del periodo, ortografia, produzione scritta. Lavoriamo sulle fondamenta della lingua: chi arriva alle superiori senza saper riconoscere una subordinata o strutturare un testo parte in salita, soprattutto se sceglie un liceo.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Analisi del testo poetico e narrativo, letteratura italiana da Dante al Novecento, temi e saggi argomentativi, preparazione alla prima prova della maturità. Copertura completa del programma di tutti gli indirizzi: liceo scientifico, classico, linguistico, istituti tecnici.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Italiano per stranieri</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Supportiamo anche studenti non madrelingua che frequentano le scuole italiane: rafforzamento del lessico, della grammatica e della comprensione dei testi scolastici, per seguire le lezioni in classe senza rimanere indietro.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio all&apos;italiano</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nei riassunti imparati a memoria. Ogni lezione si costruisce su tre fasi: lettura e comprensione del testo, analisi guidata, produzione autonoma con correzione puntuale. Sulla scrittura lavoriamo a partire dai testi reali dello studente, errore per errore.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con lacune croniche nella scrittura, costruiamo percorsi di recupero che partono dalle basi mancanti, anche se significa tornare alla grammatica e all&apos;analisi del periodo di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per l&apos;italiano</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor specializzati in italiano con esperienza didattica comprovata",
              "Correzione puntuale di temi e analisi del testo, con feedback scritto",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve italiano",
              "Ambiente tranquillo e dedicato, a 50 metri dal Liceo Berto",
              "Prezzi trasparenti e fatturazione regolare",
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
        title="Prenota una lezione di italiano"
        buttonText="Prenota una lezione di italiano"
      />
    </>
  );
}
