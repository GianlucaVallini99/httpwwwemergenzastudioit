import { BookOpen, GraduationCap, Calculator, Globe, Lightbulb, PenTool } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-background" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4 text-accent" />
              Centro studi a Mogliano Veneto (TV)
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-primary mb-6">
              Studia con metodo,{" "}
              <span className="text-secondary">supera ogni esame</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Ripetizioni per elementari, medie e superiori. Preparazione TOLC e supporto universitario a Mogliano Veneto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 text-base shadow-lg shadow-primary/25"
                onClick={() => scrollTo("#contatti")}
              >
                Prenota la tua Prima Lezione
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                onClick={() => scrollTo("#servizi")}
              >
                Scopri i nostri corsi
              </Button>
            </div>
          </div>

          {/* Right illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-96 h-96">
              {/* Floating icons */}
              {[
                { Icon: BookOpen, top: "5%", left: "10%", delay: "0s", size: "w-14 h-14" },
                { Icon: GraduationCap, top: "10%", right: "15%", delay: "0.2s", size: "w-16 h-16" },
                { Icon: Calculator, top: "45%", left: "0%", delay: "0.4s", size: "w-12 h-12" },
                { Icon: Globe, bottom: "15%", right: "5%", delay: "0.6s", size: "w-14 h-14" },
                { Icon: PenTool, bottom: "20%", left: "20%", delay: "0.8s", size: "w-12 h-12" },
              ].map(({ Icon, delay, size, ...pos }, i) => (
                <div
                  key={i}
                  className={`absolute ${size} bg-background rounded-2xl shadow-lg border border-border/50 flex items-center justify-center`}
                  style={{ ...pos, animationDelay: delay }}
                >
                  <Icon className="w-7 h-7 text-accent" />
                </div>
              ))}
              {/* Central circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <img src={logo} alt="Emergenza Studio" className="w-36 h-36 object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
