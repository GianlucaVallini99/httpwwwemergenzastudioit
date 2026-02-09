import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-14">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
              <span className="font-display font-bold text-sm">ES</span>
            </div>
            <span className="font-display font-bold">Emergenza Studio</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Centro studi e ripetizioni a Mogliano Veneto (TV). Dalla scuola primaria all'università.
          </p>
        </div>

        {/* Servizi */}
        <div>
          <h4 className="font-display font-semibold mb-4">Servizi</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Elementari</li>
            <li>Medie</li>
            <li>Superiori</li>
            <li>Preparazione TOLC</li>
            <li>Esami Universitari</li>
          </ul>
        </div>

        {/* Contatti */}
        <div>
          <h4 className="font-display font-semibold mb-4">Contatti</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Tel: 340 510 6467</li>
            <li>Mogliano Veneto (TV)</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display font-semibold mb-4">Social</h4>
          <a
            href="https://www.instagram.com/emergenza_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
          >
            <Instagram className="w-5 h-5" />
            @emergenza_studio
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
        <p>© 2025 Emergenza Studio. Tutti i diritti riservati.</p>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>P.IVA [inserire]</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
