"use client";

import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { PHONE, PHONE_INTL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from "@/lib/structured-data";
import {
  BookOpen, Cog, TrendingUp, Clock, Users, MapPin, Package,
  ArrowRight, Phone as PhoneIcon, ChevronDown,
  PenLine, Brain, CheckCircle, Calendar, MessageCircle,
} from "lucide-react";

const WHATSAPP_CORSO = `https://wa.me/393405106467?text=${encodeURIComponent(
  "Ciao! Vorrei informazioni sul corso di Preparazione alle Superiori"
)}`;

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Preparazione alle Superiori", href: "/corsi/preparazione-superiori" },
];

const targetCards = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Stai per iniziare il liceo",
    text: "Classico, scientifico, linguistico o delle scienze umane: i primi mesi sono decisivi. Questo corso ti dà le basi di matematica e italiano che ti mancano dalla media.",
  },
  {
    icon: <Cog className="w-7 h-7" />,
    title: "Stai per iniziare un istituto tecnico",
    text: "Informatico, economico o tecnologico: l'approccio alle materie cambia. Ti aiutiamo a costruire il metodo giusto prima che arrivi la prima interrogazione.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Non vuoi perdere tempo a recuperare",
    text: "Ogni anno centinaia di studenti di prima superiore iniziano il trimestre già in ritardo. Con un mese di preparazione, puoi iniziare davanti agli altri invece che a inseguire.",
  },
];

const programma = [
  {
    icon: <PenLine className="w-6 h-6" />,
    title: "Matematica",
    items: [
      "Algebra: frazioni, equazioni di primo e secondo grado, sistemi",
      "Geometria: figure piane, teorema di Pitagora, area e perimetro",
      "Introduzione ai numeri relativi e alle potenze",
      "Esercizi pratici con correzione e spiegazione",
    ],
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Italiano e Testo Scritto",
    items: [
      "Struttura del testo: come si costruisce un tema",
      "Ortografia e punteggiatura: gli errori più comuni da eliminare",
      "Analisi del testo e comprensione",
      "Esercizi di scrittura guidata",
    ],
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Metodo di Studio",
    items: [
      "Come prendere appunti in modo efficace",
      "Come organizzare lo studio settimanale",
      "Come prepararsi a un'interrogazione",
      "Strumenti pratici: agenda, schema di ripasso, mappa concettuale",
    ],
  },
];

const struttura = [
  { icon: <Calendar className="w-5 h-5" />, label: "Durata", value: "4 settimane (luglio o agosto 2026)" },
  { icon: <Clock className="w-5 h-5" />, label: "Frequenza", value: "3 lezioni a settimana" },
  { icon: <Clock className="w-5 h-5" />, label: "Durata lezione", value: "90 minuti" },
  { icon: <Users className="w-5 h-5" />, label: "Gruppo", value: "Piccolo gruppo (max 4–6 studenti)" },
  { icon: <MapPin className="w-5 h-5" />, label: "Sede", value: "Emergenza Studio, Via Francesco Barbiero 84g, Mogliano Veneto" },
  { icon: <Package className="w-5 h-5" />, label: "Materiale", value: "Incluso nel corso" },
];

const faqs = [
  {
    q: "Mio figlio non ha grosse lacune. Vale comunque la pena?",
    a: "Sì. Il corso non è solo un recupero: è un anticipo. Chi parte già solido può usare il mese estivo per conoscere i nuovi programmi, esercitarsi sul metodo di studio e arrivare a settembre con meno ansia e più sicurezza.",
  },
  {
    q: "Il corso è adatto sia per il liceo che per l'istituto tecnico?",
    a: "Sì. I contenuti di matematica e italiano sono comuni a tutti gli indirizzi. Il metodo di studio viene adattato all'indirizzo scelto dallo studente.",
  },
  {
    q: "Quanti studenti ci sono per gruppo?",
    a: "Massimo 4–6 studenti, per garantire attenzione individuale e permettere al tutor di seguire tutti durante gli esercizi.",
  },
  {
    q: "Quando inizia esattamente?",
    a: "Organizziamo sessioni a luglio e a agosto. Le date precise dipendono dalle iscrizioni. Contattaci per sapere i posti disponibili.",
  },
  {
    q: "Posso iscrivermi anche se non vivo a Mogliano Veneto?",
    a: "Certo. Siamo facilmente raggiungibili da Treviso, Venezia, Mestre e dai comuni limitrofi. Il centro è a 50 metri dalla stazione di Mogliano.",
  },
];

