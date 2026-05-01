/** Catalog card stats; category uses inference + overrides (not stored in games.json). */

const DEFAULT_TAGS = [
  "ACTION",
  "ADVENTURE",
  "ARCADE",
  "CASUAL",
  "DRIVING",
  "PUZZLE",
  "RACING",
  "SHOOTING",
  "SIM",
  "SPORTS",
  "STRATEGY",
];

/**
 * Exact slug → tag when inference is wrong or ambiguous.
 * Prefer inference for new games; add here only when needed.
 */
const SLUG_CATEGORY_OVERRIDES: Record<string, string> = {
  "archer-master-3d-castle-defense": "SHOOTING",
  "armed-forces-io": "SHOOTING",
  "avoid-dying": "ACTION",
  "awesome-tanks": "ARCADE",
  "awesome-tanks-2": "ARCADE",
  "b-cubed": "PUZZLE",
  "bacon-may-die": "ACTION",
};

export function slugHash(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function haystack(slug: string, name: string): string {
  return `${slug} ${name}`.toLowerCase();
}

/**
 * Best-effort genre from slug + title keywords. Returns null → use hash fallback.
 */
function inferCategory(slug: string, name: string): string | null {
  const h = haystack(slug, name);

  if (/\b(b-cubed|2048-unblocked|minesweeper|sudoku|nonogram|word-search)\b/.test(h)) return "PUZZLE";
  if (/\b(puzzle|jigsaw|mahjong|crossword)\b/.test(h) && !/bubble-shooter|zombie-shooter/.test(h)) {
    if (!/shooter|gun|rifle|archer|sniper/.test(h)) return "PUZZLE";
  }

  if (/\b(awesome-tanks|shell-shock|diep\.io|tank-1990|tanks-1990)\b/.test(h) || /^awesome-tanks/.test(slug))
    return "ARCADE";

  if (
    /shooter|snipers?|rifle|pistol|gun|machinegun|machine-gun|warfare|tactical|fps|frag|headshot|zombie-shooter|bubble-shooter|apple-shooter/.test(
      h,
    )
  )
    return "SHOOTING";

  if (
    /archer|crossbow|bow-?man|bowman|noob-archer|ragdoll-archer|stickman-archer|arcane-archer|castle-defense/.test(h) &&
    !/puzzle/.test(h)
  )
    return "SHOOTING";

  if (/armed-forces|military-combat|special-forces|sniper-elite/.test(h)) return "SHOOTING";

  if (/(grand-prix|formula|nascar|drift|motocross|moto-x|racing|speedway|need-for-speed|car-race|kart)/.test(h))
    return "RACING";

  if (/(18-wheeler|cargo-simulator|truck-sim|euro-truck|parking-|bus-simulator|school-bus)/.test(h)) return "DRIVING";

  if (/(soccer|football|basketball|golf|tennis|baseball|volleyball|sports-head|penalty|fifa|nba-)/.test(h))
    return "SPORTS";

  if (/(chess|checkers|tower-defense|strategy|clash|empire|war-?craft|rts)/.test(h)) return "STRATEGY";

  if (/(simulator|sim-|flight-sim|life-sim|city-sim)/.test(h)) return "SIM";

  if (/(idle|clicker|incremental)/.test(h)) return "CASUAL";

  if (/(adventure|rpg|dungeon|zelda|quest)/.test(h)) return "ADVENTURE";

  if (/(avoid-dying|bacon-may|happy-wheels|geometry-dash|run-3|subway|temple-run|stickman-(?!archer))/.test(h))
    return "ACTION";

  if (/(fighting|brawl|smash|street-fighter|boxing|wrestling)/.test(h)) return "ACTION";

  if (/(\.io$|\.io-|surviv\.io|krunker|shellshock)/.test(slug) && /(shoot|gun|war|battle|forces)/.test(h))
    return "SHOOTING";

  return null;
}

/**
 * @param name — game display name; improves keyword matching. Falls back to slug-only if omitted.
 */
export function categoryForSlug(slug: string, name?: string): string {
  const o = SLUG_CATEGORY_OVERRIDES[slug];
  if (o) return o;

  const displayName = name?.trim() || slug.replace(/-/g, " ");
  const inferred = inferCategory(slug, displayName);
  if (inferred) return inferred;

  return DEFAULT_TAGS[slugHash(slug) % DEFAULT_TAGS.length];
}

export function ratingForSlug(slug: string): string {
  const h = slugHash(slug);
  return (3.4 + (h % 16) / 10).toFixed(1);
}

export function activeLabelForSlug(slug: string): string {
  return "Unblocked";
}

export function popPctForSlug(slug: string): number {
  return 38 + (slugHash(slug + "pop") % 52);
}
