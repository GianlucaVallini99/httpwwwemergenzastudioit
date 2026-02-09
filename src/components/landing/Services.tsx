import { Backpack, BookOpen, GraduationCap, University, HeartPulse, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Backpack,
    title: "Elementari",
    desc: "Aiuto compiti e supporto personalizzato per costruire solide basi fin da piccoli",
  },
  {
    icon: BookOpen,
    title: "Medie",
    desc: "Tutte le materie e preparazione esame terza media con il giusto metodo di studio",
  },
  {
    icon: GraduationCap,
    title: "Superiori",
    desc: "Ripetizioni in tutte le materie, recupero debiti e preparazione maturità",
  },
  {
    icon: University,
    title: "Preparazione TOLC",
    desc: "Corsi mirati per TOLC-I, TOLC-E, TOLC-S e altri test di ammissione",
  },
  {
    icon: HeartPulse,
    title: "Esami Universitari",
    desc: "Ripetizioni e corsi di preparazione per esami universitari",
  },
  {
    icon: Target,
    title: "Maturità e debiti",
    desc: "Preparazione completa per affrontare l'esame di stato con sicurezza",
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servizi" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
            Come possiamo aiutarti
          </h2>
          <p className="text-muted-foreground text-lg">
            Percorsi su misura per ogni livello scolastico e universitario
          </p>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="group border border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl"
            >
              <CardContent className="p-7">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
