import { useEffect, useState } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };
type DeviceNavigator = Navigator & { deviceMemory?: number; connection?: NetworkInformation };

export type VisualCapabilities = {
  ready: boolean;
  webgl: boolean;
  reducedMotion: boolean;
  constrained: boolean;
  offline: boolean;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useVisualCapabilities(): VisualCapabilities {
  const [state, setState] = useState<VisualCapabilities>({
    ready: false,
    webgl: false,
    reducedMotion: false,
    constrained: true,
    offline: false,
  });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as DeviceNavigator;
    const connection = nav.connection;

    const update = () => {
      const forcedFallback = new URLSearchParams(window.location.search).get("webgl") === "off";
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
      const slowNetwork = Boolean(connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? ""));

      setState({
        ready: true,
        webgl: !forcedFallback && supportsWebGL(),
        reducedMotion: motion.matches,
        constrained: lowMemory || lowCpu || slowNetwork,
        offline: !navigator.onLine,
      });
    };

    update();
    motion.addEventListener("change", update);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      motion.removeEventListener("change", update);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return state;
}
