"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/structured-data";
import { Calendar, Users, Cpu, Globe } from "lucide-react";

const SITE_URL = "https://emergenza.studio";

const breadcrumbs = [{ label: "Corsi Serali", href: "/corsi-serali" }];

const corsi = [
  {
    icon: <Calendar className="w-7 h-7" />,
    title: "Preparazione TOLC – Corso Intensivo",
    desc: "Un percorso di 8 settimane per prepararsi ai test d'ingresso universitari con lezioni serali, materiale dedicato e simulazioni settimanali.",
    quando: "Da settembre 2026",
    perChi: "Diplomandi e maturandi",
    value: "tolc",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Supporto Semestre Filtro",
    desc: "10 settimane di lezioni serali su Analisi Matematica I e Fisica I, i due esami che bloccano più matricole al primo anno.",
    quando: "Da ottobre 2026",
    perChi: "Matricole universitarie",
    value: "semestre-filtro",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "English Speaking Club",
    desc: "Incontri settimanali di conversazione in inglese in piccoli gruppi. Nessun libro di grammatica: solo pratica orale su argomenti reali, guidata da un tutor madrelingua o bilingue.",
    quando: "Da settembre 2026",
    perChi: "Studenti e adulti di tutti i livelli",
    value: "english-speaking",
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    title: "AI & Strumenti Digitali per Professionisti",
    desc: "Un corso pratico di 4 settimane per imparare a utilizzare l'intelligenza artificiale e gli strumenti digitali più utili nel lavoro quotidiano: dalla produttività alla comunicazione, dall'analisi dati alla creazione di contenuti.",
    quando: "Da novembre 2026",
    perChi: "Professionisti, imprenditori, dipendenti",
    value: "ai-tools",
  },
];

export default function CorsiSeraliPage() {
  const [formData, setFormData] = useState({ nome: "", email: "", telefono: "", corso: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API
    setSubmitted(true);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Corsi Serali", href: "/corsi-serali" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd([
            { name: "Preparazione TOLC – Corso Intensivo", description: "Corso intensivo di 8 settimane per la preparazione ai test d'ingresso universitari", startDate: "2026-09-01" },
            { name: "Supporto Semestre Filtro", description: "10 settimane di lezioni su Analisi Matematica I e Fisica I", startDate: "2026-10-01" },
            { name: "English Speaking Club", description: "Incontri settimanali di conversazione in inglese in piccoli gruppi", startDate: "2026-09-01" },
            { name: "AI & Strumenti Digitali per Professionisti", description: "Corso pratico sull'intelligenza artificiale e strumenti digitali per il lavoro", startDate: "2026-11-01" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Corsi Serali a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-16">
            Emergenza Studio non è solo ripetizioni. Stiamo preparando una serie di corsi serali pensati per studenti e professionisti che vogliono investire nella propria formazione, in un formato accessibile e in orario serale.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Corsi in programma
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {corsi.map((c) => (
              <div key={c.value} className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-muted-foreground font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {c.quando}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-muted-foreground font-medium">
                    <Users className="w-3.5 h-3.5" /> {c.perChi}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Waiting List Form */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Iscriviti alla Waiting List
            </h2>
            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              I corsi serali sono in fase di organizzazione. Lascia il tuo contatto per essere tra i primi a sapere quando apriremo le iscrizioni e per accedere alla tariffa early bird riservata ai primi iscritti.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center">
                <p className="text-lg font-semibold text-accent mb-2">Grazie per l&apos;iscrizione!</p>
                <p className="text-muted-foreground">Ti contatteremo appena saranno disponibili le date dei corsi.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-1">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="La tua email"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">Telefono / WhatsApp</label>
                  <input
                    type="tel"
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Il tuo numero"
                  />
                </div>
                <div>
                  <label htmlFor="corso" className="block text-sm font-medium text-foreground mb-1">Corso di interesse</label>
                  <select
                    id="corso"
                    required
                    value={formData.corso}
                    onChange={(e) => setFormData({ ...formData, corso: e.target.value })}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Seleziona un corso</option>
                    {corsi.map((c) => (
                      <option key={c.value} value={c.value}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl px-6 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Iscrivimi alla waiting list
                </button>
              </form>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Oppure{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                scrivici su WhatsApp per info sui corsi
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
