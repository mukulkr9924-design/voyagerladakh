import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import HomeContent from "@/components/HomeContent";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, pageMeta, SITE_NAME, SITE_URL } from "@/lib/activities";
import { getHomePage, getSettings } from "@/lib/content";
import { LANGUAGES, localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, home, { defaultTitle, description }] = stegaClean(await Promise.all([getLocale(), getHomePage(), getSettings()]));
  // Share the first slideshow photo rather than the square logo.
  return pageMeta(locale, "/", defaultTitle, description, home.heroSlides[0]);
}

export default async function HomePage() {
  const [locale, home] = await Promise.all([getLocale(), getHomePage()]);
  return (
    <>
      <HomeContent home={home} />
      {/* Lets Google show the brand name, rather than the domain, above results. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: absoluteUrl(localePath(locale, "/")),
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: LANGUAGES[locale].tag,
        }}
      />
      {home.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: home.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </>
  );
}
