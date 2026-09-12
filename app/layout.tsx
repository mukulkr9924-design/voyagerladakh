import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voyager Ladakh - Adventure Travel in Leh, Ladakh",
  description: "Discover Leh-to-Leh journeys through high passes, villages, monasteries and remote trails. Expertly guided trekking, motorbike touring, spiritual journeys and cultural tours in Ladakh.",
  keywords: ["Ladakh travel", "Leh tourism", "trekking Ladakh", "motorbike tours Ladakh", "spiritual journeys India", "cultural tours Ladakh", "adventure travel Himalayas"],
  authors: [{ name: "Voyager Ladakh" }],
  creator: "Voyager Ladakh",
  publisher: "Voyager Ladakh",
  metadataBase: new URL("https://voyagerladakh.com"),
  openGraph: {
    title: "Voyager Ladakh - Adventure Travel in Leh, Ladakh",
    description: "Discover Leh-to-Leh journeys through high passes, villages, monasteries and remote trails. Expertly guided trekking, motorbike touring, spiritual journeys and cultural tours in Ladakh.",
    url: "https://voyagerladakh.com",
    siteName: "Voyager Ladakh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyager Ladakh - Adventure Travel in Leh, Ladakh",
    description: "Discover Leh-to-Leh journeys through high passes, villages, monasteries and remote trails.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning> 
      <body>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
