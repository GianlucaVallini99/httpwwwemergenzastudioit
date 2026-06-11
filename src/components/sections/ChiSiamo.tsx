import Link from "next/link";
import { SectionBlobs } from "@/components/Blobs";

const STATS = [
  { n: "50+", l: "Studenti seguiti" },
  { n: "15+", l: "Materie" },
  { n: "4.9★", l: "Recensioni Google" },
];

export default function ChiSiamo() {
  return (
    <section id="chi-siamo" className="section-spacing section-tint">
      <SectionBlobs variant="a" />
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] items-center">
          <div className="reveal">
            <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3">Chi siamo</span>
            <h2 className="text-[clamp(34px,4.2vw,52px)] mb-4">
              <Link href="/chi-siamo" className="hover:text-secondary transition-colors">
                Un team, non una persona sola.
              </Link>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Emergenza Studio nasce a Mogliano Veneto, a 50 metri dal Liceo Berto.
              Aiutiamo gli studenti a migliorare i voti, ma soprattutto a costruirsi
              un metodo di studio che resti nel tempo.
            </p>
            <p className="text-lg text-muted-foreground mb-7">
              Hai bisogno di matematica e latino nella stessa settimana? Il nostro
              team copre tutte le materie. Niente più tutor multipli e niente più
              orari da incastrare.
            </p>
            <Link
              href="/chi-siamo"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-secondary text-secondary-foreground font-extrabold shadow-[0_14px_28px_-14px_rgba(29,107,107,0.6)] hover:-translate-y-0.5 transition-transform"
            >
              Scopri il team <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal d2">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={`bg-card rounded-[32px] p-8 border border-border shadow-[0_24px_50px_-30px_rgba(21,50,79,0.2)] ${
                  i === STATS.length - 1 ? "col-span-2" : ""
                }`}
              >
                <div className="text-[48px] leading-none font-black tracking-tight text-primary">{s.n}</div>
                <div className="mt-2.5 text-sm text-muted-foreground font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
