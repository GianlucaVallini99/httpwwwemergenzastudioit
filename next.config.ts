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
        destination: "/corsi/sempre-dritto",
        permanent: true,
      },
      // Corsi chiusi a settembre 2026: il Potenziamento Scolastico è stato
      // sostituito da Sempre Dritto (stesse classi, stessi slug), l'English
      // Speaking Club non viene più offerto.
      {
        source: "/corsi/potenziamento-scolastico",
        destination: "/corsi/sempre-dritto",
        permanent: true,
      },
      {
        source: "/corsi/potenziamento-scolastico/:classe",
        destination: "/corsi/sempre-dritto",
        permanent: true,
      },
      // Sempre Dritto non ha più una pagina per anno: l'anno si sceglie nel form
      {
        source: "/corsi/sempre-dritto/:classe",
        destination: "/corsi/sempre-dritto",
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
