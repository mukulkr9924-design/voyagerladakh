import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tripStaticParams("trekking-hiking");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("trekking-hiking", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="trekking-hiking" params={params} />;
}
