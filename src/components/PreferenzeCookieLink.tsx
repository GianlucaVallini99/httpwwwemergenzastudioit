"use client";

import { EVENTO_APRI_PREFERENZE } from "@/lib/analytics";

/** Riapre le preferenze cookie (il pannello vive in CookieConsent). */
export default function PreferenzeCookieLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENTO_APRI_PREFERENZE))} className={className}>
      {children}
    </button>
  );
}
