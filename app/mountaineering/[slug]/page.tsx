import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "mountaineering").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Mountaineering in Ladakh | Voyager Ladakh",
      description: "Discover Himalayan climbing expeditions in Ladakh with expert support and altitude-safe planning.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh mountaineering expedition with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh mountaineering", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/mountaineering/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} climbing in Ladakh.`,
      url: `https://voyagerladakh.com/mountaineering/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function MountaineeringDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Mountaineering" />;
}
