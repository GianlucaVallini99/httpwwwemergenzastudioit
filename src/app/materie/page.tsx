import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CtaSection from "@/components/CtaSection";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ripetizioni Tutte le Materie – Mogliano Veneto",
  description:
    "Ripetizioni di matematica, fisica, inglese e tutte le materie a Mogliano Veneto. Tutor specializzati per medie, superiori e università.",
  alternates: { canonical: `${SITE_URL}/materie` },
};

const breadcrumbs = [{ label: "Materie", href: "/materie" }];

const scientifiche = [
  { name: "Matematica", slug: "matematica", desc: "La materia più richiesta. I nostri tutor di matematica lavorano con studenti dalle medie all'università, coprendo: aritmetica, algebra, geometria, analisi matematica, probabilità e statistica. Ogni lezione parte dalle difficoltà specifiche dello studente e costruisce comprensione solida, non memorizzazione di formule." },
  { name: "Fisica", slug: "fisica", desc: "Dalla meccanica alla termodinamica, dall'elettromagnetismo all'ottica. Le nostre lezioni di fisica combinano la comprensione teorica con la risoluzione pratica dei problemi, perché in fisica non basta sapere la formula: bisogna capire quando e come usarla." },
  { name: "Chimica", slug: null, desc: "Chimica generale, organica, inorganica e biochimica. Supporto per studenti delle superiori e per la preparazione agli esami universitari." },
  { name: "Scienze naturali e biologia", slug: null, desc: "Dalla biologia cellulare all'ecologia, dalle scienze della Terra alla genetica. Lezioni strutturate per comprendere i concetti e prepararsi a verifiche e interrogazioni." },
];

const umanistiche = [
  { name: "Italiano e letteratura", desc: "Grammatica, analisi del testo, storia della letteratura, preparazione temi e saggi brevi. Supporto specifico per la prima prova della maturità." },
  { name: "Latino e greco", desc: "Traduzione, grammatica, sintassi, analisi del periodo. Approccio sistematico per costruire le competenze necessarie ad affrontare le versioni con sicurezza." },
  { name: "Storia e filosofia", desc: "Dalla storia antica alla contemporanea, dalla filosofia greca al pensiero moderno. Lezioni che aiutano a costruire un metodo di studio per materie ad alto contenuto teorico." },
];

const lingue = [
  { name: "Inglese", slug: "inglese", desc: "Grammatica, conversazione, preparazione certificazioni (PET, FCE, IELTS), supporto scolastico per tutti i livelli. I nostri tutor di inglese lavorano sia sulla parte scritta sia su quella orale." },
  { name: "Francese, spagnolo, tedesco", slug: null, desc: "Supporto per tutte le lingue curriculari insegnate nelle scuole di Mogliano Veneto e dintorni." },
];

export default function MateriePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Materie", href: "/materie" }])),
        }}
      />

      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ripetizioni per Tutte le Materie a Mogliano Veneto
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
            A Emergenza Studio trovi tutor qualificati per ogni materia scolastica e universitaria. Non importa se il problema è un&apos;equazione, un testo di latino o un esame di Analisi: abbiamo il tutor giusto per te.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-16">
            Con i nostri pacchetti multi-materia puoi passare da una materia all&apos;altra senza costi aggiuntivi, usando le stesse ore per qualsiasi esigenza.
          </p>

          {/* Scientifiche */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Materie Scientifiche
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {scientifiche.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{m.desc}</p>
                {m.slug && (
                  <Link href={`/materie/${m.slug}`} className="text-accent font-semibold text-sm hover:underline">
                    Scopri di più →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Umanistiche */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Materie Umanistiche
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {umanistiche.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Lingue */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Lingue Straniere
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {lingue.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{m.desc}</p>
                {m.slug && (
                  <Link href={`/materie/${m.slug}`} className="text-accent font-semibold text-sm hover:underline">
                    Scopri di più →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Tecniche */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Materie Tecniche e Professionali
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-16">
            Economia aziendale, diritto, informatica, disegno tecnico, elettrotecnica e altre materie degli istituti tecnici e professionali. Se la tua materia non è in elenco, contattaci: troveremo il tutor giusto.
          </p>

          {/* Universitario */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Supporto Universitario
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Preparazione esami universitari con tutor specializzati: Analisi Matematica I e II, Fisica I e II, Chimica generale, Economia, Statistica, e altre materie del primo biennio. Particolarmente indicato per studenti alle prese con il temuto &quot;semestre filtro&quot;.
          </p>
        </div>
      </section>

      <CtaSection
        title="Hai bisogno di una materia specifica? Scrivici"
        buttonText="Scrivici su WhatsApp"
      />
    </>
  );
}
