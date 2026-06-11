import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Latino e Greco Mogliano Veneto",
  description:
    "Ripetizioni di latino e greco a Mogliano Veneto per liceo classico e scientifico: grammatica, versioni, autori. Metodo per le versioni. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/latino-greco/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Latino e Greco", href: "/materie/latino-greco" },
];

export default function LatinoGrecoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Latino e Greco", href: "/materie/latino-greco" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Latino e Greco a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Latino e greco sono le materie che mettono più in difficoltà gli studenti dei licei: le versioni non si improvvisano, e chi accumula lacune in grammatica nei primi due anni se le trascina fino alla maturità.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di lingue classiche lavorano con studenti del liceo classico, scientifico e linguistico, con un approccio che parte sempre dall&apos;analisi della frase prima della traduzione: capire la struttura viene prima di cercare le parole sul vocabolario.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Latino per il liceo</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Morfologia e grammatica, sintassi dei casi, del verbo e del periodo, traduzione di versioni, autori: Cesare, Cicerone, Seneca, Tacito, Virgilio, Orazio. Copertura completa del programma di liceo classico, scientifico e linguistico, dal biennio alla preparazione delle verifiche del triennio.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Greco per il liceo classico</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Morfologia (declinazioni, verbi in -ω e in -μι, aoristi), sintassi, traduzione di versioni, autori: Senofonte, Lisia, Platone, Omero, i tragici. Supporto sia per il recupero delle basi del biennio sia per la preparazione della seconda prova della maturità classica.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il metodo per le versioni</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La maggior parte degli studenti affronta la versione cercando subito le parole sul vocabolario: è l&apos;errore che porta a traduzioni senza senso. Il nostro metodo è sistematico: prima l&apos;analisi del periodo, individuando principale, subordinate e connettivi; poi l&apos;analisi della frase, riconoscendo verbi, soggetti e costrutti; solo alla fine il vocabolario.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Lo studente impara a costruire la traduzione in modo autonomo e ripetibile, finché il metodo diventa automatico e applicabile a qualsiasi versione, in classe come a casa.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per latino e greco</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor specializzati in lingue classiche con esperienza didattica comprovata",
              "Possibilità di intensificare le lezioni prima di compiti in classe e interrogazioni",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non servono latino o greco",
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
        title="Prenota una lezione di latino o greco"
        buttonText="Prenota una lezione di latino o greco"
      />
    </>
  );
}
