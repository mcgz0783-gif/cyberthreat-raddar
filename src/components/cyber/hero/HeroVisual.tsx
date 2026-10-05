import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Box, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualCapabilities } from "@/hooks/useVisualCapabilities";
import { HeroGlobeFallback } from "./HeroGlobeFallback";
import { HeroSceneBoundary } from "./HeroSceneBoundary";

const HeroNetworkScene = lazy(() => import("./HeroNetworkScene"));
type VisualMode = "3d" | "2d";

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [idle, setIdle] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualMode>("3d");
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

  const threeDAvailable = capabilities.ready && capabilities.webgl && !capabilities.reducedMotion && !capabilities.offline;
  const show3D = visualMode === "3d" && threeDAvailable && nearViewport && idle;

  return (
    <div ref={root} className="hero-visual-shell">
      <div
        className="absolute inset-0"
        role="img"
        aria-label={`${show3D ? "Interactive 3D" : "Lightweight 2D"} global cybersecurity defense network`}
      >
        {show3D ? (
          <HeroSceneBoundary>
            <Suspense fallback={<HeroGlobeFallback />}>
              <HeroNetworkScene compact={capabilities.constrained} />
            </Suspense>
          </HeroSceneBoundary>
        ) : (
          <HeroGlobeFallback reducedMotion={capabilities.reducedMotion} />
        )}
      </div>

      <div
        className="absolute right-0 top-0 z-10 flex items-center gap-1 border border-border bg-surface/90 p-1 shadow-card backdrop-blur-sm"
        role="group"
        aria-label="Globe visual mode"
      >
        <Button
          type="button"
          size="sm"
          variant={visualMode === "3d" && threeDAvailable ? "default" : "ghost"}
          className="h-8 rounded-sm px-2.5 font-mono text-[11px] tracking-wider"
          aria-pressed={visualMode === "3d" && threeDAvailable}
          disabled={!threeDAvailable}
          title={threeDAvailable ? "Use interactive 3D globe" : "3D is unavailable on this device or connection"}
          onClick={() => setVisualMode("3d")}
        >
          <Box aria-hidden="true" />
          3D
        </Button>
        <Button
          type="button"
          size="sm"
          variant={visualMode === "2d" || !threeDAvailable ? "secondary" : "ghost"}
          className="h-8 rounded-sm px-2.5 font-mono text-[11px] tracking-wider"
          aria-pressed={visualMode === "2d" || !threeDAvailable}
          title="Use lightweight 2D globe"
          onClick={() => setVisualMode("2d")}
        >
          <CircleDot aria-hidden="true" />
          2D
        </Button>
      </div>

      <div className="hero-visual-readout" aria-hidden="true">
        <span className="hero-visual-pulse" />
        <span>NETWORK ACTIVE</span>
        <strong>2,365</strong>
        <span>protected nodes</span>
      </div>
    </div>
  );
}
