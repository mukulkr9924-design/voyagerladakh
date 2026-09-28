import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StructuredData from "@/components/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/activities";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const description =
  "Leh-based team planning guided treks, 6,000 m mountaineering expeditions, motorbike tours and cultural journeys across Ladakh — Markha Valley, Kang Yatse, Nubra, Pangong and more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voyager Ladakh – Treks, Expeditions & Tours from Leh",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: ["Ladakh travel", "Leh tour operator", "Ladakh trekking", "Ladakh mountaineering", "Ladakh bike trip", "Ladakh cultural tours"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  openGraph: {
    siteName: SITE_NAME,
    title: "Voyager Ladakh – Treks, Expeditions & Tours from Leh",
    description,
    url: "/",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#18382b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <StructuredData />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
