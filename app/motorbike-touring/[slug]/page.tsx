import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tripStaticParams("motorbike-touring");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("motorbike-touring", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="motorbike-touring" params={params} />;
}
