import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary text-center mb-14">
          Cosa dicono di noi
        </h2>
        <div
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-2xl border-border/60">
              <CardContent className="p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-secondary">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.context}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
