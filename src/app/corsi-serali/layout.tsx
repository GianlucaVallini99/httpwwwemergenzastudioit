import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi Serali e Preparazione TOLC | Emergenza Studio Mogliano Veneto",
  description:
    "Corsi serali, preparazione TOLC, semestre filtro universitario e corsi di inglese a Mogliano Veneto. Prossimamente disponibili.",
  alternates: { canonical: "https://www.emergenza.studio/corsi-serali" },
};

export default function CorsiSeraliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
