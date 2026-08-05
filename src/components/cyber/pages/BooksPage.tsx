import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BOOKS, type BookItem } from "@/data/cybersec";
import { BookCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { BookReader } from "../BookReader";

export function BooksPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [reading, setReading] = useState<BookItem | null>(null);

  useEffect(() => {
    if (slug) {
      const book = BOOKS.find(b => b.slug === slug || b.id.toString() === slug);
      if (book) {
        setReading(book);
        // If it was found by ID, redirect to the slug for SEO
        if (book.id.toString() === slug) {
          navigate(`/books/${book.slug}`, { replace: true });
        }
      } else {
        navigate("/books", { replace: true });
      }
    } else {
      setReading(null);
    }
  }, [slug, navigate]);

  const cats = ["All", ...Array.from(new Set(BOOKS.map(b => b.cat)))];
  const filtered = BOOKS.filter(b =>
    (cat === "All" || b.cat === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRead = (book: BookItem) => {
    navigate(`/books/${book.slug}`);
  };

  const handleClose = () => {
    navigate("/books");
  };

  return (
    <section className="container mx-auto px-6 py-14">
      {reading ? (
        <SEO 
          title={reading.title} 
          description={reading.desc}
          path={`/books/${reading.slug}`}
          type="book"
          author={reading.author}
          keywords={`${reading.cat}, cybersecurity books, ${reading.title}, CyberHawk UG library`}
        />
      ) : (
        <SEO 
          title="Cybersecurity Books | The Essential Library" 
          description="The essential cybersecurity bookshelf by CyberHawk UG — including guides for offensive security, blue team, and AI agents."
          path="/books"
          keywords="Cybersecurity Books, CyberHawk UG, hacking books, AI agents, security literature Africa"
        />
      )}
      
      <SectionHeader 
        eyebrow="Library" 
        title="Cybersecurity Books by CyberHawk UG" 
        subtitle="The essential cybersecurity bookshelf — from offensive techniques to defense architecture by CyberHawk UG." 
        level={reading ? "h2" : "h1"}
      />

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="lg:w-96"><SearchBar placeholder="Search by title or author..." value={search} onChange={setSearch} /></div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(b => <BookCard key={b.id} item={b} onRead={() => handleRead(b)} />)}
      </div>

      {reading && <BookReader book={reading} onClose={handleClose} />}
    </section>
  );
}
