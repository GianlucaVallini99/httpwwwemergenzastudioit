import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import {
  NAV_LINKS, PHONE, EMAIL, ADDRESS_FULL,
  ORARI, PIVA, INSTAGRAM_URL, FACEBOOK_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpg"
                alt="Emergenza Studio"
                className="w-10 h-10 rounded-xl object-cover"
                width={40}
                height={40}
              />
              <span
                className="font-bold text-lg tracking-wide uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Emergenza Studio
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Centro studi e ripetizioni a Mogliano Veneto (TV). Dalle medie
              all&apos;università.
            </p>
          </div>

          {/* Pagine */}
          <div>
            <h4
              className="font-semibold text-sm tracking-widest mb-5 uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pagine
            </h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/preparazione-test"
                  className="hover:text-accent transition-colors"
                >
                  Preparazione Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4
              className="font-semibold text-sm tracking-widest mb-5 uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contatti
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-accent transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-accent transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{ADDRESS_FULL}</span>
              </li>
              <li className="text-primary-foreground/40">{ORARI}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-semibold text-sm tracking-widest mb-5 uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Social
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
                @emergenza_studio
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Emergenza Studio. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary-foreground/60 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>{PIVA}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
