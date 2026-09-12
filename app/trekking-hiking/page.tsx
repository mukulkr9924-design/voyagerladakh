import TrekkingContent from "@/components/TrekkingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trekking & Hiking Tours in Ladakh - High Pass Adventures",
  description: "Explore Ladakh's best trekking routes including Markha Valley, Zanskar High Trail, and Pangong treks. Expert guides, sustainable planning, and authentic mountain experiences.",
  keywords: ["Ladakh trekking", "Markha Valley trek", "Zanskar trek", "Pangong trek", "high altitude trekking India"],
  openGraph: {
    title: "Trekking & Hiking Tours in Ladakh - High Pass Adventures",
    description: "Explore Ladakh's best trekking routes including Markha Valley, Zanskar High Trail, and Pangong treks.",
  },
};

export default function TrekkingPage() {
  return <TrekkingContent />;
}
