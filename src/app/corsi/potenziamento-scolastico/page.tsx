import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, TintedList, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { POTENZIAMENTO, POTENZIAMENTO_CLASSI, GRUPPO_MIN, GRUPPO_MAX } from "@/lib/corsi-data";
import { Clock, Euro, Users, CalendarDays, ArrowRight, Sigma, Atom, ShieldCheck } from "lucide-react";

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

const MATERIE_DETTAGLIO = [
  { icon: <Sigma className="w-5 h-5" />, nome: "Matematica", testo: "Segui il programma della tua classe: teoria chiarita, metodi di svolgimento ed esercizi mirati sulle verifiche in arrivo." },
  { icon: <Atom className="w-5 h-5" />, nome: "Fisica", testo: "Dalla teoria ai problemi: capisci i concetti e impari a impostare gli esercizi come li chiedono i tuoi professori." },
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
          __html: JSON.stringify(courseJsonLd([
            {
              name: POTENZIAMENTO.titolo,
              description: POTENZIAMENTO.sottotitolo,
              price: String(POTENZIAMENTO.prezzoTotale),
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            },
            ...POTENZIAMENTO_CLASSI.map((c) => ({
              name: `Potenziamento Scolastico — ${c.classe}`,
              description: c.sottotitolo,
              price: String(POTENZIAMENTO.prezzoTotale),
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            })),
          ])),
        }}
      />
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-8 pb-12 md:pb-16">
        <SectionBlobs variant="a" />
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 mb-6 reveal">
              Tutto l&apos;anno scolastico · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(32px,5vw,54px)] mb-5 reveal d1">
              Corso di Potenziamento Scolastico
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 font-semibold leading-snug max-w-3xl reveal d2">
              Matematica e fisica ogni settimana, per tutto l&apos;anno: studi con
              costanza, arrivi preparato alle verifiche e smetti di rincorrere i
              voti all&apos;ultimo momento.
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${POTENZIAMENTO.prezzoOra}/h`, small: `${POTENZIAMENTO.rate} rate da €${POTENZIAMENTO.importoRata}` },
                  { icon: <Clock className="w-4 h-4" />, big: `${POTENZIAMENTO.oreTotali} ore`, small: `${POTENZIAMENTO.oreSettimana} ore a settimana` },
                  { icon: <CalendarDays className="w-4 h-4" />, big: `${POTENZIAMENTO.settimane}`, small: "settimane di corso" },
                ]}
              />
            </div>
            <a
              href="#classi"
              className={`inline-flex items-center gap-2.5 mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(21,50,79,.7)] ${EASE} hover:-translate-y-0.5 hover:bg-navy-deep active:scale-[0.98] reveal d3`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scegli la tua classe
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="classi" className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
            Un percorso per ogni classe
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed reveal d1">
            Il corso segue il programma della tua classe, dalla prima alla quinta
            superiore: scegli il tuo anno e guarda il programma completo di
            matematica e fisica, poi iscriviti direttamente online.
          </p>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {POTENZIAMENTO_CLASSI.map((c, i) => (
              <Link
                key={c.slug}
                href={`/corsi/potenziamento-scolastico/${c.slug}`}
                className={`group relative flex flex-col rounded-[26px] bg-white border border-border p-5 sm:p-6 overflow-hidden ${EASE} hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,.35)] active:scale-[0.99] reveal d${(i % 3) + 1}`}
              >
                <span aria-hidden className="absolute -top-1 right-4 text-[56px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.12)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base sm:text-lg mb-2 leading-snug pr-10">
                  {c.classe}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.sottotitolo}</p>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-foreground">
                    <Users className="w-3.5 h-3.5" /> {GRUPPO_MIN}–{GRUPPO_MAX} per gruppo
                  </span>
                  <span className={`w-8 h-8 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0 ${EASE} group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing section-tint !py-16 md:!py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">Come funziona</h2>
            <p className="text-muted-foreground text-center mb-8 md:mb-10 leading-relaxed reveal d1">
              <strong className="text-secondary">Matematica e Fisica sono due corsi
              annuali separati:</strong> puoi seguirne uno o entrambi. Ognuno è un
              appuntamento fisso di {POTENZIAMENTO.oreSettimana} ore a settimana per{" "}
              {POTENZIAMENTO.settimane} settimane, in parallelo al programma della tua
              classe: ripassi la teoria, ti alleni con gli esercizi e simuli le
              verifiche prima di affrontarle a scuola.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mb-5">
              {MATERIE_DETTAGLIO.map((m, i) => (
                <div key={m.nome} className={`bg-white rounded-[26px] border border-border p-5 sm:p-6 ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] hover:-translate-y-0.5 reveal d${i + 1}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">{m.icon}</div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-secondary">Corso di</span>
                      <h3 className="text-lg leading-tight">{m.nome}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.testo}</p>
                </div>
              ))}
            </div>
            <div className="reveal d2">
              <TintedList title="Materiale fornito" items={POTENZIAMENTO.materiale} />
            </div>
            <div className="mt-5 rounded-[26px] bg-white border border-border p-5 sm:p-6 flex items-start gap-3 reveal d3">
              <span className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <p className="text-sm text-foreground leading-relaxed [font-variant-numeric:tabular-nums]">
                <strong>€{POTENZIAMENTO.prezzoOra}/h per materia, {POTENZIAMENTO.rate} rate da €{POTENZIAMENTO.importoRata}:</strong>{" "}
                ogni corso costa €{POTENZIAMENTO.prezzoTotale} ({POTENZIAMENTO.oreTotali}{" "}
                ore), suddiviso in {POTENZIAMENTO.rate} rate lungo l&apos;anno. Chi
                sceglie sia matematica sia fisica si iscrive a due corsi distinti.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="iscrizione" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center rounded-[30px] bg-secondary/8 border border-secondary/15 p-6 sm:p-10 reveal">
            <h2 className="text-2xl md:text-3xl mb-4">Pronto a iscriverti?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              L&apos;iscrizione parte dalla tua classe: scegli l&apos;anno, poi indica
              se vuoi il corso di matematica, quello di fisica o entrambi. Registriamo
              tutto subito e ti ricontattiamo entro 24 ore.
            </p>
            <a
              href="#classi"
              className={`inline-flex items-center gap-2.5 rounded-full bg-accent text-accent-foreground px-7 py-4 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(45,138,138,.8)] ${EASE} hover:-translate-y-0.5 hover:bg-teal-deep active:scale-[0.98]`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scegli la tua classe
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
