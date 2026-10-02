import { stegaClean } from "next-sanity";

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Strip draft-preview edit markers, and escape "<" so trip copy can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(stegaClean(data)).replace(/</g, "\\u003c") }}
    />
  );
}
