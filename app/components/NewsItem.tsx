import { NewsArticle } from "@/types/newsArticle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

export default NewsItem;
