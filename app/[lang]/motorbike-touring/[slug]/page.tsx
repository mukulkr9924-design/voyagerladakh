import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

// Trips added in the Studio after a deploy are rendered on their first visit.
export function generateStaticParams() {
  return tripStaticParams("motorbike-touring");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("motorbike-touring", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="motorbike-touring" params={params} />;
}
