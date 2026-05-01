import Link from "next/link";
import SiteFooter from "./SiteFooter";
import CookieConsent from "./CookieConsent";
import CategoryButtonBar from "./CategoryButtonBar";
import SavedGamesLauncher from "./SavedGamesLauncher";
import ThemeToggle from "./ThemeToggle";
import SearchHotkeys from "./SearchHotkeys";
import MobileOffcanvasSync from "./MobileOffcanvasSync";
import { PlayZoSidebarNavDesktop, PlayZoSidebarNavOffcanvas } from "./PlayZoSidebarNav";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { SITE_PUBLIC_NAV } from "@/lib/site-pages";
import SearchModalContent from "./SearchModalContent";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell playzo-root">
      <SearchHotkeys />
      <MobileOffcanvasSync />
      <aside className="playzo-sidebar" aria-label="Site navigation">
        <div className="playzo-sidebar-inner">
          <Link className="playzo-logo" href="/" prefetch>
            <span className="playzo-logo-mark" aria-hidden />
            <span className="playzo-logo-text">
              <span className="text-white">Play</span><span style={{ color: 'var(--accent)' }}>zo</span>
            </span>
          </Link>
          <PlayZoSidebarNavDesktop />
        </div>
      </aside>

      <div
        className="offcanvas offcanvas-start playzo-offcanvas"
        tabIndex={-1}
        id="playzoSidebar"
        aria-labelledby="playzoSidebarLabel"
      >
        <div className="offcanvas-header border-secondary border-opacity-25">
          <h2 className="offcanvas-title h5 mb-0" id="playzoSidebarLabel">
            Menu
          </h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <PlayZoSidebarNavOffcanvas />
        </div>
      </div>

      <div className="playzo-main">
        <header className="playzo-topbar">
          <div className="container-fluid playzo-topbar-inner">
            <button
              type="button"
              className="btn playzo-menu-btn"
              data-bs-toggle="offcanvas"
              data-bs-target="#playzoSidebar"
              aria-controls="playzoSidebar"
              aria-label="Open menu"
            >
              <i className="fa fa-bars d-lg-none" aria-hidden />
              <i className="fa fa-compass d-none d-lg-inline-block text-accent-2" aria-hidden />
            </button>
            <Link
              href="/"
              prefetch
              className="playzo-topbar-desktop-fill d-none d-lg-inline-flex"
              aria-label={`${SITE_NAME} — home`}
            >
              <span className="playzo-topbar-desktop-fill-mark" aria-hidden />
              <span className="playzo-topbar-desktop-fill-text">
                <span className="playzo-topbar-desktop-fill-title text-uppercase fw-900" style={{ letterSpacing: '0.05em' }}>
                  <span className="text-white">Play</span><span style={{ color: 'var(--accent)' }}>zo</span>
                </span>
                <span className="playzo-topbar-desktop-fill-tagline d-none d-xl-inline">
                  {PUBLIC_CATALOG_SIZE_LABEL} browser games · No downloads
                </span>
              </span>
            </Link>
            <nav
              className="playzo-topbar-pages flex-grow-1 justify-content-center align-items-center"
              aria-label="Site pages"
            >
              {SITE_PUBLIC_NAV.map((p) => (
                <Link key={p.href} href={p.href} className="playzo-topbar-page-link" prefetch={p.href !== "/"}>
                  {p.label}
                </Link>
              ))}
            </nav>
            <kbd className="playzo-kbd-hint d-none d-md-inline">Ctrl + K</kbd>
            <button
              type="button"
              className="btn playzo-search-open-btn"
              data-bs-toggle="modal"
              data-bs-target="#searchGameModal"
              aria-label="Open search"
            >
              <i className="fa fa-search" aria-hidden />
            </button>
            <SavedGamesLauncher />
            <ThemeToggle />
          </div>
        </header>

        <div
          className="modal fade playzo-search-modal"
          id="searchGameModal"
          tabIndex={-1}
          aria-labelledby="searchGameModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header border-secondary border-opacity-25">
                <h2 className="modal-title h5 mb-0" id="searchGameModalLabel">
                  Search games
                </h2>
                <button type="button" className="btn-close playzo-search-modal-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <SearchModalContent />
              </div>
            </div>
          </div>
        </div>

        <CategoryButtonBar />

        <div className="playzo-content app-content">{children}</div>

        <SiteFooter />

        <CookieConsent />

        <nav className="playzo-bottom-nav d-xl-none" aria-label="Quick links">
          <Link className="playzo-bottom-nav-link" href="/" prefetch={false}>
            <i className="fa fa-home" />
            <span>Home</span>
          </Link>
          <Link className="playzo-bottom-nav-link" href="/#all-games" prefetch={false}>
            <i className="fa fa-th-large" />
            <span>Games</span>
          </Link>
          <Link className="playzo-bottom-nav-link" href="/#categories" prefetch={false}>
            <i className="fa fa-folder-open" />
            <span>Browse</span>
          </Link>
          <Link className="playzo-bottom-nav-link" href="/category/trending" prefetch>
            <i className="fa fa-fire" />
            <span>Hot</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
