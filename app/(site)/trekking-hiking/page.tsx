import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export function generateMetadata() {
  return activityMetadata("trekking-hiking");
}

export default function Page() {
  return <ActivityListing type="trekking-hiking" />;
}
