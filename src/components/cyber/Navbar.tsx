import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Insights", path: "/insights" },
  { label: "Blog", path: "/blog" },
  { label: "Books", path: "/books" },
  { label: "Tools", path: "/tools" },
  { label: "Courses", path: "/courses" },
  { label: "About", path: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const activePage = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "Home";
    const segment = path.slice(1);
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [location.pathname]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.path}
              onClick={() => window.scrollTo(0, 0)}
              className={`nav-link-item ${activePage === n.label ? "active" : ""}`}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/contact" className="btn-cyber text-xs" onClick={() => window.scrollTo(0, 0)}>
            SUBSCRIBE
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="md:hidden border border-border text-primary px-3 py-1.5 text-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border container mx-auto py-2">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.path}
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left py-3 font-bold text-base tracking-[2px] uppercase border-b border-border/40 ${activePage === n.label ? "text-primary" : "text-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
