import { SectionBlobs } from "@/components/Blobs";

const CORSI = [
  {
    tag: "Estate",
    num: "01",
    title: "Matematica & Superiori",
    lede: "Corsi estivi di matematica per chi inizia il liceo scientifico, chi affronta la maturità o si prepara ad Analisi 1.",
    bullets: ["Pre-Superiori di Matematica", "Estivo di Matematica", "Preparazione classe superiore"],
  },
  {
    tag: "Anno scolastico",
    num: "02",
    title: "Lingue & Professione",
    lede: "Corsi serali durante l'anno per chi vuole investire sulla propria formazione, fuori dal banco di scuola.",
    bullets: ["English Speaking Club", "AI & Strumenti Digitali", "Conversazione in piccoli gruppi"],
  },
  {
    tag: "Test ammissione",
    num: "03",
    title: "Università & Test",
    lede: "Percorsi intensivi per TOLC e per superare i primi esami universitari che bloccano più matricole.",
    bullets: ["TOLC — Corso Intensivo", "Supporto Semestre Filtro", "Analisi I · Fisica I"],
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
            Tre famiglie di corsi che si alternano nel calendario scolastico. Puoi
            combinarli con le ripetizioni individuali.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {CORSI.map((c, i) => (
            <div
              key={c.num}
              className="relative bg-card rounded-[32px] p-9 border border-border overflow-hidden hover:-translate-y-1 transition-transform duration-300 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="absolute top-3.5 right-6 text-[80px] leading-none font-black tracking-tight"
                style={{ color: "rgba(45,138,138,.18)" }}
              >
                {c.num}
              </span>
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                {c.tag}
              </span>
              <h3 className="text-2xl mb-2.5">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.lede}</p>
              <ul className="mt-4 space-y-1.5">
                {c.bullets.map((b) => (
                  <li key={b} className="relative pl-5 text-sm text-muted-foreground font-semibold">
                    <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
