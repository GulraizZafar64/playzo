import { SITE_NAME } from "@/lib/site-brand";
import { SITE_EMAIL } from "@/lib/site-contact";

export default function PrivacyPageContent() {
  return (
    <div className="about-page">
      <section className="about-mission" aria-labelledby="privacy-header">
        <p className="about-eyebrow">Legal & Data Transparency</p>
        <h1 id="privacy-header" className="about-mission-title">
          Privacy policy for {SITE_NAME}
        </h1>
        <div className="about-mission-body">
          <p>Last updated: April 2026</p>
          <p>
            At {SITE_NAME}, one of our main priorities is the privacy of our visitors. This policy describes what
            information may be collected when you use our website and how we use it. We aim for transparency, especially
            in educational or casual gaming contexts. Questions? Contact{" "}
            <strong>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </strong>
            .
          </p>
          <p>
            This policy applies to our online activities and to information shared with or collected by {SITE_NAME} through
            this website. It does not cover offline collection or third-party games beyond what is explained below. We
            work to keep your experience safe and aligned with common data protection expectations.
          </p>
          <p>
            By using our website, you consent to this policy. We may update it from time to time; continued use after
            changes means you accept the revised version.
          </p>
          <p>
            We minimize what we collect and do not sell your personal browsing history to marketing firms for unsolicited
            advertising.
          </p>
        </div>
      </section>

      <section className="about-article" aria-labelledby="adsense-heading">
        <h2 id="adsense-heading" className="about-section-title">
          1. Google AdSense and advertising cookies
        </h2>
        <p>
          {SITE_NAME} partners with Google AdSense to help keep our content free. Google may use cookies (including the
          DART cookie) to serve ads based on your visits to our site and others. These mechanisms typically do not rely on
          your name or email; they may use browsing patterns to improve ad relevance.
        </p>
        <p>
          You can opt out of personalized ads via{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ad Settings
          </a>
          . See also{" "}
          <a href="https://policies.google.com/technologies/ads">Google&apos;s advertising policies</a> and{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy &amp; Terms
          </a>
          .
        </p>
        <p>
          We aim to keep ad placements appropriate for general audiences, including school and home use.
        </p>

        <h2 className="about-subhead">2. Third-party game embeds and external providers</h2>
        <p>
          A core feature of {SITE_NAME} is our library of browser-based games. Most titles are hosted by third-party
          publishers in iframes. When you play, your browser may communicate with those publishers&apos; servers under
          their own policies.
        </p>
        <p>
          {SITE_NAME} does not control cookies or tracking inside publisher games. Review publisher privacy policies if
          you play often. You can limit third-party cookies in browser settings. We try to list stable, legitimate
          embeds and fix broken or misleading entries when reported.
        </p>

        <h2 className="about-subhead">3. LocalStorage, session data, and preferences</h2>
        <p>
          Without requiring an account, we may use your browser&apos;s localStorage for favorites, recents, and similar
          preferences. That data stays on your device and is not stored as a profile on our servers.
        </p>
        <p>
          Clearing site data for our domain removes those preferences. On shared computers, consider a private window so
          local data is discarded when the session ends.
        </p>

        <h2 className="about-subhead">4. Log files and analytics</h2>
        <p>
          Like many sites, we may use server logs and analytics with data such as IP address, browser type, rough
          timestamps, and pages viewed. We use this in aggregate to run and improve the service, not to build individual
          dossiers.
        </p>

        <h2 className="about-subhead">5. Children and COPPA</h2>
        <p>
          {SITE_NAME} is aimed at a general audience. We do not knowingly collect personal information from children
          under 13 as a business practice. If you believe a child has shared such data with us, email{" "}
          <strong>
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </strong>{" "}
          and we will take appropriate steps.
        </p>

        <h2 className="about-subhead">6. Your choices and rights</h2>
        <p>You can manage privacy through browser controls, private browsing modes, and ad settings as described above.</p>
        <p>
          We do not sell your contact information to random marketers. Where GDPR, UK GDPR, CCPA, or similar laws apply,
          you may have additional rights; contact us at{" "}
          <strong>
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </strong>{" "}
          for requests.
        </p>

        <h2 className="about-section-title">Advertising — Google AdSense</h2>
        <p>
          We use Google AdSense. Google may use cookies to serve ads based on your visits here and elsewhere. Opt out of
          personalized ads via{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ad Settings
          </a>
          . See{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="about-cta" aria-labelledby="privacy-cta-heading">
        <h2 id="privacy-cta-heading" className="about-cta-title">
          Contact
        </h2>
        <p className="about-cta-lead">
          Questions about this policy? Email our team.
        </p>
        <a className="btn home-cta-primary about-cta-btn" href={`mailto:${SITE_EMAIL}`}>
          {SITE_EMAIL}
        </a>
      </section>
    </div>
  );
}
