import { useEffect, useState } from "react";
import { NEWS, BLOGS, STATS, TOOLS } from "@/data/cybersec";
import { NewsCard, BlogCard } from "../Cards";
import { SectionHeader, Newsletter } from "../Misc";
import { Ticker } from "../Ticker";

export function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => { if (c < 2365) return c + 47; clearInterval(t); return 2365; }), 20);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative hero-grid-bg overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-6 py-20 lg:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1.5 font-mono text-[11px] text-primary tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-success blink-anim" />
                LIVE THREAT INTELLIGENCE PLATFORM
              </div>
              <h1 className="font-display font-black text-white leading-[0.95] tracking-tight mb-6"
                  style={{ fontSize: "clamp(40px, 7vw, 84px)" }}>
                CYBERSECURITY<br/>
                <span className="glow-text">UPDATES</span>
              </h1>
              <p className="text-foreground/70 text-lg leading-relaxed max-w-xl mb-8">
                Global insights, breaking threats, expert analysis — your command center for all things cybersecurity.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <button className="btn-cyber" onClick={() => setPage("News")}>EXPLORE THREATS</button>
                <button className="btn-ghost-cyber" onClick={() => setPage("Blog")}>READ INSIGHTS</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                  <div key={s.label} className="border border-border bg-surface/50 p-4">
                    <div className="text-xl mb-1">{s.icon}</div>
                    <div className="stat-counter">{i === 0 ? count.toLocaleString() : s.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full border border-primary/20 rotate-slow" />
                <div className="absolute inset-8 rounded-full border border-primary/30" style={{ animation: "rotate-border 14s linear infinite reverse" }} />
                <div className="absolute inset-16 rounded-full border-2 border-primary/40 rotate-slow" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-9xl float-anim">🛡️</div>
                  <div className="font-mono text-xs text-primary mt-4 tracking-[4px]">SYSTEM // ACTIVE</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">[NODE-7341] ENCRYPTED</div>
                </div>
              </div>
              {[
                { emoji:"⚡", label:"Real-time", pos:"top-[5%] left-[-5%]" },
                { emoji:"🔒", label:"Encrypted", pos:"bottom-[5%] right-[-5%]" },
                { emoji:"🌐", label:"Global", pos:"top-[45%] right-[-12%]" },
              ].map((b) => (
                <div key={b.label} className={`absolute ${b.pos} bg-card border border-primary/40 px-3 py-2 flex items-center gap-2 float-anim shadow-glow`}>
                  <span className="text-lg">{b.emoji}</span>
                  <span className="font-mono text-[10px] text-primary tracking-wider">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* LATEST NEWS */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeader eyebrow="Real-time" title="Latest Threats" subtitle="Breaking cybersecurity news from across the globe, curated and analyzed by our research team." />
          <button onClick={() => setPage("News")} className="btn-ghost-cyber text-xs">VIEW ALL →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.slice(0,3).map(n => <NewsCard key={n.id} item={n} onClick={() => setPage("News")} />)}
        </div>
      </section>

      {/* TOOLS */}
      <section className="bg-surface/50 border-y border-border">
        <div className="container mx-auto px-6 py-20">
          <SectionHeader eyebrow="Toolkit" title="Security Tools" subtitle="Free utilities to assess, analyze, and harden your digital infrastructure." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map(tool => (
              <div key={tool.name} className="card-cyber p-6 cursor-pointer group">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{tool.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{tool.desc}</p>
                <div className="font-mono text-xs tracking-widest" style={{ color: tool.color }}>▸ LAUNCH TOOL</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeader eyebrow="Editorial" title="Featured Blog Posts" subtitle="In-depth technical guides and analyses from leading practitioners." />
          <button onClick={() => setPage("Blog")} className="btn-ghost-cyber text-xs">ALL POSTS →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOGS.filter(b => b.featured).map(b => <BlogCard key={b.id} item={b} onClick={() => setPage("Blog")} />)}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
