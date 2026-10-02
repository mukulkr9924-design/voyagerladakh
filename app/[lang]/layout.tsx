import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Fraunces, Geist, Heebo } from "next/font/google";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import DraftModeTools from "@/components/DraftModeTools";
import I18nProvider from "@/components/I18nProvider";
import SiteChrome from "@/components/SiteChrome";
import { openGraphFor, SITE_NAME, SITE_URL } from "@/lib/activities";
import { getSettings } from "@/lib/content";
import { dictionaries } from "@/lib/dictionaries";
import { hasLocale, LANGUAGES, LOCALES } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import "../globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

// Geist and Fraunces have no Hebrew letters; these fill in for them. Browsers only download them
// for pages with Hebrew text, so they aren't preloaded.
const hebrewSans = Heebo({
  variable: "--font-hebrew-sans",
  subsets: ["hebrew"],
  preload: false,
});

const hebrewDisplay = Frank_Ruhl_Libre({
  variable: "--font-hebrew-display",
  subsets: ["hebrew"],
  preload: false,
});

// The site's root layout; the Sanity Studio has its own in app/studio. English pages are served here
// too: proxy.ts rewrites /about to /en/about.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { defaultTitle, description, keywords } = stegaClean(await getSettings());
  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/favicon-32.png",
      apple: "/favicon-180.png",
    },
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: false },
    openGraph: openGraphFor(locale, "/", defaultTitle, description),
    // The fallback share image is square; trip pages switch to a large card for their photos.
    twitter: {
      card: "summary",
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
}

export const viewport: Viewport = {
  themeColor: "#18382b",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { isEnabled: previewing } = await draftMode();
  const fonts = [sans, display, hebrewSans, hebrewDisplay].map((f) => f.variable).join(" ");

  return (
    // Browser extensions add attributes to <html> before hydration; ignore those mismatches.
    <html lang={lang} dir={LANGUAGES[lang].dir} className={fonts} suppressHydrationWarning>
      <body>
        <I18nProvider locale={lang} t={dictionaries[lang]}>
          <SiteChrome>{children}</SiteChrome>
          {previewing && <DraftModeTools />}
        </I18nProvider>
      </body>
    </html>
  );
}
