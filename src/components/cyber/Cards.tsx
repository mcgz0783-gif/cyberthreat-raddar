import { type NewsItem, type BlogItem, type InsightItem, type BookItem, colorVar } from "@/data/cybersec";

const PLACEHOLDER_COVER = "/icon-512.png";
const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const el = e.currentTarget;
  if (!el.src.endsWith(PLACEHOLDER_COVER)) el.src = PLACEHOLDER_COVER;
};

export function Tag({ text, color = "hsl(var(--primary))" }: { text: string; color?: string }) {
  return (
    <span className="tag-chip" style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}>
      {text}
    </span>
  );
}

export function NewsCard({ item, onClick }: { item: NewsItem; onClick?: () => void }) {
  const c = colorVar(item.color);
  const cover = item.cover;
  return (
    <article onClick={onClick} className="card-cyber cursor-pointer fade-in flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
      <div className="relative h-40 overflow-hidden border-b border-border bg-muted/20">
        <img src={cover || PLACEHOLDER_COVER} onError={onImgError} alt={item.title} loading="lazy" className={`w-full h-full transition-transform duration-500 hover:scale-105 ${cover ? "object-cover" : "object-contain p-6 opacity-60"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute top-2 right-2 text-3xl drop-shadow-lg">{item.icon}</div>
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <Tag text={item.cat} color={c} />
          <span className="font-mono text-[11px] text-muted-foreground">{item.date}</span>
        </div>
        <h3 className="font-display font-bold text-white text-lg leading-tight">{item.title}</h3>
        <p className="text-sm text-foreground/85 leading-relaxed">{item.summary}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(t => <Tag key={t} text={t} color="hsl(var(--muted-foreground))" />)}
          </div>
          <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">⏱ {item.read}</span>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({ item, onClick }: { item: BlogItem; onClick?: () => void }) {
  const cover = item.cover;
  return (
    <article onClick={onClick} className="card-cyber cursor-pointer fade-in overflow-hidden flex flex-col">
      <div className="relative h-48 bg-gradient-primary border-b border-border overflow-hidden">
        <img src={cover || PLACEHOLDER_COVER} onError={onImgError} alt={item.title} loading="lazy" className={`absolute inset-0 w-full h-full transition-transform duration-500 hover:scale-105 ${cover ? "object-cover" : "object-contain p-8 opacity-50"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent flex items-center justify-center text-7xl">
          <span className="drop-shadow-lg">{item.img}</span>
        </div>

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

import aiAgentsCover from "@/assets/ai-agents-cover.jpg";

const CUSTOM_COVERS: Record<number, string> = {
  9: aiAgentsCover,
};

import { BuyBookButton } from "@/components/BuyBookButton";
import { useBooksCatalog, usePurchases, formatPrice } from "@/hooks/useCatalog";

export function BookCard({ item, onRead }: { item: BookItem; onRead?: () => void }) {
  const cover = CUSTOM_COVERS[item.id] || item.cover;
  const { byLegacyId } = useBooksCatalog();
  const { bookIds } = usePurchases();
  const db = byLegacyId[item.id];
  const purchased = db ? bookIds.has(db.id) : false;
  return (
    <article className="card-cyber p-5 fade-in flex flex-col gap-3">
      <div
        onClick={onRead}
        className="h-64 bg-gradient-primary border border-border flex flex-col items-center justify-center text-center relative cursor-pointer group overflow-hidden"
      >
        <img src={cover || PLACEHOLDER_COVER} onError={onImgError} alt={`${item.title} cover`} loading="lazy" className={`absolute inset-0 w-full h-full transition-transform group-hover:scale-105 ${cover ? "object-cover" : "object-contain p-8 opacity-60"}`} />
        {!cover && (
          <>
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,transparent_45%,hsl(var(--primary))_50%,transparent_55%)]" />
            <div className="absolute bottom-3 left-0 right-0 text-center px-3">
              <p className="font-mono text-[9px] tracking-[0.25em] text-primary uppercase mb-1">{item.cat}</p>
              <p className="font-display font-bold text-white text-[13px] leading-tight line-clamp-2">{item.title}</p>
              <p className="font-mono text-[10px] text-foreground/70 mt-1">{item.author}</p>
            </div>
          </>
        )}
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-primary bg-background/80 px-2 py-0.5 border border-primary/40 z-10">
          {item.pages}p
        </div>
        {/* Buy overlay */}
        <div className="absolute inset-x-0 top-0 z-20 flex justify-end p-2" onClick={e => e.stopPropagation()}>
          {db && !purchased && (
            <BuyBookButton bookId={db.id} label={`BUY ${formatPrice(db.price_cents, db.currency)}`} className="btn-cyber text-[11px] py-1.5 px-3 bg-warning/95 hover:bg-warning text-background font-bold shadow-lg" />
          )}
          {db && purchased && (
            <span className="font-mono text-[10px] px-2 py-1 bg-success/90 text-background font-bold uppercase">✓ OWNED</span>
          )}
        </div>
      </div>
      <Tag text={item.cat} color="hsl(var(--primary))" />
      <h3 className="font-display font-bold text-white text-base leading-tight">{item.title}</h3>
      <p className="font-mono text-xs text-muted-foreground">by {item.author} · {item.year}</p>
      <p className="text-sm text-foreground/70 leading-relaxed flex-1">{item.desc}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onRead} className="btn-cyber flex-1 text-[11px] py-2">📖 {purchased ? "READ" : "PREVIEW"}</button>
        <button onClick={onRead} className="btn-ghost-cyber flex-1 text-[11px] py-2">📑 CONTENTS</button>
      </div>
    </article>
  );
}

export function InsightCard({ item, onClick }: { item: InsightItem; onClick?: () => void }) {
  const cover = item.cover;
  return (
    <article onClick={onClick} className="card-cyber cursor-pointer fade-in flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden border-b border-border bg-muted/20">
        <img src={cover || PLACEHOLDER_COVER} onError={onImgError} alt={item.title} loading="lazy" className={`w-full h-full transition-transform duration-500 hover:scale-105 ${cover ? "object-cover" : "object-contain p-6 opacity-60"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute top-2 right-2 text-4xl drop-shadow-lg">{item.img}</div>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <Tag text={item.cat} color="hsl(var(--primary))" />
        <h3 className="font-display font-bold text-white text-lg leading-tight">{item.title}</h3>
        <div className="bg-primary/5 border-l-2 border-primary p-3 text-sm text-foreground/80 italic leading-relaxed">
          🔑 {item.key}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/50 mt-auto">
          <span>{item.author} · {item.date}</span>
          <span>⏱ {item.read}</span>
        </div>
      </div>
    </article>
  );
}
