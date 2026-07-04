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
        destination: "/corsi/potenziamento-scolastico",
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
