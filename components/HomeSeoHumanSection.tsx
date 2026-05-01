import { SITE_NAME } from "@/lib/site-brand";

/** Short, practical tips — wording kept distinct from the long editorial block above to reduce duplicate-theme signals. */
export default function HomeSeoHumanSection() {
  return (
    <section className="home-seo-human" aria-labelledby="home-seo-human-heading">
      <h2 id="home-seo-human-heading" className="home-seo-block-title">
        Comfort and focus while you play
      </h2>
      <div className="home-seo-human-columns">
        <p>
          On a laptop, plug in power for steadier frame pacing during fast titles; battery saver modes can throttle
          canvas-heavy games. If sound suddenly cuts out, click once inside the game frame—browsers often require a
          gesture before audio unlocks.
        </p>
        <p>
          Prefer headphones in shared rooms; many arcade and puzzle games use short cues you will miss on mute. If text
          looks fuzzy, check OS zoom before assuming the title is at fault—some builds render at fixed resolution.
        </p>
        <p>
          Spotted a wrong thumbnail or a page that breaks on your screen size? Use <strong>Contact us</strong> with the
          URL—those notes help {SITE_NAME} prioritize fixes that affect real sessions, not just automated checks.
        </p>
      </div>
    </section>
  );
}
