"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from "@/lib/structured-data";
import {
  BookOpen, Clock, Users, MapPin, Package, Calendar,
  ArrowRight, Phone as PhoneIcon, ChevronDown,
  CheckCircle, MessageCircle, Star,
} from "lucide-react";

const WHATSAPP_CORSO = "https://wa.me/393534017905?text=Ciao!%20Vorrei%20informazioni%20sul%20Corso%20Pre-Superiori%20di%20Matematica";
const PHONE_CORSO = "353 401 7905";
const PHONE_CORSO_INTL = "+393534017905";

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Corso Pre-Superiori di Matematica", href: "/corsi/preparazione-superiori" },
];

const targetList = [
  "Studenti che a settembre iniziano il liceo scientifico",
  "Ragazzi con qualche incertezza in matematica dalle medie",
  "Famiglie che vogliono un punto di partenza solido, non un recupero affannoso durante l'anno",
];

const settimane = [
  {
    num: 1,
    titolo: "Numeri e Frazioni",
    argomenti: [
      "Insiemi numerici: naturali, interi, razionali",
      "Operazioni con le frazioni: somma, prodotto, divisione, semplificazione",
      "Numeri relativi: regole dei segni, valore assoluto",
      "Potenze: proprietà e calcolo",
    ],
    perche: "Il calcolo numerico è la base di tutto. Chi sbaglia qui sbaglia ovunque.",
  },
  {
    num: 2,
    titolo: "Calcolo Letterale",
    argomenti: [
      "Introduzione ai monomi: coefficiente, parte letterale, grado",
      "Operazioni con i monomi: somma, prodotto, quoziente",
      "Polinomi: definizione, addizione e sottrazione",
      "Moltiplicazione di polinomi",
    ],
    perche: "Il calcolo letterale è il linguaggio dell'algebra. Senza questa settimana, le successive non reggono.",
  },
  {
    num: 3,
    titolo: "Prodotti Notevoli e Scomposizione",
    argomenti: [
      "Quadrato di un binomio e di un trinomio",
      "Prodotto della somma per la differenza",
      "Scomposizione in fattori: raccoglimento totale e parziale",
      "Scomposizione tramite prodotti notevoli",
    ],
    perche: "È uno dei punti più critici del primo anno. Molti studenti ci inciampano anche dopo mesi di liceo.",
  },
  {
    num: 4,
    titolo: "Equazioni di Primo Grado",
    argomenti: [
      "Principi di equivalenza delle equazioni",
      "Risoluzione di equazioni intere e frazionarie",
      "Equazioni con parentesi e raccoglimenti",
      "Problemi applicati: tradurre un testo in equazione e risolverlo",
    ],
    perche: "Le equazioni tornano in ogni capitolo del liceo. Padroneggiarle adesso significa non doverle reimparare sotto esame.",
  },
  {
    num: 5,
    titolo: "Geometria Euclidea + Ripasso Generale",
    argomenti: [
      "Rette, semirette, segmenti: definizioni e relazioni",
      "Angoli: tipologie, operazioni, angoli adiacenti e supplementari",
      "Triangoli: classificazione, criteri di congruenza",
      "Rette parallele e perpendicolari: teoremi fondamentali",
      "Ripasso generale con esercizi misti sul programma completo",
    ],
    perche: "La geometria euclidea apre il primo anno e spaventa chi non conosce il ragionamento dimostrativo. Qui si impara a pensare.",
  },
];

const struttura = [
  { icon: <Users className="w-5 h-5" />, label: "Gruppo", value: "Massimo 5 studenti" },
  { icon: <Clock className="w-5 h-5" />, label: "Ore settimanali", value: "4 ore a settimana" },
  { icon: <Calendar className="w-5 h-5" />, label: "Durata", value: "5 settimane — Giugno 2026" },
  { icon: <BookOpen className="w-5 h-5" />, label: "Totale", value: "20 ore di preparazione pratica" },
  { icon: <MapPin className="w-5 h-5" />, label: "Sede", value: "Emergenza Studio, Via Francesco Barbiero 84g, Mogliano Veneto" },
  { icon: <Package className="w-5 h-5" />, label: "Materiale", value: "Fornito dal centro" },
];

