import Link from "next/link";
import type { Game } from "@/lib/types";
import { shuffleArraySeeded } from "@/lib/shuffle-array";

export default function GameSuggestionsRow({ games, currentSlug }: { games: Game[]; currentSlug: string }) {
  const pool = games.filter((g) => g.slug !== currentSlug);
  const items = shuffleArraySeeded(pool, `more-games:${currentSlug}`).slice(0, 24);

  if (!items.length) return null;

  return (
    <section className="game-suggestions" aria-labelledby="more-games-heading">
      <h2 id="more-games-heading" className="game-suggestions-title">
        More games
      </h2>
      <div className="game-suggestions-scroll">
        {items.map((g) => (
          <Link key={g.slug} href={`/game/${g.slug}`} className="game-suggestions-card">
            <div className="game-suggestions-thumb">
              <img src={g.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
            </div>
            <span className="game-suggestions-name">{g.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
