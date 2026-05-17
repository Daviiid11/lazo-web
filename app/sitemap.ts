import type { MetadataRoute } from "next";

const SITE_URL = "https://lazo.agency";

// Solo la home es indexable. /legal es noindex, no entra en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
