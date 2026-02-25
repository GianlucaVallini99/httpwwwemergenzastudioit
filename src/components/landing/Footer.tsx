import { Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-16">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Emergenza Studio" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-display font-bold text-lg tracking-wide">EMERGENZA STUDIO</span>
          </div>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Centro studi e ripetizioni a Mogliano Veneto (TV). Dalla scuola primaria all'università.
          </p>
        </div>

        {/* Servizi */}
        <div>
          <h4 className="font-display font-semibold text-sm tracking-widest mb-5">Servizi</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/60">
            <li>Elementari</li>
            <li>Medie</li>
            <li>Superiori</li>
            <li>Preparazione TOLC</li>
            <li>Esami Universitari</li>
          </ul>
        </div>

        {/* Contatti */}
        <div>
          <h4 className="font-display font-semibold text-sm tracking-widest mb-5">Contatti</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/60">
            <li>Tel: 340 510 6467</li>
            <li>Via Barbiero 84, Mogliano Veneto (TV)</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display font-semibold text-sm tracking-widest mb-5">Social</h4>
          <a
            href="https://www.instagram.com/emergenza_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-accent transition-colors"
          >
            <Instagram className="w-5 h-5" />
            @emergenza_studio
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
        <p>© 2025 Emergenza Studio. Tutti i diritti riservati.</p>
        <div className="flex gap-6">
          <span className="hover:text-primary-foreground/60 transition-colors cursor-pointer">Privacy Policy</span>
          <span>P.IVA [inserire]</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
