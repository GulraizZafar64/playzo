import type { Metadata } from "next";
import PrivacyPageContent from "@/components/PrivacyPageContent";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: `${SITE_NAME} privacy: cookies, Google AdSense, localStorage favorites, server logs, and third-party game iframes. UK / GDPR-aligned practices.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-fluid px-2 px-sm-3 py-4 py-lg-5 about-page-shell">
      <PrivacyPageContent />
    </div>
  );
}
