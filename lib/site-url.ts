/**
 * Canonical origin for sitemap, robots, OG URLs, JSON-LD, and metadataBase.
 *
 * Priority: explicit `NEXT_PUBLIC_SITE_URL`, then Vercel system vars (so builds don’t fall back to localhost),
 * then local dev.
 */
export function getSiteUrl(): string {
  const trim = (s: string) => s.replace(/\/$/, "");

  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return trim(explicit);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    const host = production.replace(/^https?:\/\//i, "").split("/")[0];
    return trim(`https://${host}`);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "").split("/")[0];
    return trim(`https://${host}`);
  }

  return "https://playzo.space";
}
