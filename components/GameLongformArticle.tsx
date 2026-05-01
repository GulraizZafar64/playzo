import Link from "next/link";
import { buildGameLongformArticle } from "@/lib/game-longform-seo";
import { shuffleArraySeeded } from "@/lib/shuffle-array";
import type { Game } from "@/lib/types";
import { SITE_NAME } from "@/lib/site-brand";

const RAIL_COUNT = 6;

type Props = {
  slug: string;
  name: string;
  genre: string;
  games?: Game[];
};

export default function GameLongformArticle({ slug, name, genre, games }: Props) {
  const { sections, wordCount } = buildGameLongformArticle({
    slug,
    name,
    genre,
    siteName: SITE_NAME,
  });

  const railPicks =
    games && games.length > 1
      ? shuffleArraySeeded(
          games.filter((g) => g.slug !== slug),
          `longform-rail:${slug}`,
        ).slice(0, RAIL_COUNT)
      : [];

  return (
    <article
      className="game-longform-article"
      aria-labelledby="game-longform-heading"
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="wordCount" content={String(wordCount)} />
      <div className="row g-3 g-lg-4 align-items-start game-longform-layout">
        <div className="col-12 col-lg-7 col-xl-8">
          <h2 id="game-longform-heading" className="h4 mb-2 text-accent game-longform-heading">
            In-depth guide: playing {name} online
          </h2>
          <p className="small text-muted mb-3 game-longform-meta" style={{ opacity: 0.85 }}>
            Compact guide · {wordCount.toLocaleString()} words · {genre}
          </p>
          <div className="game-longform-prose">
            {sections.map((sec, si) => (
              <section key={si} className="game-longform-section" aria-labelledby={`game-lf-sec-${si}`}>
                <h3 id={`game-lf-sec-${si}`} className="h6 game-longform-section-title mb-2">
                  {sec.heading}
                </h3>
                {sec.paragraphs.map((p, pi) => (
                  <p key={pi} className="game-longform-p mb-0" style={{ lineHeight: 1.75 }}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>

        {railPicks.length > 0 ? (
          <aside className="col-12 col-lg-5 col-xl-4" aria-label="Random game picks">
            <p className="game-longform-rail__label">Random picks</p>
            <div className="game-longform-rail__grid">
              {railPicks.map((g) => (
                <Link key={g.slug} href={`/game/${g.slug}`} className="game-longform-rail-card">
                  <div className="game-longform-rail-thumb">
                    <img src={g.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
                  </div>
                  <span className="game-longform-rail-name">{g.name}</span>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
