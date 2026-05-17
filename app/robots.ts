import type { MetadataRoute } from "next";

const SITE_URL = "https://lazo.agency";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /legal va noindex por su propio metadata; lo excluimos también aquí.
      disallow: "/legal",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
