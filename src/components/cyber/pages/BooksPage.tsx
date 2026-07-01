import { Helmet } from "react-helmet-async";
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
        title="Cybersecurity Books by cyberhawk UG | The Art of Intrusion, Hacking, and more" 
        description="The essential cybersecurity bookshelf by cyberhawk UG — including The Art of Intrusion, Hacking: The Art of Exploitation, and specialized guides for offensive security, blue team, and AI agents."
        path="/books"
      />
      
      <Helmet>
        <meta name="keywords" content="Cybersecurity Books, cyberhawk UG, The Art of Intrusion, Hacking The Art of Exploitation, Web Application Hacker's Handbook, Blue Team Handbook, Threat Intelligence, Zero Trust Networks, Practical Malware Analysis, Social Engineering, AI Agents for Money" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": BOOKS.map((book, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Book",
                "name": book.title,
                "author": {
                  "@type": "Person",
                  "name": book.author
                },
                "description": book.desc,
                "genre": book.cat,
                "datePublished": book.year.toString()
              }
            }))
          })}
        </script>
      </Helmet>

      <SectionHeader eyebrow="Library" title="Cybersecurity Books by cyberhawk UG" subtitle="The essential cybersecurity bookshelf — from offensive techniques to defense architecture by cyberhawk UG." />

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
