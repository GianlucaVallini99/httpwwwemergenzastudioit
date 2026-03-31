import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { WHATSAPP_URL, SITE_URL, PRICES } from "@/lib/constants";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Servizi e Prezzi | Emergenza Studio - Ripetizioni Mogliano Veneto",
  description:
    "Ripetizioni individuali, di gruppo, doposcuola e aiuto compiti. Prezzi da €16/ora. Fattura regolare con detrazione 19%. Mogliano Veneto (TV).",
  alternates: { canonical: `${SITE_URL}/servizi` },
};

const breadcrumbs = [{ label: "Servizi", href: "/servizi" }];

export default function ServiziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Servizi", href: "/servizi" }])),
        }}
      />

      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Servizi e Prezzi – Ripetizioni a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-16">
            Emergenza Studio offre ripetizioni e supporto allo studio per studenti di ogni livello: dalle elementari all&apos;università. Ogni percorso è personalizzato sulle esigenze dello studente, con la flessibilità di un team di tutor qualificati e pacchetti adattabili.
          </p>

          {/* Ripetizioni Individuali */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ripetizioni Individuali
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Le lezioni individuali sono il cuore della nostra offerta. Ogni studente lavora uno-a-uno con un tutor specializzato nella materia richiesta, in un ambiente tranquillo e dedicato.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Per chi sono</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Studenti che hanno bisogno di colmare lacune specifiche, preparare verifiche e interrogazioni, recuperare debiti formativi o semplicemente potenziare le proprie competenze.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Come funzionano</h3>
            <p className="text-muted-foreground leading-relaxed">
              Il tutor costruisce un percorso personalizzato partendo dal livello dello studente. Ogni lezione prevede spiegazione, esercizi guidati e verifica della comprensione. Monitoriamo i progressi e adattiamo il programma in corso d&apos;opera.
            </p>
          </div>

          {/* Ripetizioni di Gruppo */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ripetizioni di Gruppo
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Per chi preferisce studiare in compagnia, organizziamo lezioni in piccoli gruppi di 2-4 studenti dello stesso livello.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Per chi sono</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Studenti che condividono la stessa materia e lo stesso programma scolastico. Ideali per compagni di classe che vogliono ripassare insieme.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>I vantaggi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Costo inferiore rispetto alle lezioni individuali, confronto tra pari, esercitazioni collaborative. Il tutor gestisce il gruppo garantendo attenzione a ciascun partecipante.
            </p>
          </div>

          {/* Aiuto Compiti */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Aiuto Compiti e Doposcuola
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Un supporto quotidiano strutturato per gli studenti più giovani che hanno bisogno di guida nello svolgimento dei compiti e nell&apos;organizzazione dello studio.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Per chi è</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Studenti delle elementari e delle medie che faticano a gestire i compiti in autonomia o che hanno bisogno di acquisire un metodo di studio efficace.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>Come funziona</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lo studente viene al centro dopo la scuola, svolge i compiti assistito da un tutor e ripassa le lezioni del giorno. L&apos;obiettivo non è solo &quot;fare i compiti&quot; ma costruire autonomia e metodo.
            </p>
          </div>

          {/* Pacchetti Multi-Materia */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Pacchetti Ore Multi-Materia
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 p-8 md:p-10 mb-6">
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                La nostra formula più flessibile. Acquisti un pacchetto di ore e le utilizzi come vuoi: questa settimana matematica, la prossima inglese, quella dopo fisica. Senza vincoli di materia, senza vincoli di tutor.
              </p>
              <h3 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>Come funzionano i pacchetti:</h3>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Scegli il numero di ore che vuoi acquistare
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Prenota le lezioni nelle materie che ti servono, quando ti servono
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Cambia materia, giorno e orario ogni settimana
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Le ore non scadono entro il periodo concordato
                </li>
              </ul>
              <h3 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>Perché convengono</h3>
              <p className="text-muted-foreground leading-relaxed">
                I pacchetti hanno un prezzo per ora inferiore rispetto alla lezione singola, e ti danno la libertà di adattare il supporto scolastico alle necessità reali della settimana. Se questa settimana hai la verifica di matematica e la prossima l&apos;interrogazione di storia, usi lo stesso pacchetto per entrambe.
              </p>
            </div>
            <div className="text-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Richiedi info sui pacchetti
              </a>
            </div>
          </div>

          {/* Prezzi */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Prezzi
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-6 py-4 font-semibold" style={{ fontFamily: "var(--font-display)" }}>Livello scolastico</th>
                    <th className="text-right px-6 py-4 font-semibold" style={{ fontFamily: "var(--font-display)" }}>Prezzo/ora</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((p, i) => (
                    <tr key={p.level} className={i % 2 === 0 ? "bg-white" : "bg-muted/50"}>
                      <td className="px-6 py-4 font-medium">{p.level}</td>
                      <td className="px-6 py-4 text-right font-bold text-accent">€{p.price}/ora</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4 max-w-lg mx-auto">
              I pacchetti ore multi-materia prevedono tariffe agevolate. Contattaci per un preventivo personalizzato.
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2 max-w-lg mx-auto">
              Tutte le lezioni sono regolarmente fatturate. Le famiglie possono detrarre il 19% del costo nella dichiarazione dei redditi.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Prenota una lezione di prova"
        buttonText="Prenota una lezione di prova"
      />
    </>
  );
}
