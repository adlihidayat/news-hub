"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NavButton } from "./Button";
import { motion } from "framer-motion";
import Profile from "./Profile";
import { usePathname } from "next/navigation";

const variants = {
  home: {
    y: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  search: {
    y: 52,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  sports: {
    y: 104,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  finance: {
    y: 156,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  tech: {
    y: 208,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const pathname = usePathname(); // Get current path

  useEffect(() => {
    if (pathname.includes("/search")) {
      setActiveNav("search");
    } else if (pathname.includes("/sportsNews")) {
      setActiveNav("sports");
    } else if (pathname.includes("/financeNews")) {
      setActiveNav("finance");
    } else if (pathname.includes("/technologyNews")) {
      setActiveNav("tech");
    } else {
      setActiveNav("home");
    }
  }, [pathname]);

  return (
    <div className=" bg-white flex md:flex-col justify-between md:justify-start md:items-center px-5 md:px-4 py-4 md:py-12 fixed w-full md:w-auto md:h-screen z-40 ">
      <a
        href="/"
        className=" z-20  rounded-full animation-smooth hover:bg-yellow-200"
      >
        <Image
          src={"/logo.png"}
          alt="newsHub logo"
          width={100}
          height={100}
          className={`w-7`}
        />
      </a>
      <button
        onClick={() => setIsActive(!isActive)}
        className="flex flex-col space-y-[3px] z-20 md:hidden"
      >
        <div className=" w-5 h-[3px] bg-black"></div>
        <div className=" w-5 h-[3px] bg-black"></div>
        <div className=" w-5 h-[3px] bg-black"></div>
      </button>
      <nav
        className={`absolute z-50 md:relative bg-white md:bg-transparent h-screen md:h-auto w-screen md:w-auto left-0 top-0 pt-14 text-black ${
          isActive ? "block" : "hidden"
        } md:flex flex-col justify-center`}
      >
        <motion.div
          animate={activeNav}
          variants={variants}
          className="w-10 h-10 bg-black absolute rounded-lg  hidden md:block top-[62px] -left-[10px] "
        ></motion.div>
        <NavButton
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          title={"home"}
          link={""}
        />
        <NavButton
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          title={"search"}
          link={"search"}
        />
        <NavButton
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          title={"sports"}
          link={"sportsNews"}
        />
        <NavButton
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          title={"finance"}
          link={"financeNews"}
        />
        <NavButton
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          title={"tech"}
          link={"technologyNews"}
        />
        <Profile title={"profile"} />
      </nav>
    </div>
  );
};

export default Nav;
