import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import SempreDrittoForm from "@/components/SempreDrittoForm";
import { SectionBlobs } from "@/components/Blobs";
import { StatPills, TintedList, FormShell, EASE } from "@/components/CorsoUI";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { SEMPRE_DRITTO, SEMPRE_DRITTO_CLASSI } from "@/lib/corsi-data";
import { Clock, Euro, Users, CalendarDays, ArrowRight, Sigma, GraduationCap, ChevronDown, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sempre Dritto: corso annuale di matematica | Emergenza Studio Mogliano Veneto",
  description: `Corso di matematica per tutto l'anno scolastico a Mogliano Veneto: dal ${SEMPRE_DRITTO.inizio} all'${SEMPRE_DRITTO.fine}, ${SEMPRE_DRITTO.oreSettimana} ore a settimana in gruppi da ${SEMPRE_DRITTO.gruppoMin} a ${SEMPRE_DRITTO.gruppoMax} studenti, €${SEMPRE_DRITTO.prezzoOra}/h invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}. Un gruppo per ogni classe, dalla prima alla quinta superiore. Iscrizione online.`,
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

// Icone dei riquadri "plus", nello stesso ordine di SEMPRE_DRITTO.plus.
const PLUS_ICONE = [
  <Euro key="prezzo" className="w-4 h-4" />,
  <GraduationCap key="classe" className="w-4 h-4" />,
  <Users key="gruppo" className="w-4 h-4" />,
  <Clock key="ore" className="w-4 h-4" />,
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
              description: `${SEMPRE_DRITTO.sottotitolo} Un gruppo per ogni classe, dalla prima alla quinta superiore.`,
              price: String(SEMPRE_DRITTO.prezzoTotale),
              startDate: SEMPRE_DRITTO.inizioISO,
              endDate: SEMPRE_DRITTO.fineISO,
              location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            },
          ])),
        }}
      />
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-6 pb-10 md:pt-8 md:pb-16">
        <SectionBlobs variant="a" />
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 mb-5 md:mb-6 reveal">
              Si parte il {SEMPRE_DRITTO.inizio} · Iscrizioni aperte
            </span>
            <h1 className="text-[clamp(30px,7vw,60px)] mb-4 md:mb-5 reveal d1">
              Sempre Dritto: matematica tutto l&apos;anno
            </h1>
            <p className="text-[17px] md:text-xl text-foreground/70 mb-4 font-semibold leading-snug max-w-3xl reveal d2">
              Due ore di matematica a settimana, in piccolo gruppo, dal{" "}
              {SEMPRE_DRITTO.inizio} all&apos;{SEMPRE_DRITTO.fine}: ti accompagniamo
              per tutto l&apos;anno scolastico, verifica dopo verifica.
            </p>
            <p className="text-[15px] md:text-base text-foreground/60 mb-7 md:mb-8 leading-relaxed max-w-3xl reveal d2">
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
              href="#iscrizione"
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2.5 mt-7 md:mt-8 rounded-full bg-primary text-primary-foreground px-6 py-4 sm:py-3.5 text-sm font-extrabold uppercase tracking-wider shadow-[0_18px_35px_-18px_rgba(21,50,79,.7)] ${EASE} hover:-translate-y-0.5 hover:bg-navy-deep active:scale-[0.98] reveal d3`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Iscriviti al corso
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing section-tint !py-12 md:!py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">Come funziona</h2>
            <p className="text-[15px] md:text-base text-muted-foreground text-center mb-7 md:mb-10 leading-relaxed reveal d1">
              Sempre Dritto è un corso di <strong className="text-secondary">sola
              matematica</strong>: {SEMPRE_DRITTO.oreSettimana} ore a settimana per
              circa {SEMPRE_DRITTO.settimane} settimane di scuola,{" "}
              {`cioè ${SEMPRE_DRITTO.oreTotali} ore di lezione nell'arco dell'anno.`}
            </p>
            <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-3 mb-3.5 sm:mb-5">
              {COME_FUNZIONA.map((m, i) => (
                <div key={m.titolo} className={`bg-white rounded-[22px] sm:rounded-[26px] border border-border p-5 sm:p-6 ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] hover:-translate-y-0.5 reveal d${i + 1}`}>
                  <div className="w-11 h-11 rounded-full bg-accent/12 text-accent flex items-center justify-center mb-3">{m.icon}</div>
                  <h3 className="text-base leading-tight mb-2">{m.titolo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.testo}</p>
                </div>
              ))}
            </div>

            {/* ── I plus: riquadri corti, due per riga anche sul telefono ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3.5 sm:mb-5">
              {SEMPRE_DRITTO.plus.map((p, i) => (
                <div
                  key={p.titolo}
                  className={`rounded-[20px] sm:rounded-[22px] bg-white border border-border p-4 sm:p-5 ${EASE} hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)] reveal d${(i % 3) + 1}`}
                >
                  <span className="inline-flex w-9 h-9 rounded-full bg-secondary/10 text-secondary items-center justify-center mb-2.5">
                    {PLUS_ICONE[i]}
                  </span>
                  <p className="font-black text-primary text-[15px] leading-tight mb-1 [font-variant-numeric:tabular-nums]" style={{ fontFamily: "var(--font-display)" }}>
                    {p.titolo}
                  </p>
                  <p className="text-[13px] text-muted-foreground leading-snug">{p.testo}</p>
                </div>
              ))}
            </div>

            <div className="reveal d2">
              <TintedList title="Materiale didattico incluso" items={SEMPRE_DRITTO.materiale} />
            </div>
            <div className="mt-3.5 sm:mt-5 rounded-[22px] sm:rounded-[26px] bg-white border border-border p-5 sm:p-6 flex items-start gap-3 reveal d3">
              <span className="w-10 h-10 rounded-full bg-accent/12 text-accent items-center justify-center shrink-0 hidden sm:flex">
                <Euro className="w-5 h-5" />
              </span>
              <p className="text-sm text-foreground leading-relaxed [font-variant-numeric:tabular-nums]">
                <strong>
                  {`€${SEMPRE_DRITTO.prezzoOra} all'ora invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}:`}
                </strong>{" "}
                {`in gruppo l'ora di matematica costa il ${SEMPRE_DRITTO.scontoPercentuale}% in meno della lezione individuale. Le ${SEMPRE_DRITTO.oreTotali} ore dell'anno fanno €${SEMPRE_DRITTO.prezzoTotale}, pagabili in ${SEMPRE_DRITTO.rate} rate da €${SEMPRE_DRITTO.importoRata}.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programmi: tutti in questa pagina, uno aperto alla volta ── */}
      <section className="py-12 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
              Il programma, anno per anno
            </h2>
            <p className="text-[15px] md:text-base text-muted-foreground text-center mb-7 md:mb-10 leading-relaxed reveal d1">
              Ogni classe ha il suo gruppo e i suoi argomenti, in parallelo al
              programma della scuola. Apri il tuo anno per vedere cosa
              affronteremo da ottobre a maggio.
            </p>
            <div className="space-y-3 reveal d1">
              {SEMPRE_DRITTO_CLASSI.map((c) => (
                <details
                  key={c.slug}
                  className={`group rounded-[22px] sm:rounded-[26px] bg-white border border-border overflow-hidden ${EASE} hover:shadow-[0_24px_40px_-28px_rgba(21,50,79,.4)]`}
                >
                  <summary className="flex items-center gap-3 p-4 sm:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center shrink-0">
                      <Sigma className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] sm:text-lg font-extrabold text-primary leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {c.classe}
                      </span>
                      <span className="block text-[13px] sm:text-sm text-muted-foreground leading-snug mt-0.5">
                        {c.sottotitolo}
                      </span>
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-muted text-primary flex items-center justify-center shrink-0 ${EASE} group-open:rotate-180 group-open:bg-accent group-open:text-accent-foreground`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <ul className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 space-y-2.5 border-t border-border/60 mt-1">
                    {c.programma.map((arg) => (
                      <li key={arg} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed pt-2.5 first:pt-4">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{arg}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Iscrizione: l'anno si sceglie qui, niente pagine separate ── */}
      <section id="iscrizione" className="section-spacing section-tint !py-12 md:!py-24 scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl mb-3 text-center reveal">
              Iscriviti a Sempre Dritto
            </h2>
            <p className="text-[15px] md:text-base text-muted-foreground text-center mb-7 md:mb-8 leading-relaxed reveal d1">
              Scegli l&apos;anno di tuo figlio e indica i giorni in cui sarebbe
              disponibile: registriamo subito l&apos;iscrizione e vi ricontattiamo
              entro 24 ore per confermare il giorno fisso del gruppo.
            </p>
            <div className="reveal d2">
              <FormShell>
                <SempreDrittoForm corso={SEMPRE_DRITTO.titolo} corsoSlug={SEMPRE_DRITTO.slug} />
              </FormShell>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
