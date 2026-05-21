import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso Pre-Superiori di Matematica | Emergenza Studio Mogliano Veneto",
  description:
    "Corso di matematica per chi inizia il liceo scientifico a settembre. 5 settimane, 20 ore, max 5 studenti per gruppo. €250 per l'intero corso. Giugno 2026 a Mogliano Veneto.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/preparazione-superiori/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Corso Pre-Superiori di Matematica | Emergenza Studio",
    description:
      "Corso di matematica per chi inizia il liceo scientifico a settembre. 5 settimane, 20 ore, max 5 studenti per gruppo. Giugno 2026 a Mogliano Veneto.",
    url: "https://www.emergenza.studio/corsi/preparazione-superiori/",
    images: [{ url: "/images/hero_students.jpg" }],
    type: "website",
  },
};

export default function PreparazioneSuperioriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
