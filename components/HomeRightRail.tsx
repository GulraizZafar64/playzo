"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HomeRailRecentSnap from "@/components/HomeRailRecentSnap";
import { shuffleArray } from "@/lib/shuffle-array";
import type { Game } from "@/lib/types";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
type Props = { games: Game[] };

export default function HomeRightRail({ games }: Props) {
  const [trending, setTrending] = useState<Game[]>(() => games.slice(0, 5));

  useEffect(() => {
    if (!games.length) {
      setTrending([]);
      return;
    }
    setTrending(shuffleArray([...games]).slice(0, 5));
  }, [games]);

  return (
    <aside className="playzo-rail" aria-label="Promotions and trending games">
      <div className="playzo-promo playzo-promo--trophy">
        <p className="playzo-promo-adlabel">Advertisement</p>
        <h3 className="playzo-promo-title">
          Want to be <span className="playzo-promo-em">the best?</span>
        </h3>
        <p className="playzo-promo-text">
          See how search, categories, and instant play work — then jump into {PUBLIC_CATALOG_SIZE_LABEL} titles.
        </p>
        <Link href="/learn-more" className="playzo-promo-btn">
          Learn more
        </Link>
        <span className="playzo-promo-icon" aria-hidden>
          <i className="fa fa-trophy" />
        </span>
      </div>

      <HomeRailRecentSnap />

      <div className="playzo-trending-panel">
        <div className="playzo-trending-top">
          <h3 className="playzo-trending-heading">Trending now</h3>
          <Link href="/category/trending" className="playzo-trending-viewall">
            View all
          </Link>
        </div>
        <ol className="playzo-trending-list">
          {trending.map((g, i) => (
            <li key={g.slug}>
              <Link href={`/game/${g.slug}`} className="playzo-trending-row">
                <span className={`playzo-trending-rank ${i < 3 ? "playzo-trending-rank--top" : ""}`}>
                  {i + 1}
                </span>
                <div className="playzo-trending-thumb">
                  <img src={g.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
                </div>
                <span className="playzo-trending-name">{g.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="playzo-promo playzo-promo--pad">
        <p className="playzo-promo-adlabel">Advertisement</p>
        <h3 className="playzo-promo-title">
          Level up your <span className="playzo-promo-em">skills!</span>
        </h3>
        <p className="playzo-promo-text">
          New games weekly. Bookmarks, categories, and one-click play — built for quick breaks.
        </p>
        <Link href="/learn-more#play" className="playzo-promo-btn playzo-promo-btn--alt">
          Join now
        </Link>
        <span className="playzo-promo-icon playzo-promo-icon--pad" aria-hidden>
          <i className="fa fa-gamepad" />
        </span>
      </div>
    </aside>
  );
}
