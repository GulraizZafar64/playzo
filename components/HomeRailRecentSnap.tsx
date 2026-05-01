"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GAME_LIBRARY_EVENT, getRecentGames, type SavedGameRef } from "@/lib/game-storage";

/** Compact horizontal snap strip for the home right rail (last 3 games, localStorage). */
export default function HomeRailRecentSnap() {
  const [recent, setRecent] = useState<SavedGameRef[]>([]);

  const refresh = useCallback(() => {
    setRecent(getRecentGames());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(GAME_LIBRARY_EVENT, refresh);
    return () => window.removeEventListener(GAME_LIBRARY_EVENT, refresh);
  }, [refresh]);

  if (recent.length === 0) return null;

  return (
    <div className="playzo-rail-recent" aria-labelledby="playzo-rail-recent-title">
      <div className="playzo-rail-recent-head">
        <h3 id="playzo-rail-recent-title" className="playzo-rail-recent-title">
          <i className="fa fa-history" aria-hidden />
          Recent
        </h3>
      </div>
      <div className="playzo-rail-recent-track" role="list">
        {recent.map((g) => (
          <Link
            key={g.slug}
            href={`/game/${g.slug}`}
            className="playzo-rail-recent-card"
            role="listitem"
            prefetch
          >
            <span className="playzo-rail-recent-thumb">
              <img src={g.thumb ?? "/assets/img/logo.png"} alt="" width={48} height={48} loading="lazy" />
            </span>
            <span className="playzo-rail-recent-name">{g.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
