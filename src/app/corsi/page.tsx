import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RevealMount from "@/components/RevealMount";
import { SectionBlobs } from "@/components/Blobs";
import { WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import {
  PIEDE_GIUSTO,
  ENGLISH_CLUB,
  ENGLISH_PREZZO,
  ENGLISH_ORE,
  ENGLISH_LEZIONI,
  POTENZIAMENTO,
  GRUPPO_MIN,
  GRUPPO_MAX,
} from "@/lib/corsi-data";
import { ArrowRight, ArrowUpRight, Clock, Euro, Users, CalendarDays, BookOpen } from "lucide-react";

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
            ...PIEDE_GIUSTO.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
            })),
            ...ENGLISH_CLUB.map((c) => ({
              name: c.titolo,
              description: c.sottotitolo,
              price: String(c.prezzo),
            })),
            {
              name: POTENZIAMENTO.titolo,
              description: POTENZIAMENTO.sottotitolo,
              price: String(POTENZIAMENTO.prezzoTotale),
            },
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
            Emergenza Studio non è solo ripetizioni: tre famiglie di corsi con
            date, prezzi e materiale già definiti. Scegli il percorso, compila il
            form e sei dentro.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid gap-5 lg:grid-cols-3 mb-5">
            {/* ── Piede Giusto: card principale ── */}
            <div className={`group relative lg:col-span-2 flex flex-col bg-card rounded-[32px] p-7 sm:p-10 border border-border overflow-hidden ${EASE} ${CARD_SHADOW} hover:-translate-y-1.5 reveal`}>
              <span aria-hidden className="absolute -top-2 right-6 text-[96px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.14)" }}>
                01
              </span>
              <span className="inline-block w-max bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                Prima dell&apos;inizio della scuola
              </span>
              <h2 className="text-2xl sm:text-3xl mb-3 pr-16">
                <Link href="/corsi/piede-giusto" className="hover:text-secondary transition-colors">
                  Piede Giusto: potenziamento per iniziare l&apos;anno al meglio
                </Link>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 max-w-xl">
                Matematica e fisica intensive per arrivare al primo giorno già
                preparato. Un percorso per ogni passaggio di classe:
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
                  <Chip icon={<Euro className="w-3.5 h-3.5" />} label="Da €150" />
                  <Chip icon={<Clock className="w-3.5 h-3.5" />} label="10–12 ore" />
                  <Chip icon={<BookOpen className="w-3.5 h-3.5" />} label="Materiale incluso" />
                </div>
                <Link href="/corsi/piede-giusto" className="shrink-0">
                  <CardCta label="Scopri i percorsi" />
                </Link>
              </div>
            </div>

            {/* ── English Speaking Club ── */}
            <div className={`group relative flex flex-col bg-card rounded-[32px] p-7 sm:p-8 border border-border overflow-hidden ${EASE} ${CARD_SHADOW} hover:-translate-y-1.5 reveal d1`}>
              <span aria-hidden className="absolute -top-2 right-6 text-[96px] leading-none font-black tracking-tight select-none" style={{ color: "rgba(45,138,138,.14)" }}>
                02
              </span>
              <span className="inline-block w-max bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                Per tutti i livelli
              </span>
              <h2 className="text-2xl mb-3 pr-14">
                <Link href="/corsi/english-speaking-club" className="hover:text-secondary transition-colors">
                  English Speaking Club
                </Link>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">
                {ENGLISH_ORE} ore in {ENGLISH_LEZIONI} lezioni da 2 ore: grammatica,
                conversazione e listening, con dispense incluse.
              </p>
              <ul className="space-y-2 mb-6">
                {ENGLISH_CLUB.map((c, i) => (
                  <li key={c.slug}>
                    <Link
                      href={`/corsi/english-speaking-club/${c.slug}`}
                      className={`flex items-center gap-3 rounded-2xl bg-muted px-4 py-3 ${EASE} hover:bg-secondary/10 group/lv`}
                    >
                      <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-[11px] font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold text-primary group-hover/lv:text-secondary transition-colors">
                        {c.titoloBreve}
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 ml-auto" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <Chip icon={<Euro className="w-3.5 h-3.5" />} label={`€${ENGLISH_PREZZO}`} />
                <Link href="/corsi/english-speaking-club" className="shrink-0">
                  <CardCta label="Scegli il livello" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Potenziamento Scolastico: banda orizzontale ── */}
          <Link
            href="/corsi/potenziamento-scolastico"
            className={`group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rounded-[32px] p-7 sm:p-10 overflow-hidden text-primary-foreground ${EASE} ${CARD_SHADOW} hover:-translate-y-1.5 reveal d2`}
            style={{ background: "linear-gradient(115deg, #15324f 0%, #0d4a52 78%, #1d6b6b 100%)" }}
          >
            <span aria-hidden className="absolute -top-3 right-6 text-[96px] leading-none font-black tracking-tight select-none text-white/[0.07]">
              03
            </span>
            <div className="md:flex-1">
              <span className="inline-block bg-white/12 text-white px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5 ring-1 ring-white/20">
                Tutto l&apos;anno scolastico
              </span>
              <h2 className="text-2xl sm:text-3xl mb-3 !text-white">
                Corso di Potenziamento Scolastico
              </h2>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-xl">
                Matematica e fisica ogni settimana, in parallelo al programma della
                tua classe: teoria, esercizi e simulazioni di verifica per vivere
                la scuola senza la paura delle interrogazioni.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-4 md:items-end">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <CalendarDays className="w-3.5 h-3.5" />, label: `${POTENZIAMENTO.settimane} settimane` },
                  { icon: <Clock className="w-3.5 h-3.5" />, label: `${POTENZIAMENTO.oreTotali} ore` },
                  { icon: <Euro className="w-3.5 h-3.5" />, label: `15/h · 4 rate da €240` },
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
