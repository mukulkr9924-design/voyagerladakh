import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/coming-soon/"],
    },
    sitemap: "https://voyagerladakh.com/sitemap.xml",
  };
}
