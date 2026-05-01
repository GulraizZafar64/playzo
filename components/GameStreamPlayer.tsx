import GameStreamPlayerShell from "@/components/GameStreamPlayerShell";
import type { Game } from "@/lib/types";

import { SITE_NAME } from "@/lib/site-brand";

type Props = {
  game: Game;
  shareUrl: string;
};

export default function GameStreamPlayer({ game, shareUrl }: Props) {
  return (
    <div className="game-stream-main">
      <header className="game-stream-hero">
        <p className="game-stream-eyebrow">Now playing</p>
        <h1 className="game-stream-title">{game.name}</h1>
        <p className="game-stream-subline">
          Instant HTML5 · {SITE_NAME}
        </p>
      </header>

      <GameStreamPlayerShell game={game} shareUrl={shareUrl} />
    </div>
  );
}
