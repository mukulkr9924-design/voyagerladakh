import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import HomeContent from "@/components/HomeContent";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, socialFor } from "@/lib/activities";
import { getHomePage, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const [home, { defaultTitle, description }] = stegaClean(await Promise.all([getHomePage(), getSettings()]));
  return {
    alternates: { canonical: "/" },
    // Share the first slideshow photo rather than the square logo.
    ...socialFor("/", defaultTitle, description, home.heroSlides[0]),
  };
}

export default async function HomePage() {
  const home = await getHomePage();
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
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-IN",
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
