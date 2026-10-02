import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export function generateMetadata() {
  return activityMetadata("soul-of-ladakh");
}

export default function Page() {
  return <ActivityListing type="soul-of-ladakh" />;
}
