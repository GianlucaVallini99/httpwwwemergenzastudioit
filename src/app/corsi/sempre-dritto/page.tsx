import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, TintedList, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { SEMPRE_DRITTO, SEMPRE_DRITTO_CLASSI } from "@/lib/corsi-data";
import { Clock, Euro, Users, CalendarDays, ArrowRight, Sigma, GraduationCap, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sempre Dritto: corso annuale di matematica | Emergenza Studio Mogliano Veneto",
  description: `Corso di matematica per tutto l'anno scolastico a Mogliano Veneto: dal ${SEMPRE_DRITTO.inizio} all'${SEMPRE_DRITTO.fine}, ${SEMPRE_DRITTO.oreSettimana} ore a settimana in gruppi da ${SEMPRE_DRITTO.gruppoMin} a ${SEMPRE_DRITTO.gruppoMax} studenti, €${SEMPRE_DRITTO.prezzoOra}/h invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}. Un gruppo per ogni classe.`,
  alternates: { canonical: `${SITE_URL}/corsi/sempre-dritto/` },
};

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Sempre Dritto", href: "/corsi/sempre-dritto" },
];

const COME_FUNZIONA = [
  {
    icon: <CalendarDays className="w-5 h-5" />,
    titolo: "Un appuntamento fisso a settimana",
    testo: `Due ore sempre nello stesso giorno e alla stessa ora, dal ${SEMPRE_DRITTO.inizio} fino all'${SEMPRE_DRITTO.fine}: la matematica smette di accumularsi e non serve più rincorrere il programma a ridosso delle verifiche.`,
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    titolo: "Gruppi per classe e per indirizzo",
    testo: `Un gruppo per ogni anno, dalla prima alla quinta superiore. Quando i numeri lo permettono mettiamo insieme studenti dello stesso indirizzo scolastico, così il programma segue quello della tua scuola.`,
  },
  {
    icon: <Sigma className="w-5 h-5" />,
    titolo: "Teoria, esercizi e simulazioni",
    testo: "Ogni lezione riprende gli argomenti che state affrontando in classe: si chiarisce la teoria, si lavora sugli esercizi e ci si allena sulle verifiche prima di farle a scuola.",
  },
];

