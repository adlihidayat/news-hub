"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useNews } from "../components/NewsProvider";
import { useRouter } from "next/navigation";

export interface NewsArticle {
  author: string;
  urlToImage: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  source: {
    id: string | null;
    name: string;
  };
}

interface NewsItemProps extends NewsArticle {
  type: string;
  id: number; // Add id to the props
}

const NewsItem: React.FC<NewsItemProps> = ({
  author,
  urlToImage,
  title,
  publishedAt,
  description,
  type,
  id,
}) => {
  const router = useRouter();

  const handler = () => {
    router.push(`/read/${type}News/${id}`);
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden w-full group cursor-pointer"
      onClick={handler}
    >
      <div className="h-full w-full absolute animation-smooth p-5 text-white flex flex-col justify-between">
        <div className="w-full flex justify-between z-20 relative">
          <span className="w-32 truncate">{author}</span>
          <span>{new Date(publishedAt).toLocaleDateString("en-GB")}</span>
        </div>
        <div>
          <h2 className="relative z-20 leading-[20px] text-lg lg:text-xl lg:leading-[22px] h-[63px] lg:h-11 overflow-y-hidden lg:mb-2">
            {title}
          </h2>
          <p className="hidden lg:block relative z-20 leading-4 h-0 group-hover:h-[50px] overflow-y-hidden text-sm animation-smooth">
            {description}
          </p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-10 rounded-xl bg-gradient-custom"></div>
      </div>
      <Image
        className={`w-full md:group-hover:scale-[115%] h-60 lg:h-80 2xl:h-[400px] object-cover animation-smooth`}
        priority
        unoptimized
        src={urlToImage}
        alt="news illustration"
        width={500}
        height={500}
      />
    </div>
  );
};

const Page: React.FC = () => {
  const { newsData } = useNews();
  const router = useRouter();

  const handler = () => {
    router.push(`/read/sportsNews/0`);
  };

  return (
    <main className="w-screen text-black md:pl-[3%] flex flex-col items-center pb-32 2xl:pb pt-32 md:pt-20">
      <div className="w-[80vw] mb-7 md:mb-10 relative bg-slate-40 text-center flex flex-col items-center">
        <span className="text-lg xl:text-2xl font-semibold">sports news</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:w-[70%] md:text-center font-bold">
          Master your money, shape your future.
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
              {new Date(newsData.sportsNews[0].publishedAt).toLocaleDateString(
                "en-GB"
              )}
            </span>
            <span>{newsData.sportsNews[0].author}</span>
            <p className="h-20 overflow-y-hidden">
              {newsData.sportsNews[0].description}
            </p>
          </div>
        </div>
        <div className="w-full h-[400px] rounded-3xl overflow-hidden group">
          <Image
            className={`bg-slate-500 w-full h-full object-cover md:group-hover:scale-[110%] animation-smooth-700 `}
            priority
            unoptimized
            src={newsData.sportsNews[0].urlToImage}
            alt="news illustration"
            width={1000}
            height={1000}
          />
        </div>
        <h2 className="absolute left-0 bottom-0 text-white md:max-w-[60%] text-2xl md:text-3xl lg:text-4xl leading-7 m-5 lg:m-10">
          {newsData.sportsNews[0].title}
        </h2>
      </section>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...newsData.sportsNews[1]} id={1} type={"sports"} />
        <NewsItem {...newsData.sportsNews[2]} id={2} type={"sports"} />
        <NewsItem {...newsData.sportsNews[3]} id={3} type={"sports"} />
      </div>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...newsData.sportsNews[4]} id={4} type={"sports"} />
        <NewsItem {...newsData.sportsNews[5]} id={5} type={"sports"} />
        <NewsItem {...newsData.sportsNews[6]} id={6} type={"sports"} />
      </div>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <NewsItem {...newsData.sportsNews[7]} id={7} type={"sports"} />
        <NewsItem {...newsData.sportsNews[8]} id={8} type={"sports"} />
        <NewsItem {...newsData.sportsNews[9]} id={9} type={"sports"} />
      </div>
    </main>
  );
};

export default Page;
