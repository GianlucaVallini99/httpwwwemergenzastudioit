import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles Next.js natively — no need for static export
  images: {
    unoptimized: false, // Vercel optimizes images automatically
  },
  // Senza root esplicita Next sceglie il package-lock.json della home
  // come workspace root e la build resta appesa a scansionare mezzo disco
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Pagina Chi Siamo nascosta finché non viene rifatta: il sorgente è in
      // src/app/_chi-siamo (cartella privata, non genera route). Redirect
      // temporaneo, così quando torna online i browser non lo hanno in cache.
      {
        source: "/chi-siamo",
        destination: "/#chi-siamo",
        permanent: false,
      },
      // Blog e pagine Materie rimossi a ottobre 2026
      {
        source: "/materie/:path*",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/corsi-serali",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi-serali/",
        destination: "/corsi/",
        permanent: true,
      },
      // Vecchi corsi rimossi a luglio 2026 → nuova sezione corsi
      {
        source: "/corsi/preparazione-classe-successiva/:path*",
        destination: "/corsi/piede-giusto",
        permanent: true,
      },
      {
        source: "/corsi/preparazione-superiori/:path*",
        destination: "/corsi/piede-giusto/dalle-medie-alla-prima-superiore",
        permanent: true,
      },
      {
        source: "/corsi/corso-estivo-matematica/:path*",
        destination: "/corsi",
        permanent: true,
      },
      // Corsi chiusi: Potenziamento Scolastico e English Speaking Club
      // (settembre 2026), Sempre Dritto (ottobre 2026).
      {
        source: "/corsi/potenziamento-scolastico",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi/potenziamento-scolastico/:classe",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi/sempre-dritto/:path*",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi/english-speaking-club/:path*",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi/recupero-debiti/:path*",
        destination: "/corsi",
        permanent: true,
      },
      {
        source: "/corsi/semestre-filtro/:path*",
        destination: "/corsi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
