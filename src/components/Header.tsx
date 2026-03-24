"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL, PHONE } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo-splash.png"
            alt="Emergenza Studio Centro Ripetizioni Mogliano Veneto"
            className="w-11 h-11 rounded-xl object-cover"
            width={44}
            height={44}
          />
          <span className="font-[var(--font-display)] font-bold text-lg tracking-wide text-primary uppercase hidden sm:inline"
            style={{ fontFamily: "var(--font-display)" }}>
            Emergenza Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wider uppercase text-foreground/70 hover:text-primary transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-secondary/90 transition-colors shadow-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prenota una lezione
          </a>
        </nav>

        {/* Phone (always visible on desktop) */}
        <a
          href={`tel:${PHONE}`}
          className="hidden md:flex lg:hidden items-center gap-2 text-sm font-medium text-primary"
        >
          <Phone className="w-4 h-4" />
          {PHONE}
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Apri menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {open && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="container-custom py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-secondary text-secondary-foreground text-base font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prenota una lezione
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
