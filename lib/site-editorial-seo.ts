/**
 * Long-form editorial copy for home and category pages (deterministic, unique per route).
 */

import { countWords } from "@/lib/game-longform-seo";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";

export type EditorialSection = { heading: string; paragraphs: string[] };

export function buildHomeEditorial(siteName: string): { sections: EditorialSection[]; wordCount: number } {
  const intro = [
    `${siteName} is a browser-first game catalog built for quick discovery: you should be able to move from search or category browse to an active frame without installs, accounts, or a lengthy tutorial. We list ${PUBLIC_CATALOG_SIZE_LABEL} titles, and we treat each listing as a small promise—if the embed fails or misleads, we want to hear about it.`,
    `Our editorial stance favors clarity over hype. That means thumbnails, genres, and the longer guides you will find on popular pages are written in our own words after we load the build, click through menus, and confirm the experience matches what a reasonable visitor would expect from the label.`,
    `We also design for constrained environments: school labs, shared workstations, and family PCs where downloads are blocked and time is short. Speed and predictability matter as much as raw game quality, because a great title that never loads helps nobody.`,
  ];

  const discovery = [
    `Discovery on ${siteName} combines search, category rails, and suggestions so you can pivot when a frame is blocked on your network. If you know a title, search is fastest; if you only know a vibe—puzzle, racing, something calm—categories narrow the field without overwhelming you.`,
    `Pagination keeps the full catalog approachable: you can scan in chunks instead of infinite scroll that hides how deep the library runs. Favorites and recents stay on your device, which keeps your shelf personal without asking for sign-in.`,
    `New games rotate in as we verify publishers and stability. We would rather add slowly than flood the list with broken links, because trust compounds when visitors consistently land on working pages.`,
  ];

  const trust = [
    `Third-party games belong to their creators. ${siteName} does not claim ownership of art, audio, or code inside publisher iframes; we provide navigation, context, and original descriptions so you can reach legitimate builds safely.`,
    `Advertising helps cover hosting and bandwidth. You can manage personalization through browser controls and the disclosures in our privacy policy. We aim for placements that do not fight the game for attention on small screens.`,
    `Feedback matters: when someone reports a mismatched genre or a dead embed, we triage alongside other fixes. Small reports prevent big drift in catalog quality over time.`,
  ];

  const safety = [
    `Play responsibly. Browser games are easy to extend—set timers if you need hard stops between classes or meetings. Audio can surprise coworkers; default to mute in shared spaces unless headphones are appropriate.`,
    `Parents and educators should pair catalog access with network rules that fit their environment. ${siteName} cannot bypass institutional filters; we respect that boundary and encourage use that aligns with local policy.`,
    `Security basics still apply: keep your browser updated, avoid sketchy extensions that inject scripts into game frames, and be cautious if a game asks for unusual permissions outside normal play.`,
  ];

  const depth = [
    `Longer articles on game pages explain what to expect before you click: how browser performance interacts with ${siteName} tabs, how saves may work, and how to troubleshoot common issues like silent audio or blocked fullscreen.`,
    `We also discuss fairness: what “unblocked” means in practice varies by network. A game that loads at home might be filtered on campus—not because ${siteName} changed, but because routes to publisher CDNs differ.`,
    `Our goal is a shelf you trust: readable typography, consistent navigation, and copy that sounds like it was written by people who actually clicked the same play button you will.`,
  ];

  const future = [
    `Roadmap-wise, we focus on reliability before novelty: faster pages, clearer labels, and better signals when a title changes materially. When publishers update mechanics, we revisit descriptions so visitors are not reading stale guidance.`,
    `Thank you for choosing a curated catalog over a chaotic link dump. If ${siteName} saves you a few minutes of frustration—or surfaces a new favorite—then the work of maintaining it is worth doing.`,
  ];

  const sections: EditorialSection[] = [
    { heading: "Why this catalog exists", paragraphs: intro },
    { heading: "Finding games that fit your break", paragraphs: discovery },
    { heading: "Trust, rights, and transparency", paragraphs: trust },
    { heading: "Healthy habits and shared devices", paragraphs: safety },
    { heading: "Depth beyond the play button", paragraphs: depth },
    { heading: "How we keep improving", paragraphs: future },
  ];

  /* Extra depth without repeating the same lines: each paragraph used at most once, spread across sections. */
  const filler = [
    `Accessibility is an ongoing focus: we test keyboard paths for navigation and aim for readable contrast in our chrome, even when individual games vary internally.`,
    `International visitors may see different ad experiences based on region; the games themselves are the same publisher builds regardless of where you connect from.`,
    `We document cookie and ad practices in our privacy policy so families and schools can make informed choices about browsing ${siteName}.`,
    `When we add features—search tweaks, category refinements, or layout polish—we prioritize stability so returning visitors do not face surprise regressions.`,
    `We watch Core Web Vitals and real-device performance: a fast shell keeps attention on the games, not on waiting for our HTML.`,
    `Broken embeds get priority in our queue because one dead frame can waste hundreds of visitor minutes across a week.`,
    `We avoid dark patterns: no fake download buttons, no misleading “play” links that hop through unrelated pages.`,
    `Genre tags are guidance, not law—if a game blends styles, we pick the label that matches how most people search for it.`,
    `Thumbnail swaps happen when publishers ship new key art; if a screenshot looks dated, the live game may already reflect a newer season.`,
    `Keyboard-first players benefit from pinning the game tab and closing sync-heavy tools during competitive sessions.`,
    `We keep contact channels simple so reports include URLs and browsers, not account IDs we never collected.`,
    `Seasonal traffic spikes (holidays, exam weeks) remind us to cache aggressively and keep error pages honest.`,
    `Mobile visitors get the same catalog; layout adapts, though complex titles may still play best on desktop.`,
    `We re-read popular pages after major browser updates in case autoplay, storage, or permissions policies shift.`,
  ];

  let wc = countWords(sections.map((s) => s.paragraphs.join(" ")).join(" "));
  const targetWords = 1000;
  let fi = 0;
  while (wc < targetWords && fi < filler.length) {
    sections[fi % sections.length]!.paragraphs.push(filler[fi]!);
    wc = countWords(sections.map((s) => s.paragraphs.join(" ")).join(" "));
    fi++;
  }

  return { sections, wordCount: wc };
}

