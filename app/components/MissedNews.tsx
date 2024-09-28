import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NewsItem = ({ data, news, title, id }: any) => {
  const router = useRouter();
  const handler = () => {
    router.push(`/read/${title}News/${id}`);
  };

  return (
    <div
      onClick={handler}
      className=" w-full md:w-auto flex-1  flex flex-col items-center border-2 border-black p-5 rounded-[40px] relative overflow-hidden group cursor-pointer"
    >
      <div className=" w-full h-full bg-slate-500 rounded-[40px] overflow-hidden absolute rotate-90 top-0 translate-y-80 md:group-hover:translate-y-0 md:group-hover:rotate-0 animation-smooth-500">
        <Image
          priority
          unoptimized
          src={data.urlToImage}
          className={` w-full h-full object-cover rounded-[40px]`}
          alt="news illustration"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full flex justify-between">
        <span className="w-[50%] sm:w-[30%] md:w-[50%] h-6 overflow-hidden">
          {data.author}
        </span>
        <span>{new Date(data.publishedAt).toLocaleDateString("en-GB")}</span>
      </div>
      <div className=" w-full flex items-center my-5">
        <div className="w-3 h-3 rounded-full bg-black"></div>
        <div className=" w-full h-[2px] bg-black"></div>
        <div className="w-3 h-3 rounded-full bg-black"></div>
      </div>
      <h2 className="leading-[20px] text-lg lg:text-xl  lg:leading-[22px] h-[63px] lg:h-[50px] overflow-y-hidden mb-3 lg:mb-2">
        {data.title}
      </h2>
      <p className=" leading-5 h-[63px] lg:h-[60px] overflow-y-hidden">
        {data.description}
      </p>
    </div>
  );
};

const MissedNews = ({ newsData }: any) => {
  return (
    <section className=" w-screen text-black  md:pl-[3%] flex flex-col items-center pb-32 2xl:pb">
      <div className=" uppercase w-[80vw] mb-10">
        <h1 className="text-3xl leading-7 lg:text-5xl xl:text-[64px] uppercase font-semibold lg:font-normal mt-1 w-60 md:w-full">
          IN case you missed it
        </h1>
      </div>
      <div className="w-[80vw] md:flex md:space-x-4 space-y-4 md:space-y-0">
        <NewsItem data={newsData.sportsNews[8]} title={"sports"} id={8} />
        <NewsItem data={newsData.financeNews[8]} title={"finance"} id={8} />
        <NewsItem
          data={newsData.technologyNews[8]}
          title={"technology"}
          id={8}
        />
      </div>
    </section>
  );
};

export default MissedNews;
