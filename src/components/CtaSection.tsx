import { WHATSAPP_URL } from "@/lib/constants";

interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export default function CtaSection({
  title = "Hai bisogno di aiuto con lo studio?",
  description = "Emergenza Studio è il centro ripetizioni di Mogliano Veneto, a 50 metri dal Liceo Berto. Contattaci su WhatsApp per prenotare una lezione.",
  buttonText = "Scrivici su WhatsApp",
  href = WHATSAPP_URL,
}: CtaSectionProps) {
  return (
    <section className="section-spacing bg-primary text-primary-foreground">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
          {description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground text-lg font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
