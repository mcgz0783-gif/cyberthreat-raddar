import { useEffect, useMemo, useState } from "react";
import { type BookItem } from "@/data/cybersec";
import { BOOK_CONTENT } from "@/data/bookContent";
import aiAgentsCover from "@/assets/ai-agents-cover.jpg";

const CUSTOM_COVERS: Record<number, string> = { 9: aiAgentsCover };

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
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] card-cyber flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl">{book.icon}</span>
            <div className="min-w-0">
              <p className="font-display font-bold text-white text-sm truncate">{book.title}</p>
              <p className="font-mono text-[10px] text-muted-foreground truncate">
                {book.author} · {book.year}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reader"
            className="text-muted-foreground hover:text-primary text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>

        {/* page body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 text-foreground/90">
          {page.kind === "cover" && (
            CUSTOM_COVERS[book.id] ? (
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <img src={CUSTOM_COVERS[book.id]} alt={`${book.title} cover`} className="max-h-full max-w-full object-contain border border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.3)]" />
                <p className="italic text-foreground/80 max-w-xl text-center">{content.cover.tagline}</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                <div className="text-8xl">{book.icon}</div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-3">
                    {book.cat}
                  </p>
                  <h1 className="font-display font-black text-white text-3xl sm:text-5xl leading-tight mb-3">
                    {book.title}
                  </h1>
                  <p className="font-mono text-sm text-muted-foreground">
                    by {book.author} · {book.year}
                  </p>
                </div>
                <p className="italic text-foreground/80 max-w-xl">{content.cover.tagline}</p>
                <p className="text-sm text-foreground/70 max-w-xl leading-relaxed">
                  {content.cover.blurb}
                </p>
              </div>
            )
          )}

          {page.kind === "toc" && (
            <div className="max-w-2xl mx-auto">
              <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
                Contents
              </p>
              <h2 className="font-display font-bold text-white text-2xl mb-6">Table of Contents</h2>
              <ol className="space-y-2">
                {content.toc.map((t, i) => {
                  const chapterIndex = content.chapters.findIndex(c => c.title === t);
                  const clickable = chapterIndex >= 0;
                  return (
                    <li key={i}>
                      <button
                        disabled={!clickable}
                        onClick={() => clickable && jumpToChapter(chapterIndex)}
                        className={`w-full text-left flex items-baseline gap-3 px-3 py-2 border border-transparent transition-colors ${
                          clickable
                            ? "hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
                            : "opacity-70 cursor-default"
                        }`}
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-foreground/90">{t}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {page.kind === "body" && (
            <article className="max-w-2xl mx-auto">
              <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
                {page.chapterTitle}
              </p>
              {page.pageIndex === 0 && (
                <figure className="my-4 border border-primary/30 overflow-hidden bg-card">
                  <img
                    src={chapterImage(page.chapterTitle, book.id, page.chapterIndex)}
                    alt={`Illustration for ${page.chapterTitle}`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}-${page.chapterIndex}/640/260`;
                    }}
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                  <figcaption className="px-3 py-1.5 font-mono text-[10px] text-muted-foreground border-t border-border">
                    Fig. {page.chapterIndex + 1} — {page.chapterTitle}
                  </figcaption>
                </figure>
              )}
              <p className="whitespace-pre-line text-[15px] leading-[1.85] text-foreground/90">
                {content.chapters[page.chapterIndex].pages[page.pageIndex]}
              </p>
            </article>
          )}
        </div>

        {/* footer / pager */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border">
          <button
            onClick={() => setIdx(i => Math.max(i - 1, 0))}
            disabled={idx === 0}
            className="btn-ghost-cyber text-[11px] py-2 px-4 disabled:opacity-30"
          >
            ← Prev
          </button>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              Page {idx + 1} / {pages.length}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-primary/70 uppercase">
              www.cyberhawk-ug.store
            </span>
          </div>
          <button
            onClick={() => setIdx(i => Math.min(i + 1, pages.length - 1))}
            disabled={idx === pages.length - 1}
            className="btn-cyber text-[11px] py-2 px-4 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
