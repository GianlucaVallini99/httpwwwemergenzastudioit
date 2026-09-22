import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi di Matematica e Fisica | Emergenza Studio Mogliano Veneto",
  description:
    "Sempre Dritto, il corso annuale di matematica in piccoli gruppi da ottobre a maggio, e Piede Giusto, il potenziamento estivo di matematica e fisica, a Mogliano Veneto. In arrivo i corsi di preparazione ai test universitari.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/" },
};

export default function CorsiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
