import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { SITE_URL } from "@/lib/activities";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

// Shared by the website (app/(site)) and the Sanity Studio (app/studio). Site styles, header and
// footer live in app/(site)/layout.tsx so they don't leak into the Studio.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon-32.png",
    apple: "/favicon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#18382b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions add attributes to <html> before hydration; ignore those mismatches.
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
