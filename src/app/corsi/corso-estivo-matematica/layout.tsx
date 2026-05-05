import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso Estivo di Matematica – Preparazione Università | Emergenza Studio",
  description:
    "Corso estivo di potenziamento di matematica per studenti di 4ª e 5ª liceo. Trigonometria, limiti, derivate e integrali: preparati ad Analisi 1. 2 incontri a settimana per 6 settimane a Mogliano Veneto.",
  alternates: { canonical: "https://www.emergenza.studio/corsi/corso-estivo-matematica/" },
};

export default function CorsoEstivoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
