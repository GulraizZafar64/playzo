"use client";

export default function FullscreenExpand() {
  function openFullscreen() {
    const elem = document.getElementById("gameFrame") as HTMLIFrameElement | null;
    if (!elem) return;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
      (elem as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    } else if ((elem as unknown as { msRequestFullscreen?: () => void }).msRequestFullscreen) {
      (elem as unknown as { msRequestFullscreen: () => void }).msRequestFullscreen();
    }
  }

  return (
    <i
      className="fa fa-expand"
      role="button"
      tabIndex={0}
      aria-label="Fullscreen"
      onClick={openFullscreen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openFullscreen();
      }}
    />
  );
}
