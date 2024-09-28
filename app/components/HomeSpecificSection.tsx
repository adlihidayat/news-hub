import { div } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NewsItem = ({ id, data, title }: any) => {
  const router = useRouter();

  const handler = () => {
    router.push(`/read/${title}News/${id}`);
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden w-full group cursor-pointer"
      onClick={handler}
    >
      <div className=" h-full w-full  absolute animation-smooth p-5 text-white flex flex-col justify-between">
        <div className=" w-full flex justify-between z-20 relative">
          <span className=" w-32 md:w-[40%] lg:w-[60%] truncate">
            {data.author}
          </span>
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
        <div className=" w-full h-full absolute top-0 left-0 z-10 rounded-xl bg-gradient-custom"></div>
      </div>
      <Image
        priority
        unoptimized
        src={data.urlToImage}
        className={` w-full md:group-hover:scale-[115%] h-60 lg:h-80 2xl:h-[400px] object-cover animation-smooth`}
        alt="news illustration"
        width={500}
        height={500}
      />
    </div>
  );
};

const HomeSpecificSection = ({ newsData, title, desc }: any) => {
  // console.log(newsData);

  return (
    <section className=" text-black w-screen md:pl-[3%] flex flex-col items-center mb-32">
      <div className="w-[80vw] flex flex-col items-center mb-12 space-y-3 md:space-y-2">
        <h1 className="text-3xl leading-7 lg:text-5xl xl:text-[64px] uppercase font-semibold lg:font-normal">
          {title} NEWS
        </h1>
        <span className="  inline-block font-semibold xl:text-lg">{desc}</span>
        <Link
          href={`/${title}`}
          className=" bg-black hover:bg-white  h-9 text-center  w-40 rounded-full text-white text-sm 2xl:text-sm font-semibold animation-smooth flex items-center relative group animation-smooth-500"
        >
          <span className="w-full mr-5 group-hover:hidden">VIEW MORE</span>
          <div className="w-7 h-7 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center absolute right-1 md:group-hover:bg-black md:group-hover:-translate-x-32 animation-smooth-700">
            <Image
              className={` w-[80%] object-cover `}
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
        <NewsItem data={newsData[0]} title={title} id={0} />
        <NewsItem data={newsData[1]} title={title} id={1} />
        <NewsItem data={newsData[2]} title={title} id={2} />
      </div>
      <div className="hidden w-[80vw] md:flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 2xl:space-x-6">
        <NewsItem data={newsData[3]} title={title} id={3} />
        <NewsItem data={newsData[4]} title={title} id={4} />
        <NewsItem data={newsData[5]} title={title} id={5} />
      </div>
    </section>
  );
};

export default HomeSpecificSection;
