import { Users, User, Gift } from "lucide-react";
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
    <section id="tariffe" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary text-center mb-4">
            Le nostre tariffe
          </h2>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
            Prezzi trasparenti, senza sorprese. Scegli la formula più adatta a te.
          </p>

          <div
            className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Lezione individuale */}
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                  <User className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">Lezione individuale</h3>
                  <p className="text-sm text-muted-foreground">1 studente, 1 tutor</p>
                </div>
              </div>
              <div className="space-y-3">
                {individualPrices.map((item) => (
                  <div
                    key={item.level}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted"
                  >
                    <span className="font-medium text-foreground">{item.level}</span>
                    <span className="font-display font-bold text-lg text-primary">
                      €{item.price}<span className="text-sm font-normal text-muted-foreground">/h</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lezione in coppia */}
            <div className="rounded-2xl border-2 border-accent bg-background p-8 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                RISPARMIA
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">Lezione di gruppo</h3>
                  <p className="text-sm text-muted-foreground">Studia con i tuoi amici e risparmia</p>
                </div>
              </div>
              <div className="space-y-3">
                {duoPrices.map((item) => (
                  <div
                    key={item.level}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted"
                  >
                    <span className="font-medium text-foreground">{item.level}</span>
                    <span className="font-display font-bold text-lg text-primary">
                      €{item.price}<span className="text-sm font-normal text-muted-foreground">/h cad.</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pacchetto 10 lezioni */}
          <div
            className={`rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
              <Gift className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display font-bold text-2xl mb-2">
                Pacchetto 10 lezioni — ne paghi solo 9!
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Acquista un pacchetto da 10 lezioni e ottieni uno <strong>sconto del 10%</strong>: paghi 9 lezioni e la decima è in regalo. Valido per tutti i livelli scolastici.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
