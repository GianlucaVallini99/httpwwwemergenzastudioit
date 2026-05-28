import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { faqJsonLd } from "@/lib/structured-data";

import RevealMount from "@/components/RevealMount";
import Hero from "@/components/sections/Hero";
import Servizi from "@/components/sections/Servizi";
import Corsi from "@/components/sections/Corsi";
import Tariffe from "@/components/sections/Tariffe";
import ChiSiamo from "@/components/sections/ChiSiamo";
import Contatti from "@/components/sections/Contatti";
import FAQ from "@/components/sections/FAQ";
import AltriServizi from "@/components/sections/AltriServizi";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Ripetizioni a Mogliano Veneto | Emergenza Studio",
  description:
    "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Tutor qualificati per tutte le materie, dalle medie all'università. Corsi, ripetizioni individuali e di gruppo.",
  alternates: { canonical: `${SITE_URL}/` },
};

const FAQ_DATA = [
  { question: "Quali materie coprite?",          answer: "Tutte. Matematica, fisica, italiano, latino, greco, inglese, storia, filosofia, chimica, scienze, economia e molte altre." },
  { question: "Posso cambiare materia o tutor?", answer: "Sì. Basta comunicarlo e organizziamo la lezione successiva con le nuove preferenze." },
  { question: "Come prenoto la prima lezione?",  answer: "Scrivici su WhatsApp al +39 353 401 7905, chiamaci o passa direttamente al centro. Ti rispondiamo entro 24h." },
  { question: "Fate anche lezioni di gruppo?",   answer: "Sì. Organizziamo piccoli gruppi di 2-4 studenti dello stesso livello." },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_DATA)) }}
      />
      <RevealMount />
      <Hero />
      <Servizi />
      <Corsi />
      <Tariffe />
      <ChiSiamo />
      <AltriServizi />
      <Contatti />
      <FAQ />
      <CtaBand />
    </>
  );
}
