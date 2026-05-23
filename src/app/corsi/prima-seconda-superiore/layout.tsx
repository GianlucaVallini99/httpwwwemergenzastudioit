import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso Passaggio Prima-Seconda Superiore di Matematica | Emergenza Studio Mogliano Veneto",
  description:
    "Corso estivo di matematica per chi ha concluso la prima superiore. 5 settimane, 20 ore, max 5 studenti per gruppo. €250 per l'intero corso. Giugno 2026 a Mogliano Veneto.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/prima-seconda-superiore/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Corso Passaggio Prima-Seconda Superiore di Matematica | Emergenza Studio",
    description:
      "Corso estivo di matematica per chi ha concluso la prima superiore. 5 settimane, 20 ore, max 5 studenti per gruppo. Giugno 2026 a Mogliano Veneto.",
    url: "https://www.emergenza.studio/corsi/prima-seconda-superiore/",
    images: [{ url: "/images/hero_students.jpg" }],
    type: "website",
  },
};

export default function PrimaSecondaSuperioreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
