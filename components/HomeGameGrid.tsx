"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { shuffleArray } from "@/lib/shuffle-array";
import type { Game } from "@/lib/types";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import GameCatalogCard from "./GameCatalogCard";

const PAGE_SIZE = 150;

function clampPage(n: number, max: number) {
  if (!Number.isFinite(n) || n < 1) return 1;
  if (n > max) return max;
  return Math.floor(n);
}

function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  const push = (p: number | "ellipsis") => pages.push(p);

  push(1);
  const windowStart = Math.max(2, current - 2);
  const windowEnd = Math.min(total - 1, current + 2);

  if (windowStart > 2) push("ellipsis");
  for (let p = windowStart; p <= windowEnd; p++) push(p);
  if (windowEnd < total - 1) push("ellipsis");
  if (total > 1) push(total);

  return pages;
}

type Props = { initialGames: Game[] };

export default function HomeGameGrid({ initialGames }: Props) {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>(initialGames);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setGames(shuffleArray([...initialGames]));
  }, [initialGames]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(games.length / PAGE_SIZE)),
    [games.length]
  );

  useEffect(() => {
    const sync = () => {
      const raw = parseInt(new URLSearchParams(window.location.search).get("page") ?? "1", 10);
      setCurrentPage(clampPage(raw, totalPages));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [totalPages]);

  const pageGames = useMemo(() => {
    if (!games.length) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    return games.slice(start, start + PAGE_SIZE);
  }, [games, currentPage]);

  const goToPage = useCallback(
    (p: number) => {
      const next = clampPage(p, totalPages);
      const href = next <= 1 ? "/" : `/?page=${next}`;
      router.push(href, { scroll: false });
      setCurrentPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, totalPages]
  );

  const pageNumbers = useMemo(() => buildPageList(currentPage, totalPages), [currentPage, totalPages]);

  const rangeStart = games.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const rangeEnd = games.length ? Math.min(currentPage * PAGE_SIZE, games.length) : 0;

  if (!games.length) {
    return (
      <p className="home-catalog-error" role="alert">
        No games in catalog. Run <code>npm run generate-games</code> and redeploy.
      </p>
    );
  }

  return (
    <>
      <div className="home-game-grid-wrap">
        <div className="row g-2 g-sm-3">
          {pageGames.map((g, idx) => {
            const globalIndex = (currentPage - 1) * PAGE_SIZE + idx;
            return (
              <div key={g.slug} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <GameCatalogCard game={g} globalIndex={globalIndex} compact />
              </div>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <nav className="home-pagination" aria-label="Game list pages">
          <p className="home-pagination-meta">
            Showing{" "}
            <strong>
              {rangeStart}–{rangeEnd}
            </strong>{" "}
            of <strong>{PUBLIC_CATALOG_SIZE_LABEL}</strong> games · Page <strong>{currentPage}</strong> of{" "}
            <strong>{totalPages}</strong>
          </p>
          <div className="home-pagination-controls">
            <button
              type="button"
              className="home-pg-btn"
              disabled={currentPage <= 1}
              onClick={() => goToPage(1)}
              aria-label="First page"
            >
              «
            </button>
            <button
              type="button"
              className="home-pg-btn"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
            >
              Previous
            </button>
            <div className="home-pg-numbers">
              {pageNumbers.map((item, i) =>
                item === "ellipsis" ? (
                  <span key={`e-${i}`} className="home-pg-ellipsis" aria-hidden>
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`home-pg-num${item === currentPage ? " is-active" : ""}`}
                    onClick={() => goToPage(item)}
                    aria-label={`Page ${item}`}
                    aria-current={item === currentPage ? "page" : undefined}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              className="home-pg-btn"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
            >
              Next
            </button>
            <button
              type="button"
              className="home-pg-btn"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(totalPages)}
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
