"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionBlobs } from "@/components/Blobs";
import { ChevronDown } from "lucide-react";

const PSICOLOGHE = [
  {
    nome: "Dott.ssa Alice Pizzato",
    foto: "/images/alice_pizzato.jpg",
    logo: "/images/logo_psi.jpg",
    descrizione:
      "Psicologa laureata magistrale in Psicologia Clinica e di Comunità allo IUSVE, iscritta all'Albo degli Psicologi del Veneto. Attualmente sta proseguendo la formazione presso la Scuola di Psicoterapia Integrata AETOS di Mestre.",
    esperienza:
      "Ha maturato esperienza sia nell'ambito dei minori che degli adulti, accompagnando adolescenti, adulti e coppie in percorsi di sostegno psicologico, in uno spazio di ascolto, comprensione e crescita personale. Si occupa anche di supporto alla genitorialità e di percorsi individuali di potenziamento e lavoro sulle funzioni esecutive per bambini e ragazzi.",
    indirizzo: "Via G. Matteotti 6/G, Mogliano Veneto",
    telefono: "379-2532572",
    email: "psicologa.alicepizzato@gmail.com",
  },
  {
    nome: "Dott.ssa Anita Cinot",
    foto: "/images/anita_cinot.jpg",
    logo: null,
    descrizione:
      "Psicologa dell'Età Evolutiva, iscritta all'Albo degli Psicologi del Veneto n. 6738. Laureata in Psicologia a Padova, si è specializzata in Psicologia Scolastica e Neuropsicologia, approfondendo temi come DSA, ADHD, plusdotazione e alto potenziale cognitivo. Attualmente frequenta la Scuola di Specializzazione in Psicoterapia AETOS di Mestre.",
    esperienza:
      "All'interno del doposcuola accompagna i ragazzi nella comprensione di sé, nel superamento degli ostacoli, nella costruzione dell'autostima e nella valorizzazione dei propri punti di forza. Presso Emergenza Studio offre consulenze psicologiche per bambini, ragazzi e famiglie e valutazioni cognitive, emotive e degli apprendimenti.",
    indirizzo: null,
    telefono: "351-7527539",
    email: "abcpsicologia.studio@gmail.com",
  },
];

function PsicologaCard({ p, delay }: { p: (typeof PSICOLOGHE)[number]; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group bg-card rounded-[32px] p-9 border border-border shadow-[0_30px_60px_-30px_rgba(21,50,79,0.25)] hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-30px_rgba(21,50,79,0.4)] hover:border-accent/30 transition-all duration-300 reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-6 mb-6">
        {p.foto ? (
          <div className="relative shrink-0">
            <Image
              src={p.foto}
              alt={p.nome}
              width={100}
              height={100}
              className="rounded-full object-cover w-[100px] h-[100px] ring-4 ring-transparent group-hover:ring-accent/25 group-hover:scale-105 transition-all duration-300"
            />
          </div>
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-accent/20 shrink-0 flex items-center justify-center">
            <span className="text-3xl text-primary/40">?</span>
          </div>
        )}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-black text-primary group-hover:text-secondary transition-colors">{p.nome}</h3>
            {p.logo && (
              <Image src={p.logo} alt="Logo" width={36} height={36} className="object-contain" />
            )}
          </div>
          <p className="text-muted-foreground">{p.descrizione}</p>
        </div>
      </div>

      {p.esperienza && (
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="text-muted-foreground mb-6">{p.esperienza}</p>
          </div>
        </div>
      )}

      {p.esperienza && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-secondary font-extrabold text-sm hover:text-teal-deep transition-colors mb-5"
        >
          {open ? "Mostra meno" : "Leggi di più"}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      {(p.indirizzo || p.telefono || p.email) && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-foreground/80 border-t border-border pt-5">
          {p.indirizzo && (
            <span className="flex items-center gap-2">
              <span className="text-secondary">&#x1F4CD;</span> {p.indirizzo}
            </span>
          )}
          {p.telefono && (
            <a href={`tel:+39${p.telefono.replace(/-/g, "")}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
              <span className="text-secondary">&#x1F4DE;</span> {p.telefono}
            </a>
          )}
          {p.email && (
            <a href={`mailto:${p.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
              <span className="text-secondary">&#x2709;&#xFE0F;</span> {p.email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function AltriServizi() {
  return (
    <section id="altri-servizi" className="section-spacing section-tint">
      <SectionBlobs variant="a" />
      <div className="container-custom">
        <div className="text-center mb-14 reveal">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3">
            Ulteriori servizi
          </span>
          <h2 className="text-[clamp(34px,4.2vw,52px)] mb-4">
            Supporto psicologico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Emergenza Studio collabora con psicologhe qualificate, per un supporto
            completo allo studio e alla crescita personale.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {PSICOLOGHE.map((p, i) => (
            <PsicologaCard key={p.nome} p={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
