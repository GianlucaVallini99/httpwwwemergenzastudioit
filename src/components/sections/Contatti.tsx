import { MapPin, Phone, Mail } from "lucide-react";
import { WHATSAPP_URL, PHONE_INTL, PHONE, EMAIL, ADDRESS_FULL, ORARI, GEO_LAT, GEO_LNG } from "@/lib/constants";
import { SectionBlobs } from "@/components/Blobs";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_FULL)}`;

export default function Contatti() {
  return (
    <section id="contatti" className="section-spacing">
      <SectionBlobs variant="b" />
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-secondary text-sm font-extrabold tracking-[0.08em] uppercase block mb-3 reveal">Contattaci</span>
          <h2 className="text-[clamp(34px,4.4vw,54px)] reveal d1">Iniziamo. Una chiacchierata, e ti diciamo come muoverci.</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-stretch">
          <div className="bg-card rounded-[32px] p-10 border border-border shadow-[0_30px_60px_-30px_rgba(21,50,79,0.2)] flex flex-col gap-7 reveal">
            <ContactRow icon={MapPin} label="Dove siamo" value={ADDRESS_FULL.split(",")[0]} sub="Mogliano Veneto (TV), 31021 — a 50 m dal Liceo Berto" />
            <ContactRow icon={Phone} label="Telefono" value={PHONE} sub={ORARI} />
            <ContactRow icon={Mail} label="Email" value={EMAIL} sub="Risposta entro 24h" />
            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 bg-secondary text-secondary-foreground font-extrabold shadow-[0_14px_28px_-14px_rgba(29,107,107,0.6)] hover:-translate-y-0.5 transition-transform"
              >
                WhatsApp <span aria-hidden>→</span>
              </a>
              <a
                href={`tel:${PHONE_INTL}`}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 border-2 border-primary text-primary font-extrabold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Chiama ora
              </a>
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apri Emergenza Studio su Google Maps"
            className="group relative block rounded-[32px] overflow-hidden border border-border min-h-[360px] bg-muted hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(21,50,79,0.35)] transition-all reveal d2"
          >
            <div className="absolute inset-0" style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(45,138,138,.18), transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(21,50,79,.12), transparent 50%),
                repeating-linear-gradient(45deg, rgba(21,50,79,.04) 0 1px, transparent 1px 24px),
                repeating-linear-gradient(-45deg, rgba(21,50,79,.04) 0 1px, transparent 1px 24px)
              `,
            }} />
            <span
              className="absolute top-1/2 left-1/2 w-[50px] h-[50px] -translate-x-1/2 -translate-y-full bg-primary"
              style={{ borderRadius: "50% 50% 50% 0", rotate: "-45deg", boxShadow: "0 16px 24px -10px rgba(21,50,79,0.5)" }}
            />
            <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-xs font-extrabold shadow-[0_12px_24px_-10px_rgba(21,50,79,0.45)] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              Apri su Google Maps →
            </span>
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm px-5 py-3.5 rounded-2xl border border-border">
              <div className="font-extrabold text-primary text-[15px]">Emergenza Studio</div>
              <div className="text-muted-foreground text-[13px] mt-0.5">{ADDRESS_FULL}</div>
            </div>
            {/* hidden coords for completeness */}
            <meta itemProp="latitude" content={GEO_LAT} />
            <meta itemProp="longitude" content={GEO_LNG} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon, label, value, sub,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-[52px] h-[52px] rounded-2xl bg-accent/14 text-teal-deep grid place-items-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs font-extrabold text-muted-foreground tracking-[0.06em] uppercase mb-1">{label}</div>
        <div className="text-lg font-extrabold text-primary">{value}</div>
        <div className="text-sm text-muted-foreground font-semibold mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
