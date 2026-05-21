import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso di Preparazione alle Superiori | Emergenza Studio Mogliano Veneto",
  description:
    "Corso estivo per chi inizia le superiori a settembre. Matematica, italiano e metodo di studio con tutor qualificati a Mogliano Veneto. Iscrizioni aperte.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/preparazione-superiori/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Corso di Preparazione alle Superiori | Emergenza Studio",
    description:
      "Prepara tuo figlio per il primo anno di superiori con il nostro corso estivo. Matematica, italiano e metodo di studio a Mogliano Veneto.",
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
