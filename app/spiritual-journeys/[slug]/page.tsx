import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "spiritual").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "spiritual") {
    return {
      title: "Spiritual Journey in Ladakh | Voyager Ladakh",
      description: "Book a spiritual journey in Ladakh with monastery visits, meditation routes, and quiet Himalayan retreat experiences.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh spiritual journey with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh spiritual tour", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/spiritual-journeys/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} spiritual journey in Ladakh.`,
      url: `https://voyagerladakh.com/spiritual-journeys/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function SpiritualDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "spiritual") {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Spiritual Journeys" />;
}
