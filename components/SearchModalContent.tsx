"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Game } from "@/lib/types";

function hideSearchModal() {
  const el = document.getElementById("searchGameModal");
  if (!el) return;
  const bs = (
    window as unknown as {
      bootstrap?: { Modal: { getInstance: (e: Element) => { hide: () => void } | null; getOrCreateInstance: (e: Element) => { hide: () => void } } };
    }
  ).bootstrap;
  if (!bs?.Modal) return;
  const inst = bs.Modal.getInstance(el) ?? bs.Modal.getOrCreateInstance(el);
  inst.hide();
}

export default function SearchModalContent() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    fetch("/data/games.json")
      .then((r) => r.json())
      .then((data: Game[]) => {
        if (!cancelled) setGames(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setGames([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Clear search query when the user navigates to a new page
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    const modal = document.getElementById("searchGameModal");
    if (!modal) return;
    const onHidden = () => setQuery("");
    modal.addEventListener("hidden.bs.modal", onHidden);
    return () => modal.removeEventListener("hidden.bs.modal", onHidden);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || games.length === 0) return [];
    const out: Game[] = [];
    for (const g of games) {
      const name = (g.name || g.title || "").toLowerCase();
      const slug = (g.slug || "").toLowerCase();
      const title = (g.title || "").toLowerCase();
      if (name.includes(q) || slug.includes(q) || title.includes(q)) {
        out.push(g);
        if (out.length >= 14) break;
      }
    }
    return out;
  }, [query, games]);

  const onPick = useCallback(() => {
    hideSearchModal();
  }, []);

  return (
    <>
      <div className="search-container app-search playzo-search playzo-search--modal w-100">
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Type a game name…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="search-button" className="btn search-button" type="button" aria-label="Search">
          <i className="fa fa-search" />
        </button>
      </div>

      {query.trim().length > 0 && results.length > 0 && (
        <ul className="playzo-search-suggest list-unstyled mb-0 mt-2" role="listbox" aria-label="Matching games">
          {results.map((g) => (
            <li key={g.slug} role="option">
              <Link
                href={`/game/${g.slug}`}
                className="playzo-search-suggest-link"
                prefetch={false}
                onClick={onPick}
              >
                <span className="playzo-search-suggest-thumb">
                  <img src={g.thumb ?? "/assets/img/logo.png"} alt="" width={44} height={44} loading="lazy" decoding="async" />
                </span>
                <span className="playzo-search-suggest-name">{g.name || g.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="playzo-search-modal-hint mb-0 mt-2 small">
        {games.length === 0
          ? "Loading catalog…"
          : query.trim() === ""
            ? "Type to see matching games, or press Enter for the full search page."
            : results.length > 0
              ? "Tap a game to open it, or press Enter for the full search page."
              : "No quick matches — press Enter for the full search page."}
      </p>
    </>
  );
}
