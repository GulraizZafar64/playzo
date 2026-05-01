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
    <aside className="playverse-rail" aria-label="Promotions and trending games">
      <div className="playverse-promo playverse-promo--trophy">
        <p className="playverse-promo-adlabel">Advertisement</p>
        <h3 className="playverse-promo-title">
          Want to be <span className="playverse-promo-em">the best?</span>
        </h3>
        <p className="playverse-promo-text">
          See how search, categories, and instant play work — then jump into {PUBLIC_CATALOG_SIZE_LABEL} titles.
        </p>
        <Link href="/learn-more" className="playverse-promo-btn">
          Learn more
        </Link>
        <span className="playverse-promo-icon" aria-hidden>
          <i className="fa fa-trophy" />
        </span>
      </div>

      <HomeRailRecentSnap />

      <div className="playverse-trending-panel">
        <div className="playverse-trending-top">
          <h3 className="playverse-trending-heading">Trending now</h3>
          <Link href="/category/trending" className="playverse-trending-viewall">
            View all
          </Link>
        </div>
        <ol className="playverse-trending-list">
          {trending.map((g, i) => (
            <li key={g.slug}>
              <Link href={`/game/${g.slug}`} className="playverse-trending-row">
                <span className={`playverse-trending-rank ${i < 3 ? "playverse-trending-rank--top" : ""}`}>
                  {i + 1}
                </span>
                <div className="playverse-trending-thumb">
                  <img src={g.thumb ?? "/assets/img/logo.png"} alt="" loading="lazy" decoding="async" />
                </div>
                <span className="playverse-trending-name">{g.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="playverse-promo playverse-promo--pad">
        <p className="playverse-promo-adlabel">Advertisement</p>
        <h3 className="playverse-promo-title">
          Level up your <span className="playverse-promo-em">skills!</span>
        </h3>
        <p className="playverse-promo-text">
          New games weekly. Bookmarks, categories, and one-click play — built for quick breaks.
        </p>
        <Link href="/learn-more#play" className="playverse-promo-btn playverse-promo-btn--alt">
          Join now
        </Link>
        <span className="playverse-promo-icon playverse-promo-icon--pad" aria-hidden>
          <i className="fa fa-gamepad" />
        </span>
      </div>
    </aside>
  );
}
