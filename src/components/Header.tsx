"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

// Stato attivo solo per la linea Emergenza Futuro (colori verdi del suo
// brand): le altre voci restano com'erano.
const LINEA_FUTURO = "/futuro";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Sulle pagine della linea Futuro anche il logo diventa verde
  const inFuturo = pathname === LINEA_FUTURO || !!pathname?.startsWith(`${LINEA_FUTURO}/`);
  const isFuturo = (href: string) => href === LINEA_FUTURO && inFuturo;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-[0_1px_0_rgba(21,50,79,0.06)] py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={inFuturo ? "/logo-mark-futuro.png" : "/logo-mark.png"}
            alt="Emergenza Studio"
            width={42}
            height={42}
            className={`rounded-full ${
              inFuturo
                ? "shadow-[0_8px_18px_-8px_rgba(0,84,43,0.55)]"
                : "shadow-[0_8px_18px_-8px_rgba(40,74,110,0.55)]"
            }`}
            priority
          />
          <span className={`font-extrabold text-lg tracking-tight hidden sm:inline ${inFuturo ? "text-[#007A3F]" : "text-primary"}`}>
            Emergenza Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isFuturo(link.href) ? "page" : undefined}
              className={`px-3.5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                isFuturo(link.href)
                  ? "text-[#007A3F] hover:bg-[#E0F0E7]"
                  : "text-primary hover:bg-accent/12 hover:text-teal-deep"
              }`}
            >
              {isFuturo(link.href) ? (
                <span className="py-1.5 border-b-2 border-[#007A3F]">{link.label}</span>
              ) : (
                link.label
              )}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-extrabold hover:-translate-y-0.5 transition-transform ${
              inFuturo
                ? "bg-[#007A3F] text-white shadow-[0_14px_28px_-14px_rgba(0,84,43,0.6)]"
                : "bg-primary text-primary-foreground shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)]"
            }`}
          >
            Prenota <span aria-hidden>→</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${inFuturo ? "text-[#007A3F]" : "text-primary"}`}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-custom py-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isFuturo(link.href) ? "page" : undefined}
                className={`py-3 text-lg font-bold ${
                  isFuturo(link.href) ? "text-[#007A3F]" : "text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-extrabold ${
                inFuturo ? "bg-[#007A3F] text-white" : "bg-primary text-primary-foreground"
              }`}
            >
              Prenota una lezione
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
