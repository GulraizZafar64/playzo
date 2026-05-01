import type { Metadata } from "next";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import LayoutChrome from "@/components/LayoutChrome";
import { SITE_NAME } from "@/lib/site-brand";
import { ADSENSE_CLIENT_ID } from "@/lib/site-ads";
import { SITE_EMAIL, SITE_PHONE_E164 } from "@/lib/site-contact";
import { PUBLIC_CATALOG_SIZE_LABEL } from "@/lib/site-stats";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const siteOrigin = siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Free browser games online`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Play ${PUBLIC_CATALOG_SIZE_LABEL} free unblocked games in your browser: action, puzzle, racing, sports, and more. No download, instant load. ${SITE_NAME} is built for quick breaks with search and categories.`,
  applicationName: SITE_NAME,
  icons: {
    icon: "/assets/img/logo.png",
    apple: "/assets/img/logo.png",
  },
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-bs-theme="dark"
      data-theme="dark"
      data-offcanvas-nav="closed"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="google-site-verification" content="gmKmK-m0tKgqAjLoj6Swjh5zQUV-UhrHtItYDzZf9xU" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/Quicksand.css" />
        <link rel="stylesheet" href="/assets/fonts/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://1v1lol-unblocked.bitbucket.io" />
        <link rel="preconnect" href="https://1v1lol-unblocked.bitbucket.io" />
        <link rel="dns-prefetch" href="https://unblockedgames67.gitlab.io" />
        <link rel="preconnect" href="https://unblockedgames67.gitlab.io" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4BFZYL1PJW" />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4BFZYL1PJW');
          `}
        </Script>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteOrigin}#organization`,
                  name: SITE_NAME,
                  url: siteOrigin,
                  logo: `${siteOrigin}/assets/img/logo.png`,
                  address: { "@type": "PostalAddress", addressCountry: "GB" },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      contactType: "customer support",
                      email: SITE_EMAIL,
                      telephone: SITE_PHONE_E164,
                      areaServed: "GB",
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  name: SITE_NAME,
                  url: siteOrigin,
                  inLanguage: "en-GB",
                  publisher: { "@id": `${siteOrigin}#organization` },
                },
              ],
            }),
          }}
        />
        <LayoutChrome>{children}</LayoutChrome>
        <CookieConsent />
        <Script src="/assets/js/jquery.min.js" strategy="afterInteractive" />
        <Script src="/assets/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/analytics_v1_0.js" strategy="afterInteractive" />
        <Script src="/assets/js/adsense_v1.js" strategy="afterInteractive" />
        <Script src="/assets/js/search_v1_0.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
