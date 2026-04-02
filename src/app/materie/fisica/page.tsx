import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ripetizioni Fisica Mogliano Veneto",
  description:
    "Ripetizioni di fisica a Mogliano Veneto per superiori e università. Approccio pratico: prima capiamo il fenomeno, poi le equazioni. Emergenza Studio.",
  alternates: { canonical: `${SITE_URL}/materie/fisica/` },
};

const breadcrumbs = [
  { label: "Materie", href: "/materie" },
  { label: "Fisica", href: "/materie/fisica" },
];

export default function FisicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Materie", href: "/materie" },
            { name: "Fisica", href: "/materie/fisica" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni di Fisica a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            La fisica è la seconda materia più richiesta al nostro centro. Molti studenti la trovano ostica perché richiede di combinare comprensione teorica e capacità di applicarla ai problemi: non basta conoscere la formula, bisogna sapere quando usarla e perché.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            A Emergenza Studio affrontiamo la fisica con un approccio pratico: prima capiamo il fenomeno, poi formalizziamo con le equazioni, infine risolviamo i problemi passo per passo.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Argomenti trattati</h2>
          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Superiori</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cinematica, dinamica, lavoro ed energia, termodinamica, onde, ottica, elettrostatica, corrente elettrica, elettromagnetismo, fisica moderna (relatività, quanti).
          </p>
          <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Università</h3>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Meccanica classica, Termodinamica e Teoria cinetica, Elettromagnetismo (equazioni di Maxwell), Ottica fisica, Meccanica dei fluidi. Preparazione specifica per Fisica I e Fisica II.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Il nostro metodo</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ogni lezione di fisica a Emergenza Studio segue un percorso strutturato: partiamo dal concetto fisico (cosa succede e perché), passiamo alla formalizzazione matematica (le equazioni che descrivono il fenomeno), e concludiamo con la risoluzione di problemi progressivamente più complessi.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Per gli studenti universitari, lavoriamo direttamente sui problemi d&apos;esame del proprio corso, con simulazioni e correzione dettagliata.
          </p>
        </div>
      </section>

      <CtaSection
        title="Prenota una lezione di fisica"
        buttonText="Prenota una lezione di fisica"
      />
    </>
  );
}
