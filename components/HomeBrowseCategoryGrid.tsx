"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BROWSE_CATEGORY_CARDS } from "@/lib/categories";
import { shuffleArray } from "@/lib/shuffle-array";

export default function HomeBrowseCategoryGrid() {
  const [cards, setCards] = useState(BROWSE_CATEGORY_CARDS);

  useEffect(() => {
    setCards(shuffleArray([...BROWSE_CATEGORY_CARDS]));
  }, []);

  return (
    <section className="home-browse-cats home-browse-cats--v2" id="categories" aria-labelledby="browse-cats-heading">
      <div className="container-fluid px-2 px-sm-3">
        <div className="home-browse-cats-head">
          <h2 id="browse-cats-heading" className="home-browse-cats-title-v2">
            Browse by Categories
          </h2>
          <Link href="/#all-games" className="home-browse-cats-viewall">
            View all
          </Link>
        </div>
        <div className="home-browse-cats-grid-v2">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className={`browse-cat-v2 ${c.grad}`}>
              <span className="browse-cat-v2-icon-ring" aria-hidden>
                <i className={`fa ${c.icon} browse-cat-v2-icon`} />
              </span>
              <span className="browse-cat-v2-label">{c.label}</span>
              <span className="browse-cat-v2-count">{c.gamesPlus} Games</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
