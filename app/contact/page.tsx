import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact us",
  description: `Email or call ${SITE_NAME} for broken embeds, wrong genres, or rights questions. We triage reports regularly — include URLs and browser details.`,
  path: "/contact",
  ogImage: "/assets/img/logo.png",
});

export default function ContactPage() {
  return (
    <div className="container-fluid px-2 px-sm-3 py-4 py-lg-5 about-page-shell">
      <ContactPageContent />
    </div>
  );
}
