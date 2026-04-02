import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Matematica Mogliano Veneto",
  description:
    "Ripetizioni di matematica a Mogliano Veneto per medie, superiori e università. Tutor specializzati, pacchetti flessibili, fatturazione detraibile al 19%. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/matematica/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Matematica", href: "/materie/matematica" },
];

export default function MatematicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Matematica", href: "/materie/matematica" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Matematica a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            La matematica è la materia più richiesta a Emergenza Studio, e non a caso: è quella dove gli studenti accumulano più lacune e dove un supporto strutturato fa la differenza tra un&apos;insufficienza e un voto solido.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di matematica lavorano con studenti dalle scuole medie all&apos;università, con un approccio che parte sempre dalla comprensione del concetto prima della risoluzione meccanica degli esercizi.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Aritmetica, frazioni, proporzioni, geometria piana, equazioni di primo grado, introduzione alle funzioni. Lavoriamo sulle basi che serviranno per affrontare le superiori con sicurezza.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Equazioni e disequazioni, sistemi, geometria analitica, trigonometria, logaritmi ed esponenziali, limiti, derivate, integrali, probabilità e statistica. Copertura completa del programma di tutti gli indirizzi: liceo scientifico, classico, linguistico, istituti tecnici.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per l&apos;università</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Analisi Matematica I e II, Algebra lineare, Geometria, Calcolo delle probabilità, Statistica. Supporto mirato alla preparazione degli esami con esercizi d&apos;esame e simulazioni.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio alla matematica</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nella memorizzazione meccanica delle formule. Ogni lezione si costruisce su tre fasi: comprensione del concetto, applicazione guidata, esercizio autonomo con verifica. Se qualcosa non è chiaro, si torna indietro finché il fondamento non è solido.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con difficoltà croniche in matematica, costruiamo percorsi di recupero che partono dalle basi mancanti, anche se significa tornare ad argomenti di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per la matematica</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor specializzati in matematica con esperienza didattica comprovata",
              "Possibilità di intensificare le lezioni prima di verifiche e interrogazioni",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve matematica",
              "Ambiente tranquillo e dedicato, a 50 metri dal Liceo Berto",
              "Prezzi trasparenti e fatturazione detraibile al 19%",
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
        title="Prenota una lezione di matematica"
        buttonText="Prenota una lezione di matematica"
      />
    </>
  );
}
