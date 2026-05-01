import Link from "next/link";
import { SITE_NAME } from "@/lib/site-brand";
import { SITE_ADDRESS_LINE, SITE_EMAIL, SITE_PHONE_E164, SITE_PHONE_LABEL } from "@/lib/site-contact";
import { SITE_PUBLIC_NAV } from "@/lib/site-pages";

export default function SiteFooter() {
  return (
    <>
      <footer className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ft-item">
                <h4 className="widget-title">About Us</h4>
                <p>
                  {SITE_NAME} is your premier source for playing unblocked games at school or work. We provide a
                  curated, safe-to-play catalog of high-quality titles that work instantly in your browser without
                  downloads or accounts.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ft-item">
                <h4 className="widget-title">Contact Us</h4>
                <p className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="bi bi-envelope"
                    style={{ fontSize: "16px" }}
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                  <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
                </p>
                <p className="mb-2">
                  <span className="me-1" aria-hidden>
                    ☎
                  </span>
                  <a href={`tel:${SITE_PHONE_E164}`}>{SITE_PHONE_LABEL}</a>
                </p>
                <p className="mb-0 small text-muted">{SITE_ADDRESS_LINE}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ft-item">
                <h4 className="widget-title">Pages</h4>
                <ul className="pages" style={{ paddingLeft: "1rem" }}>
                  {SITE_PUBLIC_NAV.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} prefetch={p.href !== "/"}>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                  {/* <li>
                    <a href="/dmca/">DMCA</a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          © 2026 {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </>
  );
}
