import Link from "next/link";
import SiteFooter from "./SiteFooter";
import CookieConsent from "./CookieConsent";
import CategoryButtonBar from "./CategoryButtonBar";
import SavedGamesLauncher from "./SavedGamesLauncher";
import ThemeToggle from "./ThemeToggle";
import SearchHotkeys from "./SearchHotkeys";
import MobileOffcanvasSync from "./MobileOffcanvasSync";
import { PlayVerseSidebarNavDesktop, PlayVerseSidebarNavOffcanvas } from "./PlayVerseSidebarNav";
import { SITE_NAME } from "@/lib/site-brand";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { SITE_PUBLIC_NAV } from "@/lib/site-pages";
import SearchModalContent from "./SearchModalContent";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell playverse-root">
      <SearchHotkeys />
      <MobileOffcanvasSync />
      <aside className="playverse-sidebar" aria-label="Site navigation">
        <div className="playverse-sidebar-inner">
          <Link className="playverse-logo" href="/" prefetch>
            <span className="playverse-logo-mark" aria-hidden />
            <span className="playverse-logo-text">
              <span className="text-white">Play</span><span style={{ color: 'var(--accent)' }}>Verse</span>
            </span>
          </Link>
          <PlayVerseSidebarNavDesktop />
        </div>
      </aside>

      <div
        className="offcanvas offcanvas-start playverse-offcanvas"
        tabIndex={-1}
        id="playverseSidebar"
        aria-labelledby="playverseSidebarLabel"
      >
        <div className="offcanvas-header border-secondary border-opacity-25">
          <h2 className="offcanvas-title h5 mb-0" id="playverseSidebarLabel">
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
          <PlayVerseSidebarNavOffcanvas />
        </div>
      </div>

      <div className="playverse-main">
        <header className="playverse-topbar">
          <div className="container-fluid playverse-topbar-inner">
            <button
              type="button"
              className="btn playverse-menu-btn"
              data-bs-toggle="offcanvas"
              data-bs-target="#playverseSidebar"
              aria-controls="playverseSidebar"
              aria-label="Open menu"
            >
              <i className="fa fa-bars d-lg-none" aria-hidden />
              <i className="fa fa-compass d-none d-lg-inline-block text-accent-2" aria-hidden />
            </button>
            <Link
              href="/"
              prefetch
              className="playverse-topbar-desktop-fill d-none d-lg-inline-flex"
              aria-label={`${SITE_NAME} — home`}
            >
              <span className="playverse-topbar-desktop-fill-mark" aria-hidden />
              <span className="playverse-topbar-desktop-fill-text">
                <span className="playverse-topbar-desktop-fill-title text-uppercase fw-900" style={{ letterSpacing: '0.05em' }}>
                  <span className="text-white">Play</span><span style={{ color: 'var(--accent)' }}>Verse</span>
                </span>
                <span className="playverse-topbar-desktop-fill-tagline d-none d-xl-inline">
                  {PUBLIC_CATALOG_SIZE_LABEL} browser games · No downloads
                </span>
              </span>
            </Link>
            <nav
              className="playverse-topbar-pages flex-grow-1 justify-content-center align-items-center"
              aria-label="Site pages"
            >
              {SITE_PUBLIC_NAV.map((p) => (
                <Link key={p.href} href={p.href} className="playverse-topbar-page-link" prefetch={p.href !== "/"}>
                  {p.label}
                </Link>
              ))}
            </nav>
            <kbd className="playverse-kbd-hint d-none d-md-inline">Ctrl + K</kbd>
            <button
              type="button"
              className="btn playverse-search-open-btn"
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
          className="modal fade playverse-search-modal"
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
                <button type="button" className="btn-close playverse-search-modal-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <SearchModalContent />
              </div>
            </div>
          </div>
        </div>

        <CategoryButtonBar />

        <div className="playverse-content app-content">{children}</div>

        <SiteFooter />

        <CookieConsent />

        <nav className="playverse-bottom-nav d-xl-none" aria-label="Quick links">
          <Link className="playverse-bottom-nav-link" href="/" prefetch={false}>
            <i className="fa fa-home" />
            <span>Home</span>
          </Link>
          <Link className="playverse-bottom-nav-link" href="/#all-games" prefetch={false}>
            <i className="fa fa-th-large" />
            <span>Games</span>
          </Link>
          <Link className="playverse-bottom-nav-link" href="/#categories" prefetch={false}>
            <i className="fa fa-folder-open" />
            <span>Browse</span>
          </Link>
          <Link className="playverse-bottom-nav-link" href="/category/trending" prefetch>
            <i className="fa fa-fire" />
            <span>Hot</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
