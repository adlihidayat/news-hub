import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

// Define the type for the news item data
interface NewsItemData {
  urlToImage: string;
  title: string;
  description: string;
}

// Define the NewsItem props interface
interface NewsItemProps {
  data: NewsItemData;
  style: string;
  title: string;
  id: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ data, style, title, id }) => {
  const router = useRouter();
  const handler = () => {
    router.push(`/read/${title}News/${id}`);
  };

  return (
    <div
      className={`${style} w-full md:w-auto items-center space-x-3 cursor-pointer`}
      onClick={handler}
    >
      <div className="w-16 h-16 xl:w-[70px] xl:h-[70px] bg-slate-500 rounded-xl overflow-hidden">
        <Image
          priority
          unoptimized
          src={data.urlToImage}
          className={`w-full h-full object-cover`}
          alt="news illustration"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl xl:text-lg 2xl:text-xl md:text-base md:font-semibold leading-5 md:leading-[20px] h-10 xl:h-7 overflow-y-hidden mb-1 xl:mb-0">
          {data.title}
        </h2>
        <p className="text-md md:text-xs xl:text-sm leading-[20px] h-14 md:h-8 xl:h-10 overflow-y-hidden">
          {data.description}
        </p>
      </div>
    </div>
  );
};

// Define the type for the news data object
interface NewsData {
  sportsNews: NewsItemData[];
  financeNews: NewsItemData[];
  technologyNews: NewsItemData[];
}

// Define the Featured props interface
interface FeaturedProps {
  newsData: NewsData;
}

const Featured: React.FC<FeaturedProps> = ({ newsData }) => {
  return (
    <section className="w-screen text-black md:pl-[3%] flex flex-col md:flex-row md:justify-center items-center pb-32">
      <div className="w-[80vw] flex flex-col md:flex-row items-center md:items-start justify-center md:space-x-5">
        <div className="uppercase w-[100%] md:w-auto mb-10">
          <span className="font-semibold xl:text-lg ">featured</span>
          <h1 className="text-3xl leading-7 lg:text-5xl xl:text-[64px] uppercase font-semibold lg:font-normal mt-1">
            Top Stories You Can't Miss.
          </h1>
        </div>
        <div className="w-[100%]">
          <NewsItem
            title={"sports"}
            id={6}
            style={"flex"}
            data={newsData.sportsNews[6]}
          />
          <div className="h-[1px] w-full bg-black my-5 md:my-2 xl:my-4"></div>
          <NewsItem
            title={"sports"}
            id={7}
            style={"flex"}
            data={newsData.sportsNews[7]}
          />
          <div className="h-[1px] w-full bg-black my-5 md:my-2 xl:my-4"></div>
          <NewsItem
            title={"finance"}
            id={6}
            style={"flex"}
            data={newsData.financeNews[6]}
          />
          <div className="hidden md:block h-[1px] w-full bg-black my-5 md:my-2 xl:my-4"></div>
          <NewsItem
            title={"finance"}
            id={7}
            style={"hidden md:flex"}
            data={newsData.financeNews[7]}
          />
          <div className="hidden md:block h-[1px] w-full bg-black my-5 md:my-2 xl:my-4"></div>
          <NewsItem
            title={"technology"}
            id={6}
            style={"hidden md:flex"}
            data={newsData.technologyNews[6]}
          />
        </div>
      </div>
    </section>
  );
};

export default Featured;
