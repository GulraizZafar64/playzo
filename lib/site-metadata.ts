import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { getSiteUrl } from "@/lib/site-url";

/** Absolute URL for a path (leading slash). */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${base}/`;
  return `${base}${p}`;
}

type PageMetaOpts = {
  title: string;
  /** Use for home page so the root title template is not applied twice. */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Full page metadata: canonical, Open Graph, Twitter, robots.
 * Relies on root `metadataBase` for relative `openGraph.url` resolution.
 */
export function pageMetadata(opts: PageMetaOpts): Metadata {
  const canonical = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const images = opts.ogImage ? [{ url: opts.ogImage, alt: opts.title }] : undefined;

  return {
    ...(opts.absoluteTitle ? { title: { absolute: opts.title } } : { title: opts.title }),
    description: opts.description,
    alternates: {
      canonical,
    },
    robots: opts.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: opts.title,
      description: opts.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

/** Home: canonical `/`, public catalog size label (not raw JSON length). */
export function buildHomeMetadata(): Metadata {
  return pageMetadata({
    title: `${SITE_NAME} — Free unblocked browser games (${PUBLIC_CATALOG_SIZE_LABEL} titles)`,
    absoluteTitle: true,
    description: `Play ${PUBLIC_CATALOG_SIZE_LABEL} free HTML5 games in your browser: action, puzzle, racing, sports, and more. No install — instant load. Search, categories, and original per-game guides on ${SITE_NAME}.`,
    path: "/",
    ogImage: "/assets/img/logo.png",
  });
}
