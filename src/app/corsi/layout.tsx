import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi di Matematica e Fisica | Emergenza Studio Mogliano Veneto",
  description:
    "Piede Giusto, il potenziamento estivo di matematica e fisica in piccoli gruppi a Mogliano Veneto. In arrivo i corsi di preparazione ai test universitari.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/" },
};

export default function CorsiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
