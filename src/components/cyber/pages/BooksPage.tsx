import { useState } from "react";
import { SEO } from "@/components/SEO";
import { BOOKS, type BookItem } from "@/data/cybersec";
import { BookCard } from "../Cards";
import { SearchBar, SectionHeader } from "../Misc";
import { BookReader } from "../BookReader";

export function BooksPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [reading, setReading] = useState<BookItem | null>(null);
  const cats = ["All", ...Array.from(new Set(BOOKS.map(b => b.cat)))];
  const filtered = BOOKS.filter(b =>
    (cat === "All" || b.cat === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO 
        title="Curated Books — CyberSec Updates" 
        description="Essential cybersecurity bookshelf — offensive techniques, defense architecture, and security theory."
        path="/books"
      />
      <SectionHeader eyebrow="Library" title="Curated Books" subtitle="The essential cybersecurity bookshelf — from offensive techniques to defense architecture." />

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
        {filtered.map(b => <BookCard key={b.id} item={b} onRead={() => setReading(b)} />)}
      </div>

      {reading && <BookReader book={reading} onClose={() => setReading(null)} />}
    </section>
  );
}