const faqs = [
  {
    q: "Il corso è adatto anche a chi va al liceo scientifico delle scienze applicate o a un istituto tecnico?",
    a: "Sì. Il programma copre le basi di matematica comuni a tutti gli indirizzi scientifici e tecnici. Se tuo figlio va al classico o al linguistico e vuole comunque fare il corso, scrivici: valutiamo insieme.",
  },
  {
    q: "Quante ore sono in totale?",
    a: "20 ore: 4 ore a settimana per 5 settimane.",
  },
  {
    q: "Cosa succede se uno studente perde una lezione?",
    a: "Contattaci su WhatsApp — organizziamo un recupero nella stessa settimana quando possibile.",
  },
  {
    q: "I posti sono davvero limitati a 5?",
    a: "Sì. Il limite non è marketing: con più di 5 studenti il docente non riesce a seguire tutti in modo efficace. Quando un gruppo è pieno apriamo il successivo.",
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
            { name: "Corso Pre-Superiori di Matematica", href: "/corsi/preparazione-superiori" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Corso Pre-Superiori di Matematica",
            description: "Corso di matematica per studenti che iniziano il liceo scientifico. 5 settimane, 20 ore totali, max 5 studenti per gruppo.",
            startDate: "2026-06-01",
            endDate: "2026-06-30",
            location: "Via Francesco Barbiero 84g, Mogliano Veneto",
            price: "250",
            priceCurrency: "EUR",
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
              Giugno 2026 · Iscrizioni aperte
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Corso Pre-Superiori di Matematica
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-medium leading-snug max-w-3xl">
              5 settimane per arrivare al liceo scientifico senza lacune. Piccoli gruppi, docenti esperti, programma su misura per il primo anno.
            </p>

            {/* Quick info badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4" /> 5 settimane · 20 ore
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Max 5 studenti
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Giugno 2026
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

      {/* ═══════ A CHI SERVE ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-4xl font-bold text-primary mb-6 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A chi serve questo corso
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-center">
              Il liceo scientifico ha una matematica diversa da quella delle medie. Più astratta, più veloce, con meno ripetizioni. Chi arriva con lacune anche piccole — sulle frazioni, sui numeri relativi, sul calcolo — si ritrova in difficoltà già al primo compito in classe.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-center font-medium">
              Questo corso colma quelle lacune prima che diventino un problema.
            </p>

            <div className="bg-white rounded-2xl border border-border p-8">
              <ul className="space-y-4">
                {targetList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            Il programma settimana per settimana
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            20 ore di preparazione pratica. Ogni settimana un blocco fondamentale del primo anno di liceo scientifico.
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {settimane.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl border border-border p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.num}
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Settimana {s.num} — {s.titolo}
                  </h3>
                </div>

                <ul className="space-y-2.5 mb-5 ml-1">
                  {s.argomenti.map((arg) => (
                    <li key={arg} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-accent/5 border border-accent/15 px-5 py-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-primary">Perché conta:</span> {s.perche}
                  </p>
                </div>
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
            Come funziona
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
              Il gruppo piccolo non è un dettaglio: con 5 studenti il docente può seguire ogni ragazzo, correggere gli errori in tempo reale e adattare il ritmo a chi ha bisogno di più attenzione.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ TARIFFA ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-10 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quota di partecipazione
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            {/* Card 1 — Settimana singola */}
            <div className="rounded-2xl bg-white border border-border p-8 flex flex-col">
              <h3
                className="text-lg font-bold text-primary mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Settimana Singola
              </h3>
              <p className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>
                €50 <span className="text-base font-normal text-muted-foreground">/ settimana</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Per chi vuole iniziare gradualmente o coprire solo i blocchi dove sente più difficoltà.
              </p>
              <a
                href={WHATSAPP_CORSO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border-2 border-accent text-accent font-semibold uppercase tracking-wider text-sm hover:bg-accent/5 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Iscriviti a una settimana <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2 — Corso completo */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-secondary/5 border-2 border-accent/30 p-8 flex flex-col relative shadow-md">
              <span
                className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Star className="w-3.5 h-3.5" /> Consigliato
              </span>
              <h3
                className="text-lg font-bold text-primary mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Corso Completo
              </h3>
              <p className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>
                €250 <span className="text-base font-normal text-muted-foreground">/ 5 settimane</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Equivale a €12,50/ora — contro i €25–35/ora di una ripetizione privata.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Include tutte e 5 le settimane + materiale didattico.
              </p>
              <a
                href={WHATSAPP_CORSO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Prenota il corso completo <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl bg-accent/5 border border-accent/15 px-6 py-4 text-center">
              <p className="text-sm text-foreground/80 leading-relaxed">
                📄 Il corso è fatturato regolarmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-spacing bg-card">
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
            I gruppi si riempiono velocemente. Scrivici su WhatsApp per confermare l&apos;iscrizione o per qualsiasi informazione sul corso.
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
              href={`tel:${PHONE_CORSO_INTL}`}
              className="inline-flex items-center gap-2 text-primary-foreground/70 font-semibold text-lg hover:text-primary-foreground transition-colors"
            >
              <PhoneIcon className="w-5 h-5" /> {PHONE_CORSO}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
