import { categoryForSlug, slugHash } from "@/lib/game-card-utils";
import type { Game } from "@/lib/types";
import { CATEGORY_LINKS } from "@/lib/categories";

function hay(game: Game): string {
  return `${game.slug} ${game.name}`.toLowerCase();
}

const CAT = categoryForSlug;

/** All category URL segments we generate at build time. */
export const CATEGORY_SLUGS: string[] = Array.from(
  new Set([
    ...CATEGORY_LINKS.map((c) => c.href.replace(/^\/category\//, "")),
    "trending",
    "latest",
    "featured",
  ]),
);

export function gamesForCategorySlug(slug: string, all: Game[]): Game[] {
  const h = (g: Game) => hay(g);

  switch (slug) {
    case "unblocked-games":
    case "unblocked-games-6x":
      return [...all];

    case "action":
      return all.filter((g) => CAT(g.slug, g.name) === "ACTION");
    case "adventure":
      return all.filter((g) => CAT(g.slug, g.name) === "ADVENTURE");
    case "arcade":
      return all.filter((g) => CAT(g.slug, g.name) === "ARCADE");
    case "puzzle":
      return all.filter((g) => CAT(g.slug, g.name) === "PUZZLE");
    case "racing":
      return all.filter((g) => CAT(g.slug, g.name) === "RACING");
    case "sport":
      return all.filter((g) => CAT(g.slug, g.name) === "SPORTS");
    case "shooting":
      return all.filter((g) => CAT(g.slug, g.name) === "SHOOTING");
    case "strategy":
      return all.filter((g) => CAT(g.slug, g.name) === "STRATEGY");
    case "simulator":
      return all.filter((g) => CAT(g.slug, g.name) === "SIM");
    case "idle":
      return all.filter((g) => CAT(g.slug, g.name) === "CASUAL");

    case "car":
      return all.filter((g) => {
        const c = CAT(g.slug, g.name);
        return c === "DRIVING" || c === "RACING" || /car|truck|park|wheeler|vehicle|bus|moto|driv/i.test(h(g));
      });

    case "io":
      return all.filter(
        (g) => /\.io\b/i.test(g.slug) || /[\-_]io[\-_]/i.test(g.slug) || /\b\.io\b/i.test(h(g)),
      );

    case "2-players":
    case "multiplayer":
      return all.filter((g) =>
        /2[\s-]?player|two[\s-]?player|multiplayer|coop|co-op|versus|vs\.?|1v1|pvp|splitscreen|battle\s*2/i.test(
          h(g),
        ),
      );

    case "running":
      return all.filter(
        (g) =>
          /run|runner|subway|temple|dash|parkour|escape|chase|sprint/i.test(h(g)) ||
          (CAT(g.slug, g.name) === "ACTION" && /run|dash/i.test(h(g))),
      );

    case "skill":
      return all.filter((g) => /skill|reflex|timing|precision|balance|stack|tower(?! defense)/i.test(h(g)));

    case "stickman":
      return all.filter((g) => /stickman|stick[\s-]?man|stick\s*figure/i.test(h(g)));

    case "papas":
      return all.filter((g) => /papa|papas|pizzeria|freezeria|scooperia/i.test(h(g)));

    case "anime":
      return all.filter((g) => /anime|manga|naruto|goku|sakura|otaku/i.test(h(g)));

    case "flash":
      return all.filter((g) => /flash|swf|ruffle|old.?school.?arcade/i.test(h(g)));

    case "retro":
      return all.filter((g) => /retro|pixel|8[\s-]?bit|16[\s-]?bit|atari|arcade.?classic|nostalg/i.test(h(g)));

    case "trending": {
      const scored = all.map((g) => ({ g, s: slugHash(g.slug + "trend") }));
      scored.sort((a, b) => b.s - a.s);
      return scored.map((x) => x.g);
    }

    case "latest":
      return [...all].reverse();

    case "featured": {
      const step = Math.max(1, Math.floor(all.length / 120));
      return all.filter((_, i) => i % step === 0);
    }

    default:
      return [];
  }
}

export function categoryTitleFromSlug(slug: string): string {
  const found = CATEGORY_LINKS.find((c) => c.href === `/category/${slug}`);
  if (found) return found.label;
  if (slug === "trending") return "Trending";
  if (slug === "latest") return "Latest";
  if (slug === "featured") return "Featured";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
