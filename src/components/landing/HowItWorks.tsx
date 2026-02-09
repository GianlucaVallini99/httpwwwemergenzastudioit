import { Phone, MessageCircle, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { num: "1", icon: Phone, title: "Contattaci", desc: "Chiamaci o scrivici per raccontarci le tue esigenze" },
  { num: "2", icon: MessageCircle, title: "Raccontaci", desc: "Spiegaci i problemi e le difficoltà che stai riscontrando" },
  { num: "3", icon: Rocket, title: "Inizia il percorso", desc: "Partiamo insieme verso i tuoi obiettivi scolastici" },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary text-center mb-14">
          Iniziare è semplice
        </h2>
        <div
          className={`grid md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="inline-block text-xs font-bold text-accent mb-2">STEP {num}</span>
              <h3 className="font-display font-semibold text-xl text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
