import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export function generateMetadata() {
  return activityMetadata("mountaineering");
}

export default function Page() {
  return <ActivityListing type="mountaineering" />;
}
