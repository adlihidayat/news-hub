"use client";
import React, { createContext, useState } from "react";

// Define the structure for a news article
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

// Define the structure for the overall news data
interface NewsData {
  topHeadlines: NewsArticle[];
  sportsNews: NewsArticle[];
  financeNews: NewsArticle[];
  technologyNews: NewsArticle[];
  searchResults?: NewsArticle[]; // Optional property for search results
}

interface NewsContextType {
  newsData: NewsData; // Specify the type for newsData
  setNewsData: React.Dispatch<React.SetStateAction<NewsData>>;
  addSearchResults: (newResults: any[]) => void; // Function to add search results to newsData
}

// Create context with default values
const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: NewsData;
}) => {
  const [newsData, setNewsData] = useState<NewsData>(initialData);

  const addSearchResults = (newResults: any[]) => {
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
