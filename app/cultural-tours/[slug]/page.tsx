import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "cultural").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "cultural") {
    return {
      title: "Cultural Tour in Ladakh | Voyager Ladakh",
      description: "Explore Ladakh cultural tours, monastery walks, village traditions, and heritage journeys with Voyager Ladakh.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh cultural journey with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh cultural tour", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/cultural-tours/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} cultural tour in Ladakh.`,
      url: `https://voyagerladakh.com/cultural-tours/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function CulturalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "cultural") {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Cultural & Village Tours" />;
}
