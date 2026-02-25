import { CheckCircle, BookOpen, Brain, Users2, Clock, Award, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: BookOpen, text: "Tutor qualificati e appassionati" },
  { icon: Users2, text: "Lezioni individuali o piccoli gruppi (max 4)" },
  { icon: Clock, text: "Orari flessibili, anche nel weekend" },
  { icon: Brain, text: "Metodo di studio personalizzato" },
  { icon: Award, text: "Studenti di tutte le età" },
  { icon: Sparkles, text: "Prima lezione di prova" },
];

const WhyUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="chi-siamo" className="section-spacing bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">
              Perché studiare<br />
              con noi?
            </h2>
            <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-10">
              Emergenza Studio è il tuo punto di riferimento per ripetizioni e preparazione test a Mogliano Veneto.
              Il nostro metodo si adatta alle esigenze di ogni studente.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="rounded-full px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-secondary font-display uppercase tracking-wider text-base"
              onClick={() => scrollTo("#contatti")}
            >
              Contattaci
            </Button>
          </div>

          {/* Right grid of image placeholders — Keki style masonry */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="space-y-4">
              <div className="aspect-square rounded-[20px] bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p className="font-display text-sm uppercase tracking-wider opacity-60">Studio individuale</p>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-[20px] bg-white/15 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <Brain className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p className="font-display text-sm uppercase tracking-wider opacity-60">Metodo efficace</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/3] rounded-[20px] bg-white/15 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <Users2 className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p className="font-display text-sm uppercase tracking-wider opacity-60">Piccoli gruppi</p>
                </div>
              </div>
              <div className="aspect-square rounded-[20px] bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-60" />
                  <p className="font-display text-sm uppercase tracking-wider opacity-60">Risultati garantiti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
