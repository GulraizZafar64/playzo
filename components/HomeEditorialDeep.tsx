import { SITE_NAME } from "@/lib/site-brand";

/**
 * Substantial editorial copy for the home page (human-written tone).
 * Complements interactive UI blocks; targets depth and E-E-A-T signals.
 */
export default function HomeEditorialDeep() {
  return (
    <section className="home-editorial-deep" aria-labelledby="home-editorial-main">
      <h2 id="home-editorial-main">Why {SITE_NAME} exists — and how we think about browser games</h2>

      <p>
        Browser gaming has matured far beyond the simple Flash experiments many people remember from the early 2000s.
        Today&apos;s HTML5 titles can deliver crisp visuals, responsive controls, and surprisingly deep mechanics—all
        without an installer, a storefront account, or a multi-gigabyte patch. At {SITE_NAME}, we built our catalog
        around that reality: you should be able to open a tab, understand what you are clicking, and be playing within
        seconds. That mission sounds simple, but it forces disciplined choices about which publishers we feature, how we
        describe each game in our own words, and how we structure the site so discovery stays fast even as the library
        grows past hundreds of titles.
      </p>

      <h3>What &ldquo;curated&rdquo; means in practice</h3>
      <p>
        Curation is not a buzzword here. When we add a game, we load the embed, confirm that audio and input behave
        reasonably on a mainstream laptop, and check that the experience matches the genre label we attach. If a frame
        fails repeatedly or the content drifts away from what we consider appropriate for a general audience, we remove
        or replace the listing. We would rather offer fewer links that work reliably than flood the page with broken
        thumbnails that waste your time. That editorial patience also shapes our writing: each game page includes an
        original description and guidance so you can decide whether a session fits your break length and mood.
      </p>

      <h3>Designed for real schedules</h3>
      <p>
        Many visitors arrive between classes, on a lunch break, or after a long meeting. Those contexts reward short
        loops, clear goals, and minimal friction. We emphasize search, categories, and recognizable artwork so you can
        orient quickly without reading a manual first. When a title needs more explanation—unusual controls, a steep
        learning curve, or network-specific caveats—we spell that out plainly. The point is respect: your attention is
        finite, and a portal that hides friction behind marketing language is not one we want to operate.
      </p>

      <h3>Schools, offices, and shared machines</h3>
      <p>
        Networks vary. A game that loads instantly at home may be blocked on a school Wi‑Fi policy, and we cannot
        promise universal access. What we can do is keep pages lightweight, avoid deceptive redirects, and document
        honest limitations in our policies. If you administer a network and need clarity on third-party embeds, our
        privacy materials explain how ads and frames interact with cookies and local storage. Players on shared computers
        may also want to use private browsing for sessions—{SITE_NAME} can remember favorites locally, but that data stays
        on your device rather than becoming a cloud profile by default.
      </p>

      <h3>Original writing, not copy-paste storefront blurbs</h3>
      <p>
        Search engines and readers alike reward genuine expertise. That is why we do not simply mirror publisher
        descriptions word for word. Our team paraphrases what we observe during testing, highlights the hook that makes a
        game interesting regardless of genre label, and pairs short tips with longer guides where they help. On
        popular pages, you will find extensive articles that walk through pacing, common pitfalls, and fair expectations.
        Those articles are generated to stay unique per title while maintaining a consistent editorial voice—clear,
        direct, and free of empty superlatives.
      </p>

      <h3>Fair expectations about third-party games</h3>
      <p>
        The games themselves are developed and hosted by independent studios and portals, not by {SITE_NAME}. We provide
        context, categorization, and a consistent wrapper so you can browse confidently, but intellectual property remains
        with the original creators. If you represent a rights holder and need a listing updated, you will find a contact
        path on our site; we take good-faith requests seriously. Likewise, if players encounter outdated artwork or a
        genre tag that no longer fits after an update, we appreciate concise reports—they help us keep the catalog
        honest for the next visitor.
      </p>

      <h3>Advertising, sustainability, and transparency</h3>
      <p>
        Running a large, frequently updated directory has hosting and engineering costs. Advertising helps cover those
        expenses so we can keep access free at the point of use. We aim for placements that do not wreck readability or
        hijack navigation, and we disclose cookie usage in line with common programmatic policies. If you prefer fewer
        personalized ads, your browser and platform settings remain the primary levers—our privacy page points to the
        relevant controls.
      </p>

      <h3>Accessibility and device diversity</h3>
      <p>
        Not every HTML5 build is equally comfortable on phones, tablets, and desktops. Some experiences assume a
        keyboard; others translate surprisingly well to touch. Where we can, we signal that in our descriptions so you can
        choose titles that match the hardware in front of you. Zoom, color profiles, and audio defaults also affect how a
        game feels; we cannot standardize those across every publisher, but we can avoid clutter on our side so assistive
        technologies and browser settings have less noise to fight through.
      </p>

      <h3>How we evolve the library</h3>
      <p>
        Trends shift. A puzzle game that spikes in popularity may deserve a more prominent spot in recommendations; a
        once-stable embed may break when a publisher changes domains. We revisit listings on a rolling basis and ship
        small layout improvements as we learn how people navigate on mobile versus desktop. Feedback matters: the contact
        channel is not a black hole—it informs a lightweight triage list of broken frames, misleading labels, and
        opportunities to clarify instructions.
      </p>

      <h3>Trust is built in small moments</h3>
      <p>
        A trustworthy arcade is one where the search box returns what you typed, the category pages load quickly, and
        the article beneath a game feels like it was written by someone who actually tried the tab you are about to
        open. We hold ourselves to that standard even as we scale. Thank you for spending time here; whether you stay for
        one round or bookmark us for later, we hope {SITE_NAME} earns its place on your screen with clarity, speed, and
        respect for your time.
      </p>
    </section>
  );
}
