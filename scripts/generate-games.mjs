/**
 * Build-time: reads legacy game/*.html and emits data/games.json.
 * Optional: FETCH_REMOTE_DESCRIPTIONS=1 fetches <meta name="description"> from
 * https://playzo.space/game/{slug} (~100 words) for each title.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeLegacyBrand } from "./brand-normalize.mjs";
import {
  fetchGameDescriptionFromRemote,
  poolMap,
  truncateToWords,
} from "./description-source.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const gameDir = path.join(root, "game");
const outFile = path.join(root, "data", "games.json");

const DESCRIPTION_WORDS = 100;
const FETCH_CONCURRENCY = 14;

/** Legacy pages used "Classroom 6x"; site brand is Playzo (see lib/site-brand.ts). */
function normalizeBrand(str) {
  if (!str) return str;
  return str
    .replace(/\bClassroom\s+6x\s+Team\b/gi, "Playzo Team")
    .replace(/\bClassroom\s+6x\b/gi, "Playzo")
    .replace(/\bclassroom\s+6x\s+unblocked\b/gi, "playzo unblocked")
    .replace(/\bclassroom\s+6x\b/g, "playzo")
    .replace(/free unblocked games 6x/gi, "free unblocked games");
}

/** Robust: id/class order varies; duplicate stray iframes may appear before gameFrame. */
function extractIframeSrc(html) {
  const byIdFirst =
    html.match(/\bid=["']gameFrame["'][^>]*?\bsrc=["']([^"']+)["']/i)?.[1] ??
    html.match(/\bsrc=["']([^"']+)["'][^>]*\bid=["']gameFrame["']/i)?.[1];
  if (byIdFirst) return byIdFirst;
  const block = html.match(/<iframe\b[^>]*\bid=["']gameFrame["'][^>]*>/i);
  if (block) {
    const src = block[0].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (src) return src;
  }
  return "";
}

function extract(html, slug) {
  const iframe = extractIframeSrc(html);
  const rawTitle = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? slug;
  const title = normalizeBrand(rawTitle);
  const rawName =
    html.match(/<h1 class="single-title">([^<]+)<\/h1>/)?.[1]?.trim() ?? title.split(" - ")[0]?.trim() ?? slug;
  const name = normalizeBrand(rawName);
  const description = normalizeBrand(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
  );
  const thumb =
    html.match(/single-info-container[\s\S]*?<img[^>]+src="([^"]+)"/i)?.[1] ?? null;

  if (!iframe) {
    console.warn("missing iframe:", slug);
  }

  return {
    slug,
    name: normalizeLegacyBrand(name),
    title: normalizeLegacyBrand(title),
    description: normalizeLegacyBrand(description),
    iframeUrl: iframe ?? "",
    thumb,
  };
}

function shouldFetchRemote() {
  const v = process.env.FETCH_REMOTE_DESCRIPTIONS;
  return v === "1" || v === "true" || v === "yes";
}

async function main() {
  if (!fs.existsSync(gameDir)) {
    console.warn(
      "[generate-games] No game/ folder (e.g. on Vercel if not uploaded). Keeping existing data/games.json if present.",
    );
    if (!fs.existsSync(outFile)) {
      console.error("[generate-games] Missing data/games.json — commit it or add the game/ folder.");
      process.exit(1);
    }
    return;
  }

  const files = fs.readdirSync(gameDir).filter((f) => f.endsWith(".html"));
  if (files.length === 0) {
    console.warn("[generate-games] No game/*.html files. Keeping existing data/games.json if present.");
    if (!fs.existsSync(outFile)) {
      console.error("[generate-games] Missing data/games.json — commit it or add HTML under game/.");
      process.exit(1);
    }
    return;
  }

  const games = [];
  for (const file of files) {
    const slug = file.replace(/\.html$/i, "");
    const html = fs.readFileSync(path.join(gameDir, file), "utf8");
    games.push(extract(html, slug));
  }
  games.sort((a, b) => a.slug.localeCompare(b.slug));

  if (shouldFetchRemote()) {
    console.log(
      `[generate-games] FETCH_REMOTE_DESCRIPTIONS: fetching ~${games.length} pages from playzo.space …`,
    );
    let ok = 0;
    let fail = 0;
    await poolMap(games, FETCH_CONCURRENCY, async (g) => {
      const ac = new AbortController();
      const t = setTimeout(() => ac.abort(), 20000);
      try {
        const remote = await fetchGameDescriptionFromRemote(g.slug, ac.signal);
        clearTimeout(t);
        const source = remote?.trim() || g.description;
        g.description = truncateToWords(source, DESCRIPTION_WORDS);
        if (remote?.trim()) ok++;
        else fail++;
      } catch {
        clearTimeout(t);
        g.description = truncateToWords(g.description || "", DESCRIPTION_WORDS);
        fail++;
      }
    });
    console.log(`[generate-games] Remote descriptions: used network for ${ok}, fallback for ${fail}.`);
  } else {
    for (const g of games) {
      g.description = truncateToWords(g.description || "", DESCRIPTION_WORDS);
    }
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(games, null, 0), "utf8");
  console.log("Wrote games catalog to", path.relative(root, outFile));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
