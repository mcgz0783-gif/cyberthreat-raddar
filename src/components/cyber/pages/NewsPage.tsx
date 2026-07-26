import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { type NewsItem } from "@/data/cybersec";
import { NEWS_CONTENT } from "@/data/articleContent";
import { NewsCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { ArticleReader } from "../ArticleReader";
import { useNews } from "@/hooks/useNews";

export function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news: allNews, loading } = useNews();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (id) {
      const news = allNews.find(n => n.id.toString() === id);
      if (news) {
        setOpen(news);
      } else {
        navigate("/news", { replace: true });
      }
    } else {
      setOpen(null);
    }
  }, [id, navigate, allNews]);

  const cats = ["All","Threat Intel","Data Breach","AI Security","Tools","Ransomware","Nation State","Live Intel"];
  const filtered = allNews.filter(n =>
    (cat === "All" || n.cat === cat) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpen = (news: NewsItem) => {
    if (news.id.toString().startsWith("live-")) {
      // For live news without full content, redirect to source
      // We expect live news items to have a 'url' property from our API
      const liveItem = news as NewsItem & { url?: string };
      if (liveItem.url) window.open(liveItem.url, "_blank");
    } else {
      navigate(`/news/${news.id}`);
    }
  };

  const handleClose = () => {
    navigate("/news");
  };

  return (
    <section className="container mx-auto px-6 py-14">
      {open ? (
        <SEO 
          title={`${open.title} | Threat Feed — CyberHawk UG`} 
          description={open.summary}
          path={`/news/${open.id}`}
        />
      ) : (
        <SEO 
          title="Threat News | Live Breach & Vulnerability Feed" 
          description="Filter and search the latest breaches, exploits, vulnerabilities, and threat actor activity curated by CyberHawk UG."
          path="/news"
        />
      )}
      
      <SectionHeader eyebrow="Live Feed" title="Threat News" subtitle="Filter and search the latest breaches, exploits, vulnerabilities, and threat actor activity curated by CyberHawk UG." />

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

      <div className="font-mono text-xs text-muted-foreground tracking-wider mb-6 flex items-center gap-4">
        <span>SHOWING {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}</span>
        {loading && <span className="text-primary animate-pulse">● UPDATING FEED...</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(n => <NewsCard key={n.id} item={n} onClick={() => handleOpen(n)} />)}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <div className="font-display font-bold text-white text-xl tracking-wider">NO RESULTS FOUND</div>
        </div>
      )}

      {open && (
        <ArticleReader
          onClose={handleClose}
          meta={{
            eyebrow: open.cat,
            title: open.title,
            date: open.date,
            read: open.read,
            icon: (open as NewsItem & { icon?: string }).icon || "🛡️",
            tags: open.tags,
          }}
          body={NEWS_CONTENT[open.id]}
        />
      )}
    </section>
  );
}
