import FullscreenExpand from "./FullscreenExpand";
import type { Game } from "@/lib/types";

type Props = {
  game: Game;
  /** Hide title row under iframe — used by streaming layout + external chrome. */
  embedOnly?: boolean;
};

/** Server-rendered iframe so `src` is in the first HTML payload (fast first paint). */
export default function GameIframe({ game, embedOnly }: Props) {
  const thumb = game.thumb ?? "/assets/img/logo.png";

  return (
    <div className={embedOnly ? "game-player game-player--embed" : "game-player"}>
      <div className="game-iframe-container" style={{ paddingTop: "56.25%" }}>
        <iframe
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
      {!embedOnly && (
        <div className="single-info-container">
          <div className="header-left">
            <img width={40} height={40} src={thumb} alt="" />
            <h1 className="single-title">{game.name}</h1>
          </div>
          <div className="action-btn">
            <div className="stats-vote">
              <i className="fa fa-thumbs-up" />
              <i className="fa fa-thumbs-down" />
              <i className="fa fa-bug" />
              <div>
                <FullscreenExpand />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
