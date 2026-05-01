"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameStreamControlBar from "@/components/GameStreamControlBar";
import { categoryForSlug } from "@/lib/game-card-utils";
import { pushRecentPlay } from "@/lib/game-storage";
import type { Game } from "@/lib/types";

type Props = {
  game: Game;
  shareUrl: string;
};

export default function GameStreamPlayerShell({ game, shareUrl }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [volumePct, setVolumePct] = useState(85);
  const [muted, setMuted] = useState(false);
  const genre = categoryForSlug(game.slug, game.name);

  const syncMuteToIframe = useCallback(() => {
    const el = iframeRef.current;
    if (!el) return;
    const effectiveMuted = muted || volumePct === 0;
    try {
      if (effectiveMuted) el.setAttribute("muted", "");
      else el.removeAttribute("muted");
    } catch {
      /* some embeds ignore iframe mute */
    }
  }, [muted, volumePct]);

  useEffect(() => {
    syncMuteToIframe();
  }, [syncMuteToIframe]);

  useEffect(() => {
    pushRecentPlay(game);
  }, [game.slug, game.name, game.thumb]);

  const handleVolumePct = useCallback((pct: number) => {
    const v = Math.max(0, Math.min(100, pct));
    setVolumePct(v);
    if (v > 0) setMuted(false);
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (volumePct === 0) {
      setVolumePct(75);
      setMuted(false);
      return;
    }
    setMuted((m) => !m);
  }, [volumePct]);

  const reloadFrame = useCallback(() => {
    const el = iframeRef.current;
    if (!el?.src) return;
    const u = el.src;
    el.src = "";
    el.src = u;
  }, []);

  const effectiveVolumeDisplay = muted ? 0 : volumePct;

  return (
    <div className="game-stream-player-shell">
      <div className="game-player game-player--embed">
        <div className="game-iframe-container game-stream-iframe-container" style={{ paddingTop: "56.25%" }}>
          <iframe
            ref={iframeRef}
            key={game.slug}
            className="game-iframe"
            id="gameFrame"
            title={game.name}
            src={game.iframeUrl}
            style={{ background: "black" }}
            width="100%"
            height={600}
            scrolling="no"
            frameBorder={0}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; gamepad"
            allowFullScreen
          />
        </div>
      </div>
      <GameStreamControlBar
        gameName={game.name}
        shareUrl={shareUrl}
        volumePct={effectiveVolumeDisplay}
        muted={muted || volumePct === 0}
        onVolumePctChange={handleVolumePct}
        onMuteToggle={handleMuteToggle}
        onReload={reloadFrame}
      />
      <div className="game-stream-dock" aria-label="Quick tips">
        <div className="game-stream-dock-inner">
          <div className="game-stream-dock-head">
            <span className="game-stream-dock-chip">
              <i className="fa fa-lightbulb-o" aria-hidden />
              Quick tips
            </span>
            <span className="game-stream-dock-genre">{genre}</span>
          </div>
          <ul className="game-stream-dock-list">
            <li>
              <strong>Fullscreen</strong> — use the expand control above for the largest play area (Esc to exit).
            </li>
            <li>
              <strong>Sound</strong> — mute and volume apply to the frame when the browser allows it; some games use
              their own audio menu inside the game.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
