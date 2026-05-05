import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi e Preparazione Universitaria | Emergenza Studio Mogliano Veneto",
  description:
    "Corsi di preparazione universitaria, TOLC, semestre filtro, corso estivo di matematica e inglese a Mogliano Veneto. Scopri l'offerta formativa di Emergenza Studio.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/" },
};

export default function CorsiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
