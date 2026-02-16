import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contatti" className="py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-accent/5 to-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
            Pronto a migliorare i tuoi voti?
          </h2>
          <p className="text-muted-foreground text-lg">
            Contattaci per iniziare il tuo percorso di studio
          </p>
        </div>

        <div
          className={`max-w-lg mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col gap-6">
            <a
              href="https://wa.me/393405106467"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-accent/15 hover:bg-accent/25 transition-colors rounded-2xl p-5"
            >
              <MessageCircle className="w-8 h-8 text-accent" />
              <div>
                <p className="font-semibold text-primary">Scrivici su WhatsApp</p>
                <p className="text-sm text-muted-foreground">340 510 6467</p>
              </div>
            </a>

            <a href="tel:+393405106467" className="flex items-center gap-4 rounded-2xl p-5 hover:bg-muted transition-colors">
              <Phone className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-semibold text-primary">Chiamaci</p>
                <p className="text-sm text-muted-foreground">340 510 6467</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl p-5">
              <MapPin className="w-6 h-6 text-secondary" />
               <div>
                 <p className="font-semibold text-primary">Sede</p>
                 <p className="text-sm text-muted-foreground">Via Barbiero 84, Mogliano Veneto (TV)</p>
               </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl p-5">
              <Clock className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-semibold text-primary">Orari</p>
                <p className="text-sm text-muted-foreground">Lun-Ven 9:00-12:00 / 14:00-19:00 | Sab 9:00-13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
