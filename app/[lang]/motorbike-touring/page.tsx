import ActivityListing, { activityMetadata } from "@/components/ActivityListing";

export function generateMetadata() {
  return activityMetadata("motorbike-touring");
}

export default function Page() {
  return <ActivityListing type="motorbike-touring" />;
}
