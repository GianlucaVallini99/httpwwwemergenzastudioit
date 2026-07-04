import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi di Matematica, Fisica e Inglese | Emergenza Studio Mogliano Veneto",
  description:
    "Piede Giusto per iniziare l'anno al meglio, English Speaking Club su tre livelli e Corso di Potenziamento Scolastico annuale di matematica e fisica a Mogliano Veneto. Iscrizioni online aperte.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/" },
};

export default function CorsiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
