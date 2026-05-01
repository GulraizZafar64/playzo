"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import type { Game } from "@/lib/types";

const SAMPLE_TAGS = ["Action", "Arcade", "Puzzle", "Racing", "Sports", "Strategy"];

function pickTag(i: number) {
  return SAMPLE_TAGS[i % SAMPLE_TAGS.length];
}

type Props = { games: Game[] };

export default function HomeTrendingRow({ games }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.min(el.clientWidth * 0.85, 420) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  if (!games.length) return null;

  return (
    <section className="home-trending" aria-labelledby="trending-heading">
      <div className="container">
        <div className="home-trending-head">
          <div>
            <p className="home-section-kicker">Live stream</p>
            <h2 id="trending-heading" className="home-trending-title">
              Trending now
            </h2>
          </div>
          <div className="home-trending-nav-btns" role="group" aria-label="Scroll trending">
            <button type="button" className="home-carousel-btn" onClick={() => scrollByDir(-1)} aria-label="Previous">
              ‹
            </button>
            <button type="button" className="home-carousel-btn" onClick={() => scrollByDir(1)} aria-label="Next">
              ›
            </button>
          </div>
        </div>

        <div className="home-trending-scroller" ref={scrollerRef}>
          {games.map((g, i) => (
            <article key={g.slug} className="home-trend-card">
              <Link href={`/game/${g.slug}`} className="home-trend-card-link">
                <div className="home-trend-thumb-wrap">
                  <img src={g.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
                  <span className="home-trend-tag-btn">{pickTag(i)}</span>
                </div>
                <div className="home-trend-body">
                  <div className="home-trend-title-row">
                    <h3 className="home-trend-title">{g.name}</h3>
                    <span className="home-trend-status">
                      <span className="home-trend-dot" aria-hidden />
                      Live
                    </span>
                  </div>
                  <p className="home-trend-meta">{(12 + (i % 8) * 3.7).toFixed(1)}k active players</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
