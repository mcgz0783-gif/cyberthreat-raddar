import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Misc";
import { FloatingCTA } from "@/components/cyber/FloatingCTA";
import { SEO } from "@/components/SEO";

const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": { title: "CyberHawk UG | Global Cybersecurity & AI Education", description: "The leading cybersecurity and AI education platform in Africa and globally. Explore high-quality books, real-time threat intelligence, and expert insights." },
  "/news": { title: "Threat Intelligence Feed | Real-Time Security Updates", description: "Stay ahead of the curve with CyberHawk UG's live threat intelligence feed. Breaking news on breaches, zero-days, and global cyber threats." },
  "/insights": { title: "Security Insights | Expert Analysis & Research", description: "Deep-dive research and industry analysis from CyberHawk UG. Understand the evolving threat landscape and modern defense strategies." },
  "/blog": { title: "Cybersecurity Blog | Technical Guides & Tactical Writing", description: "High-quality technical articles, ethical hacking guides, and AI tutorials from the CyberHawk UG research community." },
  "/books": { title: "Cybersecurity Library | Foundational Books by CyberHawk UG", description: "The essential cybersecurity bookshelf. Original literature by CyberHawk UG covering ethical hacking, AI agents, and security fundamentals." },
  "/about": { title: "About CyberHawk UG | Leadership & Vision", description: "Learn about our mission, our CEO Samuel Mucunguzi, and our commitment to making high-quality security education accessible globally." },
  "/contact": { title: "Secure Channels | Establish Connection with CyberHawk UG", description: "Get in touch with CyberHawk UG for partnerships, tip-offs, or inquiries about our educational resources." },
  "/tools": { title: "Security Toolkit | Free Assessment & Defense Utilities", description: "Free security tools by CyberHawk UG: Threat maps, CVE search, and reputation lookup utilities to harden your infrastructure." },
  "/courses": { title: "Cybersecurity Courses | Training & Certification Paths", description: "Curated cybersecurity training paths and certification resources to accelerate your career in the digital economy." },
  "/privacy": { title: "Privacy Policy | Your Data Security at CyberHawk UG", description: "Our commitment to your privacy and data protection at CyberHawk UG." },
  "/terms": { title: "Terms of Service | Platform Usage & Licensing", description: "Terms and conditions for accessing the CyberHawk UG platform and educational materials." },
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
