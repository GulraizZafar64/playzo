import Link from "next/link";
import ContactForm from "./ContactForm";
import AboutImageCarousel from "./AboutImageCarousel";
import { SITE_NAME } from "@/lib/site-brand";
import { SITE_ADDRESS_LINE, SITE_EMAIL, SITE_PHONE_E164, SITE_PHONE_LABEL } from "@/lib/site-contact";

export default function ContactPageContent() {
  return (
    <div className="about-page">
      <section className="about-mission" aria-labelledby="contact-mission-heading">
        <p className="about-eyebrow">Get in touch</p>
        <h1 id="contact-mission-heading" className="about-mission-title">
          We read every message we can — and use it to fix the catalog
        </h1>
        <div className="about-mission-body">
          <p>
            Something will not load? A thumbnail looks wrong? You want to suggest a game or ask about a listing? This
            page is the right place. {SITE_NAME} is maintained by a small team, so we cannot promise an instant reply to
            every email — but we triage reports regularly and prioritize broken frames, misleading labels, and issues that
            affect many visitors.
          </p>
          <p>
            Before you write, check that your browser allows third-party frames for the game domain and that your school
            or office network is not blocking the embed. If the problem is policy (not technical), your local IT staff is
            the right contact; we cannot override network filters from here.
          </p>
          <p>
            For the fastest path, include the game title as shown on our site, the URL of the page you were on, and what
            you expected to happen versus what you saw. Screenshots are optional but helpful when a layout looks wrong on
            a specific screen size.
          </p>
        </div>
      </section>

      <section className="about-split-band" aria-labelledby="contact-channels-heading">
        <div className="about-split">
          <div className="about-split-copy">
            <p className="about-eyebrow">Direct channels</p>
            <h2 id="contact-channels-heading" className="about-split-title">
              Email and the form — pick what fits
            </h2>
            <div className="about-split-text">
              <p>
                Email remains the most reliable way to send links and long descriptions:{" "}
                <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
              </p>
              <p>
                Phone (WhatsApp-friendly):{" "}
                <a href={`tel:${SITE_PHONE_E164}`}>{SITE_PHONE_LABEL}</a>
                <span className="text-muted"> · </span>
                <span className="text-muted">{SITE_ADDRESS_LINE}</span>
              </p>
              <p>
                The secure form below lives on this page so you do not have to open your mail client. When you submit, the
                fields reset — copy your message first if you want to keep a record. Delivering mail still depends on your
                browser and network; if submission fails, use email directly.
              </p>
              <ul className="about-inline-list">
                <li>
                  <strong>Broken game:</strong> URL, browser name, and whether the frame is blank, blocked, or shows an
                  error code.
                </li>
                <li>
                  <strong>Metadata:</strong> game title on our site, what is wrong, and a correction if you know it.
                </li>
                <li>
                  <strong>Search:</strong> what you typed in the header search and what you expected to find.
                </li>
              </ul>
            </div>
          </div>
          <div className="about-split-visual">
            <AboutImageCarousel />
          </div>
        </div>
      </section>

      <section className="about-article about-contact-form-section" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading" className="about-section-title">
          Send a message
        </h2>
        <p>
          Use the form for structured feedback. To reach us without the form, email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
        <ContactForm />

        <h3 className="about-subhead">Response time</h3>
        <p>
          This is a small project. We batch-triage mail and cannot guarantee a personal reply to every message, but we do
          use reports to fix thumbnails, categories, and dead links.
        </p>

        <h3 className="about-subhead">Publishers and rights</h3>
        <p>
          If you represent a rights holder and need a listing changed, email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>{" "}
          with the game title, your official site or store link, and the URLs on this site you are concerned about.
        </p>
      </section>

      <section className="about-cta" aria-labelledby="contact-about-cta-heading">
        <h2 id="contact-about-cta-heading" className="about-cta-title">
          Learn how we work
        </h2>
        <p className="about-cta-lead">
          Curious about mission, community, and roadmap? The about page goes deeper on how the catalog is built.
        </p>
        <Link className="btn home-cta-primary about-cta-btn" href="/about">
          About {SITE_NAME}
        </Link>
      </section>
    </div>
  );
}
