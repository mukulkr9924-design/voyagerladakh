import SpiritualContent from "@/components/SpiritualContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Journeys in Ladakh - Monastery Retreats & Meditation",
  description: "Embark on spiritual journeys in Ladakh with monastery visits, prayer walks, meditation retreats, and pilgrimages through the high Himalayas.",
  keywords: ["Ladakh spiritual retreat", "monastery tours Ladakh", "meditation retreat Himalayas", "Buddhist pilgrimage India", "spiritual journey Ladakh"],
  openGraph: {
    title: "Spiritual Journeys in Ladakh - Monastery Retreats & Meditation",
    description: "Embark on spiritual journeys in Ladakh with monastery visits, prayer walks, and meditation retreats.",
  },
};

export default function SpiritualPage() {
  return <SpiritualContent />;
}
