import SoulOfLadakhContent from "@/components/SoulOfLadakhContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soul of Ladakh - Spiritual Journeys & Cultural Village Tours",
  description: "Experience the soul of Ladakh through spiritual monastery retreats, meditation journeys, and authentic cultural village tours with homestays and traditional craft workshops.",
  keywords: ["Ladakh spiritual retreat", "monastery tours Ladakh", "cultural tours Ladakh", "village homestay Ladakh", "Ladakhi crafts", "spiritual journey India"],
  openGraph: {
    title: "Soul of Ladakh - Spiritual Journeys & Cultural Village Tours",
    description: "Experience the soul of Ladakh through spiritual monastery retreats and authentic cultural village tours.",
  },
};

export default function SoulOfLadakhPage() {
  return <SoulOfLadakhContent />;
}
