import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Ripetizioni a Mogliano Veneto | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Ripetizioni individuali e di gruppo per medie, superiori e università. Pacchetti multi-materia flessibili, fatturazione detraibile al 19%.",
  alternates: {
    canonical: SITE_URL,
    languages: { it: SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Ripetizioni a Mogliano Veneto | ${SITE_NAME}`,
    description:
      "Centro ripetizioni a Mogliano Veneto, a 50 metri dal Liceo Berto. Ripetizioni individuali e di gruppo, tutor qualificati, pacchetti multi-materia flessibili.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <SplashScreen />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
