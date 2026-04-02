import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ripetizioni a Mogliano Veneto | Emergenza Studio",
    template: "%s",
  },
  description:
    "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Tutor qualificati per tutte le materie, dalle medie all'università.",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: { it: `${SITE_URL}/` },
  },
  robots: { index: true, follow: true },
  verification: {
    google: "5P7I7UEiIf2x9G6IFHoxc-BSuAX45pR2BHnH-1_8Qgs",
  },
  other: {
    "theme-color": "#ffffff",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Emergenza Studio",
    title: "Ripetizioni a Mogliano Veneto | Emergenza Studio",
    description:
      "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Tutor qualificati per tutte le materie, dalle medie all'università.",
    images: [`${SITE_URL}/images/hero_students.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="alternate" hrefLang="it" href={`${SITE_URL}/`} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
