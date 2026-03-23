import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles Next.js natively — no need for static export
  images: {
    unoptimized: false, // Vercel optimizes images automatically
  },
};

export default nextConfig;
