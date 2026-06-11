import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi e Preparazione Universitaria | Emergenza Studio Mogliano Veneto",
  description:
    "Recupero debiti estivo, preparazione alla classe successiva, semestre filtro di Medicina, corso estivo di matematica e English Speaking Club a Mogliano Veneto. Iscrizioni aperte.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/" },
};

export default function CorsiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
