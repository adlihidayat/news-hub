"use client";
import Image from "next/image";
import React from "react";
import { useNews } from "../../contexts/NewsProvider";
import { useParams, useRouter } from "next/navigation";
import NewsItem from "../components/NewsItem";
import { NewsArticle } from "@/types/newsArticle";

export interface NewsData {
  topHeadlines: NewsArticle[];
  sportsNews: NewsArticle[];
  financeNews: NewsArticle[];
  technologyNews: NewsArticle[];
}

const pagesData = {
  sportsNews: {
    title: "sports news",
    description: "Fuel your passion, live through sport.",
  },
  financeNews: {
    title: "finance news",
    description: "Master your money, shape your future.",
  },
  technologyNews: {
    title: "technology news",
    description: "Latest Innovations and Breakthroughs in Tech.",
  },
  topHeadlines: {
    title: "headline news",
    description: "Fuel your passion, live a life",
  },
};
const pagesLink = {
  sportsNews: {
    title: "sports",
  },
  financeNews: {
    title: "finance",
  },
  technologyNews: {
    title: "technology",
  },
  topHeadlines: {
    title: "headline",
  },
};

const Page: React.FC = () => {
  type Category =
    | "sportsNews"
    | "financeNews"
    | "technologyNews"
    | "topHeadlines";
  const { category } = useParams() as { category: Category };
  const { newsData } = useNews();
  const router = useRouter();

  const categoryData = newsData[category] || []; // for detail
  const thisPagesData = pagesData[category] || [];
  const thisPagesLink = pagesLink[category] || []; // for linking

  const handler = () => {
    router.push(`/read/sportsNews/0`);
  };

  return (
    <main className="w-screen text-black md:pl-[3%] flex flex-col items-center pb-32 2xl:pb pt-32 md:pt-20">
      <div className="w-[80vw] mb-7 md:mb-10 relative bg-slate-40 text-center flex flex-col items-center">
        <span className="text-lg xl:text-2xl font-semibold">
          {thisPagesData.title}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:w-[70%] md:text-center font-bold">
          {thisPagesData.description}
        </h1>
      </div>
      <section
        className="w-[80vw] mb-20 md:mb-20 relative flex justify-center cursor-pointer"
        onClick={handler}
      >
        <div className="absolute right-0 top-0 p-6 flex items-center group">
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 w-0 group-hover:w-32 py-[4px] truncate rounded-full text-center bg-gray-200 text-sm font-semibold pr-5 animation-smooth-700">
            View Detail
          </span>
          <div className="w-7 h-7 bg-white rounded-full relative z-20 text-center font-bold">
            i
          </div>
          <div className="absolute z-30 right-6 top-6 py-4 px-6 flex flex-col space-y-1 rounded-2xl opacity-0 group-hover:opacity-100 w-0 group-hover:w-80 animation-smooth-700 text-sm bg-white">
            <span>
              {new Date(categoryData[0].publishedAt).toLocaleDateString(
                "en-GB"
              )}
            </span>
            <span>{categoryData[0].author}</span>
            <p className="h-20 overflow-y-hidden">
              {categoryData[0].description}
            </p>
          </div>
        </div>
        <div className="w-full h-[400px] rounded-3xl overflow-hidden group">
          <Image
            className={`bg-slate-500 w-full h-full object-cover md:group-hover:scale-[110%] animation-smooth-700 `}
            priority
            unoptimized
            src={categoryData[0].urlToImage}
            alt="news illustration"
            width={1000}
            height={1000}
          />
        </div>
        <h2 className="absolute left-0 bottom-0 text-white md:max-w-[60%] text-2xl md:text-3xl lg:text-4xl leading-7 m-5 lg:m-10">
          {categoryData[0].title}
        </h2>
      </section>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...categoryData[1]} id={1} type={thisPagesLink.title} />
        <NewsItem {...categoryData[2]} id={2} type={thisPagesLink.title} />
        <NewsItem {...categoryData[3]} id={3} type={thisPagesLink.title} />
      </div>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...categoryData[4]} id={4} type={thisPagesLink.title} />
        <NewsItem {...categoryData[5]} id={5} type={thisPagesLink.title} />
        <NewsItem {...categoryData[6]} id={6} type={thisPagesLink.title} />
      </div>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...categoryData[7]} id={7} type={thisPagesLink.title} />
        <NewsItem {...categoryData[8]} id={8} type={thisPagesLink.title} />
        <NewsItem {...categoryData[9]} id={9} type={thisPagesLink.title} />
      </div>
    </main>
  );
};

export default Page;
