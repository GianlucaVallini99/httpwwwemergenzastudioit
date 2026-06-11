import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Francese Mogliano Veneto",
  description:
    "Ripetizioni di francese a Mogliano Veneto per medie e superiori. Grammatica, conversazione, letteratura e preparazione DELF. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/francese/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Francese", href: "/materie/francese" },
];

export default function FrancesePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Francese", href: "/materie/francese" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Francese a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Il francese sembra vicino all&apos;italiano, ma proprio questa somiglianza inganna: pronuncia, verbi irregolari e costruzioni diverse mettono in difficoltà molti studenti, soprattutto quando le lacune si accumulano nei primi anni.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            A Emergenza Studio seguiamo studenti delle medie e delle superiori con un percorso su misura, che parte dal livello reale dello studente e lavora su grammatica, lessico e capacità comunicativa.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Basi grammaticali solide: articoli, presente e passé composé, verbi irregolari più comuni, costruzione della frase. Ampliamento del lessico quotidiano e comprensione di testi e dialoghi semplici, per arrivare alle superiori senza lacune.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Grammatica avanzata: congiuntivo, condizionale, periodo ipotetico, pronomi e connettori. Per il liceo linguistico, supporto anche su letteratura francese e analisi del testo. Lavoriamo sulla conversazione per sciogliere la produzione orale e prepariamo verifiche scritte e interrogazioni con esercizi mirati sul programma di classe.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Certificazioni DELF</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Prepariamo le certificazioni DELF nei vari livelli, con esercitazioni sulle quattro prove: comprensione orale e scritta, produzione orale e scritta. Un percorso strutturato sul formato d&apos;esame, con simulazioni complete.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio alle lingue</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Una lingua non si impara solo sui libri: si parla, si ascolta, si scrive. Ogni lezione alterna grammatica ed esercizi a momenti di uso attivo della lingua, perché le regole si fissano usandole.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con lacune accumulate, costruiamo percorsi di recupero che ripartono dalle basi mancanti, anche tornando ad argomenti di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per il francese</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor con solida preparazione linguistica ed esperienza didattica",
              "Percorsi su misura: recupero, potenziamento o preparazione DELF",
              "Possibilità di intensificare le lezioni prima di verifiche e interrogazioni",
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
        title="Prenota una lezione di francese"
        buttonText="Prenota una lezione di francese"
      />
    </>
  );
}
