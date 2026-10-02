import type { Metadata } from "next";
import { SITE_URL } from "@/lib/activities";

// The Studio's root layout, kept apart from the site's (app/[lang]/layout.tsx) so site styles,
// header and footer don't leak into it.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon-32.png",
    apple: "/favicon-180.png",
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
