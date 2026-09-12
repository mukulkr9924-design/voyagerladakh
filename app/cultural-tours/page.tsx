import CulturalContent from "@/components/CulturalContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cultural & Village Tours in Ladakh - Authentic Local Experiences",
  description: "Experience authentic Ladakhi culture with village homestays, craft workshops, monastery visits, and traditional festivals. Connect with local communities.",
  keywords: ["Ladakh cultural tours", "village homestay Ladakh", "Ladakhi crafts", "traditional villages Ladakh", "cultural immersion India"],
  openGraph: {
    title: "Cultural & Village Tours in Ladakh - Authentic Local Experiences",
    description: "Experience authentic Ladakhi culture with village homestays, craft workshops, and monastery visits.",
  },
};

export default function CulturalToursPage() {
  return <CulturalContent />;
}
