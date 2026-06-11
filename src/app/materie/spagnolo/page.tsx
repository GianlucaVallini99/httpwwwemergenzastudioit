import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ripetizioni Spagnolo Mogliano Veneto",
  description:
    "Ripetizioni di spagnolo a Mogliano Veneto per medie e superiori. Grammatica, letteratura, conversazione e preparazione DELE. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/spagnolo/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Spagnolo", href: "/materie/spagnolo" },
];

export default function SpagnoloPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Spagnolo", href: "/materie/spagnolo" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Spagnolo a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Lo spagnolo sembra facile finché non arrivano le prime verifiche: la somiglianza con l&apos;italiano inganna, e tra falsi amici, congiuntivo e accenti molti studenti si trovano in difficoltà proprio quando il programma accelera.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I nostri tutor di spagnolo seguono studenti delle scuole medie e superiori con un metodo che unisce solidità grammaticale e uso vivo della lingua, sempre allineato al programma scolastico.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole medie</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Presente dei verbi regolari e irregolari, lessico di base, comprensione di testi semplici, pronuncia e prime produzioni scritte. Costruiamo fondamenta solide per chi proseguirà lo spagnolo alle superiori.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Per le scuole superiori</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Grammatica completa (tempi del passato, futuro, condizionale, congiuntivo, perifrasi verbali), letteratura spagnola e ispanoamericana, conversazione per migliorare fluidità e pronuncia, preparazione mirata a verifiche e interrogazioni. Seguiamo il programma di tutti gli indirizzi, dal liceo linguistico agli istituti tecnici.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Certificazioni DELE</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Prepariamo anche agli esami DELE dell&apos;Instituto Cervantes, dal livello A2 al B2: simulazioni delle prove scritte e orali, strategie per ogni sezione dell&apos;esame e un piano di studio calibrato sulla data della sessione.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro approccio alle lingue</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Non crediamo nello studio mnemonico delle regole. Ogni lezione alterna spiegazione, applicazione guidata e produzione autonoma: si parla e si scrive in spagnolo fin da subito, perché la lingua si impara usandola.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per gli studenti con lacune accumulate, costruiamo percorsi di recupero che ripartono dalle basi mancanti, anche se significa tornare ad argomenti di anni precedenti.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Perché scegliere Emergenza Studio per lo spagnolo</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Tutor di spagnolo con esperienza didattica comprovata",
              "Possibilità di intensificare le lezioni prima di verifiche e interrogazioni",
              "Pacchetti ore utilizzabili anche per altre materie se una settimana non serve spagnolo",
              "Ambiente tranquillo e dedicato, a 50 metri dal Liceo Berto",
              "Prezzi trasparenti e fatturazione regolare",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Non solo ripetizioni: scopri i nostri corsi
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Oltre alle lezioni individuali organizziamo corsi di gruppo durante tutto l&apos;anno: dall&apos;English Speaking Club ai corsi di recupero estivi.
            </p>
            <Link href="/corsi" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
              Vai ai corsi →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Prenota una lezione di spagnolo"
        buttonText="Prenota una lezione di spagnolo"
      />
    </>
  );
}
