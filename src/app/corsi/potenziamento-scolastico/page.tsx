import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSignupForm from "@/components/CourseSignupForm";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { POTENZIAMENTO } from "@/lib/corsi-data";
import { Clock, Euro, CheckCircle, CalendarDays, Sigma, Atom, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Corso di Potenziamento Scolastico annuale | Emergenza Studio Mogliano Veneto",
  description:
    `Corso annuale di matematica e fisica a Mogliano Veneto: ${POTENZIAMENTO.settimane} settimane, ${POTENZIAMENTO.oreTotali} ore totali, €${POTENZIAMENTO.prezzoOra}/h pagabili in ${POTENZIAMENTO.rate} rate da €${POTENZIAMENTO.importoRata}. Per vivere la scuola senza la paura delle verifiche.`,
  alternates: { canonical: `${SITE_URL}/corsi/potenziamento-scolastico/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Potenziamento Scolastico", href: "/corsi/potenziamento-scolastico" },
];

export default function PotenziamentoScolasticoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Potenziamento Scolastico", href: "/corsi/potenziamento-scolastico" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: POTENZIAMENTO.titolo,
            description: POTENZIAMENTO.sottotitolo,
            price: String(POTENZIAMENTO.prezzoTotale),
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
          }])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Tutto l&apos;anno scolastico · Iscrizioni aperte
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-5 leading-[1.02]" style={{ fontFamily: "var(--font-display)" }}>
              Corso di Potenziamento Scolastico
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              Matematica e fisica ogni settimana, per tutto l&apos;anno: studi con
              costanza, arrivi preparato alle verifiche e smetti di rincorrere i
              voti all&apos;ultimo momento.
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 max-w-md sm:max-w-none">
              {[
                { icon: <Euro className="w-5 h-5" />, big: `€${POTENZIAMENTO.prezzoOra}/h`, small: `${POTENZIAMENTO.rate} rate da €${POTENZIAMENTO.importoRata}` },
                { icon: <Clock className="w-5 h-5" />, big: `${POTENZIAMENTO.oreTotali} ore`, small: `${POTENZIAMENTO.oreSettimana} ore a settimana` },
                { icon: <CalendarDays className="w-5 h-5" />, big: `${POTENZIAMENTO.settimane}`, small: "settimane di corso" },
              ].map((s) => (
                <div key={s.small} className="rounded-2xl bg-secondary/10 text-secondary px-3 py-3 sm:px-5 text-center sm:text-left sm:flex sm:items-center sm:gap-3">
                  <span className="hidden sm:block">{s.icon}</span>
                  <div>
                    <div className="font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>{s.big}</div>
                    <div className="text-[11px] sm:text-xs font-medium opacity-80">{s.small}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Come funziona
            </h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-10 leading-relaxed">
              Un appuntamento fisso di {POTENZIAMENTO.oreSettimana} ore a settimana
              per {POTENZIAMENTO.settimane} settimane, in parallelo al programma
              della tua classe: ripassi la teoria, ti alleni con gli esercizi e
              simuli le verifiche prima di affrontarle a scuola.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              {[
                { icon: <Sigma className="w-5 h-5" />, nome: "Matematica", testo: "Segui il programma della tua classe: teoria chiarita, metodi di svolgimento ed esercizi mirati sulle verifiche in arrivo." },
                { icon: <Atom className="w-5 h-5" />, nome: "Fisica", testo: "Dalla teoria ai problemi: capisci i concetti e impari a impostare gli esercizi come li chiedono i tuoi professori." },
              ].map((m) => (
                <div key={m.nome} className="bg-white rounded-2xl border border-border p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">{m.icon}</div>
                    <h3 className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{m.nome}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.testo}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-5 sm:p-6">
              <h3 className="text-base font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Materiale fornito
              </h3>
              <ul className="space-y-2">
                {POTENZIAMENTO.materiale.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-2xl bg-white border border-border p-5 sm:p-6 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Pagamento in 4 rate da €{POTENZIAMENTO.importoRata}:</strong>{" "}
                il corso costa €{POTENZIAMENTO.prezzoOra} all&apos;ora per un totale
                di €{POTENZIAMENTO.prezzoTotale}, suddiviso in {POTENZIAMENTO.rate}{" "}
                rate distribuite lungo l&apos;anno scolastico.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="iscrizione" className="section-spacing">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Iscriviti al corso
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Compila il form: registriamo subito la tua iscrizione e ti
              ricontattiamo entro 24 ore per confermare orario e partenza del
              gruppo.
            </p>
            <CourseSignupForm
              corso={POTENZIAMENTO.titolo}
              corsoSlug={POTENZIAMENTO.slug}
              conCampiScuola
            />
          </div>
        </div>
      </section>
    </>
  );
}