/** Category hubs: short copy (~200 words max) so the game grid stays the focus. */
const CATEGORY_EDITORIAL_MAX_WORDS = 200;

function truncateToMaxWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function buildCategoryEditorial(
  label: string,
  siteName: string,
): { sections: EditorialSection[]; wordCount: number } {
  const raw = [
    `Browse ${label} games on ${siteName} using the grid below. Cards come from our ${PUBLIC_CATALOG_SIZE_LABEL} browser catalog and open in-tab—no install or sign-up.`,
    `Tags are a guide, not a rule: some titles blend genres. Skim a few thumbnails, try a short session, then pick a favorite. If nothing fits, use search or another category.`,
    `Performance depends on your device and network—close heavy tabs for smoother loads. School or office filters may still block some publisher hosts; that is outside ${siteName}.`,
    `Progress may live in browser storage; clearing data can reset saves. For deeper tips, open a game’s page. Spot a broken embed? Send the URL via contact so we can fix the listing.`,
  ].join(" ");

  const clipped = truncateToMaxWords(raw, CATEGORY_EDITORIAL_MAX_WORDS);
  const wc = countWords(clipped.replace(/…$/, "").trim());

  const tokens = clipped.replace(/…$/, "").trim().split(/\s+/).filter(Boolean);
  const half = Math.ceil(tokens.length / 2);
  const p1 = tokens.slice(0, half).join(" ");
  const p2 = tokens.slice(half).join(" ");

  const sections: EditorialSection[] = [
    {
      heading: `${label} games`,
      paragraphs: p2 ? [p1, p2] : [p1],
    },
  ];

  return { sections, wordCount: wc };
}

