import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Users, GraduationCap, Sparkles,
  Phone, CheckCircle, XCircle, MapPin, Star,
  ChevronDown,
} from "lucide-react";
import { WHATSAPP_URL, SITE_URL, ADDRESS_FULL, ORARI } from "@/lib/constants";
import { faqJsonLd } from "@/lib/structured-data";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Ripetizioni a Mogliano Veneto | Emergenza Studio",
  description:
    "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Ripetizioni individuali e di gruppo per medie, superiori e università. Pacchetti multi-materia flessibili, fatturazione detraibile al 19%.",
  alternates: { canonical: SITE_URL },
};

const faqs = [
  {
    question: "Quali materie coprite?",
    answer:
      "Tutte. Abbiamo tutor qualificati per ogni materia: matematica, fisica, italiano, latino, greco, inglese, storia, filosofia, chimica, scienze, economia e molte altre. Se hai bisogno di una materia specifica, contattaci e troveremo il tutor giusto.",
  },
  {
    question: "Quanto costa un'ora di ripetizione?",
    answer:
      "I prezzi partono da €16/ora per le elementari, €18/ora per le medie, €22/ora per le superiori e €30/ora per l'università. Offriamo anche pacchetti ore multi-materia con tariffe agevolate.",
  },
  {
    question: "Posso usare il pacchetto ore per materie diverse?",
    answer:
      "Sì, i nostri pacchetti sono multi-materia: acquisti un monte ore e lo utilizzi per qualsiasi materia, cambiando anche di settimana in settimana.",
  },
  {
    question: "Le ripetizioni sono detraibili?",
    answer:
      "Sì. Tutte le lezioni sono regolarmente fatturate e le famiglie possono detrarre il 19% del costo nella dichiarazione dei redditi.",
  },
  {
    question: "Dove si trova il centro?",
    answer:
      "Siamo a Mogliano Veneto, a 50 metri dal Liceo Classico G. Berto e dalla scuola media. Lo studente può venire direttamente dopo le lezioni.",
  },
  {
    question: "Come prenoto una lezione?",
    answer:
      "Puoi scriverci su WhatsApp, chiamarci o passare direttamente al centro. Ti risponderemo il prima possibile per trovare l'orario e il tutor più adatti.",
  },
  {
    question: "Fate anche lezioni di gruppo?",
    answer:
      "Sì, organizziamo piccoli gruppi di 2-4 studenti dello stesso livello. Le lezioni di gruppo sono più convenienti e permettono di imparare confrontandosi con i compagni.",
  },
];

