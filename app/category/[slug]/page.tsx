import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomeGameGridShell from "@/components/HomeGameGridShell";
import { categoryTitleFromSlug, CATEGORY_SLUGS, gamesForCategorySlug } from "@/lib/category-filter";
import SiteEditorialArticle from "@/components/SiteEditorialArticle";
import { loadGames } from "@/lib/load-games";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { buildCategoryEditorial } from "@/lib/site-editorial-seo";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!CATEGORY_SLUGS.includes(params.slug)) return {};
  const label = categoryTitleFromSlug(params.slug);
  return pageMetadata({
    title: `${label} games — ${SITE_NAME}`,
    description: `Play free ${label.toLowerCase()} browser games on ${SITE_NAME}. Instant HTML5 — no install. This hub lists ${label} titles you can open in-tab; availability may vary by network.`,
    path: `/category/${params.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  if (!CATEGORY_SLUGS.includes(params.slug)) {
    notFound();
  }

  const all = loadGames();
  const games = gamesForCategorySlug(params.slug, all);
  const label = categoryTitleFromSlug(params.slug);
  const gridGames = games.length > 0 ? games : all;
  const showEmptyHint = games.length === 0;
  const categoryEditorial = buildCategoryEditorial(label, SITE_NAME);

  return (
    <div className="container-fluid px-2 px-sm-3 py-3 playzo-page category-page">
      <nav className="category-page-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="category-page-bc-sep" aria-hidden>
          /
        </span>
        <span className="category-page-bc-current">{label}</span>
      </nav>

      <header className="category-page-hero">
        <p className="category-page-eyebrow">Browse category</p>
        <h1 className="category-page-title">{label}</h1>
        <p className="category-page-sub">
          {showEmptyHint
            ? "No dedicated matches for this filter yet — showing the full catalog below. Try search or another tag."
            : `Browse ${label} picks below — part of our ${PUBLIC_CATALOG_SIZE_LABEL} title catalog. Click any card to play in your browser.`}
        </p>
      </header>

      <section className="category-page-grid-wrap" aria-labelledby="category-grid-heading">
        <h2 id="category-grid-heading" className="visually-hidden">
          {label} games grid
        </h2>
        <HomeGameGridShell initialGames={gridGames} />
      </section>

      <section className="category-editorial-shell mt-4 mb-2 px-1" aria-labelledby="site-editorial-main-h">
        <SiteEditorialArticle
          eyebrow="Category guide"
          title={`About ${label}`}
          sections={categoryEditorial.sections}
          wordCount={categoryEditorial.wordCount}
        />
      </section>
    </div>
  );
}
