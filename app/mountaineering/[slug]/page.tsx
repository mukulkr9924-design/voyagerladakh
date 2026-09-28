import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tripStaticParams("mountaineering");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("mountaineering", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="mountaineering" params={params} />;
}
