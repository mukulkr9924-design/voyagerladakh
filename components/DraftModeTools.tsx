"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

/** Click-to-edit overlays and live refresh while previewing drafts from the Studio. */
export default function DraftModeTools() {
  const router = useRouter();
  // Outside the Studio's preview frame, offer a way back to the published site.
  const standalone = useSyncExternalStore(
    () => () => {},
    () => window.self === window.top,
    () => false,
  );

  return (
    <>
      <VisualEditing
        refresh={() => {
          router.refresh();
          return new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
      {standalone && (
        <a href="/api/draft-mode/disable" className="draft-banner">
          Previewing drafts · Exit preview
        </a>
      )}
    </>
  );
}
