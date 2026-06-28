import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function SearchBar({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base pointer-events-none">🔍</span>
      <input
        type="text"
        className="input-cyber"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ paddingLeft: 44 }}
      />
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <div className="font-mono text-xs text-primary tracking-[3px] uppercase mb-3">
          ▸ {eyebrow}
        </div>
      )}
      <h2 className="section-title mb-3">{title}</h2>
      {subtitle && <p className="text-foreground/85 text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="bg-gradient-primary border border-primary/40 p-10 md:p-14 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="text-5xl mb-4 relative">📡</div>
        <h2 className="section-title mb-3 relative">STAY IN THE LOOP</h2>
        <p className="text-foreground/70 max-w-xl mx-auto mb-8 relative">
          Real-time threat intelligence, curated news, and deep-dive analysis — delivered weekly to your inbox.
        </p>
        {sent ? (
          <div className="font-mono text-success text-base tracking-wider relative">
            ✓ SUBSCRIBED — WELCOME TO THE NETWORK
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative">
            <input
              type="email"
              className="input-cyber flex-1"
              placeholder="operator@secure.net"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="btn-cyber whitespace-nowrap" onClick={() => email && setSent(true)}>
              SUBSCRIBE NOW
            </button>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-6 font-mono relative">
          No spam. Unsubscribe anytime. Read by 40,000+ security professionals.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const links: { section: string; items: { label: string; path: string }[] }[] = [
    { section: "Platform", items: [
      { label: "Home", path: "/" },
      { label: "News", path: "/news" },
      { label: "Insights", path: "/insights" },
      { label: "Blog", path: "/blog" },
      { label: "Books", path: "/books" },
    ]},
    { section: "Company", items: [
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms", path: "/terms" },
    ]},
    { section: "Resources", items: [
      { label: "CVE Database", path: "/tools" },
      { label: "Security Tools", path: "/tools" },
      { label: "Free Courses", path: "/courses" },
      { label: "Threat Map", path: "/tools" },
    ]},
  ];
  return (
    <footer className="border-t border-border bg-surface/50 mt-12">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="lg:col-span-2">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <Logo />
            </Link>
            <p className="text-sm text-foreground/80 mt-4 max-w-sm leading-relaxed">
              The definitive platform for cybersecurity professionals. Global intelligence, expert analysis, and continuous education.
            </p>
            <div className="flex gap-2 mt-5">
              {["𝕏","in","gh","▶"].map(s => (
                <a key={s} href="#" className="w-9 h-9 border border-border text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-sm font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {links.map(({ section, items }) => (
            <div key={section}>
              <div className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
                {section}
              </div>
              {items.map(item => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block text-sm text-muted-foreground mb-2.5 cursor-pointer hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Contact
            </div>
            {[
              { icon:"✉", val:"kevlarmackenzie@gmail.com" },
              { icon:"📞", val:"0783699626" },
              { icon:"💬", val:"WhatsApp: 0788213106" },
            ].map(c => (
              <div key={c.val} className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5 break-all">
                <span className="text-primary">{c.icon}</span>{c.val}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-border text-xs font-mono text-muted-foreground">
          <span>© 2025 CyberSec Updates. All rights reserved.</span>
          <span className="text-primary tracking-widest">SECURE // ENCRYPTED // VERIFIED</span>
        </div>
      </div>
    </footer>
  );
}
