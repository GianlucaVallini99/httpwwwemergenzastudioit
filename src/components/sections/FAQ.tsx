import { SectionBlobs } from "@/components/Blobs";

const FAQS = [
  { q: "Quali materie coprite?", a: "Tutte. Matematica, fisica, italiano, latino, greco, inglese, storia, filosofia, chimica, scienze, economia e molte altre. Se non vedi la tua materia, chiedi: probabilmente abbiamo il tutor giusto." },
  { q: "Le ripetizioni sono detraibili?", a: "Sì. Tutte le lezioni sono regolarmente fatturate e le famiglie possono detrarre il 19% del costo nella dichiarazione dei redditi." },
  { q: "Come prenoto la prima lezione?", a: "Scrivici su WhatsApp al +39 353 401 7905, chiamaci o passa direttamente al centro. Ti rispondiamo entro 24h con orari e tutor disponibili." },
  { q: "Fate anche lezioni di gruppo?", a: "Sì. Organizziamo piccoli gruppi di 2-4 studenti dello stesso livello. È più conveniente e si impara confrontandosi con i compagni." },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-spacing section-tint">
      <SectionBlobs variant="c" />
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3 reveal">Domande frequenti</span>
          <h2 className="text-[clamp(34px,4.4vw,54px)] reveal d1">Le risposte alle domande più comuni</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              className="group bg-card rounded-2xl mb-3.5 border border-border overflow-hidden open:shadow-[0_18px_36px_-22px_rgba(21,50,79,0.25)] reveal"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <summary className="list-none cursor-pointer p-6 flex items-center justify-between gap-4 font-extrabold text-primary text-[17px] [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="w-7 h-7 rounded-full bg-accent/14 text-teal-deep grid place-items-center text-lg font-black transition-transform duration-300 group-open:rotate-45 group-open:bg-secondary group-open:text-secondary-foreground shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
