import { defineCliConfig } from "sanity/cli";

// For Sanity CLI commands (`npx sanity ...`). The Studio itself is deployed with the website at /studio.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2brjvlhw",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
