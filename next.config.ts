import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles Next.js natively — no need for static export
  images: {
    unoptimized: false, // Vercel optimizes images automatically
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
    ];
  },
};

export default nextConfig;
