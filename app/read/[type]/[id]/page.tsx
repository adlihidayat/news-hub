"use client";
import { useNews } from "@/contexts/NewsProvider";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface NewsArticle {
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

interface NewsData {
  topHeadlines: NewsArticle[];
  sportsNews: NewsArticle[];
  financeNews: NewsArticle[]; // Keep it as financeNews
  technologyNews: NewsArticle[];
  searchResults?: NewsArticle[];
}

const OtherNews = ({ data, id }: { data: NewsArticle; id: number }) => {
  const router = useRouter();
  const handler = () => {
    router.push(`/read/topHeadlines/${id}`);
  };

  return (
    <div
      className="flex bg-white rounded-lg p-2 cursor-pointer"
      onClick={handler}
    >
      <Image
        priority
        unoptimized
        className="w-16 rounded-lg h-16 mr-3"
        src={data.urlToImage || "/placeholder.jpg"}
        alt="news illustration"
        width={500}
        height={500}
      />
      <div>
        <h2 className="h-6 overflow-y-hidden font-semibold">{data.title}</h2>
        <p className="h-8 overflow-y-hidden leading-4 text-sm">
          {data.description}
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  const { type, id } = useParams() as { type: string; id: string };
  const { newsData } = useNews();

  // Dynamically access the appropriate news type
  const selectedNewsType = newsData[type as keyof NewsData];

  // Make sure to handle the case where selectedNewsType might be undefined
  const article = selectedNewsType ? selectedNewsType[Number(id)] : undefined;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-80 pb-20">
        <p className="mb-3 md:mb-5 md:text-3xl">Article not found</p>
        <Link
          href="/"
          className="bg-black rounded-full py-1 px-5 text-sm text-white animation-smooth hover:opacity-50"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center md:ml-[3%] text-black pt-24 overflow-x-hidden pb-5">
      <section className="w-[80vw] h-auto lg:flex lg:items-center lg:space-x-10 mb-14">
        <Image
          priority
          unoptimized
          src={article.urlToImage || "/placeholder.jpg"}
          className="hidden lg:block w-full lg:w-[40%] h-44 md:h-60 lg:h-[450px] 2xl:h-96 object-cover rounded-2xl"
          alt="news illustration"
          width={500}
          height={500}
        />
        <div>
          <span className="block leading-5 font-semibold">
            {article.source?.name || "Unknown Source"}
          </span>
          <span className="mb-10 font-semibold text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString("en-GB")}
          </span>
          <Image
            priority
            unoptimized
            className="w-full h-44 md:h-60 lg:h-72 2xl:h-96 object-cover my-4 lg:hidden rounded-xl"
            src={article.urlToImage || "/placeholder.jpg"}
            alt="news illustration"
            width={500}
            height={500}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-3 font-semibold lg:font-bold leading-6">
            {article.title}
          </h1>
          <p className="mb-5 font-semibold">{article.content}</p>
          <Link
            href={article.url}
            className="bg-black rounded-full py-1 px-5 text-sm text-white animation-smooth hover:opacity-50"
          >
            See Full News
          </Link>
        </div>
      </section>
      <section className="w-[80vw]">
        <h1 className="text-lg font-semibold mb-3">See Other News</h1>
        <div className="grid grid-cols-1 gap-y-3 lg:gap-x-3 lg:grid-cols-3">
          {newsData.topHeadlines.slice(0, 6).map((news, index) => (
            <OtherNews key={index} id={index} data={news} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