export function buildAboutEditorial(siteName: string): { sections: EditorialSection[]; wordCount: number } {
  const mission = [
    `${siteName} exists to make high-quality browser games easy to find without installs or accounts. We are an independent team that believes short breaks matter: a fair catalog should load fast, describe honestly, and respect the fact that many visitors browse on shared or restricted networks.`,
    `Our mission is not to mirror every game on the internet—it is to maintain a shelf you can trust. That means testing embeds, writing original descriptions, and revisiting listings when publishers change their builds or when readers flag problems.`,
    `We publish guides that go beyond marketing blurbs. Longer articles on game pages discuss real-world constraints: audio unlock quirks, fullscreen limits on managed devices, and how saves may rely on browser storage that resets on lab machines.`,
  ];

  const audience = [
    `Students use ${siteName} between classes; professionals use it between meetings; families use it for casual play nights. Each group needs different guardrails, so we emphasize responsible timing, respectful audio, and compliance with local network rules.`,
    `Educators appreciate transparency: we explain that games are third-party property and that our role is aggregation plus editorial context. Parents can review our privacy disclosures to understand cookies and advertising in plain language.`,
  ];

  const quality = [
    `Quality control is manual and imperfect, but directional: we click play, skim UI, and sanity-check genres. When something fails—blank frame, misleading tag—we prioritize fixes that help the most visitors first.`,
    `We align our writing style with helpfulness: short sentences when explaining troubleshooting, longer paragraphs when discussing tradeoffs like latency versus convenience in browser play.`,
  ];

  const trust = [
    `Trust grows when claims match reality. We avoid copying publisher store text verbatim because paraphrasing forces verification. If a description overstates what we saw in the frame, we revise it.`,
    `Intellectual property remains with creators. ${siteName} does not assert rights over embedded games; our content is navigation, categorization, and original commentary.`,
  ];

  const roadmap = [
    `We improve incrementally: faster pages, clearer categories, better signals when titles change. Big redesigns happen only when they measurably reduce friction for newcomers.`,
    `Feedback to our contact email helps us prioritize. Include URLs, browser names, and what you expected versus what you saw—specificity shortens the path from report to fix.`,
  ];

  const legal = [
    `Legal pages outline privacy, terms, and acceptable use. Read them alongside this overview; together they describe how ${siteName} operates and what visitors can expect from advertising and data handling.`,
  ];

  const sections: EditorialSection[] = [
    { heading: "Mission and editorial promise", paragraphs: mission },
    { heading: "Who we build for", paragraphs: audience },
    { heading: "How we evaluate games", paragraphs: quality },
    { heading: "Trust and intellectual property", paragraphs: trust },
    { heading: "Roadmap and feedback", paragraphs: roadmap },
    { heading: "Policies and disclosures", paragraphs: legal },
  ];

  const filler = [
    `We celebrate variety: puzzles beside racers beside sims—because taste is personal and moods change by the hour.`,
    `We also care about accessibility in our site chrome: keyboard-friendly navigation where possible, readable contrast, and mobile layouts that do not hide critical controls.`,
    `Community norms matter: be kind in any chat-enabled titles, report abusive behavior through publisher tools when available, and remember that casual play works best when everyone feels welcome.`,
    `Our team is small on purpose: fewer handoffs mean faster fixes when a publisher URL moves overnight.`,
    `We document known quirks—fullscreen limits, mute policies—so newcomers are not left guessing.`,
    `We bias toward stable embeds over flashy landing pages: a boring frame that loads beats a pretty one that errors.`,
    `We revisit top pages quarterly to refresh wording when browsers change defaults for cookies or storage.`,
    `We keep analytics lightweight: aggregate trends, not per-user dossiers, aligned with our privacy disclosures.`,
    `We welcome teachers who share ${siteName} for reward time—please still follow district IT policies first.`,
    `We refuse pay-to-win promotion slots; discovery order favors relevance and freshness, not who paid.`,
    `We test on both high-DPI laptops and older school machines so copy about performance stays honest.`,
    `We credit publishers in spirit by sending traffic to legitimate builds, never to scraped clones.`,
  ];

  let wc = countWords(sections.map((s) => s.paragraphs.join(" ")).join(" "));
  const aboutTarget = 1050;
  let i = 0;
  while (wc < aboutTarget && i < filler.length) {
    sections[i % sections.length]!.paragraphs.push(filler[i]!);
    wc = countWords(sections.map((s) => s.paragraphs.join(" ")).join(" "));
    i++;
  }

  return { sections, wordCount: wc };
}
