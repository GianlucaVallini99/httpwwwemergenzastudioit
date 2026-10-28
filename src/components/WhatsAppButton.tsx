import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      data-ga-posizione="pulsante-fisso"
      // Con il banner dei cookie aperto il pulsante sale sopra il banner
      style={{ bottom: "calc(1.5rem + var(--altezza-banner-cookie, 0px))" }}
      className="fixed right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform pulse-whatsapp"
    >
      <MessageCircle className="w-8 h-8" fill="white" />
    </a>
  );
}
