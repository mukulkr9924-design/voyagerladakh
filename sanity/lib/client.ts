import { draftMode } from "next/headers";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// No API CDN: Next caches every result itself, and the CDN can still hold the old answer to a query
// for a few seconds after a publish, which would undo the instant refresh from the webhook.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });

/** Every query shares this tag, so a publish in the Studio can refresh the whole site at once. */
export const SANITY_TAG = "sanity";

// Fields the site compares or branches on. Visual editing's invisible markers would break those
// checks (e.g. a trip's category or "round trip" detection), so these stay unmarked in previews.
const UNMARKED_FIELDS = new Set(["activityType", "type", "difficulty", "kind", "label", "start", "end", "email", "phone"]);

/** Reads drafts and marks text for click-to-edit. Only used while previewing in the Studio. */
const previewClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: "drafts",
  stega: {
    enabled: true,
    studioUrl: "/studio",
    filter: (props) => {
      const key = props.sourcePath.at(-1);
      if (typeof key === "string" && UNMARKED_FIELDS.has(key)) return false;
      // Map stop names place the mountain passes on the road.
      if (props.sourcePath[0] === "mapStops" && key === "name") return false;
      return props.filterDefault(props);
    },
  },
});

async function isDraftMode() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // Called outside a request (generateStaticParams, build-time sitemap).
    return false;
  }
}

/**
 * Cached for a minute, so edits published in the Studio go live within ~60 s even without the
 * webhook in app/api/revalidate. Identical queries in one render are fetched once.
 * In draft mode (the Studio's Presentation tool) it returns unpublished drafts, uncached.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}) {
  if (await isDraftMode()) return previewClient.fetch<T>(query, params, { cache: "no-store" });
  return client.fetch<T>(query, params, { next: { revalidate: 60, tags: [SANITY_TAG] } });
}
