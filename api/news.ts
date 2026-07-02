import type { VercelRequest, VercelResponse } from "@vercel/node";

interface NewsAPIArticle {
  title: string;
  description: string | null;
  content: string | null;
  publishedAt: string;
  urlToImage: string | null;
  url: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing NEWS_API_KEY environment variable" });
  }

  try {
    // Fetch cybersecurity news from the last 2 days
    const query = "cybersecurity OR \"data breach\" OR ransomware OR malware";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}&language=en`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to fetch news");
    }

    // Map NewsAPI structure to our NewsItem structure
    const mappedNews = data.articles.map((article: NewsAPIArticle, index: number) => ({
      id: `live-${index}`,
      cat: "Live Intel",
      color: "primary",
      title: article.title,
      date: new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      read: "3 min",
      summary: article.description || article.content?.substring(0, 150) + "...",
      tags: ["Breaking", "NewsAPI"],
      icon: "🌐",
      cover: article.urlToImage || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=70",
      url: article.url
    }));

    return res.status(200).json(mappedNews);
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
}
