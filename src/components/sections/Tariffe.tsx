import Link from "next/link";
import { SectionBlobs } from "@/components/Blobs";

const ROWS = [
  { level: "Medie",      individuale: 20, gruppo: 14, pacchetto: 18 },
  { level: "Superiori",  individuale: 25, gruppo: 18, pacchetto: 22 },
  { level: "Università", individuale: 33, gruppo: 23, pacchetto: 28 },
];

export default function Tariffe() {
  return (
    <section id="tariffe" className="section-spacing">
      <SectionBlobs variant="c" />
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] items-center">
          <div className="reveal">
            <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3">Le nostre tariffe</span>
            <h2 className="text-[clamp(34px,4.2vw,52px)] mb-4">Prezzi chiari, senza sorprese.</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Tutte le lezioni sono regolarmente fatturate. Nessun costo nascosto,
              nessun vincolo di lungo periodo.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3.5 text-foreground/80 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Cambio tutor sempre possibile
              </li>

            </ul>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-primary text-primary-foreground font-extrabold shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)] hover:-translate-y-0.5 transition-transform"
            >
              Richiedi un preventivo <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="bg-card rounded-[32px] p-9 border border-border shadow-[0_30px_60px_-30px_rgba(21,50,79,0.25)] reveal d2">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground font-extrabold pb-3">Livello</th>
                  <th className="text-right text-xs uppercase tracking-wider text-muted-foreground font-extrabold pb-3">Individuale</th>
                  <th className="text-right text-xs uppercase tracking-wider text-muted-foreground font-extrabold pb-3">Gruppo</th>
                  <th className="text-right text-xs uppercase tracking-wider text-muted-foreground font-extrabold pb-3">Pacchetto 10+</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.level} className={i < ROWS.length - 1 ? "border-b-[1.5px] border-accent/22" : ""}>
                    <td className="py-4 text-primary font-extrabold">{r.level}</td>
                    <td className="py-4 text-right text-primary font-black text-[22px]">
                      €{r.individuale}<small className="font-bold text-sm text-muted-foreground">/h</small>
                    </td>
                    <td className="py-4 text-right text-secondary font-black text-[22px]">
                      €{r.gruppo}<small className="font-bold text-sm text-muted-foreground">/h</small>
                    </td>
                    <td className="py-4 text-right text-accent font-black text-[22px]">
                      €{r.pacchetto}<small className="font-bold text-sm text-muted-foreground">/h</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 pt-5 border-t border-border text-sm text-muted-foreground">
              La tariffa pacchetto vale da 10 lezioni in su.{" "}
              <Link href="/detrazione-lezioni" className="text-accent font-bold hover:underline">
                Calcola preventivo e detrazione →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
