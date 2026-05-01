import type { Game } from "@/lib/types";

export type SavedGameRef = {
  slug: string;
  name: string;
  thumb: string | null;
};

const KEYS = {
  liked: "playzo:liked-games",
  favorites: "playzo:favorite-games",
  recent: "playzo:recent-games",
} as const;

export const GAME_LIBRARY_EVENT = "playzo-game-library";

const LEGACY_KEYS = {
  liked: "c6x:liked-games",
  favorites: "c6x:favorite-games",
  recent: "c6x:recent-games",
} as const;

function readRawJson(storageKey: keyof typeof KEYS): string | null {
  if (typeof window === "undefined") return null;
  const k = KEYS[storageKey];
  const v = localStorage.getItem(k);
  if (v != null) return v;
  const legacy = localStorage.getItem(LEGACY_KEYS[storageKey]);
  if (legacy != null) {
    localStorage.setItem(k, legacy);
    return legacy;
  }
  return null;
}

export function dispatchGameLibraryUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(GAME_LIBRARY_EVENT));
}

function readJson<T>(storageKey: keyof typeof KEYS, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = readRawJson(storageKey);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(storageKey: keyof typeof KEYS, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS[storageKey], JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

function toRef(game: Pick<Game, "slug" | "name" | "thumb">): SavedGameRef {
  return { slug: game.slug, name: game.name, thumb: game.thumb ?? null };
}

export function getLikedGames(): SavedGameRef[] {
  return readJson("liked", []);
}

export function setLikedGames(items: SavedGameRef[]): void {
  writeJson("liked", items);
}

export function isLiked(slug: string): boolean {
  return getLikedGames().some((g) => g.slug === slug);
}

export function upsertLiked(game: Pick<Game, "slug" | "name" | "thumb">, on: boolean): void {
  const ref = toRef(game);
  const next = getLikedGames().filter((g) => g.slug !== ref.slug);
  if (on) next.unshift(ref);
  setLikedGames(next);
  dispatchGameLibraryUpdated();
}

export function getFavoriteGames(): SavedGameRef[] {
  return readJson("favorites", []);
}

export function setFavoriteGames(items: SavedGameRef[]): void {
  writeJson("favorites", items);
}

export function isFavorite(slug: string): boolean {
  return getFavoriteGames().some((g) => g.slug === slug);
}

export function upsertFavorite(game: Pick<Game, "slug" | "name" | "thumb">, on: boolean): void {
  const ref = toRef(game);
  const next = getFavoriteGames().filter((g) => g.slug !== ref.slug);
  if (on) next.unshift(ref);
  setFavoriteGames(next);
  dispatchGameLibraryUpdated();
}

export function getRecentGames(): SavedGameRef[] {
  return readJson("recent", []);
}

/** Most recent first; max 3 entries. */
export function pushRecentPlay(game: Pick<Game, "slug" | "name" | "thumb">): void {
  const ref = toRef(game);
  const next = getRecentGames().filter((g) => g.slug !== ref.slug);
  next.unshift(ref);
  writeJson("recent", next.slice(0, 3));
  dispatchGameLibraryUpdated();
}
