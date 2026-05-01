"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { GAME_LIBRARY_EVENT, getFavoriteGames, getLikedGames, type SavedGameRef } from "@/lib/game-storage";

function SavedList({ title, items, empty }: { title: string; items: SavedGameRef[]; empty: string }) {
  if (items.length === 0) {
    return (
      <div className="saved-games-section">
        <h3 className="saved-games-section-title">{title}</h3>
        <p className="saved-games-empty">{empty}</p>
      </div>
    );
  }
  return (
    <div className="saved-games-section">
      <h3 className="saved-games-section-title">{title}</h3>
      <ul className="saved-games-list">
        {items.map((g) => (
          <li key={g.slug}>
            <Link href={`/game/${g.slug}`} className="saved-games-row" prefetch>
              <span className="saved-games-row-thumb">
                <img src={g.thumb ?? "/assets/img/logo.png"} alt="" width={40} height={40} loading="lazy" />
              </span>
              <span className="saved-games-row-name">{g.name}</span>
              <i className="fa fa-chevron-right saved-games-row-chev" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SavedGamesOffcanvas() {
  const [liked, setLiked] = useState<SavedGameRef[]>([]);
  const [favs, setFavs] = useState<SavedGameRef[]>([]);

  const refresh = useCallback(() => {
    setLiked(getLikedGames());
    setFavs(getFavoriteGames());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(GAME_LIBRARY_EVENT, refresh);
    return () => window.removeEventListener(GAME_LIBRARY_EVENT, refresh);
  }, [refresh]);

  return (
    <div
      className="offcanvas offcanvas-end playzo-saved-offcanvas"
      tabIndex={-1}
      id="playzoSavedGames"
      aria-labelledby="playzoSavedGamesLabel"
    >
      <div className="offcanvas-header border-secondary border-opacity-25">
        <h2 className="offcanvas-title h5 mb-0" id="playzoSavedGamesLabel">
          Favorites
        </h2>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        <SavedList title="Favorites" items={favs} empty="Tap “Add to favorites” on a game page to pin it here." />
      </div>
    </div>
  );
}

export default function SavedGamesLauncher() {
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
    setPortalHost(document.body);
    const bump = () => setTotal(getLikedGames().length + getFavoriteGames().length);
    bump();
    window.addEventListener(GAME_LIBRARY_EVENT, bump);
    return () => window.removeEventListener(GAME_LIBRARY_EVENT, bump);
  }, []);

  return (
    <>
      <button
        type="button"
        className="playzo-saved-btn"
        data-bs-toggle="offcanvas"
        data-bs-target="#playzoSavedGames"
        aria-controls="playzoSavedGames"
        title="Favorites"
      >
        <i className="fa fa-heart" aria-hidden />
        {total > 0 && <span className="playzo-saved-badge">{total > 9 ? "9+" : total}</span>}
        <span className="visually-hidden">Open liked and favorite games</span>
      </button>
      {mounted && portalHost ? createPortal(<SavedGamesOffcanvas />, portalHost) : null}
    </>
  );
}
