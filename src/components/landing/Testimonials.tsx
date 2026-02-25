import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Maria T.",
    context: "Mamma di Luca, 3ª media",
    text: "Mio figlio ha recuperato 3 insufficienze in due mesi. I tutor sono pazienti e preparatissimi, lo hanno aiutato a trovare il suo metodo di studio.",
  },
  {
    name: "Marco P.",
    context: "Studente liceo scientifico",
    text: "Grazie a Emergenza Studio ho finalmente capito la matematica! Le spiegazioni sono chiare e i tutor ti seguono passo dopo passo.",
  },
  {
    name: "Giulia R.",
    context: "Superato TOLC-I",
    text: "Il corso di preparazione al TOLC è stato fondamentale. Esercizi mirati e simulazioni mi hanno permesso di superare il test al primo tentativo.",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-spacing bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-primary text-center mb-4">
          Cosa dicono di noi
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-xl mx-auto">
          Le opinioni di chi ha studiato con noi
        </p>
        <div
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-[24px] bg-card border border-border p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-8 text-base">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
                  <span className="font-display text-base font-bold text-secondary">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
