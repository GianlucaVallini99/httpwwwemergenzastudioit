import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-32 right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center">
        {/* Large heading — Keki style */}
        <div className="max-w-4xl mb-12">
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-primary mb-0">
            Ripetizioni e<br />
            preparazione<br />
            <span className="text-secondary">test a Mogliano</span>
          </h1>
        </div>
      </div>

      {/* Full-width image with spinning badge */}
      <div className="relative w-full">
        {/* Spinning badge — Keki style */}
        <div className="absolute top-0 right-8 md:right-16 -translate-y-1/2 z-20">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="fill-primary" style={{ fontSize: "14px", fontFamily: "Oswald", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase" }}>
                <textPath href="#circlePath">
                  Studia con metodo • Supera ogni esame •{" "}
                </textPath>
              </text>
            </svg>
            {/* Center logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/20">
              <img src={logo} alt="Emergenza Studio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Hero image area — large lifestyle photo */}
        <div className="w-full h-[50vh] md:h-[60vh] bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/15 relative overflow-hidden">
          {/* Decorative circles in the background */}
          <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-20">
            <div className="w-64 h-64 rounded-full border-2 border-primary/30" />
            <div className="w-80 h-80 rounded-full border-2 border-accent/30 -mt-20" />
            <div className="w-48 h-48 rounded-full border-2 border-secondary/30 mt-16" />
          </div>

          {/* Content overlay with key info */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 md:px-6 pb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                <div className="flex-1">
                  <p className="text-foreground/80 text-lg md:text-xl max-w-lg leading-relaxed">
                    Centro studi a Mogliano Veneto: ripetizioni per medie e superiori. Preparazione TOLC e supporto universitario.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display uppercase tracking-wider text-base shadow-lg shadow-secondary/25"
                    onClick={() => scrollTo("#contatti")}
                  >
                    Prenota Lezione
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-10 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display uppercase tracking-wider text-base"
                    onClick={() => scrollTo("#servizi")}
                  >
                    Scopri i Corsi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