export default function SempreDrittoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Sempre Dritto", href: "/corsi/sempre-dritto" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([
            {
              name: `${SEMPRE_DRITTO.titolo} — Corso annuale di matematica`,
              description: SEMPRE_DRITTO.sottotitolo,
              price: String(SEMPRE_DRITTO.prezzoTotale),
              startDate: SEMPRE_DRITTO.inizioISO,
              endDate: SEMPRE_DRITTO.fineISO,
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            },
            ...SEMPRE_DRITTO_CLASSI.map((c) => ({
              name: `${SEMPRE_DRITTO.titolo} — ${c.classe}`,
              description: c.sottotitolo,
              price: String(SEMPRE_DRITTO.prezzoTotale),
              startDate: SEMPRE_DRITTO.inizioISO,
              endDate: SEMPRE_DRITTO.fineISO,
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
              Si parte il {SEMPRE_DRITTO.inizio} · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(34px,5.5vw,60px)] mb-5 reveal d1">
              Sempre Dritto: matematica tutto l&apos;anno
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-4 font-semibold leading-snug max-w-3xl reveal d2">
              Due ore di matematica a settimana, in piccolo gruppo, dal{" "}
              {SEMPRE_DRITTO.inizio} all&apos;{SEMPRE_DRITTO.fine}: ti accompagniamo
              per tutto l&apos;anno scolastico, verifica dopo verifica.
            </p>
            <p className="text-base text-foreground/60 mb-8 leading-relaxed max-w-3xl reveal d2">
              In gruppo la stessa ora costa{" "}
              <strong className="text-secondary">€{SEMPRE_DRITTO.prezzoOra} invece di €{SEMPRE_DRITTO.prezzoOraIndividuale}</strong>{" "}
              della lezione individuale, materiale didattico aggiuntivo incluso.
            </p>
            <div className="reveal d2">
              <StatPills
                stats={[
                  { icon: <Euro className="w-4 h-4" />, big: `€${SEMPRE_DRITTO.prezzoOra}/h`, small: `invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}/h` },
                  { icon: <Clock className="w-4 h-4" />, big: `${SEMPRE_DRITTO.oreSettimana} ore`, small: "a settimana, tutto l'anno" },
                  { icon: <Users className="w-4 h-4" />, big: `${SEMPRE_DRITTO.gruppoMin}–${SEMPRE_DRITTO.gruppoMax}`, small: "studenti per gruppo" },
                ]}
              />
            </div>
            <a
              href="#classi"
              className={`inline-flex items-center gap-2.5 mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(21,50,79,.7)] ${EASE} hover:-translate-y-0.5 hover:bg-navy-deep active:scale-[0.98] reveal d3`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scegli il tuo anno
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
            Un gruppo per ogni classe
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed reveal d1">
            Il corso segue il programma del tuo anno, dalla prima alla quinta
            superiore: scegli la tua classe, guarda gli argomenti che affronteremo
            e iscriviti online.
          </p>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {SEMPRE_DRITTO_CLASSI.map((c, i) => (
              <Link
                key={c.slug}
                href={`/corsi/sempre-dritto/${c.slug}`}
                className={`group relative flex flex-col rounded-[26px] bg-white border border-border p-5 sm:p-6 overflow-hidden ${EASE} hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,.35)] active:scale-[0.99] reveal d${(i % 3) + 1}`}
              >
                <span aria-hidden className="absolute -top-1 right-4 text-[56px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.12)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base sm:text-lg mb-2 leading-snug pr-10">{c.classe}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.sottotitolo}</p>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-foreground">
                    <Users className="w-3.5 h-3.5" /> {SEMPRE_DRITTO.gruppoMin}–{SEMPRE_DRITTO.gruppoMax} per gruppo
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
              Sempre Dritto è un corso di <strong className="text-secondary">sola
              matematica</strong>: {SEMPRE_DRITTO.oreSettimana} ore a settimana per
              circa {SEMPRE_DRITTO.settimane} settimane di scuola,{" "}
              {`cioè ${SEMPRE_DRITTO.oreTotali} ore di lezione nell'arco dell'anno.`}
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mb-5">
              {COME_FUNZIONA.map((m, i) => (
                <div key={m.titolo} className={`bg-white rounded-[26px] border border-border p-5 sm:p-6 ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] hover:-translate-y-0.5 reveal d${i + 1}`}>
                  <div className="w-11 h-11 rounded-full bg-accent/12 text-accent flex items-center justify-center mb-3">{m.icon}</div>
                  <h3 className="text-base leading-tight mb-2">{m.titolo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.testo}</p>
                </div>
              ))}
            </div>
            <div className="reveal d2">
              <TintedList title="Materiale didattico incluso" items={SEMPRE_DRITTO.materiale} />
            </div>
            <div className="mt-5 rounded-[26px] bg-white border border-border p-5 sm:p-6 reveal d3">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
                  <Euro className="w-5 h-5" />
                </span>
                <p className="text-sm text-foreground leading-relaxed [font-variant-numeric:tabular-nums]">
                  <strong>
                    {`€${SEMPRE_DRITTO.prezzoOra} all'ora invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}:`}
                  </strong>{" "}
                  {`in gruppo l'ora di matematica costa il ${SEMPRE_DRITTO.scontoPercentuale}% in meno della lezione individuale. Le ${SEMPRE_DRITTO.oreTotali} ore dell'anno fanno €${SEMPRE_DRITTO.prezzoTotale}, pagabili in ${SEMPRE_DRITTO.rate} rate da €${SEMPRE_DRITTO.importoRata}.`}
                </p>
              </div>
              <ul className="space-y-2.5">
                {SEMPRE_DRITTO.puntiChiave.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center rounded-[30px] bg-secondary/8 border border-secondary/15 p-6 sm:p-10 reveal">
            <h2 className="text-2xl md:text-3xl mb-4">Pronto a partire?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              L&apos;iscrizione parte dal tuo anno: scegli la classe, indica i giorni
              in cui saresti disponibile e ti ricontattiamo entro 24 ore per
              confermare il giorno del gruppo.
            </p>
            <a
              href="#classi"
              className={`inline-flex items-center gap-2.5 rounded-full bg-accent text-accent-foreground px-7 py-4 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(45,138,138,.8)] ${EASE} hover:-translate-y-0.5 hover:bg-teal-deep active:scale-[0.98]`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scegli il tuo anno
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
