import { SITE_NAME } from "@/lib/site-brand";

export default function HomeSeoAiSection() {
  return (
    <div className="home-seo-ai">
      <section className="home-ai-panel" aria-labelledby="ai-heading">
        <h2 id="ai-heading" className="home-seo-block-title">
          Search and ranking (how results are ordered)
        </h2>
        <p className="home-seo-block-lead">
          The header search ranks matches by title similarity and light heuristics—shorter names surface first when they
          align with your query. Categories apply a fixed filter; they do not learn from past clicks. Nothing here trains
          on personal accounts because we do not run sign-ins for discovery.
        </p>
      </section>

      <section className="home-seo-faq" aria-labelledby="seo-heading">
        <h2 id="seo-heading" className="home-seo-block-title">
          Unblocked games &amp; browser play (FAQ)
        </h2>
        <div className="home-seo-faq-grid">
          <div>
            <h3 className="home-seo-q">What are unblocked games?</h3>
            <p className="home-seo-a">
              Usually: web games that run without a local install, which helps on locked-down PCs. Whether a title works
              on your network still depends on firewall rules—{SITE_NAME} does not bypass IT policy.
            </p>
          </div>
          <div>
            <h3 className="home-seo-q">Do I need to install anything?</h3>
            <p className="home-seo-a">
              No installer from us. You click through to the publisher&apos;s web build inside the page. If it fails,
              try another game or check that your connection allows the publisher&apos;s domain.
            </p>
          </div>
          <div>
            <h3 className="home-seo-q">Is {SITE_NAME} free?</h3>
            <p className="home-seo-a">
              Yes — playing listed games costs nothing on our side. Partner ads may appear; they help cover hosting.
            </p>
          </div>
          <div>
            <h3 className="home-seo-q">How do I find new games?</h3>
            <p className="home-seo-a">
              Open search (including the keyboard shortcut shown in the intro strip), browse a category chip, or page
              through the full grid—lists update as we add verified entries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
