import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { SITE_NAME } from "@/lib/site-brand";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Learn why ${SITE_NAME} exists, how we curate HTML5 browser games, and how to report issues. Mission, editorial standards, and roadmap — based in the United Kingdom.`,
  path: "/about",
  ogImage: "/assets/img/logo.png",
});

export default function AboutPage() {
  return (
    <div className="container-fluid px-2 px-sm-3 py-4 py-lg-5 about-page-shell">
      <AboutPageContent />
    </div>
  );
}
