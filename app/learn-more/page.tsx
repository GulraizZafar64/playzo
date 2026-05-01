import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: `How ${SITE_NAME} works`,
  description: `How search, categories, and pagination work on ${SITE_NAME}. Play HTML5 games in your browser with no install — keyboard shortcuts and tips.`,
  path: "/learn-more",
});

export default function LearnMorePage() {
  return (
    <div className="container-fluid px-2 px-sm-3 py-4 py-md-5 playverse-page learn-more-page">
      <nav className="mb-3" aria-label="Breadcrumb">
        <Link href="/" className="learn-more-back">
          ← Back to home
        </Link>
      </nav>

      <header className="learn-more-hero mb-4 mb-md-5">
        <h1 className="learn-more-h1">How this site works</h1>
        <p className="learn-more-lead">
          {SITE_NAME} is built for fast discovery: search or pick a category, open any game, and play in your browser
          — no install, no signup required.
        </p>
      </header>

      <section className="learn-more-section" id="search" aria-labelledby="h-search">
        <h2 id="h-search" className="learn-more-h2">
          <i className="fa fa-search" aria-hidden /> Search
        </h2>
        <p>
          Click the <strong>search icon</strong> in the header (or press <kbd className="learn-more-kbd">Ctrl</kbd> +{" "}
          <kbd className="learn-more-kbd">K</kbd>) to open the search window, type a game name, then press Enter or tap
          the search icon to open legacy results. Results match the original catalog pages so you can jump straight to
          what you want.
        </p>
      </section>

      <section className="learn-more-section" id="categories" aria-labelledby="h-cat">
        <h2 id="h-cat" className="learn-more-h2">
          <i className="fa fa-th-large" aria-hidden /> Categories
        </h2>
        <p>
          Browse <Link href="/#categories">by category</Link> — action, puzzle, racing, sports, and more. Each category
          page lists games that fit that style so you can explore without guessing.
        </p>
      </section>

      <section className="learn-more-section" id="play" aria-labelledby="h-play">
        <h2 id="h-play" className="learn-more-h2">
          <i className="fa fa-play-circle" aria-hidden /> Instant play
        </h2>
        <p>
          Pick a game, hit play, and the title loads in-page. Works in modern desktop and mobile browsers; we add new
          games regularly so check back often.
        </p>
      </section>

      <p className="learn-more-cta-wrap mt-4">
        <Link href="/#all-games" className="btn learn-more-cta">
          Start playing
        </Link>
      </p>
    </div>
  );
}
