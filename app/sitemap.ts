import type { MetadataRoute } from "next";
import { SERVICIOS_ORDER } from "./_content/servicios";

const SITE_URL = "https://lazo.agency";

// Home + 4 paginas de servicio. /legal es noindex, no entra en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SERVICIOS_ORDER.map((slug) => ({
      url: `${SITE_URL}/servicios/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
