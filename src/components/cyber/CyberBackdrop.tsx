// Floating cyber-threat icons + rotating world map behind the hero.
const ICONS = ["🛰️","🦠","🔐","💀","🛡️","⚡","🧠","🔓","📡","🕷️","💣","🧬"];

export function CyberBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rotating world map ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] opacity-[0.12]">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1280px-Equirectangular_projection_SW.jpg"
          alt=""
          loading="lazy"
          className="w-full h-full object-contain rotate-slow"
          style={{ filter: "hue-rotate(160deg) saturate(2) brightness(0.7) contrast(1.4)" }}
        />
      </div>

      {/* Concentric rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmin] h-[90vmin] rounded-full border border-primary/20 rotate-slow" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full border border-primary/15"
        style={{ animation: "rotate-border 22s linear infinite reverse" }}
      />

      {/* Floating threat icons */}
      {ICONS.map((ic, i) => {
        const top = (i * 83) % 90 + 4;
        const left = (i * 137) % 92 + 3;
        const delay = (i * 0.7) % 5;
        const duration = 6 + (i % 5);
        return (
          <span
            key={i}
            className="absolute text-2xl md:text-3xl opacity-30 float-anim select-none"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))",
            }}
          >
            {ic}
          </span>
        );
      })}
    </div>
  );
}
