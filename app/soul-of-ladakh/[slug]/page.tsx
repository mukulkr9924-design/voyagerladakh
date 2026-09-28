import TripDetail, { tripMetadata, tripStaticParams } from "@/components/TripDetail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tripStaticParams("soul-of-ladakh");
}

export function generateMetadata({ params }: Props) {
  return tripMetadata("soul-of-ladakh", params);
}

export default function Page({ params }: Props) {
  return <TripDetail type="soul-of-ladakh" params={params} />;
}
