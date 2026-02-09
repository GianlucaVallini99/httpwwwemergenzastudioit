import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const points = [
  "Tutor qualificati e appassionati",
  "Seguiamo Studenti di tutte le età",
  "Lezioni individuali o piccoli gruppi (max 4 studenti)",
  "Orari flessibili, anche nel weekend",
];

const WhyUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="chi-siamo" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-12">
            Perché studiare con noi
          </h2>
          <div
            className={`grid sm:grid-cols-2 gap-6 text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {points.map((p) => (
              <div key={p} className="flex items-start gap-4 bg-background rounded-2xl p-6 shadow-sm">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-medium leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
