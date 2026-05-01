"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/hero-bg.jpg", caption: "Players jumping in from school labs and living rooms" },
  { src: "/images/hero-slide-2.jpg", caption: "Quick sessions between classes — no installs" },
  { src: "/images/hero-slide-3.jpg", caption: "Controllers, keyboards, and touch — pick what works" },
  { src: "/images/hero-slide-4.jpg", caption: "A catalog that grows as we discover new titles" },
] as const;

const AUTO_MS = 4000;

export default function AboutImageCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="about-carousel" aria-roledescription="carousel" aria-label="Community highlights">
      <div className="about-carousel-viewport">
        <div className="about-carousel-play-fab" aria-hidden>
          <span className="fa fa-play" />
        </div>
        {SLIDES.map((s, i) => (
          <figure
            key={s.src}
            className={`about-carousel-slide${i === active ? " is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <img src={s.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            <figcaption className="about-carousel-caption">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="about-carousel-dots" role="group" aria-label="Slide indicators">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`about-carousel-dot${i === active ? " is-active" : ""}`}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
