import type { Metadata } from "next";
import TermsPageContent from "@/components/TermsPageContent";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms and conditions",
  description: `Terms of use for ${SITE_NAME}: acceptable use, third-party games, liability limits, and governing law (England and Wales).`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-fluid px-2 px-sm-3 py-4 py-lg-5 about-page-shell">
      <TermsPageContent />
    </div>
  );
}
