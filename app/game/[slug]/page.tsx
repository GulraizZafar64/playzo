import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameStreamPlayer from "@/components/GameStreamPlayer";
import GameStreamSidebar from "@/components/GameStreamSidebar";
import GameLongformArticle from "@/components/GameLongformArticle";
import GameSuggestionsRow from "@/components/GameSuggestionsRow";
import { loadGames } from "@/lib/load-games";
import { getSiteUrl } from "@/lib/site-url";
import { getGameDescription } from "@/lib/game-descriptions";
import { getGameSeoKeywords } from "@/lib/game-seo-article";
import { categoryForSlug } from "@/lib/game-card-utils";

function HowToPlayContent({ text }: { text: string }) {
  const lines = text
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const allBullets = lines.length > 0 && lines.every((l) => /^-\s/.test(l));
  if (allBullets) {
    return (
      <ul className="list-unstyled mb-4">
        {lines.map((line, i) => (
          <li key={i} className="mb-2 d-flex align-items-start">
            <span className="me-2 text-accent" style={{ fontWeight: "bold" }}>
              •
            </span>
            <span>{line.replace(/^-\s*/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mb-4">{text}</p>;
}

export function generateStaticParams() {
  return loadGames().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = loadGames().find((g) => g.slug === params.slug);
  if (!game) return {};
  
  const descData = getGameDescription({
    slug: game.slug,
    title: game.name,
    genre: game.category || categoryForSlug(game.slug, game.name),
    catalogDescription: game.description,
  });

  const description = descData.metaDescription;
  const ogImages =
    game.thumb && game.thumb.length > 0
      ? [{ url: game.thumb, alt: `${game.name} thumbnail` }]
      : undefined;
  const keywords = getGameSeoKeywords(game).slice(0, 16);

  return {
    title: game.title,
    description,
    keywords,
    alternates: {
      canonical: `/game/${game.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: game.title,
      description,
      type: "website",
      url: `/game/${game.slug}`,
      images: ogImages,
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title: game.title,
      description,
      images: ogImages?.map((i) => i.url),
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const all = loadGames();
  const game = all.find((g) => g.slug === params.slug);
  if (!game || !game.iframeUrl) {
    notFound();
  }

  const descData = getGameDescription({
    slug: game.slug,
    title: game.name,
    genre: game.category || categoryForSlug(game.slug, game.name),
    catalogDescription: game.description,
  });

  const pageUrl = `${getSiteUrl().replace(/\/$/, "")}/game/${game.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    description: descData.metaDescription,
    genre: descData.genre,
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    url: pageUrl,
    image: game.thumb || undefined,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="container-fluid px-2 px-sm-3 py-3 playverse-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="game-container">
        <div className="row g-3 g-xl-4 game-stream-layout">
          <div className="col-12 col-xl-8 game-content">
            <GameStreamPlayer game={game} shareUrl={pageUrl} />
          </div>
          <div className="col-12 col-xl-4">
            <GameStreamSidebar game={game} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="info-the-game game-about-panel" id="game-description-block">
              <div className="game-about-panel__intro">
                <span className="game-about-panel__eyebrow">About this game</span>
                <h2 className="game-about-panel__title">About {game.name}</h2>
                <p className="game-about-panel__lead">{descData.description}</p>
              </div>

              <GameLongformArticle slug={game.slug} name={game.name} genre={descData.genre} games={all} />

              <div className="row g-4 mt-2 game-about-panel__columns">
                <div className="col-lg-6">
                  <h2 className="h4 mb-3 game-about-panel__section-title game-about-panel__section-title--accent">How to Play</h2>
                  <HowToPlayContent text={descData.howToPlay} />
                  
                  <h3 className="h5 mb-2">Who Is {game.name} For?</h3>
                  <p className="mb-0">{descData.audience}</p>
                </div>
                
                <div className="col-lg-6">
                  <h2 className="h4 mb-3 game-about-panel__section-title game-about-panel__section-title--accent2">Tips & Strategies</h2>
                  <ul className="list-unstyled">
                    {descData.tips.map((tip, i) => (
                      <li key={i} className="mb-2 d-flex align-items-start">
                        <span className="me-2 text-accent" style={{ fontWeight: 'bold' }}>•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top border-secondary">
                 <p className="mb-0">
                    Discover more <a href={`/category/${descData.relatedGenre}`} className="text-accent text-decoration-underline" style={{ fontWeight: '500' }}>{descData.genre} games</a> to play online for free.
                 </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GameSuggestionsRow games={all} currentSlug={game.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
