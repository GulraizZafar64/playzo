"use client";

type Props = {
  gameName: string;
  shareUrl: string;
  volumePct: number;
  muted: boolean;
  onVolumePctChange: (pct: number) => void;
  onMuteToggle: () => void;
  onReload: () => void;
};

function requestGameFullscreen() {
  const elem = document.getElementById("gameFrame") as HTMLIFrameElement | null;
  if (!elem) return;
  if (elem.requestFullscreen) {
    void elem.requestFullscreen();
  } else if ((elem as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
    void (elem as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
  } else if ((elem as unknown as { msRequestFullscreen?: () => void }).msRequestFullscreen) {
    void (elem as unknown as { msRequestFullscreen: () => void }).msRequestFullscreen();
  }
}

export default function GameStreamControlBar({
  gameName,
  shareUrl,
  volumePct,
  muted,
  onVolumePctChange,
  onMuteToggle,
  onReload,
}: Props) {
  async function share() {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: gameName, text: `Play ${gameName}`, url: shareUrl });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      /* user cancelled or clipboard blocked */
    }
  }

  return (
    <div className="game-stream-chrome" role="toolbar" aria-label="Player controls">
      <div className="game-stream-chrome-left">
        <button type="button" className="game-stream-chrome-btn" aria-label="Play / Pause (use in-game controls)">
          <i className="fa fa-play" aria-hidden />
        </button>
        <button type="button" className="game-stream-chrome-btn" aria-label="Reload game" onClick={onReload}>
          <i className="fa fa-refresh" aria-hidden />
        </button>
        <div className="game-stream-volume">
          <button
            type="button"
            className={`game-stream-chrome-btn game-stream-mute-btn${muted ? " game-stream-mute-btn--muted" : ""}`}
            onClick={onMuteToggle}
            aria-label={muted ? "Unmute" : "Mute"}
            aria-pressed={muted}
          >
            <i className={`fa ${muted || volumePct === 0 ? "fa-volume-off" : "fa-volume-up"}`} aria-hidden />
          </button>
          <label className="game-stream-volume-slider-wrap">
            <span className="visually-hidden">Volume</span>
            <input
              className="game-stream-volume-range"
              type="range"
              min={0}
              max={100}
              value={volumePct}
              onChange={(e) => onVolumePctChange(Number(e.target.value))}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volumePct}
            />
          </label>
        </div>
      </div>
      <div className="game-stream-chrome-right">
        <button type="button" className="game-stream-chrome-share" onClick={share}>
          <i className="fa fa-share-alt" aria-hidden />
          <span>Share</span>
        </button>
        <button
          type="button"
          className="game-stream-chrome-btn game-stream-chrome-fs"
          aria-label="Fullscreen"
          onClick={requestGameFullscreen}
        >
          <i className="fa fa-expand" aria-hidden />
        </button>
      </div>
    </div>
  );
}
