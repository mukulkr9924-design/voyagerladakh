import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "soul-of-ladakh").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "soul-of-ladakh") {
    return {
      title: "Soul of Ladakh | Voyager Ladakh",
      description: "Book a soul of Ladakh experience with spiritual monastery journeys and authentic cultural village tours.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh experience with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh spiritual tour", "Ladakh cultural tour", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/soul-of-ladakh/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} experience in Ladakh.`,
      url: `https://voyagerladakh.com/soul-of-ladakh/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function SoulOfLadakhDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "soul-of-ladakh") {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Soul of Ladakh" />;
}
