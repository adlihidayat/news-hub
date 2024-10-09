"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewsItem from "./NewsItem";
import { NewsArticle } from "@/types/newsArticle";

// Define the props for the HomeSpecificSection component
interface HomeSpecificSectionProps {
  newsData: NewsArticle[];
  title: string;
  desc: string;
}

const HomeSpecificSection: React.FC<HomeSpecificSectionProps> = ({
  newsData,
  title,
  desc,
}) => {
  return (
    <section className="text-black w-screen md:pl-[3%] flex flex-col items-center mb-32">
      <div className="w-[80vw] flex flex-col items-center mb-12 space-y-3 md:space-y-2">
        <h1 className="text-3xl leading-7 lg:text-5xl xl:text-[64px] uppercase font-semibold lg:font-normal">
          {title} NEWS
        </h1>
        <span className="inline-block font-semibold xl:text-lg">{desc}</span>
        <Link
          href={`/${title}`}
          className="bg-black hover:bg-white h-9 text-center w-40 rounded-full text-white text-sm 2xl:text-sm font-semibold animation-smooth flex items-center relative group animation-smooth-500"
        >
          <span className="w-full mr-5 group-hover:hidden">VIEW MORE</span>
          <div className="w-7 h-7 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center absolute right-1 md:group-hover:bg-black md:group-hover:-translate-x-32 animation-smooth-700">
            <Image
              className={`w-[80%] object-cover`}
              src={"/others/arrow-right.svg"}
              alt="news illustration"
              width={500}
              height={500}
            />
          </div>
          <span className="w-full hidden group-hover:block text-black ml-5">
            CLICK ME!
          </span>
        </Link>
      </div>
      <div className="w-[80vw] flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 2xl:space-x-6 mb-4 2xl:mb-6">
        <NewsItem {...newsData[0]} id={0} type={title} />
        <NewsItem {...newsData[1]} id={1} type={title} />
        <NewsItem {...newsData[2]} id={2} type={title} />
      </div>
      <div className="hidden w-[80vw] md:flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 2xl:space-x-6">
        <NewsItem {...newsData[3]} id={3} type={title} />
        <NewsItem {...newsData[4]} id={4} type={title} />
        <NewsItem {...newsData[5]} id={5} type={title} />
      </div>
    </section>
  );
};

export default HomeSpecificSection;
