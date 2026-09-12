import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "trekking").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Trekking in Ladakh | Voyager Ladakh",
      description: "Discover Ladakh treks, high passes and Himalayan hiking routes planned by Voyager Ladakh.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh trek with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh trekking", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/trekking-hiking/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} trekking in Ladakh.`,
      url: `https://voyagerladakh.com/trekking-hiking/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function TrekkingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Trekking & Hiking" />;
}
