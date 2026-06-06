import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Misc";
import { FloatingCTA } from "@/components/cyber/FloatingCTA";
import { SEO } from "@/components/SEO";

const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": { title: "CyberSec Updates — Live Threat Intelligence Platform", description: "Global cybersecurity news, threat intelligence, expert blog posts, and curated security books for professionals." },
  "/news": { title: "Threat News — CyberSec Updates", description: "Latest cybersecurity threats, breaches, exploits, and vulnerability disclosures from across the globe." },
  "/insights": { title: "Expert Insights — CyberSec Updates", description: "Deep-dive research, policy briefs, and industry analysis from leading security professionals and institutions." },
  "/blog": { title: "Security Blog — CyberSec Updates", description: "Technical guides, war stories, and tactical cybersecurity writing from practitioners." },
  "/books": { title: "Curated Books — CyberSec Updates", description: "The essential cybersecurity bookshelf — curated books for offensive security, blue team, architecture, and more." },
  "/about": { title: "About — CyberSec Updates", description: "Mission, values, and team behind the CyberSec Updates threat intelligence platform." },
  "/contact": { title: "Contact — CyberSec Updates", description: "Get in touch with the CyberSec Updates team for partnerships, media, and general inquiries." },
  "/tools": { title: "Security Tools — CyberSec Updates", description: "Free security utilities: CVE search, hash checker, IP reputation lookup, SSL inspector, and threat map." },
  "/courses": { title: "Free Courses — CyberSec Updates", description: "Curated free cybersecurity certifications, training resources, and educational pathways." },
  "/privacy": { title: "Privacy Policy — CyberSec Updates", description: "How CyberSec Updates handles your data, cookies, and privacy commitments." },
  "/terms": { title: "Terms of Service — CyberSec Updates", description: "Terms and conditions for using the CyberSec Updates platform and services." },
};

function RouteSEO() {
  const { pathname } = useLocation();
  const cfg = PAGE_SEO[pathname] || PAGE_SEO["/"];
  return <SEO title={cfg.title} description={cfg.description} path={pathname} />;
}

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <Navbar />
      <RouteSEO />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
