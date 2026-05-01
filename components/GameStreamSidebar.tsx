import GameStreamLikeRow from "@/components/GameStreamLikeRow";
import { categoryForSlug, ratingForSlug, slugHash } from "@/lib/game-card-utils";
import type { Game } from "@/lib/types";

import { SITE_NAME } from "@/lib/site-brand";

type Props = { game: Game };

const EXTRA_TAGS = ["Browser", "HTML5", "Free to play", "No install", "Unblocked"] as const;

function starFillClass(rating: number, index: number): string {
  const frac = rating - index;
  if (frac >= 0.85) return "fa fa-star game-stream-star--on";
  if (frac >= 0.2) return "fa fa-star-half-o game-stream-star--on";
  return "fa fa-star-o game-stream-star--off";
}

export default function GameStreamSidebar({ game }: Props) {
  const genre = categoryForSlug(game.slug, game.name);
  const rating = Number.parseFloat(ratingForSlug(game.slug));
  const tagPick = EXTRA_TAGS[(slugHash(game.slug) >> 3) % EXTRA_TAGS.length];
  const tagPick2 = EXTRA_TAGS[(slugHash(game.slug) >> 7) % EXTRA_TAGS.length];
  const desc =
    game.description?.trim() ||
    `${game.name} runs in your browser on ${SITE_NAME}. Jump in for quick ${genre.toLowerCase()} rounds—no download, built for school-friendly breaks when your network allows games.`;

  const accordionId = `game-stream-acc-${game.slug.replace(/[^a-z0-9-]/gi, "")}`;

  return (
    <aside className="game-stream-sidebar" aria-label="Game overview and details">
      <div className="game-stream-card">
        <div className="game-stream-poster">
          <img src={game.thumb ?? "/assets/img/logo.png"} alt="" width={320} height={320} loading="eager" />
        </div>
        <div className="game-stream-tags">
          <span className="game-stream-tag">{genre}</span>
          <span className="game-stream-tag">{tagPick}</span>
          <span className="game-stream-tag">{tagPick2}</span>
        </div>
        <div className="game-stream-rating-row" aria-label={`Rating ${rating} out of 5`}>
          <span className="game-stream-stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} className={starFillClass(rating, i)} aria-hidden />
            ))}
          </span>
          <span className="game-stream-rating-text">
            {rating.toFixed(1)} / 5.0
          </span>
        </div>
        <p className="game-stream-card-desc">{desc}</p>
        <GameStreamLikeRow game={game} />
      </div>

      <div className="accordion game-stream-accordion" id={accordionId}>
        <div className="accordion-item game-stream-acc-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button game-stream-acc-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${accordionId}-htp`}
              aria-expanded="true"
              aria-controls={`${accordionId}-htp`}
            >
              How to play
            </button>
          </h2>
          <div
            id={`${accordionId}-htp`}
            className="accordion-collapse collapse show"
            data-bs-parent={`#${accordionId}`}
          >
            <div className="accordion-body game-stream-acc-body">
              <div className="game-stream-htp-grid">
                <div className="game-stream-htp-cell">
                  <i className="fa fa-keyboard-o game-stream-htp-icon" aria-hidden />
                  <div>
                    <span className="game-stream-htp-key">W A S D</span>
                    <span className="game-stream-htp-label">Move</span>
                  </div>
                </div>
                <div className="game-stream-htp-cell">
                  <i className="fa fa-mouse-pointer game-stream-htp-icon" aria-hidden />
                  <div>
                    <span className="game-stream-htp-key">Click</span>
                    <span className="game-stream-htp-label">Aim / interact</span>
                  </div>
                </div>
                <div className="game-stream-htp-cell">
                  <i className="fa fa-square-o game-stream-htp-icon" aria-hidden />
                  <div>
                    <span className="game-stream-htp-key">Space</span>
                    <span className="game-stream-htp-label">Jump / action</span>
                  </div>
                </div>
                <div className="game-stream-htp-cell">
                  <i className="fa fa-key game-stream-htp-icon" aria-hidden />
                  <div>
                    <span className="game-stream-htp-key">E / F</span>
                    <span className="game-stream-htp-label">Use / reload</span>
                  </div>
                </div>
              </div>
              <p className="game-stream-htp-note">
                Controls vary by title—check in-game hints. Fullscreen and refresh are in the player bar below.
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item game-stream-acc-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed game-stream-acc-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${accordionId}-det`}
              aria-expanded="false"
              aria-controls={`${accordionId}-det`}
            >
              Game details
            </button>
          </h2>
          <div
            id={`${accordionId}-det`}
            className="accordion-collapse collapse"
            data-bs-parent={`#${accordionId}`}
          >
            <div className="accordion-body game-stream-acc-body">
              <dl className="game-stream-dl">
                <div className="game-stream-dl-row">
                  <dt>Developer</dt>
                  <dd>Browser catalog</dd>
                </div>
                <div className="game-stream-dl-row">
                  <dt>Release</dt>
                  <dd>Web (ongoing)</dd>
                </div>
                <div className="game-stream-dl-row">
                  <dt>Platform</dt>
                  <dd>Web browser (HTML5)</dd>
                </div>
                <div className="game-stream-dl-row">
                  <dt>Genre</dt>
                  <dd>{genre}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
