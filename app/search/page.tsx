"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useNews } from "@/contexts/NewsProvider"; // Import useNews to access context
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { NewsArticle } from "@/types/newsArticle";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  // Move the useSWR hook inside the handleSearch function
  const { data, error } = useSWR(
    searched ? `/api/news/search?title=${searched}&sortBy=${sortBy}` : null,
    fetcher
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!title.trim()) {
      console.error("Search title is empty"); // Log an error message
      return; // Exit if the title is empty
    }

    setSearched(title); // Set the searched title
    // Optionally, you can trigger a mutation to update the context with current data
    if (!error) {
      addSearchResults(data); // Update context with search results if no error
      setTitle(""); // Clear the search input field
    }
  };

  return (
    <main className="w-screen pt-24 md:pt-20 pl-[7vw] md:pl-[12vw] md:pb-20 pr-[10vw] g-slate-500 text-black overflow-x-hidden">
      <h1 className="text-3xl leading-7 xl:text-5xl mb-5">Search news</h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:w-[80vw] md:justify-between md:space-x-3 mb-5 md:mb-8"
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
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
        <button
          type="submit"
          className="w-auto h-10 md:w-10 bg-black text-white rounded md:rounded-lg hover:opacity-50 animation-smooth flex justify-center items-center disabled:opacity-60"
        >
          <span className="md:hidden">Search</span>
          <Image
            className={`object-cover rounded-xl hidden md:block w-5`}
            src={"/others/search-icon.svg"}
            alt="news illustration"
            width={500}
            height={500}
          />
        </button>
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
