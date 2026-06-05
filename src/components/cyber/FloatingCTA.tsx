export function FloatingCTA() {
  const wa = "256788213106"; // WhatsApp international (UG +256)
  const tel = "+256783699626";
  const waMsg = encodeURIComponent("Hello CyberHawk UG, I'd like to connect.");
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${wa}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.74.35-.26.28-.97.95-.97 2.31s.99 2.68 1.13 2.87c.14.19 1.95 2.98 4.72 4.18.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.06-.12-.25-.19-.53-.33zM16.03 4C9.4 4 4 9.4 4 16.03c0 2.12.56 4.18 1.61 6L4 28l6.13-1.6a12.04 12.04 0 0 0 5.9 1.5h.01c6.63 0 12.03-5.4 12.03-12.03 0-3.21-1.25-6.23-3.52-8.5A12.01 12.01 0 0 0 16.03 4z" />
        </svg>
        <span className="absolute right-16 bg-background border border-border px-3 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Chat
        </span>
      </a>
      <a
        href={`tel:${tel}`}
        aria-label="Call us"
        className="group w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_8px_24px_hsl(var(--primary)/0.45)] hover:scale-110 transition-transform relative"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C9.4 21.1 2.9 14.6 2.9 6.1 2.9 5.5 3.4 5 4 5h3.5c.6 0 1.1.5 1.1 1.1 0 1.3.2 2.4.6 3.5.1.4 0 .8-.3 1.1l-2.3 2.1z" />
        </svg>
        <span className="absolute right-16 bg-background border border-border px-3 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}
