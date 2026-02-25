import { Users, User, Gift, UserPlus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const individualPrices = [
  { level: "Elementari", price: 16 },
  { level: "Medie", price: 18 },
  { level: "Superiori", price: 22 },
  { level: "Università", price: 30 },
];

const duoPrices = [
  { level: "Elementari", price: 12 },
  { level: "Medie", price: 14 },
  { level: "Superiori", price: 18 },
  { level: "Università", price: 23 },
];

const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tariffe" className="section-spacing bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary text-center mb-4">
            Le nostre tariffe
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Prezzi trasparenti, senza sorprese. Scegli la formula più adatta a te.
          </p>

          <div
            className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Lezione individuale */}
            <div className="rounded-[24px] border border-border bg-card p-10 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center">
                  <User className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-primary">Lezione individuale</h3>
                  <p className="text-sm text-muted-foreground font-display uppercase tracking-wider">1 studente, 1 tutor</p>
                </div>
              </div>
              <div className="space-y-3">
                {individualPrices.map((item) => (
                  <div
                    key={item.level}
                    className="flex items-center justify-between py-4 px-5 rounded-2xl bg-muted"
                  >
                    <span className="font-medium text-foreground">{item.level}</span>
                    <span className="font-display font-bold text-xl text-primary">
                      €{item.price}<span className="text-sm font-normal text-muted-foreground">/h</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lezione in coppia */}
            <div className="rounded-[24px] border-2 border-accent bg-card p-10 hover:shadow-lg transition-all duration-300 relative">
              <div className="absolute -top-3.5 right-8 bg-accent text-accent-foreground text-xs font-display font-bold px-5 py-1.5 rounded-full uppercase tracking-wider">
                Risparmia
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-primary">Lezione di gruppo</h3>
                  <p className="text-sm text-muted-foreground font-display uppercase tracking-wider">Studia con i tuoi amici</p>
                </div>
              </div>
              <div className="space-y-3">
                {duoPrices.map((item) => (
                  <div
                    key={item.level}
                    className="flex items-center justify-between py-4 px-5 rounded-2xl bg-muted"
                  >
                    <span className="font-medium text-foreground">{item.level}</span>
                    <span className="font-display font-bold text-xl text-primary">
                      €{item.price}<span className="text-sm font-normal text-muted-foreground">/h cad.</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pacchetto 10 lezioni */}
          <div
            className={`rounded-[24px] bg-primary text-primary-foreground p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="w-18 h-18 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 p-4">
              <Gift className="w-10 h-10" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">
                Pacchetto 10 lezioni — ne paghi solo 9!
              </h3>
              <p className="opacity-80 leading-relaxed text-lg">
                Acquista un pacchetto da 10 lezioni e ottieni uno <strong>sconto del 10%</strong>: paghi 9 lezioni e la decima è in regalo. Valido per tutti i livelli scolastici.
              </p>
            </div>
          </div>

          {/* Porta un amico */}
          <div
            className={`rounded-[24px] bg-accent/10 border border-accent/30 p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="w-18 h-18 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 p-4">
              <UserPlus className="w-10 h-10 text-accent" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-primary mb-3">
                Porta 2 amici e ricevi una lezione gratis!
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Consiglia Emergenza Studio a 2 amici: quando si iscrivono, ottieni <strong>una lezione in omaggio</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
