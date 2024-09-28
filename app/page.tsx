"use client";
import { useEffect, useState } from "react";
import Featured from "./components/Featured";
import Hero from "./components/Hero";
import HomeSpecificSection from "./components/HomeSpecificSection";
import MissedNews from "./components/MissedNews";
import Recommendation from "./components/Recommendation";
import { useNews } from "./components/NewsProvider";
import Image from "next/image";
import PopUp from "./components/PopUp";

export default function Home() {
  const { newsData } = useNews();
  const [isPopupActive, setIsPopupActive] = useState(true);

  return (
    <div className=" w-full overflow-x-hidden pb-20">
      {isPopupActive && (
        <PopUp isActive={isPopupActive} setIsPopupActive={setIsPopupActive} />
      )}
      <Hero topNews={newsData.topHeadlines} />
      <Recommendation newsData={newsData.topHeadlines} />
      <HomeSpecificSection
        title={"sports"}
        desc={"Fuel your passion, live through sport."}
        newsData={newsData.sportsNews}
      />
      <Featured newsData={newsData} />
      <HomeSpecificSection
        title={"finance"}
        desc={"Master your money, shape your future."}
        newsData={newsData.financeNews}
      />
      <MissedNews newsData={newsData} />
      <HomeSpecificSection
        title={"tech"}
        desc={
          "Explore the Future: Latest Innovations and Breakthroughs in Tech."
        }
        newsData={newsData.technologyNews}
      />
    </div>
  );
}
