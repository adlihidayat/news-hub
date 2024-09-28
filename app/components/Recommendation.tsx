"use client";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define the structure of the news data
interface NewsData {
  id: number;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

// Define the props type for NewsItem component
interface NewsItemProps {
  id: number;
  activeNews: number;
  setActiveNews: (id: number) => void;
  specificStyle: string;
  data: NewsData;
}

// Define the props type for Recommendation component
interface RecommendationProps {
  newsData: NewsData[];
}

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const NewsItem: React.FC<NewsItemProps> = ({
  id,
  activeNews,
  setActiveNews,
  specificStyle,
  data,
}) => {
  const router = useRouter();

  const handler = () => {
    if (activeNews === id) {
      router.push(`/read/topHeadlines/${id}`);
    }
    setActiveNews(id);
  };

  return (
    <div
      onClick={handler}
      className={`h-[300px] lg:h-[350px] w-full ${specificStyle}  ${
        activeNews === id
          ? "md:w-[500px] cursor-pointer"
          : "md:w-40 2xl:w-52 md:hover:w-[300px]"
      } bg-slate-40 animation-smooth `}
    >
      <div className="mb-2 relative overflow-hidden rounded-2xl group">
        {activeNews === id && (
          <div className="z-40 h-full w-full absolute animation-smooth p-5 text-white opacity-0 md:hover:opacity-100">
            <div className="relative z-40 text-white flex justify-between mb-3">
              <div className="flex flex-col">
                <span className="leading-5">{data.author}</span>
                <span className="leading-5">
                  {new Date(data.publishedAt).toLocaleDateString("en-GB")}
                </span>
              </div>
              <div className="w-7 h-7 flex justify-center items-center rounded-full bg-white">
                <Image
                  className={`w-5 object-cover`}
                  src={"/others/arrow.svg"}
                  alt="news illustration"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <p className="relative z-20 h-24 overflow-y-hidden">
              {data.description}
            </p>
            <div className="w-full h-full bg-black opacity-25 absolute top-0 left-0 z-10"></div>
          </div>
        )}
        <Image
          priority
          unoptimized
          className={`w-full h-44 md:h-60 lg:h-72 2xl:h-96 object-cover`}
          src={data.urlToImage}
          alt="news illustration"
          width={500}
          height={500}
        />
      </div>
      <h2
        className={`${
          activeNews === id ? "block" : "block md:hidden"
        } text-xl lg:text-[20px] h-10 lg:h-12 xl:h-20 overflow-y-hidden font-semibold leading-5 lg:leading-6 mb-2`}
      >
        {data.title}
      </h2>
      <p className="leading-5 h-16 overflow-y-hidden text-gray-500 md:hidden bg-slate-100">
        {data.description}
      </p>
    </div>
  );
};

const Recommendation: React.FC<RecommendationProps> = ({ newsData }) => {
  const [activeNews, setActiveNews] = useState<number>(3); // Active news ID should be a number

  return (
    <section className="w-screen text-black md:pl-[3%] flex flex-col items-center pb-32 2xl:pb-56">
      <h1 className="w-[80vw] flex flex-col text-3xl leading-7 xl:leading-[45px] lg:text-5xl xl:text-[44px] mb-10 md:mb-5 xl:mb-10 justify-end">
        <span className="font-semibold">RECOMMENDATION</span>
        <span className={`${playfairDisplay.className}`}>FOR YOU</span>
      </h1>
      <div className="w-[80vw] flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 md:space-x-2">
        {newsData.slice(3, 9).map((news, index) => (
          <NewsItem
            key={news.id}
            id={news.id}
            activeNews={activeNews}
            setActiveNews={setActiveNews}
            specificStyle={index < 3 ? "" : "hidden md:block"}
            data={news}
          />
        ))}
      </div>
    </section>
  );
};

export default Recommendation;
