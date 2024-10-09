import { NewsArticle } from "@/types/newsArticle";

const filterArticles = (articles: NewsArticle[]): NewsArticle[] => {
  return articles.filter(
    (article) =>
      article.author &&
      article.urlToImage &&
      article.content &&
      article.description &&
      article.publishedAt &&
      article.title &&
      article.url
  );
};

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const cachedNewsData: Record<
  string,
  { articles: NewsArticle[]; timestamp: number }
> = {};

export const fetchNewsByCategory = async (
  category: string
): Promise<NewsArticle[]> => {
  // Check if we have cached data
  const cacheEntry = cachedNewsData[category];
  const now = Date.now();

  // If cached data exists and is still valid, return it
  if (cacheEntry && now - cacheEntry.timestamp < CACHE_EXPIRATION) {
    return cacheEntry.articles; // Use cached data
  } else {
    const CLIENT_ID = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${CLIENT_ID}`,
      {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for category: ${category}`);
    }

    const data: { articles: NewsArticle[] } = await response.json();

    // Filter and cache the new data
    const filteredArticles = filterArticles(data.articles);
    cachedNewsData[category] = {
      articles: filteredArticles,
      timestamp: now, // Update the fetch timestamp
    };

    return filteredArticles;
  }
};

export const fetchNewsByTitle = async (
  title: string,
  sortBy: string
): Promise<NewsArticle[]> => {
  const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
  const url = `https://newsapi.org/v2/everything?q=${title}&sortBy=${sortBy}&pageSize=15&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = filterArticles(data.articles || []);
    return filteredData;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
