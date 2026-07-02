import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BLOGS, type BlogItem } from "@/data/cybersec";
import { BLOG_CONTENT } from "@/data/articleContent";
import { BlogCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { ArticleReader } from "../ArticleReader";

export function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<BlogItem | null>(null);

  useEffect(() => {
    if (id) {
      const blog = BLOGS.find(b => b.id.toString() === id);
      if (blog) {
        setOpen(blog);
      } else {
        navigate("/blog", { replace: true });
      }
    } else {
      setOpen(null);
    }
  }, [id, navigate]);

  const cats = ["All", ...Array.from(new Set(BLOGS.map(b => b.cat)))];
  const filtered = BLOGS.filter(b =>
    (cat === "All" || b.cat === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.summary.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpen = (blog: BlogItem) => {
    navigate(`/blog/${blog.id}`);
  };

  const handleClose = () => {
    navigate("/blog");
  };

  return (
    <section className="container mx-auto px-6 py-14">
      {open ? (
        <SEO 
          title={open.title} 
          description={open.summary}
          path={`/blog/${open.id}`}
          type="article"
          author={open.author}
          keywords={`${open.cat}, cybersecurity blog, ${open.title}, CyberHawk UG insights`}
        />
      ) : (
        <SEO 
          title="Security Blog | Technical Guides & Insights" 
          description="Long-form technical writing, war stories, and tactical guides from the CyberHawk UG security community."
          path="/blog"
          keywords="cybersecurity blog, ethical hacking articles, security research Africa, tech guides"
        />
      )}
      
      <SectionHeader eyebrow="Editorial" title="The Blog" subtitle="Long-form technical writing, war stories, and tactical guides from the CyberHawk UG security community." />

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
        {filtered.map(b => <BlogCard key={b.id} item={b} onClick={() => handleOpen(b)} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <div className="font-display font-bold text-white text-xl tracking-wider">NO ARTICLES FOUND</div>
        </div>
      )}

      {open && (
        <ArticleReader
          onClose={handleClose}
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
