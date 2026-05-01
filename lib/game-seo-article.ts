import type { Game } from "@/lib/types";
import { SITE_NAME } from "@/lib/site-brand";
import { getGameDescription } from "./game-descriptions";
import { categoryForSlug } from "./game-card-utils";

/** 
 * Bridge exports to maintain compatibility with existing metadata infrastructure 
 * while pulling from the new high-quality content engine.
 */

export function getGameMetaDescription(game: Game): string {
  const desc = getGameDescription({
    slug: game.slug,
    title: game.name,
    genre: game.category || categoryForSlug(game.slug, game.name)
  });
  return desc.metaDescription;
}

export function getGameSeoKeywords(game: Game): string[] {
  const desc = getGameDescription({
    slug: game.slug,
    title: game.name,
    genre: game.category || categoryForSlug(game.slug, game.name)
  });
  
  const nameWords = game.name.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  
  return [
    game.name,
    `${game.name} unblocked`,
    `${game.name} online`,
    SITE_NAME,
    desc.genre,
    ...nameWords
  ];
}
