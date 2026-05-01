"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent-banner" role="dialog" aria-label="Cookie notice">
      <div className="container-fluid px-3 px-sm-4">
        <div className="cookie-consent-inner">
          <p className="cookie-consent-text">
            We use cookies to serve ads and improve your experience. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> for details.
          </p>
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-consent-accept" onClick={accept}>
              <i className="fa fa-check" aria-hidden />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
