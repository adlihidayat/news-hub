"use client";
import { NewsArticle } from "@/types/newsArticle";
import React, { createContext, useState } from "react";

interface NewsData {
  topHeadlines: NewsArticle[];
  sportsNews: NewsArticle[];
  financeNews: NewsArticle[];
  technologyNews: NewsArticle[];
  searchResults?: NewsArticle[];
}

interface NewsContextType {
  newsData: NewsData;
  setNewsData: React.Dispatch<React.SetStateAction<NewsData>>;
  addSearchResults: (newResults: NewsArticle[]) => void;
}

const NewsContext = createContext<NewsContextType | null>(null);

export const NewsProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: NewsData;
}) => {
  const [newsData, setNewsData] = useState<NewsData>(initialData);

  const addSearchResults = (newResults: NewsArticle[]) => {
    setNewsData((prevData) => ({
      ...prevData,
      searchResults: newResults,
    }));
  };

  return (
    <NewsContext.Provider value={{ newsData, setNewsData, addSearchResults }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = React.useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
