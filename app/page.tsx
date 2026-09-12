import HomeContent from "@/components/HomeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voyager Ladakh - Adventure Travel in Leh, Ladakh",
  description: "Discover Leh-to-Leh journeys through high passes, villages, monasteries and remote trails. Expertly guided trekking, motorbike touring, spiritual journeys and cultural tours in Ladakh.",
  keywords: ["Ladakh travel", "Leh tourism", "trekking Ladakh", "motorbike tours Ladakh", "spiritual journeys India", "cultural tours Ladakh", "adventure travel Himalayas"],
  openGraph: {
    title: "Voyager Ladakh - Adventure Travel in Leh, Ladakh",
    description: "Discover Leh-to-Leh journeys through high passes, villages, monasteries and remote trails.",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
