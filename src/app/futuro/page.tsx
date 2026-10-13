import type { Metadata } from "next";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE_URL, PHONE_INTL } from "@/lib/constants";
import RevealMount from "@/components/RevealMount";
import Countdown from "./Countdown";
import styles from "./futuro.module.css";

const EVENTO = {
  nome: "Scegliere il futuro",
  inizio: "2026-11-21T16:00:00+01:00",
  fine: "2026-11-21T19:00:00+01:00",
  luogo: "Via Francesco Barbiero 84g, Mogliano Veneto (TV)",
};

// Prenotazioni raccolte con il Google Form dell'evento
const PRENOTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSezGRt3kyGV59RysM-DZJpe1GgSwuuD2RiJVbgO4NIHLEKmzQ/viewform";

const VOCI = [
  {
    titolo: "Orientamento",
    testo: "Dalle medie alle superiori e dalle superiori all'università.",
  },
  {
    titolo: "Mentorship",
    testo: "Il confronto con chi quella strada l'ha già fatta.",
  },
  {
    titolo: "Eventi",
    testo: "Incontri e tavole rotonde per fare domande e conoscere persone.",
  },
];

export const metadata: Metadata = {
  title: "Orientamento universitario a Mogliano Veneto | Emergenza Futuro",
  description:
    "Orientamento universitario e mentorship a Mogliano Veneto. Sabato 21 novembre alle 16:00 l'evento «Scegliere il futuro»: facoltà, test di ingresso e scadenze.",
  alternates: { canonical: `${SITE_URL}/futuro/` },
  openGraph: {
    title: "Emergenza Futuro · Orientamento universitario a Mogliano Veneto",
    description:
      "Sabato 21 novembre alle 16:00: «Scegliere il futuro», un pomeriggio per orientarti tra facoltà, test di ingresso e scadenze.",
    url: `${SITE_URL}/futuro/`,
  },
};

function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${EVENTO.nome} · Emergenza Futuro`,
    description: "Un pomeriggio per orientarti tra facoltà, test di ingresso e scadenze.",
    startDate: EVENTO.inizio,
    endDate: EVENTO.fine,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Emergenza Studio",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Francesco Barbiero 84g",
        addressLocality: "Mogliano Veneto",
        addressRegion: "TV",
        addressCountry: "IT",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Emergenza Studio",
      url: SITE_URL,
      telephone: PHONE_INTL,
    },
    url: `${SITE_URL}/futuro/#emergenza-universita`,
  };
}

export default function FuturoPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Emergenza Futuro", href: "/futuro" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd()) }}
      />

      <RevealMount />

      <section className={styles.intro}>
        <div className={`${styles.container} ${styles.introInner}`}>
          <span className={`${styles.badge} rise-in`}>Emergenza Futuro</span>
          <h1 className={`${styles.serif} ${styles.h1} rise-in r1`}>
            Ci siamo quando devi{" "}
            <em>
              scegliere
              <span aria-hidden className={`${styles.highlight} draw-x`} />
            </em>
            .
          </h1>
          <p className={`${styles.lead} rise-in r2`}>
            Emergenza Futuro è l&apos;area dedicata alle scelte: quale università, quale
            percorso, quale lavoro. Ti aiutiamo a guardare le opzioni con calma e a fare
            la scelta migliore per il tuo{" "}
            <em className={styles.leadAccent}>
              futuro
              <span aria-hidden className={`${styles.highlight} draw-x`} />
            </em>
            .
          </p>
          <div className={styles.voci}>
            {VOCI.map((v, i) => (
              <div
                key={v.titolo}
                className={`${styles.voce} reveal`}
                style={{ transitionDelay: `${350 + i * 120}ms` }}
              >
                <h2 className={styles.serif}>{v.titolo}</h2>
                <p>{v.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="emergenza-universita" className={styles.bannerSection}>
        <div className={`${styles.container} ${styles.banner} reveal`}>
          <div className={`${styles.bannerTop} reveal d2`}>
            <div className={styles.bannerTitle}>
              <span className={styles.overline}>Prossimo evento · Emergenza Futuro</span>
              <h2 className={`${styles.serif} ${styles.h2}`}>
                Scegliere il <em>futuro</em>
              </h2>
              <p className={styles.bannerSub}>
                Un pomeriggio per orientarti tra facoltà, test di ingresso e scadenze.
              </p>
            </div>
            <div className={styles.when}>
              <span className={`${styles.serif} ${styles.whenDay}`}>Sabato 21 novembre</span>
              <span className={styles.whenTime}>Ore 16:00 · Mogliano Veneto</span>
            </div>
          </div>

          <div className="reveal d3">
            <Countdown target={EVENTO.inizio} />
          </div>

          <div className={`${styles.ctas} reveal d4`}>
            <a
              href={PRENOTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Prenota il posto <span aria-hidden className="nudge-arrow">→</span>
            </a>
            <a
              href="/emergenza-universita.ics"
              download="emergenza-universita.ics"
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Aggiungi al calendario
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
