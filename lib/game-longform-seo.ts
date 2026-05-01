/**
 * Deterministic compact “in-depth” guide per game (~100 words max, unique per slug).
 * Same slug → stable copy; different slugs → varied sentences from shared pools.
 */

export type LongformContext = {
  slug: string;
  name: string;
  genre: string;
  siteName: string;
};

export type LongformSection = {
  heading: string;
  paragraphs: string[];
};

function hashSlug(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function fill(s: string, ctx: LongformContext): string {
  return s
    .replace(/\{name\}/g, ctx.name)
    .replace(/\{genre\}/g, ctx.genre)
    .replace(/\{site\}/g, ctx.siteName)
    .replace(/\{slug\}/g, ctx.slug);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const LONGFORM_MAX_WORDS = 50;

function truncateToWords(text: string, maxWords: number): string {
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function genreBucket(genre: string): string {
  const g = genre.toUpperCase();
  if (/SHOOT|FPS|GUN|BATTLE|WAR/i.test(g)) return "action_shooting";
  if (/PUZZLE|LOGIC|BRAIN|MAHJONG|SUDOKU/i.test(g)) return "puzzle";
  if (/RACE|CAR|DRIVE|MOTO|DRIFT/i.test(g)) return "racing";
  if (/SPORT|SOCCER|FOOTBALL|BASKET|GOLF/i.test(g)) return "sports";
  if (/STRATEGY|TD|TOWER|CHESS/i.test(g)) return "strategy";
  if (/SIM|TYCOON|LIFE/i.test(g)) return "sim";
  if (/ARCADE|CASUAL|IDLE|CLICK/i.test(g)) return "arcade";
  if (/ADVENTURE|RPG|QUEST/i.test(g)) return "adventure";
  return "general";
}

/** Short lines (~20–28 words) — combined and capped for a quick read. */
const compactLead = (ctx: LongformContext) => [
  `${ctx.name} on ${ctx.siteName} runs in your browser—no install. Speed depends on your device, connection, and the publisher’s hosting.`,
  `${ctx.name} is a ${ctx.genre} game you open on ${ctx.siteName}: the frame loads the publisher’s build, so behaviour can change without a store update.`,
  `You play ${ctx.name} through ${ctx.siteName} in a secure frame—nothing to download first. Give it a focused tab for the smoothest ${ctx.genre} session.`,
];

const compactGenreHint = (ctx: LongformContext, bucket: string): string[] => {
  const extra: Record<string, string[]> = {
    action_shooting: [
      `Aim and movement feel best with low lag—close heavy tabs if inputs feel late.`,
    ],
    puzzle: [
      `Stuck? Step away briefly; ${ctx.genre} puzzles often click after a short break.`,
    ],
    racing: [
      `Learn the track before chasing records—early laps are reconnaissance.`,
    ],
    sports: [
      `Timing beats spam—practice the basic action until it feels automatic.`,
    ],
    strategy: [
      `Watch what the UI highlights (resources, timers)—that’s usually the win path.`,
    ],
    sim: [
      `Sims reward patience; don’t rush the early economy unless the tutorial says so.`,
    ],
    arcade: [
      `Treat each loss as feedback on timing—arcade runs are built for retries.`,
    ],
    adventure: [
      `Note clues in the world—${ctx.name} often threads goals through the environment.`,
    ],
    general: [
      `Read the objective or score bar first so you know what “winning” means here.`,
    ],
  };
  return extra[bucket] ?? extra.general;
};

const compactTip = (ctx: LongformContext) => [
  `No sound? Click inside the game once, then check in-game volume. Still slow? Pause downloads and other heavy tabs.`,
  `Tiny UI? Zoom with Ctrl or Cmd + plus. Some school or office networks block hosts—${ctx.siteName} can’t bypass those filters.`,
  `Fullscreen (if the frame allows) can feel smoother; Esc exits. Hard refresh (Ctrl/Cmd + Shift + R) if the game looks outdated.`,
];

export function buildGameLongformArticle(ctx: LongformContext): {
  sections: LongformSection[];
  wordCount: number;
} {
  const seed = hashSlug(ctx.slug + "|longform|compact|v2");
  const rand = mulberry32(seed);
  const bucket = genreBucket(ctx.genre);

  const lead = fill(pick(rand, compactLead(ctx)), ctx);
  const genreLine = fill(pick(rand, compactGenreHint(ctx, bucket)), ctx);
  const tip = fill(pick(rand, compactTip(ctx)), ctx);

  let body = truncateToWords(`${lead} ${genreLine} ${tip}`, LONGFORM_MAX_WORDS);
  const wc = Math.min(countWords(body.replace(/…$/, "").trim()), LONGFORM_MAX_WORDS);

  return {
    sections: [
      {
        heading: `${ctx.name} — quick guide`,
        paragraphs: [body],
      },
    ],
    wordCount: wc,
  };
}
