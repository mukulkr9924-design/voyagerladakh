import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export const metadata = activityMetadata("mountaineering");

export default function Page() {
  return <ActivityListing type="mountaineering" />;
}
