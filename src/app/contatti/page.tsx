import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import {
  SITE_URL, WHATSAPP_URL, PHONE, EMAIL,
  ADDRESS_FULL, ORARI, INSTAGRAM_URL, FACEBOOK_URL,
} from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Phone as PhoneIcon, Mail, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contatti | Emergenza Studio - Via Barbiero 84g, Mogliano Veneto",
  description:
    "Contatta Emergenza Studio per prenotare una lezione di prova. WhatsApp: 340 510 6467. Via Francesco Barbiero 84g, Mogliano Veneto (TV).",
  alternates: { canonical: `${SITE_URL}/contatti` },
};

const breadcrumbs = [{ label: "Contatti", href: "/contatti" }];

export default function ContattiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Contatti", href: "/contatti" },
          ])),
        }}
      />
      <Breadcrumb items={breadcrumbs} />

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Contatti e Dove Siamo – Emergenza Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
            Hai bisogno di ripetizioni per tuo figlio? Vuoi informazioni sui nostri servizi o sui corsi serali? Contattaci: ti rispondiamo il prima possibile.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left column */}
            <div>
              {/* WhatsApp CTA */}
              <div className="rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 p-8 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>Scrivici su WhatsApp</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Il modo più rapido per contattarci. Scrivici e ti risponderemo in giornata con tutte le informazioni di cui hai bisogno.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-[#25D366] text-white font-semibold uppercase tracking-wider text-base hover:bg-[#25D366]/90 transition-colors shadow-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Apri WhatsApp
                </a>
              </div>

              {/* Other contacts */}
              <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Altre modalità di contatto</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Telefono</span>
                    <br />
                    <a href={`tel:${PHONE}`} className="text-muted-foreground hover:text-primary transition-colors">{PHONE}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Email</span>
                    <br />
                    <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">{EMAIL}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <InstagramIcon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Instagram</span>
                    <br />
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@emergenza_studio</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FacebookIcon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Facebook</span>
                    <br />
                    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
                  </div>
                </li>
              </ul>

              {/* Location and hours */}
              <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Dove siamo</h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{ADDRESS_FULL}</p>
                  <p className="text-sm text-muted-foreground">A 50 metri dal Liceo Classico G. Berto e dalla scuola media.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary mb-4 mt-8" style={{ fontFamily: "var(--font-display)" }}>Orari</h2>
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-foreground">{ORARI}</p>
                  <p className="text-sm text-muted-foreground mt-2">Non riesci a venire negli orari indicati? Scrivici: possiamo trovare una soluzione.</p>
                </div>
              </div>
            </div>

            {/* Right column — Map */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-border aspect-square lg:aspect-auto lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.0!2d12.2364!3d45.5611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMzJzQwLjAiTiAxMsKwMTQnMTEuMCJF!5e0!3m2!1sit!2sit!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Emergenza Studio Mogliano Veneto"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prenota una lezione
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
