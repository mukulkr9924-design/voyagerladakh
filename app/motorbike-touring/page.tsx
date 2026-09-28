import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export const metadata = activityMetadata("motorbike-touring");

export default function Page() {
  return <ActivityListing type="motorbike-touring" />;
}
