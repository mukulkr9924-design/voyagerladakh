import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import { absoluteUrl, pageMeta, tripPath } from "@/lib/activities";
import { getActivity, getSettings, tripsFor } from "@/lib/content";
import { format, localePath, plural } from "@/lib/i18n";
import { getI18n, getLocale } from "@/lib/locale";
import type { ActivityType } from "@/lib/trips";

export async function activityMetadata(type: ActivityType): Promise<Metadata> {
  const [locale, a, list] = stegaClean(await Promise.all([getLocale(), getActivity(type), tripsFor(type)]));
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    ...pageMeta(locale, `/${type}`, a.metaTitle, a.metaDescription, list[0]?.heroImage),
  };
}

export default async function ActivityListing({ type }: { type: ActivityType }) {
  const [activity, list, settings, { locale, t }] = await Promise.all([getActivity(type), tripsFor(type), getSettings(), getI18n()]);

  return (
    <>
      <PageHeader
        kicker={plural(locale, list.length, t.home.journeys)}
        title={activity.heading}
        intro={activity.intro}
        crumbs={[{ name: activity.name, href: `/${type}` }]}
      />
      <section className="section section-flush-top" aria-label={format(t.listing.journeys, { name: activity.name })}>
        <div className="trip-grid">
          {list.map((trip) => <TripCard key={trip.id} trip={trip} headingLevel="h2" />)}
        </div>
      </section>
      <CtaBand title={settings.listingCtaTitle} text={settings.listingCtaText} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: activity.heading,
          itemListElement: list.map((trip, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(localePath(locale, tripPath(trip))),
            name: trip.title,
          })),
        }}
      />
    </>
  );
}