export default function PreparazioneSuperioriPage() {
  return (
    <>
      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Preparazione alle Superiori", href: "/corsi/preparazione-superiori" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Preparazione alle Superiori",
            description: "Corso estivo per chi inizia le superiori a settembre. Matematica, italiano e metodo di studio con tutor qualificati a Mogliano Veneto.",
            startDate: "2026-07-01",
            endDate: "2026-08-31",
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
          }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(
            faqs.map((f) => ({ question: f.q, answer: f.a }))
          )),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      {/* ═══════ HERO ═══════ */}
      <section className="pt-8 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span
              className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Estate 2026 · Iscrizioni aperte
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Preparazione alle Superiori
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-3 font-medium">
              Il corso estivo per iniziare il liceo — o l&apos;istituto tecnico — senza essere già indietro dal primo giorno.
            </p>

            {/* Quick info badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4" /> 4 settimane
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> 3 lezioni/settimana da 90 min
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Max 4–6 studenti
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={WHATSAPP_CORSO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Prenota il tuo posto <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#programma"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 border-2 border-secondary text-secondary font-semibold uppercase tracking-wider hover:bg-secondary/5 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Scopri il programma <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ A CHI È RIVOLTO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A chi è rivolto
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {targetCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3
                  className="text-lg font-bold text-primary mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROGRAMMA ═══════ */}
      <section id="programma" className="section-spacing scroll-mt-24">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-4 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cosa studiamo
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Il corso copre le tre aree che fanno la differenza nel primo anno di superiori.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {programma.map((block) => (
              <div
                key={block.title}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                  {block.icon}
                </div>
                <h3
                  className="text-xl font-bold text-primary mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {block.title}
                </h3>
                <ul className="space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STRUTTURA DEL CORSO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Come è organizzato il corso
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {struttura.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground text-sm leading-relaxed bg-white rounded-xl p-5 border border-border">
              Preferisci lezioni individuali? Possiamo costruire un percorso personalizzato.{" "}
              <a
                href={WHATSAPP_CORSO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                Scrivici su WhatsApp per un preventivo.
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ PERCHÉ FARLO ADESSO ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Perché prepararsi prima di settembre
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center">
              L&apos;estate tra le medie e le superiori è l&apos;unico momento in cui uno studente può colmare le lacune
              senza la pressione del voto. Chi inizia le superiori già solido nelle basi può dedicare le prime settimane
              a imparare, invece di recuperare. Chi non si prepara, spesso si ritrova già indietro al primo compito in classe.
            </p>

            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20 p-8 text-center">
              <p
                className="text-xl md:text-2xl font-bold text-primary leading-snug italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;Un mese di lavoro in estate vale più di tre mesi di recupero durante l&apos;anno.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COSTO DEL CORSO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-10 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Costo del corso
          </h2>

          <div className="max-w-lg mx-auto rounded-2xl bg-white border border-border p-8 text-center shadow-sm">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Contattaci per conoscere la quota di iscrizione e i posti disponibili.
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              Il costo è fatturato regolarmente e detraibile al 19% nella dichiarazione dei redditi.
            </p>
            <a
              href={WHATSAPP_CORSO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prenota il tuo posto <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-12 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Domande frequenti
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                <h3
                  className="text-base font-bold text-primary mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA FINALE ═══════ */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prenota il posto di tuo figlio
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            I posti sono limitati. Scrivici su WhatsApp per confermare l&apos;iscrizione o per ricevere informazioni
            sul programma, i costi e le date disponibili.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_CORSO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground text-lg font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              className="inline-flex items-center gap-2 text-primary-foreground/70 font-semibold text-lg hover:text-primary-foreground transition-colors"
            >
              <PhoneIcon className="w-5 h-5" /> {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
