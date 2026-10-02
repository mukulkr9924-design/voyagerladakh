import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import { SITE_URL, socialFor, tripPath } from "@/lib/activities";
import { getActivity, getSettings, tripsFor } from "@/lib/content";
import type { ActivityType } from "@/lib/trips";

export async function activityMetadata(type: ActivityType): Promise<Metadata> {
  const [a, list] = stegaClean(await Promise.all([getActivity(type), tripsFor(type)]));
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: `/${type}` },
    ...socialFor(`/${type}`, a.metaTitle, a.metaDescription, list[0]?.heroImage),
  };
}

export default async function ActivityListing({ type }: { type: ActivityType }) {
  const [activity, list, settings] = await Promise.all([getActivity(type), tripsFor(type), getSettings()]);

  return (
    <>
      <PageHeader
        kicker={`${list.length} journeys`}
        title={activity.heading}
        intro={activity.intro}
        crumbs={[{ name: activity.name, href: `/${type}` }]}
      />
      <section className="section section-flush-top" aria-label={`${activity.name} journeys`}>
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
          itemListElement: list.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${tripPath(t)}`,
            name: t.title,
          })),
        }}
      />
    </>
  );
}
