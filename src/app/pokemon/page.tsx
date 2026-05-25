import type { Metadata, Viewport } from "next";
import PokemonGame from "@/components/pokemon/PokemonGame";

export const metadata: Metadata = {
  title: "Pokémon Smeraldo — RPG | Emergenza Studio",
  description:
    "Un RPG in stile Pokémon Smeraldo giocabile dal browser, ottimizzato per cellulare: esplora la mappa, sfida i Pokémon selvatici nell'erba alta e catturali.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0e2640",
};

export default function PokemonPage() {
  return (
    <>
      {/* Hide site chrome on this immersive game route */}
      <style>{`
        body > header,
        body > footer,
        body > a[href*="wa.me"],
        body > a[href*="whatsapp"] { display: none !important; }
        body > main { padding: 0 !important; }
        html, body { overscroll-behavior: none; }
      `}</style>
      <section className="w-full min-h-[100svh] flex flex-col items-center justify-start py-3 sm:py-8 px-2 sm:px-4 bg-[#0e2640]">
        <div className="text-center mb-2 sm:mb-6">
          <h1 className="text-xl sm:text-4xl font-black text-white tracking-tight">
            Pokémon Smeraldo
          </h1>
          <p className="hidden sm:block text-white/70 text-sm mt-2">
            Tastiera: frecce · Z = A (conferma) · X = B (annulla) · Invio = Menu
          </p>
        </div>
        <PokemonGame />
        <p className="hidden sm:block text-white/40 text-xs mt-4 max-w-xl text-center px-4">
          Mini-RPG omaggio a Pokémon Smeraldo (Game Boy Advance, 2004). Tutti i
          nomi e i marchi citati appartengono ai rispettivi proprietari.
          Fan-game didattico.
        </p>
      </section>
    </>
  );
}
