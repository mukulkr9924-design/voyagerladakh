import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import { getActivity, SITE_URL, tripPath, tripsFor } from "@/lib/activities";
import type { ActivityType } from "@/lib/trips";

export function activityMetadata(type: ActivityType): Metadata {
  const a = getActivity(type);
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: `/${type}` },
    openGraph: { title: a.metaTitle, description: a.metaDescription, url: `/${type}` },
  };
}

export default function ActivityListing({ type }: { type: ActivityType }) {
  const activity = getActivity(type);
  const list = tripsFor(type);

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
      <CtaBand
        title="Don't see the right route?"
        text="Every journey can be tailored to your dates, fitness and group. Tell us what you have in mind."
      />
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
