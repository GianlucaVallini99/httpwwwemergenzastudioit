import Link from "next/link";
import { SectionBlobs } from "@/components/Blobs";

const CORSI = [
  {
    tag: "Prima della scuola",
    num: "01",
    title: "Piede Giusto",
    lede: "Corsi separati di matematica e fisica per iniziare l'anno al meglio: un percorso per ogni passaggio di classe.",
    bullets: ["5 percorsi: dalle medie alla quinta", "Matematica e Fisica separate", "Da €150 a materia"],
    href: "/corsi/piede-giusto",
  },
  {
    tag: "Tutti i livelli",
    num: "02",
    title: "English Speaking Club",
    lede: "Tre corsi di inglese divisi per livello: grammatica, conversazione e listening in 10 lezioni da 2 ore.",
    bullets: ["English Restart · Progress · Fluency", "20 ore · €300", "Dispense ed esercizi inclusi"],
    href: "/corsi/english-speaking-club",
  },
  {
    tag: "Anno scolastico",
    num: "03",
    title: "Potenziamento Scolastico",
    lede: "Corsi annuali separati di matematica e fisica: vivi la scuola senza la paura delle verifiche.",
    bullets: ["Matematica e Fisica separate", "32 settimane · 64 ore a materia", "€15/h in 4 rate da €240"],
    href: "/corsi/potenziamento-scolastico",
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
            Tre famiglie di corsi con programma definito e iscrizione online. Puoi
            combinarle con le ripetizioni individuali.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CORSI.map((c, i) => (
            <Link
              key={c.num}
              href={c.href}
              className="group relative block bg-card rounded-[32px] p-8 border border-border overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,0.35)] transition-all duration-300 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="absolute top-3.5 right-6 text-[64px] leading-none font-black tracking-tight"
                style={{ color: "rgba(45,138,138,.18)" }}
              >
                {c.num}
              </span>
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
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
                Scopri di più <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
