"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { WHATSAPP_URL, PHONE, PHONE_INTL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import {
  GraduationCap, Clock, Users, BookOpen, CheckCircle,
  ArrowRight, Phone as PhoneIcon, Calculator,
} from "lucide-react";

const breadcrumbs = [
  { label: "Corsi", href: "/corsi" },
  { label: "Corso Estivo Matematica", href: "/corsi/corso-estivo-matematica" },
];

const argomenti = [
  {
    titolo: "Trigonometria",
    desc: "Funzioni goniometriche, identità, equazioni e disequazioni trigonometriche. Le basi per affrontare limiti e integrali.",
  },
  {
    titolo: "Limiti",
    desc: "Concetto di limite, forme indeterminate, limiti notevoli, continuità di funzione. Il fondamento dell'analisi.",
  },
  {
    titolo: "Derivate",
    desc: "Definizione, regole di derivazione, studio di funzione, massimi e minimi, flessi. Applicazioni pratiche.",
  },
  {
    titolo: "Integrali",
    desc: "Integrali indefiniti, metodi di integrazione, integrali definiti e calcolo di aree. Il cuore di Analisi 1.",
  },
];

const vantaggi = [
  "Classi piccole per un apprendimento efficace",
  "Esercizi mirati su problemi tipo Analisi 1",
  "Materiale didattico incluso",
  "Tutor universitari con esperienza",
  "Certificato di partecipazione",
  "Ambiente di studio dedicato e professionale",
];

const FORMSPREE_URL = "https://formspree.io/f/xeengdey";

type FormData = {
  nome: string;
  cognome: string;
  telefono: string;
  classe: string;
  indirizzo: string;
  istituto: string;
};

export default function CorsoEstivoMatematicaPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cognome: "",
    telefono: "",
    classe: "",
    indirizzo: "",
    istituto: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Nuova iscrizione: Corso Estivo Matematica – ${formData.nome} ${formData.cognome}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Si è verificato un errore. Riprova o contattaci su WhatsApp.");
      }
    } catch {
      setError("Errore di connessione. Controlla la tua rete e riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi", href: "/corsi" },
            { name: "Corso Estivo Matematica", href: "/corsi/corso-estivo-matematica" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([{
            name: "Corso Estivo di Matematica – Preparazione Università",
            description: "Corso estivo di potenziamento di matematica per studenti di 4ª e 5ª liceo. Trigonometria, limiti, derivate e integrali in preparazione ad Analisi 1.",
          }])),
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
              Iscrizioni aperte — Estate 2026
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Corso Estivo di Matematica
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-3 font-medium">
              Preparazione all&apos;università per studenti di 4ª e 5ª liceo
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              Un percorso intensivo di 6 settimane per arrivare preparato ad Analisi 1.
              Trigonometria, limiti, derivate e integrali: tutti gli argomenti fondamentali,
              affrontati con metodo e tanta pratica.
            </p>

            {/* Quick info badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4" /> 2 incontri/settimana da 2h
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <BookOpen className="w-4 h-4" /> 6 settimane
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <Users className="w-4 h-4" /> Classi piccole
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-2 text-sm font-medium">
                <GraduationCap className="w-4 h-4" /> 4ª e 5ª liceo
              </span>
            </div>

            <a
              href="#iscrizione"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Iscriviti ora <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ STRUTTURA DEL CORSO ═══════ */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <h2
            className="text-2xl md:text-4xl font-bold text-primary mb-4 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Come è strutturato il corso
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Il corso si svolge nell&apos;arco di <strong>6 settimane</strong>, con{" "}
            <strong>2 incontri settimanali da 2 ore ciascuno</strong>, per un totale di{" "}
            <strong>24 ore di lezione</strong>. Un ritmo costante che permette di assimilare
            ogni argomento con calma e tanta pratica.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {argomenti.map((a, i) => (
              <div key={a.titolo} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-shadow h-full">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-sm mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {i + 1}
                  </div>
                  <h3
                    className="text-lg font-bold text-primary mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {a.titolo}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ A CHI È RIVOLTO ═══════ */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A chi è rivolto
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Il corso è pensato per studenti di <strong>quarta e quinta liceo</strong> di
                qualsiasi indirizzo (scientifico, classico, linguistico, scienze umane, artistico...)
                che vogliono arrivare all&apos;università con basi solide di matematica.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Che tu sia già bravo e voglia consolidare, o che la matematica non sia il tuo
                punto forte, il corso è strutturato per portarti al livello richiesto da Analisi 1.
              </p>
              <div className="space-y-3">
                {vantaggi.map((v) => (
                  <div key={v} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20 p-8">
              <Calculator className="w-12 h-12 text-accent mb-4" />
              <h3
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                In sintesi
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Durata</span>
                  <span className="text-muted-foreground">6 settimane</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Frequenza</span>
                  <span className="text-muted-foreground">2 incontri a settimana</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Durata lezione</span>
                  <span className="text-muted-foreground">2 ore per incontro</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Totale ore</span>
                  <span className="text-muted-foreground">24 ore di lezione</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Per chi</span>
                  <span className="text-muted-foreground">Studenti di 4ª e 5ª liceo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary w-28 shrink-0">Argomenti</span>
                  <span className="text-muted-foreground">Trigonometria, limiti, derivate, integrali</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FORM DI ISCRIZIONE ═══════ */}
      <section id="iscrizione" className="section-spacing bg-card scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Iscriviti al corso
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Compila il modulo per riservare il tuo posto. Ti contatteremo per confermare
              l&apos;iscrizione e darti tutte le informazioni pratiche.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center fade-in-up">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-xl font-semibold text-accent mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Iscrizione ricevuta!
                </p>
                <p className="text-muted-foreground mb-4">
                  Grazie per l&apos;interesse. Ti contatteremo al più presto per confermare il tuo posto.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                >
                  Scrivici su WhatsApp per qualsiasi domanda
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="cognome" className="block text-sm font-medium text-foreground mb-1">
                      Cognome *
                    </label>
                    <input
                      type="text"
                      id="cognome"
                      name="cognome"
                      required
                      value={formData.cognome}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                      placeholder="Il tuo cognome"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">
                    Numero di telefono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                    placeholder="Es. 333 123 4567"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="classe" className="block text-sm font-medium text-foreground mb-1">
                      Classe *
                    </label>
                    <select
                      id="classe"
                      name="classe"
                      required
                      value={formData.classe}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                    >
                      <option value="">Seleziona la classe</option>
                      <option value="4">4ª superiore</option>
                      <option value="5">5ª superiore</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="indirizzo" className="block text-sm font-medium text-foreground mb-1">
                      Indirizzo scolastico *
                    </label>
                    <select
                      id="indirizzo"
                      name="indirizzo"
                      required
                      value={formData.indirizzo}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                    >
                      <option value="">Seleziona l&apos;indirizzo</option>
                      <option value="Scientifico">Liceo Scientifico</option>
                      <option value="Scientifico Scienze Applicate">Liceo Scientifico – Scienze Applicate</option>
                      <option value="Classico">Liceo Classico</option>
                      <option value="Linguistico">Liceo Linguistico</option>
                      <option value="Scienze Umane">Liceo Scienze Umane</option>
                      <option value="Artistico">Liceo Artistico</option>
                      <option value="Istituto Tecnico">Istituto Tecnico</option>
                      <option value="Istituto Professionale">Istituto Professionale</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="istituto" className="block text-sm font-medium text-foreground mb-1">
                    Nome istituto di provenienza *
                  </label>
                  <input
                    type="text"
                    id="istituto"
                    name="istituto"
                    required
                    value={formData.istituto}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                    placeholder="Es. Liceo Scientifico G. Berto"
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl px-6 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {loading ? "Invio in corso..." : "Iscrivimi al corso"}
                </button>
              </form>
            )}

            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm mb-3">
                Hai domande? Contattaci direttamente
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
                >
                  Scrivici su WhatsApp
                </a>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <a
                  href={`tel:${PHONE_INTL}`}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
                >
                  <PhoneIcon className="w-4 h-4" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BOTTOM ═══════ */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Non aspettare settembre per prepararti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            L&apos;università richiede un salto di livello in matematica. Inizia quest&apos;estate
            con il piede giusto: iscriviti al corso e arriva preparato al primo giorno di lezione.
          </p>
          <a
            href="#iscrizione"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-secondary text-secondary-foreground font-semibold uppercase tracking-wider hover:bg-secondary/90 transition-colors shadow-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Iscriviti ora <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
