import { Backpack, BookOpen, GraduationCap, University, HeartPulse, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Backpack,
    title: "Elementari",
    color: "from-accent/30 to-accent/10",
  },
  {
    icon: BookOpen,
    title: "Medie",
    color: "from-secondary/30 to-secondary/10",
  },
  {
    icon: GraduationCap,
    title: "Superiori",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: University,
    title: "TOLC",
    color: "from-accent/25 to-secondary/10",
  },
  {
    icon: HeartPulse,
    title: "Università",
    color: "from-secondary/25 to-accent/10",
  },
  {
    icon: Target,
    title: "Maturità",
    color: "from-primary/15 to-accent/10",
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servizi" className="section-spacing bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left text column — Keki style */}
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary leading-tight mb-6">
              Ripetizioni, preparazione test e<br />
              <span className="text-secondary">molto altro.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Percorsi su misura per ogni livello scolastico e universitario: dalle elementari fino alla preparazione dei test di ammissione.
            </p>
            <Button
              className="rounded-full px-10 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display uppercase tracking-wider text-base"
              onClick={() => scrollTo("#tariffe")}
            >
              Vai alle Tariffe
            </Button>
          </div>

          {/* Right grid — Keki category cards */}
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {services.map(({ icon: Icon, title, color }) => (
              <div
                key={title}
                className="group relative aspect-[4/5] rounded-[20px] overflow-hidden cursor-pointer"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} transition-all duration-500 group-hover:scale-105`} />

                {/* Icon centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                </div>

                {/* Label at bottom — uppercase Oswald */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-lg tracking-wider text-primary">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
