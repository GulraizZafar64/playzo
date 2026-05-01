"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { shuffleArray } from "@/lib/shuffle-array";
import type { Game } from "@/lib/types";
import { categoryForSlug, ratingForSlug } from "@/lib/game-card-utils";

function truncate(s: string, max: number) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function BentoMiniCard({ game, accent }: { game: Game; accent: number }) {
  const cat = categoryForSlug(game.slug, game.name);
  const rating = ratingForSlug(game.slug);
  const blurb = truncate(game.description || game.title, 72);

  return (
    <Link href={`/game/${game.slug}`} className="bento-mini-link">
      <article className="bento-mini-card" data-accent={accent % 6}>
        <div className="bento-mini-media">
          <img src={game.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
          <span className="bento-mini-shine" aria-hidden />
          <span className="bento-mini-tag">{cat}</span>
        </div>
        <div className="bento-mini-body">
          <div className="bento-mini-row1">
            <h3 className="bento-mini-title">{game.name}</h3>
            <span className="bento-mini-rating">
              <i className="fa fa-star" aria-hidden />
              {rating}
            </span>
          </div>
          <p className="bento-mini-desc">{blurb}</p>
          <span className="bento-mini-cta">Play now</span>
        </div>
      </article>
    </Link>
  );
}

function EditorPickCard({ game }: { game: Game }) {
  const cat = categoryForSlug(game.slug, game.name);

  return (
    <div className="bento-editor-wrap">
      <Link href={`/game/${game.slug}`} className="bento-editor-link">
        <article className="bento-editor-card">
          <div className="bento-editor-media">
            <img src={game.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="bento-editor-inner">
            <span className="bento-editor-tag">Editor&apos;s pick</span>
            <h2 className="bento-editor-title">{game.name}</h2>
            <div className="bento-editor-meta">
              <span className="bento-editor-stars" aria-hidden>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </span>
              <span className="bento-editor-genre">{cat}</span>
            </div>
            <p className="bento-editor-lead">{truncate(game.description || game.title, 120)}</p>
            <span className="bento-editor-cta">Launch sequence</span>
          </div>
        </article>
      </Link>
    </div>
  );
}

type Props = { games: Game[] };

export default function HomeEditorBento({ games }: Props) {
  const [pool, setPool] = useState<Game[]>(games);

  useEffect(() => {
    if (games.length) setPool(shuffleArray([...games]));
  }, [games]);

  if (!pool.length) return null;

  const grid = pool.slice(0, 6);
  const featured = pool[6] ?? pool[0];

  return (
    <section className="home-editor-bento" aria-labelledby="bento-heading">
      <div className="home-editor-bento-shell">
        <div className="home-editor-bento-head">
          <p className="home-editor-bento-eyebrow">Curated for you</p>
          <h2 id="bento-heading" className="home-editor-bento-title">
            Featured &amp; new
          </h2>
          <p className="home-editor-bento-lead">
            Colorful picks in a tight grid — editor spotlight with one-tap play.
          </p>
        </div>
        <div className="row g-3 g-lg-4 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="row row-cols-2 row-cols-md-3 g-3">
              {grid.map((g, i) => (
                <div key={g.slug} className="col">
                  <BentoMiniCard game={g} accent={i} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-4 d-flex">
            <EditorPickCard game={featured} />
          </div>
        </div>
      </div>
    </section>
  );
}
