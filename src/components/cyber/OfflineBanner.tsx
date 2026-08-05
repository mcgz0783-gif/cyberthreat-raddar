import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

/**
 * Slim status strip: warns when offline (bundled books/articles still work)
 * and confirms briefly when connectivity returns so live data reloads.
 */
export function OfflineBanner() {
  const online = useOnlineStatus();
  const [showBack, setShowBack] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!online) {
      setWasOffline(true);
      setShowBack(false);
      return;
    }
    if (wasOffline) {
      setShowBack(true);
      const t = setTimeout(() => setShowBack(false), 4000);
      return () => clearTimeout(t);
    }
  }, [online, wasOffline]);

  if (online && !showBack) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border-t ${
        online
          ? "bg-primary/15 border-primary/60 text-primary"
          : "bg-destructive/15 border-destructive/60 text-destructive"
      }`}
    >
      {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      {online
        ? "Back online — live threat feeds reloading"
        : "Offline mode — books, blog & insights still readable"}
    </div>
  );
}
