/**
 * Served at /sitemap.xml — full URL list for search engines (static pages, categories, every game).
 * Do not add public/sitemap.xml; it would conflict with this route.
 */
import type { MetadataRoute } from "next";
import { CATEGORY_SLUGS } from "@/lib/category-filter";
import { loadGames } from "@/lib/load-games";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  const games = loadGames();
  const lastMod = new Date();

  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/learn-more",
    "/blog/best-unblocked-games-2026",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const p of staticPaths) {
    entries.push({
      url: p === "" ? `${base}/` : `${base}${p}`,
      lastModified: lastMod,
      changeFrequency: p === "" ? "daily" : "weekly",
      priority: p === "" ? 1 : 0.85,
    });
  }

  for (const slug of CATEGORY_SLUGS) {
    entries.push({
      url: `${base}/category/${slug}`,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  for (const g of games) {
    entries.push({
      url: `${base}/game/${g.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  return entries;
}
