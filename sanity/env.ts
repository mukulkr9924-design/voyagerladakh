// Public identifiers, safe to ship to the browser. Env vars override them for a staging dataset.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2brjvlhw";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-01";
