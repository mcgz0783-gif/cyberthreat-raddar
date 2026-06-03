import { useEffect } from "react";
import { type ArticleBody } from "@/data/articleContent";

type Meta = {
  eyebrow: string;
  title: string;
  byline?: string;
  date?: string;
  read?: string;
  icon?: string;
  tags?: string[];
};

export function ArticleReader({
  meta,
  body,
  onClose,
}: {
  meta: Meta;
  body?: ArticleBody;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-4 card-cyber flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border sticky top-0 bg-surface z-10">
          <div className="flex items-center gap-3 min-w-0">
            {meta.icon && <span className="text-2xl">{meta.icon}</span>}
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase truncate">
              {meta.eyebrow}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article"
            className="text-muted-foreground hover:text-primary text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 text-foreground/90">
          <article className="max-w-2xl mx-auto">
            <h1 className="font-display font-black text-white text-2xl sm:text-4xl leading-tight mb-4">
              {meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground mb-6">
              {meta.byline && <span>{meta.byline}</span>}
              {meta.date && <span>· {meta.date}</span>}
              {meta.read && <span>· ⏱ {meta.read}</span>}
            </div>

            {body ? (
              <>
                <p className="text-[17px] leading-[1.8] text-foreground font-semibold mb-8 border-l-2 border-primary pl-4">
                  {body.lede}
                </p>
                {body.sections.map((s, i) => (
                  <section key={i} className="mb-7">
                    <h2 className="font-display font-bold text-white text-xl mb-3">
                      {s.heading}
                    </h2>
                    {s.paragraphs.map((para, j) => (
                      <p key={j} className="text-[15px] leading-[1.85] text-foreground/85 mb-4">
                        {para}
                      </p>
                    ))}
                  </section>
                ))}
                {body.takeaways && body.takeaways.length > 0 && (
                  <div className="bg-primary/5 border border-primary/30 p-5 mt-8">
                    <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-3">
                      Key Takeaways
                    </p>
                    <ul className="space-y-2">
                      {body.takeaways.map((t, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/85">
                          <span className="text-primary">▸</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="text-foreground/70 italic">Full article coming soon.</p>
            )}

            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                {meta.tags.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border border-border text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>

        <div className="px-5 py-3 border-t border-border flex justify-end">
          <button onClick={onClose} className="btn-ghost-cyber text-[11px] py-2 px-4">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
