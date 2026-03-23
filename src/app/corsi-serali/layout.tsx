import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corsi Serali Mogliano Veneto – TOLC, Lingue, AI",
  description:
    "Corsi serali a Mogliano Veneto: preparazione TOLC, English Speaking, AI per professionisti. Iscriviti alla waiting list.",
  alternates: { canonical: "https://emergenza.studio/corsi-serali" },
};

export default function CorsiSeraliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
