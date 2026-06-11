import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Tedesco Mogliano Veneto",
  description:
    "Ripetizioni di tedesco a Mogliano Veneto per medie e superiori. Declinazioni, sintassi, lessico e preparazione Goethe. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/tedesco/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Tedesco", href: "/materie/tedesco" },
];

export default function TedescoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Tedesco", href: "/materie/tedesco" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Tedesco a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Il tedesco è una delle lingue dove gli studenti chiedono più aiuto: declinazioni, generi dei sostantivi e posizione del verbo seguono regole rigorose, e basta perdere un passaggio per trovarsi in difficoltà su tutto il resto.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di tedesco seguono studenti delle scuole medie e superiori con un metodo che rende la grammatica tedesca un sistema logico da capire, non un elenco di eccezioni da memorizzare.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Presente dei verbi, articoli e generi, lessico di base, prime strutture della frase, comprensione di testi semplici e pronuncia. Costruiamo le fondamenta che renderanno il tedesco delle superiori molto meno ostico.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Declinazioni di articoli e aggettivi nei quattro casi, sintassi della frase principale e secondaria, verbi separabili e modali, Perfekt e Präteritum, ampliamento del lessico, comprensione e produzione scritta e orale. Preparazione mirata a verifiche e interrogazioni, in linea con il programma di licei e istituti tecnici.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Certificazioni Goethe</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Prepariamo anche agli esami del Goethe-Institut, dal livello A2 al B2: simulazioni delle quattro prove (lettura, ascolto, scrittura, orale), strategie per ogni sezione e un piano di studio calibrato sulla data della sessione.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio alle lingue</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nello studio mnemonico delle regole. Ogni lezione alterna spiegazione, applicazione guidata e produzione autonoma: si lavora su frasi e testi reali fin da subito, perché la lingua si impara usandola.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con lacune accumulate, costruiamo percorsi di recupero che ripartono dalle basi mancanti, anche se significa tornare ad argomenti di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per il tedesco</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor di tedesco con esperienza didattica comprovata",
              "Possibilità di intensificare le lezioni prima di verifiche e interrogazioni",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve tedesco",
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
        title="Prenota una lezione di tedesco"
        buttonText="Prenota una lezione di tedesco"
      />
    </>
  );
}