const comparisonData = [
  {
    title: "Tutte le materie con un unico pacchetto",
    desc: "Con un tutor privato, ogni materia richiede un insegnante diverso. Da noi acquisti un pacchetto ore e lo usi per matematica, fisica, inglese o qualsiasi altra materia ti serva, senza vincoli.",
  },
  {
    title: "Più flessibilità sugli orari",
    desc: "Un tutor ha disponibilità limitata. Al centro hai più tutor disponibili su più fasce orarie: puoi cambiare giorno, ora e materia ogni settimana in base alle tue esigenze.",
  },
  {
    title: "Possibilità di cambiare approccio",
    desc: "Se il metodo di un tutor non funziona, con noi puoi semplicemente provare con un altro insegnante del nostro team, senza ricominciare da zero.",
  },
  {
    title: "Fatturazione regolare e detraibile",
    desc: "Le nostre ripetizioni sono fatturate regolarmente. Le famiglie possono detrarre il 19% del costo nella dichiarazione dei redditi. Con molti tutor privati questo non è possibile.",
  },
  {
    title: "Ambiente dedicato e professionale",
    desc: "Niente distrazioni di casa. A Emergenza Studio lo studente trova uno spazio pensato per lo studio, attrezzato e a due passi dalla scuola.",
  },
  {
    title: "Una squadra, non una persona sola",
    desc: "Hai bisogno di matematica e latino nella stessa settimana? Il nostro team copre tutte le materie. Con un tutor privato servirebbero due persone diverse, con orari e costi separati.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-32 right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-4xl mb-12">
            <h1
              className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-primary mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ripetizioni a Mogliano Veneto
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              Emergenza Studio è il centro ripetizioni di Mogliano Veneto, a 50
              metri dal Liceo Berto e dalla scuola media. Ripetizioni
              individuali e di gruppo, tutor qualificati per tutte le materie,
              pacchetti flessibili e corsi di preparazione.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-secondary text-secondary-foreground font-semibold uppercase tracking-wider text-base shadow-lg hover:bg-secondary/90 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prenota una lezione
            </a>
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 border-2 border-primary text-primary font-semibold uppercase tracking-wider text-base hover:bg-primary hover:text-primary-foreground transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scopri i servizi
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src="/images/hero_students.jpg"
            alt="Aula studio di Emergenza Studio a Mogliano Veneto con studenti"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      </section>

      {/* ═══════ SERVIZI ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cosa facciamo
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Ripetizioni Individuali",
                desc: "Lezioni uno-a-uno con un tutor dedicato.",
                link: "/servizi",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Ripetizioni di Gruppo",
                desc: "Piccoli gruppi di 2-4 studenti della stessa classe o livello. Più conveniente delle lezioni individuali, con il vantaggio di imparare confrontandosi con i compagni.",
                link: "/servizi",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Aiuto Compiti e Doposcuola",
                desc: "Supporto quotidiano per svolgere i compiti e a creare un metodo di studio.",
                link: "/servizi",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Preparazione Test e Corsi Serali",
                desc: "Corsi mirati per la preparazione ai TOLC, al semestre filtro universitario, English Speaking e molto altro. Prossimamente disponibili.",
                link: "/corsi-serali",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  {s.icon}
                </div>
                <h3
                  className="text-lg font-bold text-primary mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <Link
                  href={s.link}
                  className="text-accent font-semibold text-sm hover:underline"
                >
                  Scopri di più →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PERCHÉ NOI vs TUTOR PRIVATO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Perché scegliere Emergenza Studio rispetto a un tutor privato
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Molte famiglie si affidano a tutor privati per le ripetizioni dei
            figli. È una scelta comprensibile, ma un centro strutturato come
            Emergenza Studio offre vantaggi concreti che un singolo insegnante,
            per quanto bravo, non può garantire.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonData.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 border border-accent/20 bg-accent/5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <h3
                    className="text-base font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COME FUNZIONA ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Come funziona
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Contattaci",
                desc: "Scrivici su WhatsApp o chiamaci. Raccontaci di cosa hai bisogno: materia, livello scolastico, obiettivi.",
              },
              {
                step: "2",
                title: "Pianifichiamo insieme",
                desc: "Ti proponiamo il tutor più adatto, gli orari disponibili e il pacchetto migliore per le tue esigenze.",
              },
              {
                step: "3",
                title: "Si parte",
                desc: "Vieni al centro e inizia le lezioni. Monitoriamo i progressi e adattiamo il percorso strada facendo.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-5 text-2xl font-bold" style={{fontFamily:"var(--font-display)"}}>
                  {s.step}
                </div>
                <h3
                  className="text-xl font-bold text-primary mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ DETRAIBILITÀ ═══════ */}
      <section className="py-12">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-white">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Le ripetizioni sono detraibili al 19%
            </h2>
            <p className="text-white/80 max-w-2xl leading-relaxed mb-6">
              Scegliere Emergenza Studio non è solo un investimento
              nell&apos;istruzione: è anche un risparmio fiscale. Tutte le nostre
              lezioni sono regolarmente fatturate e le famiglie possono detrarre
              il 19% del costo nella dichiarazione dei redditi, come previsto
              dalla normativa vigente.
            </p>
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white text-primary font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scopri i prezzi
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ DOVE SIAMO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dove siamo
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Emergenza Studio si trova nel cuore di Mogliano Veneto, a 50 metri
            dal Liceo Classico G. Berto e a 50 metri dalla scuola media. I tuoi
            figli possono venire direttamente dopo le lezioni, senza
            spostamenti.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-primary">{ADDRESS_FULL}</p>
                  <p className="text-sm text-muted-foreground">{ORARI}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-border aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.0!2d12.2364!3d45.5611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMzJzQwLjAiTiAxMsKwMTQnMTEuMCJF!5e0!3m2!1sit!2sit!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Emergenza Studio Mogliano Veneto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIANZE ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cosa dicono di noi
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 italic">
              &quot;Le nostre recensioni su Google&quot;
            </p>
            <a
              href="https://www.google.com/maps/place/Emergenza+Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
            >
              Vedi le recensioni su Google →
            </a>
            <p className="mt-4">
              <a
                href="https://www.google.com/maps/place/Emergenza+Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Lascia una recensione →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Domande frequenti
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-white p-0 overflow-hidden"
              >
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 font-semibold text-primary list-none [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <CtaSection
        title="Prenota la tua prima lezione"
        buttonText="Prenota una lezione di prova"
      />
    </>
  );
}
