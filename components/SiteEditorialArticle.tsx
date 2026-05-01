import type { EditorialSection } from "@/lib/site-editorial-seo";

type Props = {
  eyebrow?: string;
  title: string;
  sections: EditorialSection[];
  wordCount: number;
  className?: string;
};

export default function SiteEditorialArticle({ eyebrow, title, sections, wordCount, className }: Props) {
  return (
    <section
      className={`site-editorial-article ${className ?? ""}`}
      aria-labelledby="site-editorial-main-h"
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="wordCount" content={String(wordCount)} />
      {eyebrow ? <p className="site-editorial-eyebrow text-accent small fw-bold text-uppercase mb-2">{eyebrow}</p> : null}
      <h2 id="site-editorial-main-h" className="h3 mb-2">
        {title}
      </h2>
      <p className="small text-muted mb-3" style={{ opacity: 0.85 }}>
        {wordCount <= 250 ? "Short guide" : "Original editorial"} · {wordCount.toLocaleString()} words
      </p>
      <div className="site-editorial-prose">
        {sections.map((sec, si) => (
          <div key={si} className="site-editorial-block mb-4">
            <h3 className="h6 text-uppercase mb-3" style={{ letterSpacing: "0.06em", color: "var(--accent-2)" }}>
              {sec.heading}
            </h3>
            {sec.paragraphs.map((p, pi) => (
              <p key={pi} className="mb-3" style={{ lineHeight: 1.75 }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
