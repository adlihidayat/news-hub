"use client";
import { useState } from "react";
import Featured from "./components/Featured";
import Hero from "./components/Hero";
import HomeSpecificSection from "./components/HomeSpecificSection";
import MissedNews from "./components/MissedNews";
import Recommendation from "./components/Recommendation";
import { useNews } from "./components/NewsProvider";
import PopUp from "./components/PopUp";

// Assuming NewsArticle is your API type that doesn't have `id`
// and NewsData is your component's expected type
interface NewsData {
  id: number;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

// Example of your NewsArticle type
interface NewsArticle {
  // other properties...
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

export default function Home() {
  const { newsData } = useNews();
  const [isPopupActive, setIsPopupActive] = useState(true);

  // Transforming the newsData to match the expected type
  const topHeadlines = newsData.topHeadlines.map(
    (article: NewsArticle, index: number) => ({
      id: index, // or some unique id from your article
      author: article.author,
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    })
  );

  return (
    <div className="w-full overflow-x-hidden pb-20">
      {isPopupActive && (
        <PopUp isActive={isPopupActive} setIsPopupActive={setIsPopupActive} />
      )}
      <Hero topNews={topHeadlines} />
      <Recommendation newsData={topHeadlines} />
      <HomeSpecificSection
        title={"sports"}
        desc={"Fuel your passion, live through sport."}
        newsData={newsData.sportsNews}
      />
      <Featured newsData={newsData} />
      <HomeSpecificSection
        title={"finance"}
        desc={"Master your money, shape your future."}
        newsData={newsData.financeNews}
      />
      <MissedNews newsData={newsData} />
      <HomeSpecificSection
        title={"tech"}
        desc={
          "Explore the Future: Latest Innovations and Breakthroughs in Tech."
        }
        newsData={newsData.technologyNews}
      />
    </div>
  );
}
