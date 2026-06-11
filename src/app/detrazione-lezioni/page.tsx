import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import PreventivoCalculator from "@/components/PreventivoCalculator";
import { SITE_URL, PACKAGE_MIN_LESSONS } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Receipt, BadgePercent, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Detrazione Lezioni e Preventivo | Emergenza Studio Mogliano Veneto",
  description:
    "Le lezioni di Emergenza Studio sono fatturate e detraibili al 19%. Calcola il preventivo online e scopri quanto puoi recuperare nella dichiarazione dei redditi.",
  alternates: { canonical: `${SITE_URL}/detrazione-lezioni/` },
};

const breadcrumbs = [{ label: "Detrazione lezioni", href: "/detrazione-lezioni" }];

const VANTAGGI = [
  {
    Icon: Receipt,
    title: "Tutte le lezioni sono fatturate",
    desc: "Ogni lezione svolta da Emergenza Studio è accompagnata da fattura regolare: nessun pagamento in nero, nessuna sorpresa.",
  },
  {
    Icon: BadgePercent,
    title: "Recuperi il 19% della spesa",
    desc: "Le spese documentate possono essere portate in detrazione nella dichiarazione dei redditi, entro il massimale annuo previsto per studente.",
  },
  {
    Icon: FileCheck,
    title: "Documentazione pronta per il CAF",
    desc: "A fine anno ti forniamo il riepilogo delle fatture, pronto da consegnare al commercialista o al CAF.",
  },
];

export default function DetrazioneLezioniPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Detrazione lezioni", href: "/detrazione-lezioni" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Lezioni detraibili: calcola il tuo preventivo
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
            A Emergenza Studio ogni lezione è regolarmente fatturata. Questo significa che le famiglie
            possono portare la spesa in detrazione nella dichiarazione dei redditi e recuperare
            il 19% di quanto speso, entro i massimali previsti dalla normativa.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
            Usa il calcolatore qui sotto per stimare il costo del tuo percorso: con almeno{" "}
            {PACKAGE_MIN_LESSONS} lezioni si applica automaticamente la tariffa pacchetto, più conveniente
            della lezione singola.
          </p>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start mb-16">
            <div className="space-y-5">
              {VANTAGGI.map((v) => (
                <div key={v.title} className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent grid place-items-center shrink-0">
                    <v.Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {v.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <PreventivoCalculator />
          </div>
        </div>
      </section>

      <CtaSection
        title="Hai dubbi sulla detrazione? Scrivici"
        buttonText="Scrivici su WhatsApp"
      />
    </>
  );
}
