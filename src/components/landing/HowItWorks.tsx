import { MapPin, CheckCircle, Clock, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const infoPoints = [
  "Sede in Via Barbiero 84, Mogliano Veneto (TV)",
  "Facilmente raggiungibile da Treviso e Venezia",
  "Parcheggio gratuito nelle vicinanze",
  "Ambiente moderno e confortevole",
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-spacing bg-muted">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text — Keki delivery info style */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary leading-tight mb-8">
              Come iniziare
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Raggiungere Emergenza Studio è semplicissimo.
              Ci troviamo nel cuore di Mogliano Veneto, facilmente accessibili da tutta la provincia.
            </p>

            <div className="space-y-5 mb-10">
              {infoPoints.map((point) => (
                <div key={point} className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">Orari</p>
                  <p className="font-medium text-foreground">Lun–Sab 9:00–19:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">Telefono</p>
                  <p className="font-medium text-foreground">340 510 6467</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Map area (Keki style) */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="rounded-[24px] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.5!2d12.2356!3d45.5583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ea97e60abbc0b%3A0x4b8b7b5916e02d0e!2sVia%20Barbiero%2C%2084%2C%2031021%20Mogliano%20Veneto%20TV!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emergenza Studio - Mappa"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
