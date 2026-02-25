import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Medie",
    image: "/images/service_medie.png",
  },
  {
    title: "Superiori",
    image: "/images/service_superiori.png",
  },
  {
    title: "TOLC",
    image: "/images/service_tolc.png",
  },
  {
    title: "Università",
    image: "/images/service_universita.png",
  },
  {
    title: "Maturità",
    image: "/images/service_maturita.png",
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
              Percorsi su misura per ogni livello scolastico e universitario: dalle medie fino alla preparazione dei test di ammissione.
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
            {services.map(({ title, image }) => (
              <div
                key={title}
                className="group relative aspect-[4/5] rounded-[20px] overflow-hidden cursor-pointer"
              >
                {/* Photo background */}
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Label at bottom — uppercase Oswald */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-lg tracking-wider text-white">
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
