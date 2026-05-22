import Link from "next/link";
import { User, Users, BookOpen, Sparkles } from "lucide-react";
import { SectionBlobs } from "@/components/Blobs";

const ITEMS = [
  { Icon: User, title: "Ripetizioni individuali", desc: "Lezioni uno-a-uno con un tutor dedicato, pensate sul singolo studente." },
  { Icon: Users, title: "Ripetizioni di gruppo", desc: "Piccoli gruppi 2-4 studenti dello stesso livello. Più conveniente, più sociale." },
  { Icon: BookOpen, title: "Doposcuola & metodo", desc: "Supporto quotidiano per i compiti e costruzione di un metodo di studio." },
  { Icon: Sparkles, title: "Preparazione test", desc: "Corsi mirati per TOLC, semestre filtro, ammissioni e maturità." },
];

export default function Servizi() {
  return (
    <section id="servizi" className="section-spacing">
      <SectionBlobs variant="a" />
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3 reveal">Cosa facciamo</span>
          <h2 className="text-[clamp(34px,4.4vw,54px)] mb-4 reveal d1">Quattro modi per studiare con noi</h2>
          <p className="text-lg text-muted-foreground reveal d2">
            Scegli il formato che funziona meglio per te. Puoi anche cambiarlo strada
            facendo: il percorso resta flessibile.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-card rounded-[32px] p-8 pb-7 border border-border overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(21,50,79,0.25)] transition-all duration-300 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(45,138,138,.16), transparent 70%)" }}
              />
              <div className="relative w-14 h-14 rounded-[18px] bg-primary text-primary-foreground grid place-items-center mb-5">
                <s.Icon className="w-6 h-6" />
              </div>
              <h3 className="relative text-lg mb-2">{s.title}</h3>
              <p className="relative text-sm text-muted-foreground">{s.desc}</p>
              <Link href="/servizi" className="relative inline-flex items-center gap-1 mt-4 text-secondary font-extrabold text-sm hover:text-teal-deep">
                Scopri di più →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
