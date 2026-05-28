import { WHATSAPP_URL } from "@/lib/constants";
import { SectionBlobs } from "@/components/Blobs";

export default function CtaBand() {
  return (
    <section className="relative py-14">
      <SectionBlobs variant="b" />
      <div className="container-custom">
        <div className="relative bg-primary text-white rounded-[32px] p-12 md:p-14 overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-8 reveal">
          <div
            className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(45,138,138,.45), transparent 60%)" }}
          />
          <div className="relative z-10">
            <h2 className="text-[clamp(28px,3.8vw,44px)] text-white">Pronto a iniziare?</h2>
            <p className="text-white/75 mt-2.5 text-lg max-w-xl">
              Scrivici o passa al centro: ti raccontiamo come possiamo aiutarti
              e troviamo insieme tutor, orario e materia.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 bg-secondary text-secondary-foreground font-extrabold shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-transform whitespace-nowrap"
          >
            Scrivici su WhatsApp <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
