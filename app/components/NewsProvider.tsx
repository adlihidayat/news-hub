"use client";
import React, { createContext, useState } from "react";

interface NewsContextType {
  newsData: any;
  setNewsData: React.Dispatch<React.SetStateAction<any>>;
  addSearchResults: (newResults: any[]) => void; // Function to add search results to newsData
}

// Create context with default values
const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children, initialData }: any) => {
  const [newsData, setNewsData] = useState(initialData);

  const addSearchResults = (newResults: any[]) => {
    setNewsData((prevData: any) => ({
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
