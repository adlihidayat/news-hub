import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { Titillium_Web } from "next/font/google";
import { NewsProvider } from "./components/NewsProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const titilliumWeb = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewsHub | A concise, straightforward name for a news platform.",
  description: "A concise, straightforward name for a news platform.",
};

const filterArticles = (articles: any) => {
  return articles.filter(
    (article: any) =>
      article.author &&
      article.urlToImage &&
      article.content &&
      article.description &&
      article.publishedAt &&
      article.title &&
      article.url
  );
};

const fetchNewsByCategory = async (category: string) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${CLIENT_ID}`
  );
  const data = await response.json();
  return filterArticles(data.articles);
};

export default async function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any;
}>) {
  const [topHeadlines, sportsNews, financeNews, technologyNews] =
    await Promise.all([
      fetchNewsByCategory("general"),
      fetchNewsByCategory("sports"),
      fetchNewsByCategory("business"),
      fetchNewsByCategory("technology"),
    ]);

  const initialData = {
    topHeadlines,
    sportsNews,
    financeNews,
    technologyNews,
  };

  return (
    <html lang="en">
      <body className={`${titilliumWeb.className} overflow-x-hidden`}>
        <NewsProvider initialData={initialData}>
          <GoogleOAuthProvider clientId="1010343785553-r8nrb58gc7q3rqdd0liiql1og9nr0iep.apps.googleusercontent.com">
            <Nav />
          </GoogleOAuthProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}
