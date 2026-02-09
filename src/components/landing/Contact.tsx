import { useState } from "react";
import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const levels = ["Elementari", "Medie", "Superiori", "Università", "TOLC", "Medicina"];

const Contact = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", phone: "", level: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Richiesta inviata!", description: "Ti ricontatteremo al più presto." });
    setForm({ name: "", phone: "", level: "" });
  };

  return (
    <section id="contatti" className="py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-accent/5 to-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
            Pronto a migliorare i tuoi voti?
          </h2>
          <p className="text-muted-foreground text-lg">
            Prenota una lezione di prova gratuita e senza impegno
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 bg-background rounded-2xl p-8 shadow-lg border border-border/50">
            <Input
              placeholder="Nome studente"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="rounded-xl h-12"
            />
            <Input
              placeholder="Telefono genitore"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="rounded-xl h-12"
            />
            <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Livello scolastico" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/20">
              Richiedi informazioni
            </Button>
          </form>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
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
                <p className="text-sm text-muted-foreground">Mogliano Veneto (TV)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl p-5">
              <Clock className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-semibold text-primary">Orari</p>
                <p className="text-sm text-muted-foreground">Lun-Ven 14:00-20:00 | Sab 9:00-13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
