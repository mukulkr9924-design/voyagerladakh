import PlanTripContent from "@/components/PlanTripContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Ladakh Trip - Custom Adventure Itineraries",
  description: "Plan your perfect Ladakh adventure with Voyager Ladakh. Tell us about your travel preferences and we'll create a custom itinerary for trekking, biking, spiritual or cultural journeys.",
  keywords: ["plan Ladakh trip", "custom Ladakh itinerary", "Ladakh travel planning", "personalized Himalaya tour"],
  openGraph: {
    title: "Plan Your Ladakh Trip - Custom Adventure Itineraries",
    description: "Plan your perfect Ladakh adventure with Voyager Ladakh. Tell us about your travel preferences and we'll create a custom itinerary.",
  },
};

export default function PlanYourTripPage() {
  return <PlanTripContent />;
}
