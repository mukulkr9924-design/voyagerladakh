import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TripDetailTemplate from "@/components/TripDetailTemplate";
import { getTripBySlug, trips } from "@/lib/trips";

export function generateStaticParams() {
  return trips.filter((trip) => trip.activityType === "motorbike-touring").map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "motorbike-touring") {
    return {
      title: "Motorbike Tour in Ladakh | Voyager Ladakh",
      description: "Ride through Ladakh mountain roads, high passes and iconic valleys with Voyager Ladakh motorcycle tours.",
    };
  }

  return {
    title: `${trip.title} | Voyager Ladakh`,
    description: `${trip.title} is a ${trip.duration} Ladakh motorbike journey with ${trip.difficulty.toLowerCase()} difficulty, ideal for groups of ${trip.groupSize}.`,
    keywords: [trip.title, "Ladakh motorbike tour", "Voyager Ladakh", trip.activityType],
    alternates: { canonical: `https://voyagerladakh.com/motorbike-touring/${trip.slug}` },
    openGraph: {
      title: `${trip.title} | Voyager Ladakh`,
      description: `${trip.title} - ${trip.duration} ${trip.difficulty} motorbike tour in Ladakh.`,
      url: `https://voyagerladakh.com/motorbike-touring/${trip.slug}`,
      images: trip.images?.[0] ? [{ url: trip.images[0] }] : undefined,
    },
  };
}

export default async function MotorbikeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip || trip.activityType !== "motorbike-touring") {
    redirect("/coming-soon");
  }

  return <TripDetailTemplate trip={trip} activityName="Motorbike Touring" />;
}
