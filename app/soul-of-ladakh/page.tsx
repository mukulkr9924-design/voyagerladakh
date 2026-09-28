import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export const metadata = activityMetadata("soul-of-ladakh");

export default function Page() {
  return <ActivityListing type="soul-of-ladakh" />;
}
