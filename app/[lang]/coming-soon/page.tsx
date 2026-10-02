import type { Metadata } from "next";
import ComingSoonContent from "@/components/ComingSoonContent";
import { getI18n } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: t.comingSoon.metaTitle,
    description: t.comingSoon.metaDescription,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
