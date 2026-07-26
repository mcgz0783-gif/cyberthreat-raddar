import { useState, useEffect } from "react";
import { NEWS, type NewsItem } from "@/data/cybersec";

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(NEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLiveNews() {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch live news");
        }
        const liveNews = await response.json();
        
        // Merge live news with static news, prioritizing live
        if (Array.isArray(liveNews)) {
          setNews([...liveNews, ...NEWS]);
        } else {
          console.error("Live news data is not an array:", liveNews);
          setError("Received malformed news data");
        }
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Live news fetch failed:", error.message);
        setError("Failed to load live threat intelligence. Using offline data.");
        // Fallback is already set to static NEWS
      } finally {
        setLoading(false);
      }
    }

    fetchLiveNews();
  }, []);

  return { news, loading, error };
}
