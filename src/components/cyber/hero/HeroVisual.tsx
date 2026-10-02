import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useVisualCapabilities } from "@/hooks/useVisualCapabilities";
import { HeroGlobeFallback } from "./HeroGlobeFallback";
import { HeroSceneBoundary } from "./HeroSceneBoundary";

const HeroNetworkScene = lazy(() => import("./HeroNetworkScene"));

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [idle, setIdle] = useState(false);
  const capabilities = useVisualCapabilities();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: "160px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const requestIdle = window.requestIdleCallback;
    if (requestIdle) {
      const id = requestIdle(() => setIdle(true), { timeout: 900 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setIdle(true), 180);
    return () => window.clearTimeout(id);
  }, []);

  const show3D = capabilities.ready && capabilities.webgl && !capabilities.reducedMotion && !capabilities.offline && nearViewport && idle;

  return (
    <div ref={root} className="hero-visual-shell" role="img" aria-label="Animated global cybersecurity defense network">
      {show3D ? (
        <HeroSceneBoundary>
          <Suspense fallback={<HeroGlobeFallback />}>
            <HeroNetworkScene compact={capabilities.constrained} />
          </Suspense>
        </HeroSceneBoundary>
      ) : (
        <HeroGlobeFallback reducedMotion={capabilities.reducedMotion} />
      )}
      <div className="hero-visual-readout" aria-hidden="true">
        <span className="hero-visual-pulse" />
        <span>NETWORK ACTIVE</span>
        <strong>2,365</strong>
        <span>protected nodes</span>
      </div>
    </div>
  );
}
