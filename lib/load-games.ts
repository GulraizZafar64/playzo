import fs from "fs";
import path from "path";
import type { Game } from "./types";

/**
 * Server/build-time only: reads games from disk so webpack does not bundle the
 * entire JSON as split async chunks (avoids dev errors like "Cannot find module './636.js'").
 */
let cache: Game[] | null = null;

export function loadGames(): Game[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "games.json");
  cache = JSON.parse(fs.readFileSync(file, "utf8")) as Game[];
  return cache;
}

export function getGameBySlug(slug: string): Game | undefined {
  return loadGames().find((g) => g.slug === slug);
}
