import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Chimica Mogliano Veneto",
  description:
    "Ripetizioni di chimica a Mogliano Veneto per superiori, università e semestre filtro di Medicina. Tutor specializzati, pacchetti flessibili. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/chimica/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Chimica", href: "/materie/chimica" },
];

export default function ChimicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Chimica", href: "/materie/chimica" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Chimica a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            La chimica è una delle materie che mette più in difficoltà gli studenti: richiede insieme rigore matematico, capacità di visualizzare ciò che non si vede e una terminologia tutta sua. Basta perdere un passaggio — la mole, il bilanciamento, la nomenclatura — e tutto il resto smette di avere senso.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di chimica seguono studenti delle superiori, universitari e candidati ai percorsi dell&apos;area medico-sanitaria, con un metodo che parte sempre dalla comprensione del fenomeno prima della formula da applicare.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Chimica generale, struttura atomica, legami chimici, nomenclatura, stechiometria, soluzioni, equilibri, acidi e basi, elettrochimica, chimica organica e inorganica. Copertura completa del programma di licei scientifici, classici, linguistici e istituti tecnici, comprese le verifiche di scienze in cui la chimica è integrata.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per l&apos;università</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Chimica generale e inorganica, Chimica organica, Biochimica. Supporto mirato alla preparazione degli esami dei corsi di laurea dell&apos;area medico-sanitaria (Medicina, Professioni sanitarie, Farmacia, Biologia) e di ingegneria, con esercizi d&apos;esame e simulazioni.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per il semestre filtro di Medicina</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            La chimica è una delle materie del semestre filtro per l&apos;accesso a Medicina: l&apos;esame va superato in pochi mesi, insieme agli altri, e non c&apos;è margine per accumulare ritardo. Costruiamo percorsi intensivi calibrati sul programma ufficiale, con un piano di studio settimanale e simulazioni delle prove.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio alla chimica</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nello studio mnemonico di reazioni e definizioni. Ogni lezione si costruisce su tre fasi: comprensione del fenomeno chimico, applicazione guidata agli esercizi, lavoro autonomo con verifica. Se un concetto non è chiaro, si torna indietro finché il fondamento non è solido.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti che arrivano con lacune importanti — spesso proprio su stechiometria e nomenclatura — costruiamo percorsi di recupero che ripartono dalle basi mancanti, anche se significa riprendere argomenti di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per la chimica</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor specializzati in chimica con esperienza didattica comprovata",
              "Percorsi dedicati al semestre filtro di Medicina e agli esami universitari",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve chimica",
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
        title="Prenota una lezione di chimica"
        buttonText="Prenota una lezione di chimica"
      />
    </>
  );
}
