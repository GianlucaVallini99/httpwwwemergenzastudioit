import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PreferenzeCookieLink from "@/components/PreferenzeCookieLink";
import { ADDRESS_FULL, ADDRESS_CAP, EMAIL, PHONE, PIVA, SITE_URL, GA4_MEASUREMENT_ID } from "@/lib/constants";
import { CONSENSO_COOKIE, CONSENSO_DURATA_GIORNI } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Cookie policy | Emergenza Studio",
  description: "Quali cookie usa il sito di Emergenza Studio: solo cookie tecnici e, con il tuo consenso, Google Analytics 4 per statistiche aggregate.",
  alternates: { canonical: `${SITE_URL}/cookie-policy/` },
  robots: { index: true, follow: true },
};

const AGGIORNATA = "28 ottobre 2026";
const GA_SUFFISSO = GA4_MEASUREMENT_ID.replace(/^G-/, "");

const th = "px-3 py-2 text-left text-xs font-extrabold uppercase tracking-[0.06em] text-primary";
const td = "px-3 py-2 align-top text-sm text-muted-foreground";

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Cookie policy", href: "/cookie-policy" }]} />
      <section className="pt-8 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="text-[clamp(32px,4vw,48px)] mb-3">Cookie policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Aggiornata il {AGGIORNATA}.</p>

          <div className="space-y-10 [&_h2]:text-2xl [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:mb-3 [&_li]:text-muted-foreground">
            <div>
              <h2>In breve</h2>
              <p>
                Il sito usa solo cookie tecnici, che servono a farlo funzionare. Solo se accetti usa anche Google Analytics 4 per
                contare le visite in forma aggregata. Niente cookie pubblicitari o di profilazione. Puoi cambiare scelta quando
                vuoi: <PreferenzeCookieLink className="font-bold text-secondary underline underline-offset-2">apri le preferenze cookie</PreferenzeCookieLink>.
              </p>
            </div>

            <div>
              <h2>Chi è il titolare</h2>
              <p>
                Emergenza Studio, {ADDRESS_FULL.replace("Mogliano Veneto", `${ADDRESS_CAP} Mogliano Veneto`)} · {PIVA}
                <br />
                Email{" "}
                <a href={`mailto:${EMAIL}`} className="font-bold text-secondary underline underline-offset-2 break-all">
                  {EMAIL}
                </a>{" "}
                · Telefono {PHONE}
              </p>
            </div>

            <div>
              <h2>Cosa sono i cookie</h2>
              <p>
                Sono piccoli file che il sito salva nel browser. Quelli tecnici servono al funzionamento e non richiedono il
                consenso; gli altri (statistici, di profilazione) si usano solo se li accetti, come previsto dalle linee guida
                del Garante per la protezione dei dati personali del 10 giugno 2021.
              </p>
            </div>

            <div>
              <h2>Cookie tecnici (sempre attivi)</h2>
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full min-w-[520px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className={th}>Nome</th>
                      <th className={th}>A cosa serve</th>
                      <th className={th}>Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className={`${td} font-bold text-primary`}>{CONSENSO_COOKIE}</td>
                      <td className={td}>Ricorda la tua scelta sui cookie, così il banner non ricompare a ogni pagina.</td>
                      <td className={td}>{Math.round(CONSENSO_DURATA_GIORNI / 30)} mesi</td>
                    </tr>
                    <tr>
                      <td className={`${td} font-bold text-primary`}>splashShown</td>
                      <td className={td}>
                        Memoria di sessione del browser (non è un cookie): evita di mostrare di nuovo l&apos;animazione
                        d&apos;apertura.
                      </td>
                      <td className={td}>Fino alla chiusura della scheda</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2>Cookie statistici (solo con il tuo consenso)</h2>
              <p>
                Con il consenso usiamo <strong>Google Analytics 4</strong>, di Google Ireland Limited (Gordon House, Barrow
                Street, Dublino 4, Irlanda), per sapere quante persone visitano il sito, quali pagine leggono, da dove arrivano
                (anche dai QR dei nostri volantini) e quante scrivono su WhatsApp, chiamano o inviano un modulo. Dei moduli
                registriamo solo che sono stati inviati, mai i dati che scrivi.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-border bg-card mb-3">
                <table className="w-full min-w-[520px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className={th}>Nome</th>
                      <th className={th}>A cosa serve</th>
                      <th className={th}>Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className={`${td} font-bold text-primary`}>_ga</td>
                      <td className={td}>Distingue i visitatori in modo anonimo per contarli una volta sola.</td>
                      <td className={td}>13 mesi</td>
                    </tr>
                    <tr>
                      <td className={`${td} font-bold text-primary`}>_ga_{GA_SUFFISSO}</td>
                      <td className={td}>Tiene insieme le pagine viste nella stessa visita.</td>
                      <td className={td}>13 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li>Prima della tua scelta il sito non carica Google Analytics e non invia nulla a Google (Consent Mode v2).</li>
                <li>Google Analytics 4 non registra né conserva gli indirizzi IP.</li>
                <li>Segnali Google e personalizzazione degli annunci sono disattivati: i dati non servono per la pubblicità.</li>
                <li>I dati dettagliati degli eventi restano in Google Analytics per 2 mesi; dopo restano solo i totali.</li>
                <li>
                  Google può trattare i dati anche negli Stati Uniti: Google LLC aderisce all&apos;EU-U.S. Data Privacy
                  Framework, riconosciuto adeguato dalla Commissione europea il 10 luglio 2023.
                </li>
              </ul>
              <p>
                Come Google tratta i dati:{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-secondary underline underline-offset-2"
                >
                  policies.google.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2>Contenuti e siti di terze parti</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  La mappa di Google Maps nella pagina Contatti si carica solo se premi «Mostra la mappa»: da quel momento Google
                  può impostare i suoi cookie.
                </li>
                <li>
                  I link a WhatsApp, Instagram, Facebook e ai moduli Google portano sui loro siti: lì valgono le loro informative
                  sui cookie.
                </li>
              </ul>
            </div>

            <div>
              <h2>Come cambiare idea</h2>
              <p>
                In fondo a ogni pagina c&apos;è il link «Preferenze cookie»: puoi accettare o revocare il consenso in qualsiasi
                momento. Se lo revochi, cancelliamo i cookie di Google Analytics dal tuo browser. Dopo 6 mesi ti chiediamo di
                nuovo. Puoi anche bloccare o cancellare i cookie dalle impostazioni del browser.
              </p>
              <p>
                <PreferenzeCookieLink className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary px-6 py-2.5 font-extrabold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  Preferenze cookie
                </PreferenzeCookieLink>
              </p>
            </div>

            <div>
              <h2>I tuoi diritti</h2>
              <p>
                Puoi chiedere di accedere ai tuoi dati, correggerli, cancellarli, limitarne l&apos;uso od opporti, scrivendo a{" "}
                <a href={`mailto:${EMAIL}`} className="font-bold text-secondary underline underline-offset-2 break-all">
                  {EMAIL}
                </a>
                . Puoi anche presentare reclamo al Garante per la protezione dei dati personali (
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="font-bold text-secondary underline underline-offset-2">
                  garanteprivacy.it
                </a>
                ).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
