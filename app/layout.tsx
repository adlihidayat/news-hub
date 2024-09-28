import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import "./globals.css"; // Importing global CSS styles
import Nav from "./components/Nav"; // Importing the navigation component
import { Titillium_Web } from "next/font/google"; // Importing a Google font
import { NewsProvider } from "./components/NewsProvider"; // Importing a context provider for news
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importing Google OAuth provider

// Setting up the Titillium Web font
const titilliumWeb = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

// Defining metadata for the application
export const metadata: Metadata = {
  title: "NewsHub | A concise, straightforward name for a news platform.",
  description: "A concise, straightforward name for a news platform.",
};

interface NewsArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string; // ISO 8601 format
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

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

const fetchNewsByCategory = async (
  category: string
): Promise<NewsArticle[]> => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${CLIENT_ID}`
  );

  const data: { articles: NewsArticle[] } = await response.json();
  return filterArticles(data.articles);
};

// Root layout component
export default async function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode; // Type annotation for children
  pageProps: any; // Type annotation for page props
}>) {
  // Fetching news data for different categories concurrently
  const [topHeadlines, sportsNews, financeNews, technologyNews] =
    await Promise.all([
      fetchNewsByCategory("general"),
      fetchNewsByCategory("sports"),
      fetchNewsByCategory("business"),
      fetchNewsByCategory("technology"),
    ]);

  // Initial data object for news context
  const initialData = {
    topHeadlines,
    sportsNews,
    financeNews,
    technologyNews,
  };

  // Rendering the layout
  return (
    <html lang="en">
      <body className={`${titilliumWeb.className} overflow-x-hidden`}>
        <NewsProvider initialData={initialData}>
          <GoogleOAuthProvider clientId="YOUR_CLIENT_ID_HERE">
            <Nav />
          </GoogleOAuthProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}
