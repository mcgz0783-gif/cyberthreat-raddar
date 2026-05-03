import { TICKER_ITEMS } from "@/data/cybersec";

export function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap py-3 flex items-center">
      <div className="bg-danger text-white font-mono text-xs px-4 py-1 mr-4 ml-4 tracking-wider whitespace-nowrap blink-anim">
        ● LIVE FEED
      </div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-inner">
          {all.map((item, i) => (
            <span key={i} className="font-mono text-sm text-foreground/90 px-8">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
