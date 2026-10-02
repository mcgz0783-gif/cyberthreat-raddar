export function HeroGlobeFallback({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className={`hero-globe-fallback ${reducedMotion ? "is-static" : ""}`} aria-hidden="true">
      <div className="hero-globe-orbit hero-globe-orbit-a" />
      <div className="hero-globe-orbit hero-globe-orbit-b" />
      <div className="hero-globe-core">
        <div className="hero-globe-latitude latitude-a" />
        <div className="hero-globe-latitude latitude-b" />
        <div className="hero-globe-longitude longitude-a" />
        <div className="hero-globe-longitude longitude-b" />
        {[12, 28, 44, 61, 76, 89].map((position, index) => (
          <span key={position} className={`hero-globe-node node-${index + 1}`} />
        ))}
      </div>
      <div className="hero-globe-status font-mono">GLOBAL DEFENSE NETWORK</div>
    </div>
  );
}
