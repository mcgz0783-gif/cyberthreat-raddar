import { useEffect, useMemo, useState } from "react";
import { type BookItem } from "@/data/cybersec";
import { BOOK_CONTENT, CUSTOM_COVERS } from "@/data/bookContent";

// Pick relevant Unsplash imagery from chapter title keywords.
const KEYWORD_MAP: { match: RegExp; q: string }[] = [
  { match: /agent|ai|llm|brain/i, q: "artificial-intelligence,robot" },
  { match: /money|payment|stripe|bank|pricing|sell/i, q: "money,finance" },
  { match: /crypto|wallet|trad/i, q: "cryptocurrency,bitcoin" },
  { match: /tiktok|youtube|instagram|social|content/i, q: "social-media,creator" },
  { match: /deploy|vercel|cloud|scaling|observ/i, q: "server,cloud-computing" },
  { match: /supabase|database|data|memory/i, q: "database,data" },
  { match: /github|cursor|lovable|build|stack|code/i, q: "code,developer" },
  { match: /ecommerce|shop|dropship/i, q: "ecommerce,shopping" },
  { match: /security|compliance|intrusion|hacker|attack|phish|threat/i, q: "cybersecurity,hacker" },
  { match: /social engineering|human|insider|mindset|people/i, q: "office,people" },
  { match: /phone|network|telecom/i, q: "telecom,network" },
  { match: /physical|tailgate|access/i, q: "office-door,badge" },
  { match: /lesson|foreword|afterword|case|study|number/i, q: "notebook,study" },
  { match: /architecture|design|tool/i, q: "blueprint,architecture" },
  { match: /workflow|hybrid|manual|automation/i, q: "automation,workflow" },
  { match: /niche|market/i, q: "marketing,strategy" },
];

function chapterImage(title: string, bookId: number, idx: number): string {
  const hit = KEYWORD_MAP.find(k => k.match.test(title));
  // Ensure the query is explicitly tech-focused and not related to geography or flags
  const q = hit?.q ?? "technology,abstract,computing";
  return `https://source.unsplash.com/featured/640x260/?${encodeURIComponent(q)}&sig=${bookId}-${idx}`;
}

type Page =
  | { kind: "cover" }
  | { kind: "toc" }
  | { kind: "body"; chapterIndex: number; pageIndex: number; chapterTitle: string };

