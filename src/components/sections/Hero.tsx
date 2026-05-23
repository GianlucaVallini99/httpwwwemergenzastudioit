import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";
import { HeroBlobs } from "@/components/Blobs";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-32 md:pt-52 md:pb-36 overflow-hidden min-h-[92vh] flex items-center">
      <HeroBlobs />
      <div className="container-custom relative z-10">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1.15fr_0.85fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/12 text-teal-deep rounded-full text-[13px] font-extrabold tracking-wide mb-7 reveal in">
              <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
              Ripetizioni a Mogliano Veneto
            </span>
            <h1 className="text-[clamp(44px,6.2vw,84px)] leading-[0.95] mb-6 reveal in d1">
              Ripetizioni{" "}
              <em className="not-italic text-secondary relative inline-block">
                per ogni
                <span
                  className="absolute -left-[2%] -right-[2%] bottom-1 h-3.5 rounded-full -z-10"
                  style={{ background: "rgba(45, 138, 138, .22)" }}
                />
              </em>{" "}
              materia.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-9 reveal in d2">
              Da Emergenza Studio diamo una mano agli studenti a migliorare i propri voti
              e a crearsi un metodo di studio duraturo nel tempo. Lezioni individuali,
              di gruppo e corsi di potenziamento.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-9 reveal in d3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-primary text-primary-foreground font-extrabold shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)] hover:-translate-y-0.5 transition-transform"
              >
                Prenota una lezione <span aria-hidden>→</span>
              </a>
              <Link
                href="/corsi"
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 border-2 border-primary text-primary font-extrabold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Scopri i corsi
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground font-semibold reveal in d4">
              <div>
                <strong className="block text-2xl text-primary font-extrabold">50+</strong>
                studenti seguiti
              </div>
              <div>
                <strong className="block text-2xl text-primary font-extrabold">15+</strong>
                materie coperte
              </div>
              <div>
                <strong className="block text-2xl text-primary font-extrabold">4.9★</strong>
                recensioni Google
              </div>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-[154px] sm:max-w-[210px] md:max-w-[322px] mx-auto md:ml-auto reveal in d2">
            <Image
              src="/logo-circle.png"
              alt="Logo Emergenza Studio"
              fill
              priority
              className="object-contain animate-floaty drop-shadow-[0_40px_60px_rgba(40,74,110,0.35)]"
              sizes="(max-width: 768px) 80vw, 460px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
