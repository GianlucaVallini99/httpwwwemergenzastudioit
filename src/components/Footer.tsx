import Link from "next/link";
import Image from "next/image";
import {
  ADDRESS_FULL, PHONE, PHONE_INTL, EMAIL, PIVA, NAV_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70 pt-16 pb-9 text-sm">
      <div className="container-custom grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-3 text-white">
            <Image src="/logo-mark.png" alt="Emergenza Studio" width={38} height={38} className="rounded-full" />
            <span className="font-extrabold text-base">Emergenza Studio</span>
          </Link>
          <p className="max-w-sm text-white/65">
            Centro ripetizioni a Mogliano Veneto. Tutor qualificati per tutte
            le materie, dalle medie all&apos;università.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs tracking-[0.08em] uppercase mb-4 font-extrabold">Sito</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs tracking-[0.08em] uppercase mb-4 font-extrabold">Contatti</h4>
          <ul className="space-y-2">
            <li><a href={`tel:${PHONE_INTL}`} className="hover:text-white">{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-white break-all">{EMAIL}</a></li>
            <li className="text-white/60">{ADDRESS_FULL}</li>
            <li className="text-white/50 text-xs mt-3">{PIVA}</li>
          </ul>
        </div>
      </div>
      <div className="container-custom mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Emergenza Studio · Tutti i diritti riservati
      </div>
    </footer>
  );
}
