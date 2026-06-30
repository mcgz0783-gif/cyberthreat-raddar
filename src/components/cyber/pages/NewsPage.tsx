import { useState } from "react";
import { SEO } from "@/components/SEO";
import { NEWS, type NewsItem } from "@/data/cybersec";
import { NEWS_CONTENT } from "@/data/articleContent";
import { NewsCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { ArticleReader } from "../ArticleReader";

export function NewsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<NewsItem | null>(null);
  const cats = ["All","Threat Intel","Data Breach","AI Security","Tools","Ransomware","Nation State"];
  const filtered = NEWS.filter(n =>
    (cat === "All" || n.cat === cat) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO 
        title="Threat News — CyberSec Updates" 
        description="Filter and search the latest breaches, exploits, vulnerabilities, and threat actor activity."
        path="/news"
      />
      <SectionHeader eyebrow="Live Feed" title="Threat News" subtitle="Filter and search the latest breaches, exploits, vulnerabilities, and threat actor activity." />

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="lg:w-96"><SearchBar placeholder="Search threats, CVEs, actors..." value={search} onChange={setSearch} /></div>
        <div className="flex flex-wrap gap-2">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all border ${
                cat === c ? "bg-primary/15 border-primary text-primary" : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
              }`}
            >{c}</button>
          ))}
        </div>
      </div>

      <div className="font-mono text-xs text-muted-foreground tracking-wider mb-6">
        SHOWING {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(n => <NewsCard key={n.id} item={n} onClick={() => setOpen(n)} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <div className="font-display font-bold text-white text-xl tracking-wider">NO RESULTS FOUND</div>
        </div>
      )}

      {open && (
        <ArticleReader
          onClose={() => setOpen(null)}
          meta={{
            eyebrow: open.cat,
            title: open.title,
            date: open.date,
            read: open.read,
            icon: open.icon,
            tags: open.tags,
          }}
          body={NEWS_CONTENT[open.id]}
        />
      )}
    </section>
  );
}
