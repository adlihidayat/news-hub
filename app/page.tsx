"use client";
import { useState } from "react";
import Featured from "./components/Featured";
import Hero from "./components/Hero";
import HomeSpecificSection from "./components/HomeSpecificSection";
import MissedNews from "./components/MissedNews";
import Recommendation from "./components/Recommendation";
import { useNews } from "@/contexts/NewsProvider";
import PopUp from "./components/PopUp";
import { NewsArticle } from "@/types/newsArticle";

export default function Home() {
  const { newsData } = useNews();

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
      <PopUp />
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
