import { useState } from "react";
import { BLOGS, type BlogItem } from "@/data/cybersec";
import { BLOG_CONTENT } from "@/data/articleContent";
import { BlogCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { ArticleReader } from "../ArticleReader";

export function BlogPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<BlogItem | null>(null);
  const cats = ["All", ...Array.from(new Set(BLOGS.map(b => b.cat)))];
  const filtered = BLOGS.filter(b =>
    (cat === "All" || b.cat === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="container mx-auto px-6 py-14">
      <SectionHeader eyebrow="Editorial" title="The Blog" subtitle="Long-form technical writing, war stories, and tactical guides from the security community." />

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="lg:w-96"><SearchBar placeholder="Search articles..." value={search} onChange={setSearch} /></div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(b => <BlogCard key={b.id} item={b} onClick={() => setOpen(b)} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <div className="font-display font-bold text-white text-xl tracking-wider">NO ARTICLES FOUND</div>
        </div>
      )}

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
          body={BLOG_CONTENT[open.id]}
        />
      )}
    </section>
  );
}
