import type { Metadata } from "next";
import HomeBrowseCategoryGrid from "@/components/HomeBrowseCategoryGrid";
import HomeFeatureEndCards from "@/components/HomeFeatureEndCards";
import HomeGameGridShell from "@/components/HomeGameGridShell";
import HomeHero from "@/components/HomeHero";
import HomeIntroBand from "@/components/HomeIntroBand";
import HomeSeoAiSection from "@/components/HomeSeoAiSection";
import HomeSeoHumanSection from "@/components/HomeSeoHumanSection";
import HomeEditorBento from "@/components/HomeEditorBento";
import HomeRightRail from "@/components/HomeRightRail";
import SiteEditorialArticle from "@/components/SiteEditorialArticle";
import { loadGames } from "@/lib/load-games";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { buildHomeMetadata } from "@/lib/site-metadata";
import { buildHomeEditorial } from "@/lib/site-editorial-seo";

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  const initialGames = loadGames();
  const homeEditorial = buildHomeEditorial(SITE_NAME);

  return (
    <div className="container-fluid px-2 px-sm-3 py-3 playverse-page">
      <div className="row g-3 g-xl-4">
        <div className="col-12 col-xl-8 col-xxl-9 playverse-home-main">
          <HomeHero />
          <HomeEditorBento games={initialGames} />
          <HomeIntroBand />
          <div className="home-browse-cats-breakout">
            <HomeBrowseCategoryGrid />
          </div>

          <section className="home-games-section" id="all-games">
            <div className="home-section-head home-section-head--reverse">
              <h2 className="home-section-title">
                <i className="fa fa-star" aria-hidden />
                <span>All games</span>
              </h2>
              <p className="home-section-sub">Browse the full catalog — 150 titles per page.</p>
            </div>

            <HomeGameGridShell initialGames={initialGames} />
          </section>

          <HomeFeatureEndCards />
          
          <section className="home-content-deep mt-5 mb-5 pb-5">
            <div className="row g-4">
              <div className="col-md-6">
                <h2 className="h4 mb-4 text-accent">Why choose {SITE_NAME}?</h2>
                <div className="mb-4">
                  <h3 className="h6 mb-2">🚀 Instant Browser Play</h3>
                  <p className="small opacity-75">No downloads, no installations, and no waiting. Every game is optimized for HTML5 and loads instantly in any modern browser, including Chrome, Safari, and Edge.</p>
                </div>
                <div className="mb-4">
                  <h3 className="h6 mb-2">🛡️ Safe & Curated</h3>
                  <p className="small opacity-75">We manually review every title to ensure it meets our quality standards. Our library is designed to be a safe haven for students and casual gamers looking for distraction-free entertainment.</p>
                </div>
                <div className="mb-4">
                  <h3 className="h6 mb-2">🔍 Easy Discovery</h3>
                  <p className="small opacity-75">
                    With {PUBLIC_CATALOG_SIZE_LABEL} games, finding your next favorite is easy. Use our lightning-fast search modal or browse
                    through specific genres like Racing, Puzzle, and Strategy.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="h4 mb-4 text-accent">Frequently Asked Questions</h2>
                <div className="accordion accordion-flush playverse-faq-accordion" id="homeFaq">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-1">
                        Are these games really unblocked?
                      </button>
                    </h2>
                    <div id="faq-1" className="accordion-collapse collapse" data-bs-parent="#homeFaq">
                      <div className="accordion-body">
                        Yes! {SITE_NAME} is specifically curated to provide games that work in restrictive network environments like libraries or schools, focusing on clean HTML5 embeds that bypass standard filters.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-2">
                        Do I need an account to save progress?
                      </button>
                    </h2>
                    <div id="faq-2" className="accordion-collapse collapse" data-bs-parent="#homeFaq">
                      <div className="accordion-body">
                        No registration is required. We use local browser storage to keep track of your "Favorite" games, allowing you to build your own personal library without sharing any personal data.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-3">
                        Are the games free to play?
                      </button>
                    </h2>
                    <div id="faq-3" className="accordion-collapse collapse" data-bs-parent="#homeFaq">
                      <div className="accordion-body">
                        Everything on {SITE_NAME} is 100% free. We don't believe in paywalls or subscriptions—simply find a game you like and click play to start immediately.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-4">
                        Can I play these on my phone or tablet?
                      </button>
                    </h2>
                    <div id="faq-4" className="accordion-collapse collapse" data-bs-parent="#homeFaq">
                      <div className="accordion-body">
                        Most of our games are mobile-responsive HTML5 titles. While some complex simulations require a keyboard, thousands of our arcade, puzzle, and skill games work perfectly on touchscreens.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-5">
                        How often are new games added?
                      </button>
                    </h2>
                    <div id="faq-5" className="accordion-collapse collapse" data-bs-parent="#homeFaq">
                      <div className="accordion-body">
                        Our library of {PUBLIC_CATALOG_SIZE_LABEL} games is constantly growing. We add new, trending titles every single week to
                        ensure there&apos;s always something fresh to discover on the platform.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="home-editorial-shell mt-5 mb-5 pt-4 border-top border-secondary">
            <SiteEditorialArticle
              eyebrow="Editorial"
              title="How we run this arcade — mission, trust, and discovery"
              sections={homeEditorial.sections}
              wordCount={homeEditorial.wordCount}
            />
          </section>

          {/* <HomeSeoAiSection /> */}
          {/* <HomeSeoHumanSection /> */}
        </div>

        <div className="col-12 col-xl-4 col-xxl-3">
          <HomeRightRail games={initialGames} />
        </div>
      </div>
    </div>
  );
}