export function BookReader({ book, onClose }: { book: BookItem; onClose: () => void }) {
  const content = BOOK_CONTENT[book.id];

  const pages = useMemo<Page[]>(() => {
    if (!content) return [{ kind: "cover" }];
    const list: Page[] = [{ kind: "cover" }, { kind: "toc" }];
    content.chapters.forEach((ch, ci) => {
      ch.pages.forEach((_, pi) =>
        list.push({ kind: "body", chapterIndex: ci, pageIndex: pi, chapterTitle: ch.title })
      );
    });
    return list;
  }, [content]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(i => Math.min(i + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pages.length, onClose]);

  if (!content) return null;
  const page = pages[idx];

  const jumpToChapter = (ci: number) => {
    const i = pages.findIndex(p => p.kind === "body" && p.chapterIndex === ci && p.pageIndex === 0);
    if (i >= 0) setIdx(i);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex items-center justify-center p-0 sm:p-6 fade-in overflow-hidden">
      <div className="relative w-full max-w-5xl h-full sm:h-[95vh] flex flex-col bg-background/50 border-x sm:border border-border/50 sm:rounded-xl shadow-2xl overflow-hidden">
        {/* Modern Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 min-w-0">
            <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{book.icon}</span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-white text-base sm:text-lg truncate leading-tight">{book.title}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{book.cat}</span>
                <span className="text-muted-foreground text-[10px] truncate">by {book.author}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.print();
              }}
              className="text-white bg-primary hover:bg-primary/80 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors no-print"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group"
              aria-label="Close reader"
            >
              <span className="text-2xl text-muted-foreground group-hover:text-white transition-colors">×</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-neutral-900/40 custom-scrollbar flex justify-center py-4 sm:py-10 px-4">
          <div className="w-full max-w-[800px] aspect-[1/1.414] min-h-[1100px] bg-white text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative transition-all duration-300 transform origin-top mb-12 sm:rounded-sm overflow-hidden BookReader_A4">
            
            {/* Page Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
              <div className="text-[300px] transform -rotate-12">🛡️</div>
            </div>
            
            {/* Content Container */}
            <div className="flex-1 flex flex-col px-8 sm:px-16 py-12 sm:py-20 z-[1]">
              
              {page.kind === "cover" && (
                <div className="h-full flex flex-col">
                  {CUSTOM_COVERS[book.id] ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8">
                      <div className="w-full max-w-[80%] aspect-[3/4] relative group">
                        <img 
                          src={CUSTOM_COVERS[book.id]} 
                          alt={`${book.title} cover`} 
                          className="w-full h-full object-cover shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                      </div>
                      <div className="text-center space-y-4">
                        <p className="font-serif italic text-xl text-neutral-700 max-w-lg leading-relaxed">{content.cover.tagline}</p>
                        <div className="h-0.5 w-16 bg-neutral-200 mx-auto"></div>
                        <p className="text-neutral-500 text-sm font-mono tracking-widest uppercase">{book.author}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="text-[120px] mb-8 animate-pulse drop-shadow-xl">{book.icon}</div>
                      <div className="space-y-6">
                        <p className="font-mono text-xs tracking-[0.4em] text-neutral-400 uppercase">
                          {book.cat}
                        </p>
                        <h1 className="font-serif font-black text-neutral-900 text-4xl sm:text-6xl leading-[1.1] mb-6">
                          {book.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-neutral-500 italic">
                          <span>{book.author}</span>
                          <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                          <span>Edition {book.year}</span>
                        </div>
                        <div className="w-24 h-px bg-neutral-200 mx-auto my-8"></div>
                        <p className="font-serif italic text-xl text-neutral-700 max-w-xl leading-relaxed mx-auto">
                          "{content.cover.tagline}"
                        </p>
                        <p className="text-base text-neutral-600 max-w-lg mx-auto leading-relaxed pt-8 font-serif">
                          {content.cover.blurb}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {page.kind === "toc" && (
                <div className="h-full flex flex-col">
                  <div className="mb-12">
                    <h2 className="font-serif font-bold text-neutral-900 text-3xl mb-2 tracking-tight">Contents</h2>
                    <div className="h-1 w-12 bg-neutral-900"></div>
                  </div>
                  <nav className="flex-1">
                    <ul className="space-y-1">
                      {content.toc.map((t, i) => {
                        const chapterIndex = content.chapters.findIndex(c => c.title === t);
                        const clickable = chapterIndex >= 0;
                        return (
                          <li key={i} className="group">
                            <button
                              disabled={!clickable}
                              onClick={() => clickable && jumpToChapter(chapterIndex)}
                              className={`w-full text-left flex items-center justify-between py-3 border-b border-neutral-100 transition-all ${
                                clickable
                                  ? "hover:pl-2 cursor-pointer"
                                  : "opacity-60 cursor-default"
                              }`}
                            >
                              <div className="flex items-baseline gap-4">
                                <span className="font-mono text-[10px] text-neutral-400 w-6">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className={`font-serif text-lg ${clickable ? "text-neutral-800 group-hover:text-black" : "text-neutral-500"}`}>
                                  {t}
                                </span>
                              </div>
                              {clickable && <span className="text-neutral-300 group-hover:text-neutral-900 transition-colors">→</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <div className="mt-auto pt-12 text-center opacity-40 grayscale filter">
                    <span className="text-4xl">🦅</span>
                  </div>
                </div>
              )}

              {page.kind === "body" && (
                <article className="h-full flex flex-col font-serif">
                  <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Chapter {page.chapterIndex + 1}</span>
                      <div className="flex-1 h-px bg-neutral-100"></div>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-6">
                      {page.chapterTitle}
                    </h3>
                  </header>
                  
                  {page.pageIndex === 0 && (
                    <figure className="mb-10 group relative">
                      <div className="overflow-hidden bg-neutral-50 border border-neutral-100 shadow-md">
                        <img
                          src={chapterImage(page.chapterTitle, book.id, page.chapterIndex)}
                          alt={`Illustration for ${page.chapterTitle}`}
                          className="w-full h-56 sm:h-72 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}-${page.chapterIndex}/800/400`;
                          }}
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 text-[9px] font-mono tracking-tighter uppercase text-neutral-500 shadow-sm border border-neutral-200/50">
                        ARCHIVE REF: {book.id}-{page.chapterIndex}
                      </div>
                      <figcaption className="mt-3 font-mono text-[10px] italic text-neutral-400 text-right">
                        Illustration: {page.chapterTitle.split(':')[0]}
                      </figcaption>
                    </figure>
                  )}
                  
                  <div className="flex-1 space-y-6">
                    {content.chapters[page.chapterIndex].pages[page.pageIndex].split('\n\n').map((para, pi) => {
                      if (para.trim().startsWith('```')) {
                        const code = para.replace(/```(python|bash|json|sql)?/g, '').trim();
                        return (
                          <div key={pi} className="my-6 relative group">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/40 group-hover:bg-primary transition-colors"></div>
                            <pre className="bg-neutral-900 text-neutral-100 p-6 font-mono text-sm overflow-x-auto shadow-lg sm:rounded-r-lg border border-neutral-800">
                              <code className="block leading-relaxed">{code}</code>
                            </pre>
                            <div className="mt-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest text-right">
                              Source: Cyberhawk Intel // Snippet_{pi}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <p key={pi} className="text-lg leading-[1.8] text-neutral-800 first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-neutral-900">
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </article>
              )}
            </div>

            {/* Page Footer / numbering inside A4 */}
            <div className="h-20 border-t border-neutral-50 flex items-center justify-between px-16 z-[1]">
              <div className="font-mono text-[9px] text-neutral-300 tracking-[0.3em] uppercase">
                {book.title.slice(0, 20)}...
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-px bg-neutral-100 mb-2"></div>
                <span className="font-serif italic text-sm text-neutral-400">
                  {idx + 1}
                </span>
              </div>
              <div className="font-mono text-[9px] text-neutral-300 tracking-[0.3em] uppercase">
                2026 Edition
              </div>
            </div>

            {/* Book Spine Shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Floating Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-card/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl z-20 transition-transform hover:scale-105">
          <button
            onClick={() => setIdx(i => Math.max(i - 1, 0))}
            disabled={idx === 0}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-20 transition-all text-white group"
            title="Previous Page (Left Arrow)"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="font-mono text-xs text-white font-bold">
              {idx + 1} <span className="text-white/40">/</span> {pages.length}
            </span>
            <div className="w-24 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_hsl(var(--primary))]" 
                style={{ width: `${((idx + 1) / pages.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setIdx(i => Math.min(i + 1, pages.length - 1))}
            disabled={idx === pages.length - 1}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-black font-bold hover:scale-110 disabled:opacity-20 transition-all group"
            title="Next Page (Right Arrow)"
          >
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

