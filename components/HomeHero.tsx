"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";

const AUTO_MS = 2000;

type Slide = {
  key: string;
  bgClass: string;
  eyebrow: string;
  title: React.ReactNode;
  tagline: string;
  cta: { href: string; label: string };
  headingLevel: "h1" | "h2";
};

function buildSlides(): Slide[] {
  return [
    {
      key: "welcome",
      bgClass: "home-hero-slide-panel--a",
      eyebrow: "Level up your reality",
      title: <span className="home-hero-script">{SITE_NAME}</span>,
      tagline: `${PUBLIC_CATALOG_SIZE_LABEL} games. No download. Just play.`,
      cta: { href: "/#all-games", label: "Explore games" },
      headingLevel: "h1",
    },
    {
      key: "browse",
      bgClass: "home-hero-slide-panel--b",
      eyebrow: "Find your next obsession",
      title: (
        <>
          <span className="home-hero-script">Browse</span> <span className="home-hero-x">by mood</span>
        </>
      ),
      tagline: "Action, puzzle, racing, sports, and more — pick a category or scroll the full catalog.",
      cta: { href: "/#categories", label: "View categories" },
      headingLevel: "h2",
    },
    {
      key: "instant",
      bgClass: "home-hero-slide-panel--c",
      eyebrow: "In your browser",
      title: (
        <>
          <span className="home-hero-script">Instant</span> <span className="home-hero-x">play</span>
        </>
      ),
      tagline: "No installs, no waiting — jump in from Chrome, Edge, or Safari.",
      cta: { href: "/#all-games", label: "Start playing" },
      headingLevel: "h2",
    },
    {
      key: "fresh",
      bgClass: "home-hero-slide-panel--d",
      eyebrow: "Always updating",
      title: (
        <>
          <span className="home-hero-script">Fresh</span> <span className="home-hero-x">picks</span>
        </>
      ),
      tagline: "New titles and seasonal spotlights rotate in — check back often.",
      cta: { href: "/category/trending", label: "See what’s hot" },
      headingLevel: "h2",
    },
  ];
}

export default function HomeHero() {
  const slides = useMemo(() => buildSlides(), []);
  const [active, setActive] = useState(0);
  const pauseRef = useRef(false);
  const n = slides.length;

  const go = useCallback(
    (idx: number) => {
      setActive(((idx % n) + n) % n);
    },
    [n],
  );

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      if (!pauseRef.current) setActive((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <section
      className="home-hero-pro home-hero-pro--compact home-hero-pro--carousel"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      <div className="home-hero-carousel-viewport">
        {slides.map((s, i) => {
          const HeadingTag = s.headingLevel;
          return (
            <article
              key={s.key}
              className={`home-hero-slide-panel ${s.bgClass}${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
              id={`home-hero-slide-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
            >
              <div className="container position-relative">
                <p className="home-hero-eyebrow">{s.eyebrow}</p>
                <HeadingTag className="home-hero-display">{s.title}</HeadingTag>
                <p className="home-hero-tagline">{s.tagline}</p>
                <div className="home-hero-cta-row">
                  <a className="btn home-cta-primary" href={s.cta.href}>
                    {s.cta.label}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="container position-relative home-hero-carousel-ui">
        <div className="home-hero-carousel-nav" role="group" aria-label="Carousel controls">
          <button type="button" className="home-hero-nav-btn" onClick={prev} aria-label="Previous slide">
            <i className="fa fa-chevron-left" aria-hidden />
          </button>
          <ul className="home-hero-dots" aria-label="Slide indicators">
            {slides.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  className={`home-hero-dot-btn${i === active ? " is-active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ul>
          <button type="button" className="home-hero-nav-btn" onClick={next} aria-label="Next slide">
            <i className="fa fa-chevron-right" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
