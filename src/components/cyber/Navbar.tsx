import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = ["Home","News","Insights","Blog","Books","About","Contact"] as const;
export type PageKey = typeof NAV[number];

interface NavbarProps { page: string; setPage: (p: string) => void; }

export function Navbar({ page, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p: string) => { setPage(p); setMobileOpen(false); window.scrollTo(0,0); };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Logo onClick={() => go("Home")} />

        <div className="hidden md:flex items-center gap-8">
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)} className={`nav-link-item ${page===n?"active":""}`}>
              {n}
            </button>
          ))}
          <button className="btn-cyber text-xs" onClick={() => go("Contact")}>SUBSCRIBE</button>
        </div>

        <button
          className="md:hidden border border-border text-primary px-3 py-1.5 text-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border container mx-auto py-2">
          {NAV.map(n => (
            <button
              key={n}
              onClick={() => go(n)}
              className={`block w-full text-left py-3 font-bold text-base tracking-[2px] uppercase border-b border-border/40 ${page===n?"text-primary":"text-foreground"}`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
