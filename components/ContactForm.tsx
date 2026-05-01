"use client";

import { useState } from "react";
import { SITE_EMAIL } from "@/lib/site-contact";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    window.setTimeout(() => setSent(false), 6000);
  }

  return (
    <form className="playzo-contact-form" onSubmit={onSubmit} noValidate>
      <div className="playzo-contact-form-row">
        <label className="playzo-contact-label" htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" name="name" type="text" className="playzo-contact-input" autoComplete="name" />
      </div>
      <div className="playzo-contact-form-row">
        <label className="playzo-contact-label" htmlFor="contact-email">
          Your email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="playzo-contact-input"
          autoComplete="email"
          inputMode="email"
        />
      </div>
      <div className="playzo-contact-form-row">
        <label className="playzo-contact-label" htmlFor="contact-subject">
          Subject
        </label>
        <input id="contact-subject" name="subject" type="text" className="playzo-contact-input" />
      </div>
      <div className="playzo-contact-form-row">
        <label className="playzo-contact-label" htmlFor="contact-message">
          Message
        </label>
        <textarea id="contact-message" name="message" className="playzo-contact-textarea" rows={5} />
      </div>
      <button type="submit" className="btn playzo-contact-submit">
        Send
      </button>
      {sent ? (
        <p className="playzo-contact-sent mb-0 mt-2 small" role="status">
          Thanks — your message was cleared. To reach us, email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
      ) : null}
    </form>
  );
}
