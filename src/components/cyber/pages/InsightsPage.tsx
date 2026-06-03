import { useState } from "react";
import { INSIGHTS, type InsightItem } from "@/data/cybersec";
import { INSIGHT_CONTENT } from "@/data/articleContent";
import { InsightCard } from "../Cards";
import { SectionHeader } from "../Misc";
import { ArticleReader } from "../ArticleReader";

export function InsightsPage() {
  const featured = INSIGHTS[0];
  const [open, setOpen] = useState<InsightItem | null>(null);

  return (
    <section className="container mx-auto px-6 py-14">
      <SectionHeader eyebrow="Deep Analysis" title="Expert Insights" subtitle="Long-form research, policy briefs, and industry reports from top security analysts and institutions." />

      {/* Featured */}
      <div className="card-cyber p-8 lg:p-10 mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-glow" />
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag-chip" style={{ background:"hsl(var(--primary)/0.15)", border:"1px solid hsl(var(--primary)/0.5)", color:"hsl(var(--primary))" }}>
              {featured.cat}
            </span>
            <span className="tag-chip bg-warning/15 border border-warning/50 text-warning">FEATURED</span>
          </div>
          <h2 className="font-display font-black text-white text-3xl lg:text-4xl leading-tight mb-4">{featured.title}</h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            A comprehensive examination of how ransomware operations have evolved from opportunistic attacks to sophisticated, enterprise-scale criminal enterprises with dedicated R&D teams, affiliate networks, and PR departments.
          </p>
          <button onClick={() => setOpen(featured)} className="btn-cyber">READ FULL REPORT →</button>
        </div>
        <div className="text-9xl text-center hidden lg:block float-anim">{featured.img}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {INSIGHTS.slice(1).map(item => <InsightCard key={item.id} item={item} onClick={() => setOpen(item)} />)}
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-primary border border-primary/30 p-8 lg:p-10">
        <h3 className="font-display font-black text-white text-2xl tracking-wider uppercase mb-6">📌 Key Takeaways This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon:"⬆", text:"Ransomware payments up 89% YoY as double-extortion becomes standard" },
            { icon:"🤖", text:"AI-generated phishing emails now bypass 76% of traditional email filters" },
            { icon:"🔐", text:"MFA adoption in enterprises reaches 68% but still leaves gaps" },
            { icon:"🌍", text:"17 critical infrastructure incidents recorded globally in March alone" },
          ].map((k, i) => (
            <div key={i} className="flex gap-3 bg-background/40 border border-border p-4">
              <div className="text-2xl">{k.icon}</div>
              <p className="text-sm text-foreground/80 leading-relaxed">{k.text}</p>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <ArticleReader
          onClose={() => setOpen(null)}
          meta={{
            eyebrow: open.cat,
            title: open.title,
            byline: open.author,
            date: open.date,
            read: open.read,
            icon: open.img,
          }}
          body={INSIGHT_CONTENT[open.id]}
        />
      )}
    </section>
  );
}
