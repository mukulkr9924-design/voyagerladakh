import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

// Trips added in the Studio after a deploy are rendered on their first visit.
export function generateStaticParams() {
  return tripStaticParams("soul-of-ladakh");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("soul-of-ladakh", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="soul-of-ladakh" params={params} />;
}
