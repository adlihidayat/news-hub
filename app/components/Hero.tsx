"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";
import Link from "next/link";

const variants = {
  "0": {
    y: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  "1": {
    y: -205,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  "2": {
    y: -410,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const SlideItem = ({ data, index, isMobile }: any) => {
  // console.log(index, " : ", data.urlToImage);
  return (
    <Link href={`/read/topHeadlines/${index}`} className="group">
      <div className="parent overflow-hidden flex justify-center md:pl-[4%] ">
        <div className="box md:box-md overflow-hidden w-[80vw] h-[300px] md:h-[400px] 2xl:h-[500px]">
          <Image
            priority
            unoptimized
            className={`bg-slate-500 w-full h-full object-cover md:group-hover:scale-[115%] animation-smooth`}
            src={data.urlToImage}
            alt="news illustration"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <svg
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="hidden absolute"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={isMobile ? "5" : "10"}
              result="blur"
              className=""
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Link>
  );
};

const Hero = ({ topNews }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
    customPaging: () => (
      <div
        className="slick-dot-paging"
        style={{
          width: "100%",
          height: "5px",
          borderRadius: "9999px",
        }}
      ></div>
    ),
    dotsClass: "slick-dots slick-thumb",
    afterChange: (current: any) => setActiveSlide(current),
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  return topNews ? (
    <section className="slider-container w-full h-[70vh] pt-24 md:pt-20 mb-10 md:mb-40 xl:mb-60">
      <div className="flex relative justify-center md:pl-[4%] mb-4 h-[120px] sm:h-[60px] md:h-[85px] xl:h-[150px] overflow-y-hidden">
        <motion.h1
          animate={activeSlide.toString()}
          variants={variants}
          className=" text-black text-3xl leading-7 md:text-4xl xl:leading-[70px] xl:text-[64px] w-[80vw]  md:max-w-[600px] lg:max-w-max absolute"
        >
          <span className="h-52 block ">{topNews[0].title}</span>
          <span className="h-52 block">{topNews[1].title}</span>
          <span className="h-52 block">{topNews[2].title}</span>
        </motion.h1>
      </div>
      <Slider {...settings}>
        <SlideItem isMobile={isMobile} index={0} data={topNews[0]} />
        <SlideItem isMobile={isMobile} index={1} data={topNews[1]} />
        <SlideItem isMobile={isMobile} index={2} data={topNews[2]} />
      </Slider>
    </section>
  ) : (
    <div>Loading</div>
  );
};

export default Hero;
