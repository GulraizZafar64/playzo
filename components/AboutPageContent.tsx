import Link from "next/link";
import AboutImageCarousel from "./AboutImageCarousel";
import SiteEditorialArticle from "@/components/SiteEditorialArticle";
import { buildAboutEditorial } from "@/lib/site-editorial-seo";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";

export default function AboutPageContent() {
  const aboutDeep = buildAboutEditorial(SITE_NAME);

  return (
    <div className="about-page">
      <section className="about-mission" aria-labelledby="about-mission-heading">
        <p className="about-eyebrow">Our Mission</p>
        <h1 id="about-mission-heading" className="about-mission-title">
          About {SITE_NAME} — premium browser gaming
        </h1>
        <div className="about-mission-body">
          <p>
            Welcome to {SITE_NAME}, a premier destination for high-quality, unblocked browser games. Launched with a mission to provide students, casual players, and gaming enthusiasts with a safe and accessible platform, we host a curated catalog of {PUBLIC_CATALOG_SIZE_LABEL} games that range from high-octane shooters to brain-bending puzzles.
          </p>
          <p>
            We are an independent team of gaming enthusiasts dedicated to the &ldquo;web-native&rdquo; gaming experience. We believe that great games shouldn&apos;t require expensive hardware or massive downloads. {SITE_NAME} was built around the idea that fun should be just one click away, accessible from any device with a modern web browser.
          </p>
        </div>
      </section>

      <section className="about-split-band" aria-labelledby="about-diff-heading">
        <div className="about-split">
          <div className="about-split-copy">
            <p className="about-eyebrow">The {SITE_NAME} difference</p>
            <h2 id="about-diff-heading" className="about-split-title">
              Zero-Friction Fun for Everyone
            </h2>
            <div className="about-split-text">
              <p>
                Unlike many other game portals, {SITE_NAME} focuses on transparency and quality. Our philosophy is built on four core pillars:
              </p>
              <ul className="about-inline-list">
                <li><strong>No Installs:</strong> Every game runs directly in your browser without downloads.</li>
                <li><strong>No Accounts:</strong> Start playing immediately without giving away personal data.</li>
                <li><strong>School-Friendly:</strong> Optimized to work on restricted networks for students on break.</li>
                <li><strong>Curated Quality:</strong> We hand-pick games that are fun, functional, and safe.</li>
              </ul>
            </div>
          </div>
          <div className="about-split-visual">
            <AboutImageCarousel />
          </div>
        </div>
      </section>

      <section className="about-article" aria-labelledby="about-philosophy-heading">
        <h2 id="about-philosophy-heading" className="about-section-title">
          Our Editorial Philosophy
        </h2>
        <p>
          At {SITE_NAME}, we take quality seriously. Every game listed in our {PUBLIC_CATALOG_SIZE_LABEL} title catalog has been manually tested by our team to ensure it loads correctly and provides a fair gaming experience. We write original descriptions, accurately label genres, and verify that our embeds are from trusted publishers.
        </p>
        <p>
          We prioritize user experience and Google&apos;s E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) guidelines in every piece of content we publish. This means our descriptions are written by real players who have actually tested the games, and our site structure is designed to be accessible and easy to navigate for all users.
        </p>

        <h3 className="about-subhead">Authentic Gaming Experience</h3>
        <p>
          We describe {SITE_NAME} as a catalog of the best the web has to offer. We avoid sensational claims and instead focus on providing honest, helpful guides for every game. Whether you are looking for a quick five-minute break or a deep strategy session, our catalog is organized to help you find exactly what you need without the fluff or deceptive marketing found on other sites.
        </p>
      </section>

      <section className="about-editorial-deep mt-5 pt-4 border-top border-secondary">
        <SiteEditorialArticle
          eyebrow="Deep dive"
          title="Our operating principles — transparency, safety, and long-term trust"
          sections={aboutDeep.sections}
          wordCount={aboutDeep.wordCount}
        />
      </section>

      <section className="about-cta" aria-labelledby="about-cta-heading">
        <h2 id="about-cta-heading" className="about-cta-title">
          Tell us what you think
        </h2>
        <p className="about-cta-lead">
          We are always looking to improve our collection. If you have a game suggestion, technical issue, or a business inquiry, please reach out to us at <strong>exx3311@gmail.com</strong>.
        </p>
        <a className="btn home-cta-primary about-cta-btn" href="mailto:exx3311@gmail.com">
          Contact us
        </a>
      </section>
    </div>
  );
}

