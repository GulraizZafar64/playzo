import Link from "next/link";
import { CATEGORY_LINKS } from "@/lib/categories";
import { SITE_PUBLIC_NAV } from "@/lib/site-pages";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";

const SIDEBAR_PRIMARY = [
  { href: "/", label: "Home", icon: "fa-home" },
  { href: "/#all-games", label: "All games", icon: "fa-th-large" },
  { href: "/category/trending", label: "Trending", icon: "fa-fire" },
];

/** Sidebar category links (rest remain in the horizontal pill bar). */
const SIDEBAR_CATS = CATEGORY_LINKS.filter((c) =>
  ["/category/action", "/category/adventure", "/category/arcade", "/category/puzzle", "/category/racing", "/category/sport"].includes(
    c.href,
  ),
);

function NavList() {
  return (
    <>
      <ul className="playverse-nav-list">
        {SIDEBAR_PRIMARY.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="playverse-nav-link">
              <i className={`fa ${item.icon}`} aria-hidden />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="playverse-nav-heading">Site</p>
      <ul className="playverse-nav-list">
        {SITE_PUBLIC_NAV.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="playverse-nav-link" prefetch={p.href !== "/"}>
              <i className="fa fa-info-circle" aria-hidden />
              <span>{p.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="playverse-nav-heading">Categories</p>
      <ul className="playverse-nav-list">
        {SIDEBAR_CATS.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="playverse-nav-link">
              <i className="fa fa-gamepad" aria-hidden />
              <span>{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function PlayVerseSidebarNavDesktop() {
  return (
    <nav className="playverse-sidebar-nav" aria-label="Main">
      <NavList />
      <div className="playverse-sidebar-promo">
        <p className="playverse-sidebar-promo-title">Play unlimited</p>
        <p className="playverse-sidebar-promo-text">
          {PUBLIC_CATALOG_SIZE_LABEL} titles in your browser — no install.
        </p>
        <Link href="/#all-games" className="btn playverse-sidebar-promo-btn" style={{fontSize: '0.7rem'}}>
          Explore now
        </Link>
      </div>
    </nav>
  );
}

export function PlayVerseSidebarNavOffcanvas() {
  return (
    <nav className="playverse-sidebar-nav" aria-label="Main">
      <NavList />
      <div className="playverse-sidebar-promo mt-3">
        <p className="playverse-sidebar-promo-title">Play unlimited</p>
        <Link href="/#all-games" className="btn playverse-sidebar-promo-btn w-100">
          Explore now
        </Link>
      </div>
    </nav>
  );
}
