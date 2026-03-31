import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.emergenza.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/servizi", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/materie", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/matematica", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/fisica", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/inglese", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/preparazione-test", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/corsi-serali", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/chi-siamo", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contatti", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/blog/come-organizzare-studio-maturita-2026", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/blog/metodo-pomodoro-studio", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/blog/errori-equazioni-secondo-grado", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/blog/tolc-2026-guida-preparazione", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/blog/ripetizioni-individuali-o-gruppo", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/blog/debito-formativo-come-recuperare", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return pages.map((p) => ({
    url: `${BASE}${p.url}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
