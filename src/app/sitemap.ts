import { MetadataRoute } from "next";
import { PIEDE_GIUSTO } from "@/lib/corsi-data";

export const dynamic = "force-static";

const BASE = "https://www.emergenza.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/servizi", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/detrazione-lezioni", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/preparazione-test", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/corsi", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/corsi/sempre-dritto", priority: 0.9, changeFrequency: "weekly" as const },
    // Piede Giusto è fuori stagione: pagine online ma ferme fino a giugno.
    { url: "/corsi/piede-giusto", priority: 0.7, changeFrequency: "monthly" as const },
    ...PIEDE_GIUSTO.map((c) => ({
      url: `/corsi/piede-giusto/${c.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { url: "/futuro", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contatti", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  return pages.map((p) => {
    const trailingSlash = p.url === "/" ? "" : "/";
    return {
      url: `${BASE}${p.url}${trailingSlash}`,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    };
  });
}
