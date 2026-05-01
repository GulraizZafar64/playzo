/**
 * Served at /robots.txt — sitemap URL uses getSiteUrl() (NEXT_PUBLIC_SITE_URL or Vercel env).
 * Do not add public/robots.txt; it would conflict with this route.
 */
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
