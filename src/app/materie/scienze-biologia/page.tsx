import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Scienze e Biologia Mogliano Veneto",
  description:
    "Ripetizioni di scienze e biologia a Mogliano Veneto per medie, superiori, università e test d'ingresso. Tutor specializzati. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/scienze-biologia/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Scienze e Biologia", href: "/materie/scienze-biologia" },
];

export default function ScienzeBiologiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Scienze e Biologia", href: "/materie/scienze-biologia" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Scienze e Biologia a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Scienze e biologia sembrano materie &quot;da studiare a memoria&quot;, ma è proprio questo l&apos;errore più comune: senza capire i meccanismi — come funziona una cellula, perché un carattere si eredita, come si muovono le placche — le nozioni si dimenticano alla prima verifica.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di scienze e biologia seguono studenti dalle scuole medie all&apos;università, con un approccio che privilegia la comprensione dei processi rispetto alla ripetizione meccanica delle definizioni.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            La cellula, i viventi e la loro classificazione, il corpo umano, l&apos;ecologia, la Terra e il sistema solare. Lavoriamo sul metodo di studio oltre che sui contenuti, per costruire le basi che serviranno alle superiori.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Biologia cellulare e molecolare, genetica, evoluzione, anatomia e fisiologia umana, ecologia, scienze della Terra: minerali e rocce, tettonica delle placche, atmosfera e clima. Copertura completa del programma di scienze naturali di tutti gli indirizzi: liceo scientifico, classico, linguistico, scienze umane, istituti tecnici.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per l&apos;università e i test d&apos;ingresso</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Biologia generale, citologia e istologia, genetica per i corsi di laurea scientifici e sanitari. Prepariamo inoltre la biologia per i TOLC-MED e per il semestre filtro di Medicina, dove è una delle materie d&apos;esame: percorsi calibrati sul programma ufficiale, con quiz e simulazioni delle prove.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio a scienze e biologia</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nello studio mnemonico di elenchi e definizioni. Ogni lezione si costruisce su tre fasi: comprensione del processo, schematizzazione guidata, esposizione autonoma con verifica. Se un meccanismo non è chiaro, si torna indietro finché il fondamento non è solido.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con difficoltà nell&apos;esposizione orale, lavoriamo anche sulla capacità di collegare gli argomenti e di usare il lessico scientifico corretto, decisivo in interrogazioni e verifiche.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per scienze e biologia</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor specializzati in discipline scientifiche con esperienza didattica comprovata",
              "Preparazione mirata a TOLC-MED e semestre filtro di Medicina",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve scienze",
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
        title="Prenota una lezione di scienze o biologia"
        buttonText="Prenota una lezione di scienze"
      />
    </>
  );
}
