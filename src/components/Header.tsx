"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            src="/logo-mark.png"
            alt="Emergenza Studio"
            width={42}
            height={42}
            className="rounded-full shadow-[0_8px_18px_-8px_rgba(40,74,110,0.55)]"
            priority
          />
          <span className="font-extrabold text-lg tracking-tight text-primary hidden sm:inline">
            Emergenza Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2.5 rounded-full text-sm font-bold text-primary hover:bg-accent/12 hover:text-teal-deep transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 bg-primary text-primary-foreground text-sm font-extrabold shadow-[0_14px_28px_-14px_rgba(21,50,79,0.6)] hover:-translate-y-0.5 transition-transform"
          >
            Prenota <span aria-hidden>→</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-primary"
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
                className="py-3 text-lg font-bold text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-primary text-primary-foreground text-base font-extrabold"
            >
              Prenota una lezione
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
