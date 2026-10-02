import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import DraftModeTools from "@/components/DraftModeTools";
import SiteChrome from "@/components/SiteChrome";
import { openGraphFor, SITE_NAME } from "@/lib/activities";
import { getSettings } from "@/lib/content";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { defaultTitle, description, keywords } = stegaClean(await getSettings());
  return {
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
    openGraph: openGraphFor("/", defaultTitle, description),
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

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: previewing } = await draftMode();
  return (
    <>
      <SiteChrome>{children}</SiteChrome>
      {previewing && <DraftModeTools />}
    </>
  );
}
