import Link from "next/link";
import AboutImageCarousel from "./AboutImageCarousel";
import { SITE_NAME } from "@/lib/site-brand";

export default function TermsPageContent() {
  return (
    <div className="about-page">
      <section className="about-mission" aria-labelledby="terms-mission-heading">
        <p className="about-eyebrow">Terms &amp; conditions</p>
        <h1 id="terms-mission-heading" className="about-mission-title">
          Rules for using the {SITE_NAME} catalog
        </h1>
        <div className="about-mission-body">
          <p>
            These terms explain what you can expect from this website and what we expect from you. By accessing or using
            {SITE_NAME}, you agree to this document and to our Privacy policy. If you disagree, please stop using the
            site. We may update these terms; continued use after changes means you accept the revised version.
          </p>
          <p>
            {SITE_NAME} provides links and embeds to browser games hosted by third parties. We are a directory, not the
            publisher of those games. Your relationship with each game&apos;s operator is separate and may include its own
            terms, age rules, or acceptable-use policies.
          </p>
          <p>
            Nothing here is legal advice. If you need counsel for your school, company, or jurisdiction, consult a
            qualified professional.
          </p>
        </div>
      </section>

      <section className="about-split-band" aria-labelledby="terms-use-heading">
        <div className="about-split">
          <div className="about-split-copy">
            <p className="about-eyebrow">Permitted use</p>
            <h2 id="terms-use-heading" className="about-split-title">
              Play fair, stay safe, respect networks
            </h2>
            <div className="about-split-text">
              <p>
                You may browse, search, and open games for personal, non-commercial entertainment unless we give written
                permission for something broader. Do not attempt to disrupt the site, scrape it in a way that degrades
                performance for others, probe for vulnerabilities, or use automated tools to bulk-download our catalog
                without consent.
              </p>
              <p>
                Follow your school, employer, and local laws about games, networks, and screen time. We describe the site
                as &ldquo;unblocked&rdquo; in a casual sense — we do not control firewalls or acceptable-use policies where
                you study or work.
              </p>
            </div>
          </div>
          <div className="about-split-visual">
            <AboutImageCarousel />
          </div>
        </div>
      </section>

      <section className="about-article" aria-labelledby="terms-body-heading">
        <h2 id="terms-body-heading" className="about-section-title">
          Full terms
        </h2>

        <h3 className="about-subhead">Content and intellectual property</h3>
        <p>
          The {SITE_NAME} name, layout, text, and non-game graphics are ours or licensed to us. Game titles, artwork, and
          gameplay shown in listings belong to their respective owners. We display them to identify and link to games; we
          do not claim ownership of third-party IP. If you are a rights holder and believe a listing is inaccurate or
          infringing, contact us with specifics — we review good-faith reports and may remove or correct entries.
        </p>

        <h3 className="about-subhead">Disclaimers</h3>
        <p>
          The site and all games are provided &ldquo;as is.&rdquo; We do not warrant uninterrupted access, error-free
          pages, or that any game will load on your device or network. Third-party games may change, break, or disappear
          without notice. To the fullest extent permitted by law, we disclaim implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement.
        </p>

        <h3 className="about-subhead">Limitation of liability</h3>
        <p>
          To the maximum extent permitted by applicable law, {SITE_NAME} and its operators will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill,
          arising from your use of the site or any embedded game. Our total liability for any claim related to the site
          should not exceed the greater of (a) the amount you paid us to use the site in the twelve months before the claim
          or (b) zero, since the catalog is offered without charge.
        </p>

        <h3 className="about-subhead">Indemnity</h3>
        <p>
          You agree to indemnify and hold harmless the operators of {SITE_NAME} from claims, damages, losses, or
          expenses (including reasonable legal fees) arising from your misuse of the site, violation of these terms, or
          violation of third-party rights — except to the extent caused by our intentional misconduct.
        </p>

        <h3 className="about-subhead">Termination</h3>
        <p>
          We may suspend or discontinue parts of the site at any time. We may block access if we reasonably believe you
          are harming the service or other users. Provisions that by their nature should survive (disclaimers, liability
          limits, indemnity) will survive termination.
        </p>

        <h3 className="about-subhead">Governing law</h3>
        <p>
          These terms are governed by the laws of England and Wales, without regard to conflict-of-law principles. Courts
          in England and Wales have exclusive venue, except where mandatory consumer protection laws in your country
          require otherwise.
        </p>

        <h3 className="about-subhead">Contact</h3>
        <p>
          For questions about these terms, use the contact page. For copyright or trademark concerns, include URLs and
          ownership details so we can respond efficiently.
        </p>
      </section>

      <section className="about-cta" aria-labelledby="terms-cta-heading">
        <h2 id="terms-cta-heading" className="about-cta-title">
          Related policies
        </h2>
        <p className="about-cta-lead">Read how we handle data and how to reach us for legal or privacy questions.</p>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Link className="btn home-cta-primary about-cta-btn" href="/privacy">
            Privacy policy
          </Link>
          <Link className="btn about-cta-outline" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
