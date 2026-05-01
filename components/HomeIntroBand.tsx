import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";

export default function HomeIntroBand() {
  return (
    <section className="home-intro-band" aria-label="About this arcade">
      <div className="home-intro-inner">
        <p>
          <strong>{PUBLIC_CATALOG_SIZE_LABEL} titles</strong> — built for quick breaks: unblocked browser games in one
          place. Whether you want a one-minute puzzle or a longer session, use the <strong>search icon</strong> in the
          header (or <kbd className="home-intro-kbd">Ctrl</kbd> + <kbd className="home-intro-kbd">K</kbd>) to look up a
          name, or pick a category from the strip below the header. Everything runs in your tab — we focus on fast loads
          and a clean layout so you spend time playing, not waiting.
        </p>
        <p>
          For how we run the site and handle data, see <strong>About</strong>, <strong>Contact us</strong>, and{" "}
          <strong>Privacy policy</strong> in the top navigation on larger screens, or in the mobile menu.
        </p>
        <p className="home-intro-meta">
          <span>{PUBLIC_CATALOG_SIZE_LABEL} catalog</span>
          <span aria-hidden> · </span>
          <span>Updated regularly</span>
          <span aria-hidden> · </span>
          <span>Works on school networks when games are allowed</span>
        </p>
      </div>
    </section>
  );
}
