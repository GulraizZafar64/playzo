"use client";

import { useCallback, useEffect, useState } from "react";
import type { Game } from "@/lib/types";
import {
  GAME_LIBRARY_EVENT,
  isFavorite,
  isLiked,
  upsertFavorite,
  upsertLiked,
} from "@/lib/game-storage";

type Props = { game: Game };

export default function GameStreamLikeRow({ game }: Props) {
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const syncFromStorage = useCallback(() => {
    setLiked(isLiked(game.slug));
    setFav(isFavorite(game.slug));
  }, [game.slug]);

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  useEffect(() => {
    const onLib = () => syncFromStorage();
    window.addEventListener(GAME_LIBRARY_EVENT, onLib);
    return () => window.removeEventListener(GAME_LIBRARY_EVENT, onLib);
  }, [syncFromStorage]);

  function toggleLike() {
    const next = !liked;
    upsertLiked(game, next);
    setLiked(next);
    if (next) {
      upsertFavorite(game, false);
      setFav(false);
      setDisliked(false);
    }
  }

  function toggleFavorite() {
    const next = !fav;
    upsertFavorite(game, next);
    setFav(next);
    if (next) {
      upsertLiked(game, true);
      setLiked(true);
      setDisliked(false);
    }
  }

  function toggleDislike() {
    if (!disliked) {
      upsertLiked(game, false);
      upsertFavorite(game, false);
      setLiked(false);
      setFav(false);
    }
    setDisliked((d) => !d);
  }

  return (
    <div className="game-stream-vote-stack">
      <div className="game-stream-vote-row">
        <button
          type="button"
          className={`game-stream-btn-like${liked ? " game-stream-btn-like--active" : ""}`}
          onClick={toggleLike}
          aria-pressed={liked}
        >
          <i className="fa fa-thumbs-up" aria-hidden />
          Like
        </button>
        <button
          type="button"
          className={`game-stream-btn-dislike${disliked ? " game-stream-btn-dislike--active" : ""}`}
          onClick={toggleDislike}
          aria-label="Dislike"
          aria-pressed={disliked}
        >
          <i className="fa fa-thumbs-down" aria-hidden />
        </button>
      </div>
      <button
        type="button"
        className={`game-stream-btn-fav${fav ? " game-stream-btn-fav--active" : ""}`}
        onClick={toggleFavorite}
        aria-pressed={fav}
      >
        <i className={`fa ${fav ? "fa-heart" : "fa-heart-o"}`} aria-hidden />
        <span>{fav ? "Favorited" : "Add to favorites"}</span>
      </button>
    </div>
  );
}
