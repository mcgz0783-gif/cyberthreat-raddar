import { useState, useEffect, useCallback } from "react";
import { NEWS, type NewsItem } from "@/data/cybersec";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(NEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const online = useOnlineStatus();

  const fetchLiveNews = useCallback(async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setNews(NEWS);
      setError("You're offline — showing saved threat intelligence.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch live news");
      }
      const liveNews = await response.json();

      if (Array.isArray(liveNews)) {
        setNews([...liveNews, ...NEWS]);
        setError(null);
      } else {
        setError("Received malformed news data");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Live news fetch failed:", error.message);
      setError("Failed to load live threat intelligence. Using offline data.");
      setNews(NEWS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs on mount and again whenever the browser regains connectivity.
  useEffect(() => {
    fetchLiveNews();
  }, [fetchLiveNews, online]);

  return { news, loading, error, online, refresh: fetchLiveNews };
}
