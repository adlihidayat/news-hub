"use client";
import Image from "next/image";
import React, { useState } from "react";
import { SearchButton } from "../components/Button";
import { useNews } from "@/app/components/NewsProvider"; // Import useNews to access context
import { useRouter } from "next/navigation";

// Define the type for a news article
interface NewsArticle {
  author: string;
  urlToImage: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  source: { id: string | null; name: string }; // Add the source property
}

// Function to filter articles based on certain criteria
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

// Component to render individual news items
const NewsItem = ({ data, index }: { data: NewsArticle; index: number }) => {
  const router = useRouter();
  const handler = () => {
    router.push(`/read/searchResults/${index}`);
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden w-full group cursor-pointer"
      onClick={handler}
    >
      <div className="h-full w-full absolute animation-smooth p-5 text-white flex flex-col justify-between">
        <div className="w-full flex justify-between z-20 relative">
          <span className="w-32 truncate">{data.author}</span>
          <span>{new Date(data.publishedAt).toLocaleDateString("en-GB")}</span>
        </div>
        <div>
          <h2 className="relative z-20 leading-[20px] text-lg lg:text-xl lg:leading-[22px] h-[63px] lg:h-11 overflow-y-hidden lg:mb-2">
            {data.title}
          </h2>
          <p className="hidden lg:block relative z-20 leading-4 h-0 group-hover:h-[50px] overflow-y-hidden text-sm animation-smooth">
            {data.description}
          </p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-10 rounded-xl bg-gradient-custom"></div>
      </div>
      <Image
        className={`w-full md:group-hover:scale-[115%] h-60 lg:h-80 2xl:h-[400px] object-cover animation-smooth`}
        priority
        unoptimized
        src={data.urlToImage}
        alt="news illustration"
        width={500}
        height={500}
      />
    </div>
  );
};

// Main page component
const Page = () => {
  const { newsData, addSearchResults } = useNews(); // Get newsData and addSearchResults from context
  const [title, setTitle] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [isSortByActive, setIsSortByActive] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");

  // Fetch news articles based on search title and sorting criteria
  const fetchNews = async (title: string, sortBy: string) => {
    const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
    const url = `https://newsapi.org/v2/everything?q=${title}&sortBy=${sortBy}&pageSize=15&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredData = filterArticles(data.articles || []);
      addSearchResults(filteredData); // Add search results to newsData
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <main className="w-screen pt-24 md:pt-20 pl-[7vw] md:pl-[12vw] md:pb-20 pr-[10vw] g-slate-500 text-black overflow-x-hidden">
      <h1 className="text-3xl leading-7 xl:text-5xl mb-5">Search news</h1>
      <form
        action=""
        className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:w-[80vw] md:justify-between md:space-x-3 mb-5 md:mb-8"
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Insert news title here"
          className="px-3 py-1 rounded md:rounded-lg md:flex-1"
        />
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSortByActive(!isSortByActive);
            }}
            className="px-3 py-1 rounded md:rounded-lg h-full w-full md:w-40 lg:w-48 cursor-pointer bg-white text-gray-600 md:text-black capitalize hover:bg-[#ffffff71] animation-smooth"
          >
            {sortBy === "publishedAt" ? "newest" : sortBy}
          </button>
          {isSortByActive && (
            <ul className="absolute bg-white w-full text-center top-14 z-20 rounded-xl p-3 text-sm">
              <li>
                <button
                  disabled={sortBy === "popularity"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSortBy("popularity");
                    setIsSortByActive(false);
                  }}
                  className={`${
                    sortBy === "popularity"
                      ? "bg-[#838383] text-white"
                      : "bg-white hover:bg-[#f1f1f1]"
                  } w-full rounded-lg py-2 animation-smooth`}
                >
                  Popularity
                </button>
              </li>
              <li>
                <button
                  disabled={sortBy === "publishedAt"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSortBy("publishedAt");
                    setIsSortByActive(false);
                  }}
                  className={`${
                    sortBy === "publishedAt"
                      ? "bg-[#838383] text-white"
                      : "bg-white hover:bg-[#f1f1f1]"
                  } w-full rounded-lg py-2 animation-smooth`}
                >
                  Newest
                </button>
              </li>
              <li>
                <button
                  disabled={sortBy === "relevancy"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSortBy("relevancy");
                    setIsSortByActive(false);
                  }}
                  className={`${
                    sortBy === "relevancy"
                      ? "bg-[#838383] text-white"
                      : "bg-white hover:bg-[#f1f1f1]"
                  } w-full rounded-lg py-2 animation-smooth`}
                >
                  Relevant
                </button>
              </li>
            </ul>
          )}
        </div>
        <SearchButton
          isActive={title !== ""}
          title={title}
          sortBy={sortBy}
          setSearched={setSearched}
          fetchNews={fetchNews}
        />
      </form>
      {searched === "" ? (
        <div className="w-full text-center pt-40">
          <span className="text-gray-400">Start Searching specific news</span>
        </div>
      ) : (
        <>
          <p className="mb-8 text-[#8A8A8A] font-bold">
            Showing {newsData.searchResults?.length || 0} results of “{searched}
            ”
          </p>
          <div className="w-full md:grid md:grid-cols-3 md:gap-x-4 space-y-4 md:space-y-0 md:gap-y-4 mb-4">
            {newsData.searchResults?.map((item: NewsArticle, index: number) => (
              <NewsItem data={item} index={index} key={index} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
