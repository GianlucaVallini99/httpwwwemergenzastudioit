import Link from "next/link";
import { SectionBlobs } from "@/components/Blobs";
import {
  CORSO_CONCLUSO_CLS,
  PIEDE_GIUSTO_CHIUSURA,
  SEMPRE_DRITTO,
} from "@/lib/corsi-data";

const CORSI = [
  {
    tag: `Si parte il ${SEMPRE_DRITTO.inizio}`,
    num: "01",
    title: "Sempre Dritto",
    lede: "Il corso di matematica che ti accompagna per tutto l'anno: due ore a settimana in piccolo gruppo, da ottobre a maggio.",
    bullets: [
      "Un gruppo per ogni classe, dalla prima alla quinta",
      `${SEMPRE_DRITTO.oreSettimana} ore a settimana · ${SEMPRE_DRITTO.oreTotali} ore nell'anno`,
      `€${SEMPRE_DRITTO.prezzoOra}/h invece di €${SEMPRE_DRITTO.prezzoOraIndividuale}`,
    ],
    href: "/corsi/sempre-dritto",
  },
  {
    tag: PIEDE_GIUSTO_CHIUSURA.badge,
    concluso: true,
    num: "02",
    title: "Piede Giusto",
    lede: "Il corso estivo di matematica e fisica per iniziare l'anno al meglio: un percorso per ogni passaggio di classe.",
    bullets: ["5 percorsi: dalle medie alla quinta", "Matematica e Fisica separate", `Si riparte a ${PIEDE_GIUSTO_CHIUSURA.riapertura}`],
    href: "/corsi/piede-giusto",
  },
  {
    tag: "In arrivo",
    inArrivo: true,
    num: "03",
    title: "Preparazione test universitari",
    lede: "I percorsi per il semestre filtro di Medicina, le Professioni Sanitarie e i TOLC di Economia e Ingegneria.",
    bullets: ["Teoria mirata sulle materie del test", "Logica e comprensione del testo", "Simulazioni a tempo con correzione"],
    href: "/corsi#in-arrivo",
  },
];

export default function Corsi() {
  return (
    <section id="corsi" className="section-spacing section-tint">
      <SectionBlobs variant="b" />
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3 reveal">I nostri corsi</span>
          <h2 className="text-[clamp(34px,4.4vw,54px)] mb-4 reveal d1">Percorsi strutturati per ogni momento dell&apos;anno</h2>
          <p className="text-lg text-muted-foreground reveal d2">
            Corsi di gruppo con programma definito e iscrizione online. Puoi
            combinarli con le ripetizioni individuali.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CORSI.map((c, i) => (
            <Link
              key={c.num}
              href={c.href}
              className={`group relative block bg-card rounded-[32px] p-8 border overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,0.35)] transition-all duration-300 reveal ${
                "inArrivo" in c && c.inArrivo ? "border-dashed border-secondary/30" : "border-border"
              } ${"concluso" in c && c.concluso ? CORSO_CONCLUSO_CLS : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="absolute top-3.5 right-6 text-[64px] leading-none font-black tracking-tight"
                style={{ color: "rgba(45,138,138,.18)" }}
              >
                {c.num}
              </span>
              <span
                className={`inline-block px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5 ${
                  ("concluso" in c && c.concluso) || ("inArrivo" in c && c.inArrivo)
                    ? "bg-muted text-muted-foreground border border-border"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {c.tag}
              </span>
              <h3 className="text-xl mb-2.5">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.lede}</p>
              <ul className="mt-4 space-y-1.5">
                {c.bullets.map((b) => (
                  <li key={b} className="relative pl-5 text-sm text-muted-foreground font-semibold">
                    <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1 mt-5 text-secondary font-extrabold text-sm group-hover:text-teal-deep">
                {"inArrivo" in c && c.inArrivo ? "Guarda i corsi in arrivo" : "Scopri di più"}{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
