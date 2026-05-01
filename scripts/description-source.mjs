/**
 * Pull short descriptions from the legacy game host; truncate for catalog + UI (~100 words).
 */
import { normalizeLegacyBrand } from "./brand-normalize.mjs";

export const REMOTE_GAME_PAGE_BASE = "https://playzo.space/game";

export function decodeHtmlEntities(s) {
  if (!s) return s;
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

export function truncateToWords(text, maxWords) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

/** Extract meta description from full HTML page string. */
export function parseMetaDescription(html) {
  const m =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ??
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const raw = m?.[1];
  if (!raw) return "";
  return normalizeLegacyBrand(decodeHtmlEntities(raw));
}

/**
 * @param {string} slug
 * @param {AbortSignal} [signal]
 */
export async function fetchGameDescriptionFromRemote(slug, signal) {
  const url = `${REMOTE_GAME_PAGE_BASE}/${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    signal,
    headers: {
      Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      "User-Agent": "PlayzoCatalog/1.0 (+https://playzos.vercel.app)",
    },
    redirect: "follow",
  });
  if (!res.ok) return "";
  const html = await res.text();
  return parseMetaDescription(html);
}

/**
 * Run async work in pools of `size` (simple concurrency limit).
 * @template T
 * @param {T[]} items
 * @param {number} size
 * @param {(item: T, index: number) => Promise<void>} fn
 */
export async function poolMap(items, size, fn) {
  let i = 0;
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
}
