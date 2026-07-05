import { MetadataRoute } from "next";
import { PIEDE_GIUSTO, ENGLISH_CLUB, POTENZIAMENTO_CLASSI } from "@/lib/corsi-data";

export const dynamic = "force-static";

const BASE = "https://www.emergenza.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/servizi", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/detrazione-lezioni", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/matematica", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/fisica", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/inglese", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/chimica", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/scienze-biologia", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/italiano", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/latino-greco", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/storia-filosofia", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/francese", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/spagnolo", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/materie/tedesco", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/preparazione-test", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/corsi", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/corsi/piede-giusto", priority: 0.9, changeFrequency: "weekly" as const },
    ...PIEDE_GIUSTO.map((c) => ({
      url: `/corsi/piede-giusto/${c.slug}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
    { url: "/corsi/english-speaking-club", priority: 0.9, changeFrequency: "weekly" as const },
    ...ENGLISH_CLUB.map((c) => ({
      url: `/corsi/english-speaking-club/${c.slug}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
    { url: "/corsi/potenziamento-scolastico", priority: 0.9, changeFrequency: "weekly" as const },
    ...POTENZIAMENTO_CLASSI.map((c) => ({
      url: `/corsi/potenziamento-scolastico/${c.slug}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
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
