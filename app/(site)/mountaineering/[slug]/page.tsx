import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

// Trips added in the Studio after a deploy are rendered on their first visit.
export function generateStaticParams() {
  return tripStaticParams("mountaineering");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("mountaineering", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="mountaineering" params={params} />;
}
