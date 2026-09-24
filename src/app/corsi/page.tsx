import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import {
  PIEDE_GIUSTO,
  SEMPRE_DRITTO,
  SEMPRE_DRITTO_CLASSI,
  CORSI_IN_ARRIVO,
  GRUPPO_MIN,
  GRUPPO_MAX,
  CORSO_CONCLUSO_CLS,
  PIEDE_GIUSTO_ISCRIZIONI_APERTE,
  PIEDE_GIUSTO_CHIUSURA,
} from "@/lib/corsi-data";
import { ArrowRight, ArrowUpRight, Clock, Euro, Users, CalendarDays, BookOpen, Sparkles } from "lucide-react";

const breadcrumbs = [{ label: "Corsi", href: "/corsi" }];

const EASE = "transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)]";
const CARD_SHADOW = "hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,.35)]";

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1.5 text-xs font-bold">
      {icon} {label}
    </span>
  );
}

function CardCta({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-primary font-extrabold text-sm">
      {label}
      <span className={`w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center ${EASE} group-hover:translate-x-1 group-hover:scale-105`}>
        <ArrowRight className="w-4 h-4" />
      </span>
    </span>
  );
}

export default function CorsiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
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
            },
            ...PIEDE_GIUSTO.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
              availability: PIEDE_GIUSTO_ISCRIZIONI_APERTE ? "InStock" as const : "OutOfStock" as const,
            })),
          ])),
        }}
      />
      <RevealMount />
      <Breadcrumb items={breadcrumbs} />

      <section className="pt-10 pb-16 md:pt-14 md:pb-24">
        <SectionBlobs variant="b" />
        <div className="container-custom">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3 reveal">
            I nostri corsi
          </span>
          <h1 className="text-[clamp(36px,5.5vw,62px)] mb-5 max-w-3xl reveal d1">
            Percorsi di gruppo, programma chiaro, iscrizione online
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal d2">
            Emergenza Studio non è solo ripetizioni: corsi con date, prezzi e
            materiale già definiti. Scegli il percorso, compila il form e sei
            dentro.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          {/* ── Sempre Dritto: il corso dell'anno in corso ── */}
          <Link
            href="/corsi/sempre-dritto"
            className={`group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rounded-[32px] p-7 sm:p-10 mb-5 overflow-hidden text-primary-foreground ${EASE} ${CARD_SHADOW} hover:-translate-y-1.5 reveal`}
            style={{ background: "linear-gradient(115deg, #15324f 0%, #0d4a52 78%, #1d6b6b 100%)" }}
          >
            <span aria-hidden className="absolute -top-3 right-6 text-[96px] leading-none font-black tracking-tight select-none text-white/[0.07]">
              01
            </span>
            <div className="md:flex-1">
              <span className="inline-block bg-white/12 text-white px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5 ring-1 ring-white/20">
                Si parte il {SEMPRE_DRITTO.inizio} · Iscrizioni aperte
              </span>
              <h2 className="text-2xl sm:text-3xl mb-3 !text-white">
                Sempre Dritto: matematica tutto l&apos;anno
              </h2>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-xl mb-5">
                {SEMPRE_DRITTO.oreSettimana} ore di matematica a settimana dal{" "}
                {SEMPRE_DRITTO.inizio} all&apos;{SEMPRE_DRITTO.fine}, in gruppi da{" "}
                {SEMPRE_DRITTO.gruppoMin} a {SEMPRE_DRITTO.gruppoMax} studenti divisi
                per classe e per indirizzo: ti accompagniamo verifica dopo verifica,
                a €{SEMPRE_DRITTO.prezzoOra} l&apos;ora invece di €{SEMPRE_DRITTO.prezzoOraIndividuale}.
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
                {SEMPRE_DRITTO_CLASSI.map((c) => (
                  <li
                    key={c.slug}
                    className="rounded-2xl bg-white/10 ring-1 ring-white/10 px-3 py-2.5 text-[13px] sm:text-sm font-bold text-white text-center"
                  >
                    {c.classe}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-4 md:items-end">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <Euro className="w-3.5 h-3.5" />, label: `€${SEMPRE_DRITTO.prezzoOra}/h · ${SEMPRE_DRITTO.rate} rate da €${SEMPRE_DRITTO.importoRata}` },
                  { icon: <Clock className="w-3.5 h-3.5" />, label: `${SEMPRE_DRITTO.oreTotali} ore in ${SEMPRE_DRITTO.settimane} settimane` },
                  { icon: <Users className="w-3.5 h-3.5" />, label: `Gruppi da ${SEMPRE_DRITTO.gruppoMin} a ${SEMPRE_DRITTO.gruppoMax}` },
                  { icon: <BookOpen className="w-3.5 h-3.5" />, label: "Materiale incluso" },
                ].map((s) => (
                  <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-xs font-bold text-white">
                    {s.icon} {s.label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2.5 font-extrabold text-sm text-white">
                Scopri il corso
                <span className={`w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center ${EASE} group-hover:translate-x-1 group-hover:scale-105`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </div>
          </Link>

          {/* ── Piede Giusto: edizione conclusa, resta consultabile ── */}
          <div className={`group relative flex flex-col bg-card rounded-[32px] p-7 sm:p-10 border border-border overflow-hidden ${EASE} ${CARD_SHADOW} hover:-translate-y-1.5 reveal d1 ${CORSO_CONCLUSO_CLS}`}>
            <span aria-hidden className="absolute -top-2 right-6 text-[96px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.14)" }}>
              02
            </span>
            <span className="inline-block w-max px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5 bg-muted text-muted-foreground border border-border">
              {PIEDE_GIUSTO_CHIUSURA.badge} · si riparte a {PIEDE_GIUSTO_CHIUSURA.riapertura}
            </span>
            <h2 className="text-2xl sm:text-3xl mb-3 pr-16">
              <Link href="/corsi/piede-giusto" className="hover:text-secondary transition-colors">
                Piede Giusto: potenziamento per iniziare l&apos;anno al meglio
              </Link>
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 max-w-xl">
              Il corso estivo di matematica e fisica che si tiene prima dell&apos;inizio
              della scuola. L&apos;edizione di quest&apos;anno è conclusa: i programmi
              restano online in vista dell&apos;estate prossima.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-6">
              {PIEDE_GIUSTO.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/corsi/piede-giusto/${c.slug}`}
                    className={`flex items-center justify-between gap-2 rounded-2xl bg-muted px-4 py-3 text-sm font-bold text-primary ${EASE} hover:bg-secondary/10 hover:text-secondary`}
                  >
                    <span>{c.titoloBreve}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60" />
                  </Link>
                </li>
              ))}
              <li className="hidden sm:flex items-center rounded-2xl border border-dashed border-secondary/30 px-4 py-3 text-sm font-semibold text-muted-foreground">
                Gruppi da {GRUPPO_MIN} a {GRUPPO_MAX} studenti
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Chip icon={<Euro className="w-3.5 h-3.5" />} label="Da €150 a materia" />
                <Chip icon={<Clock className="w-3.5 h-3.5" />} label="10–12 ore" />
                <Chip icon={<CalendarDays className="w-3.5 h-3.5" />} label="Estate 2027" />
              </div>
              <Link href="/corsi/piede-giusto" className="shrink-0">
                <CardCta label="Guarda i programmi" />
              </Link>
            </div>
          </div>

          {/* ── Corsi in arrivo: segnaposto, pagine non ancora pubblicate ── */}
          <div id="in-arrivo" className="mt-14 md:mt-20 scroll-mt-28">
            <div className="max-w-2xl mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 text-accent px-4 py-2 text-xs font-extrabold uppercase tracking-wider mb-4 reveal">
                <Sparkles className="w-4 h-4" /> In arrivo
              </span>
              <h2 className="text-2xl md:text-4xl mb-3 reveal d1">
                I corsi di preparazione ai test universitari
              </h2>
              <p className="text-muted-foreground leading-relaxed reveal d2">
                Stiamo costruendo i percorsi per chi dopo la maturità punta a Medicina,
                alle Professioni Sanitarie, a Economia o a Ingegneria. Date, programmi e
                prezzi arrivano a breve: lasciaci un messaggio e ti avvisiamo per primo
                quando aprono le iscrizioni.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CORSI_IN_ARRIVO.map((c, i) => (
                <div
                  key={c.slug}
                  className={`relative flex flex-col rounded-[26px] border border-dashed border-secondary/30 bg-card/60 p-5 sm:p-6 reveal d${(i % 3) + 1}`}
                >
                  <span className="inline-block w-max rounded-full bg-muted text-muted-foreground border border-border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider mb-4">
                    In arrivo
                  </span>
                  <h3 className="text-base leading-snug mb-2">{c.titolo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.sottotitolo}</p>
                  <ul className="space-y-1.5 mb-4">
                    {c.punti.map((p) => (
                      <li key={p} className="relative pl-4 text-[13px] text-muted-foreground font-semibold leading-snug">
                        <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-accent/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-3 border-t border-border/60 text-xs font-bold text-secondary">
                    {c.target}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 border border-border bg-card text-primary font-extrabold uppercase tracking-wider text-sm ${EASE} hover:-translate-y-0.5 hover:bg-muted active:scale-[0.98] w-full sm:w-auto`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                Avvisami quando partono
              </a>
            </div>
          </div>

          {/* ── Consiglio ── */}
          <div className="mt-14 md:mt-20 max-w-2xl mx-auto text-center reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-bold mb-4">
              <Users className="w-4 h-4" /> Non sai quale scegliere?
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Scrivici due righe su classe e obiettivi: ti consigliamo il percorso
              più adatto. Rispondiamo entro 24 ore.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 bg-accent text-accent-foreground font-extrabold uppercase tracking-wider text-sm shadow-[0_18px_35px_-18px_rgba(45,138,138,.8)] ${EASE} hover:-translate-y-0.5 hover:bg-teal-deep active:scale-[0.98] w-full sm:w-auto`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Chiedi consiglio su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
