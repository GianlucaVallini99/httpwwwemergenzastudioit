import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contatti" className="section-spacing bg-muted">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mb-4">
            Pronto a migliorare<br />i tuoi voti?
          </h2>
          <p className="text-muted-foreground text-lg">
            Contattaci per iniziare il tuo percorso di studio
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Main CTA — WhatsApp */}
          <a
            href="https://wa.me/393405106467"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6"
          >
            <Button
              size="lg"
              className="rounded-full w-full py-8 bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-lg shadow-lg shadow-accent/25"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Scrivici su WhatsApp
            </Button>
          </a>

          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="tel:+393405106467"
              className="flex flex-col items-center gap-3 rounded-[20px] bg-card border border-border p-6 hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-1">Chiamaci</p>
                <p className="font-medium text-foreground text-sm">340 510 6467</p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-3 rounded-[20px] bg-card border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-1">Sede</p>
                <p className="font-medium text-foreground text-sm">Via Barbiero 84<br />Mogliano Veneto (TV)</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-[20px] bg-card border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-1">Orari</p>
                <p className="font-medium text-foreground text-sm">Lun–Ven 9–19<br />Sab 9–13</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
