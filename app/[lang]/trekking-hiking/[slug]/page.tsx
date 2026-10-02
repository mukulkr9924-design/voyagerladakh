import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

// Trips added in the Studio after a deploy are rendered on their first visit.
export function generateStaticParams() {
  return tripStaticParams("trekking-hiking");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("trekking-hiking", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="trekking-hiking" params={params} />;
}
