import { type NewsItem, type BlogItem, type InsightItem, type BookItem, colorVar } from "@/data/cybersec";

export function Tag({ text, color = "hsl(var(--primary))" }: { text: string; color?: string }) {
  return (
    <span className="tag-chip" style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}>
      {text}
    </span>
  );
}

export function NewsCard({ item, onClick }: { item: NewsItem; onClick?: () => void }) {
  const c = colorVar(item.color);
  return (
    <article onClick={onClick} className="card-cyber p-6 cursor-pointer fade-in flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
      <div className="flex items-center justify-between">
        <Tag text={item.cat} color={c} />
        <span className="font-mono text-[11px] text-muted-foreground">{item.date}</span>
      </div>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{item.icon}</div>
        <h3 className="font-display font-bold text-white text-lg leading-tight">{item.title}</h3>
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed">{item.summary}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(t => <Tag key={t} text={t} color="hsl(var(--muted-foreground))" />)}
        </div>
        <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">⏱ {item.read}</span>
      </div>
    </article>
  );
}

export function BlogCard({ item, onClick }: { item: BlogItem; onClick?: () => void }) {
  return (
    <article onClick={onClick} className="card-cyber cursor-pointer fade-in overflow-hidden flex flex-col">
      <div className="relative h-48 bg-gradient-primary flex items-center justify-center text-7xl border-b border-border">
        {item.img}
        {item.featured && (
          <div className="absolute top-3 right-3 bg-warning text-background font-mono text-[10px] tracking-widest px-2 py-1 font-bold">
            FEATURED
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Tag text={item.cat} color="hsl(var(--primary))" />
        <h3 className="font-display font-bold text-white text-xl leading-tight">{item.title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed flex-1">{item.summary}</p>
        <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground font-mono">
          <span>{item.author}</span>
          <span>⏱ {item.read}</span>
        </div>
      </div>
    </article>
  );
}

export function BookCard({ item, onRead }: { item: BookItem; onRead?: () => void }) {
  return (
    <article className="card-cyber p-5 fade-in flex flex-col gap-3">
      <div
        onClick={onRead}
        className="h-48 bg-gradient-primary border border-border flex flex-col items-center justify-center text-center px-3 py-4 relative cursor-pointer group overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,transparent_45%,hsl(var(--primary))_50%,transparent_55%)]" />
        <div className="text-5xl mb-2 transition-transform group-hover:scale-110">{item.icon}</div>
        <p className="font-mono text-[9px] tracking-[0.25em] text-primary uppercase mb-1">{item.cat}</p>
        <p className="font-display font-bold text-white text-[13px] leading-tight line-clamp-3">{item.title}</p>
        <p className="font-mono text-[10px] text-foreground/70 mt-1">{item.author}</p>
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-primary bg-background/70 px-2 py-0.5 border border-primary/40">
          {item.pages}p
        </div>
      </div>
      <Tag text={item.cat} color="hsl(var(--primary))" />
      <h3 className="font-display font-bold text-white text-base leading-tight">{item.title}</h3>
      <p className="font-mono text-xs text-muted-foreground">by {item.author} · {item.year}</p>
      <p className="text-sm text-foreground/70 leading-relaxed flex-1">{item.desc}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onRead} className="btn-cyber flex-1 text-[11px] py-2">📖 READ</button>
        <button onClick={onRead} className="btn-ghost-cyber flex-1 text-[11px] py-2">📑 CONTENTS</button>
      </div>
    </article>
  );
}

export function InsightCard({ item, onClick }: { item: InsightItem; onClick?: () => void }) {
  return (
    <article onClick={onClick} className="card-cyber p-6 cursor-pointer fade-in flex flex-col gap-4">
      <Tag text={item.cat} color="hsl(var(--primary))" />
      <div className="flex items-start gap-4">
        <div className="text-5xl">{item.img}</div>
        <h3 className="font-display font-bold text-white text-lg leading-tight flex-1">{item.title}</h3>
      </div>
      <div className="bg-primary/5 border-l-2 border-primary p-3 text-sm text-foreground/80 italic leading-relaxed">
        🔑 {item.key}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/50">
        <span>{item.author} · {item.date}</span>
        <span>⏱ {item.read}</span>
      </div>
    </article>
  );
}
