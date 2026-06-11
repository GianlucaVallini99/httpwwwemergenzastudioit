import Link from "next/link";
import { SectionBlobs } from "@/components/Blobs";
import { Receipt, Calculator, BadgePercent } from "lucide-react";

const PUNTI = [
  {
    Icon: Receipt,
    title: "Fattura regolare",
    desc: "Ogni lezione è regolarmente fatturata: hai sempre un documento valido ai fini fiscali.",
  },
  {
    Icon: BadgePercent,
    title: "19% di detrazione",
    desc: "Le spese documentate possono essere portate in detrazione nella dichiarazione dei redditi, fino al massimale previsto.",
  },
  {
    Icon: Calculator,
    title: "Calcola il tuo risparmio",
    desc: "Richiedi un preventivo e scopri subito quanto puoi recuperare a fine anno.",
  },
];

export default function Detrazione() {
  return (
    <section id="detrazione" className="section-spacing">
      <SectionBlobs variant="c" />
      <div className="container-custom">
        <Link
          href="/detrazione-lezioni"
          className="group block bg-gradient-to-br from-primary to-teal-deep text-primary-foreground rounded-[40px] p-10 md:p-14 overflow-hidden relative hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(21,50,79,0.55)] transition-all duration-300 reveal"
        >
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(45,138,138,.35), transparent 70%)" }}
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center relative">
            <div>
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                Vantaggio fiscale
              </span>
              <h2 className="text-[clamp(30px,3.8vw,46px)] !text-primary-foreground mb-4">
                Le lezioni si possono detrarre.
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-7 max-w-xl">
                Con la fattura puoi portare le spese in detrazione nella dichiarazione
                dei redditi e recuperare il 19% di quanto speso. Calcola subito il tuo
                preventivo e scopri quanto risparmi a fine anno.
              </p>
              <span className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-accent text-accent-foreground font-extrabold shadow-lg group-hover:gap-4 transition-all">
                Richiedi un preventivo <span aria-hidden>→</span>
              </span>
            </div>
            <div className="grid gap-4">
              {PUNTI.map((p) => (
                <div key={p.title} className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/30 text-primary-foreground grid place-items-center shrink-0">
                    <p.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold !text-primary-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-primary-foreground/75">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
