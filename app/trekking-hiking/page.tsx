import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export const metadata = activityMetadata("trekking-hiking");

export default function Page() {
  return <ActivityListing type="trekking-hiking" />;
}
