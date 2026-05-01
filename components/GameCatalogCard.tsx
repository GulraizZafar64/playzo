import Link from "next/link";
import type { Game } from "@/lib/types";
import { categoryForSlug, ratingForSlug } from "@/lib/game-card-utils";

type Props = {
  game: Game;
  globalIndex: number;
  compact?: boolean;
};

export default function GameCatalogCard({ game, globalIndex, compact }: Props) {
  const showNew = globalIndex < 36;
  const cat = categoryForSlug(game.slug, game.name);
  const rating = ratingForSlug(game.slug);

  return (
    <Link href={`/game/${game.slug}`} className="home-game-card-link">
      <article className={`home-catalog-card${compact ? " home-catalog-card--sm" : ""}`}>
        <div className="home-catalog-card-media">
          <img src={game.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
          <span className="home-catalog-cat">{cat}</span>
          {showNew ? (
            <span className="home-catalog-new">
              <i className="fa fa-star" aria-hidden />
              NEW
            </span>
          ) : null}
          <span className="home-catalog-rating">
            <i className="fa fa-star" aria-hidden />
            {rating}
          </span>

          <div className="home-catalog-hover" aria-hidden>
            <div className="home-catalog-play-ring">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="home-catalog-play-btn">PLAY NOW</span>
          </div>
        </div>
        <div className="home-catalog-body">
          <h3 className="home-catalog-title">{game.name}</h3>
        </div>
      </article>
    </Link>
  );
}
