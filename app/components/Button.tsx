"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the NavButton props interface
interface NavButtonProps {
  activeNav: string;
  setActiveNav: (title: string) => void;
  title: string;
  link: string;
}

// Define the SearchButton props interface
interface SearchButtonProps {
  isActive: boolean;
  title: string;
  setSearched: (title: string) => void;
  sortBy: string;
  fetchNews: (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    sortBy: string
  ) => void; // Update here
}

export const NavButton: React.FC<NavButtonProps> = ({
  activeNav,
  setActiveNav,
  title,
  link,
}) => {
  return (
    <Link
      href={`/${link}`}
      onClick={() => setActiveNav(title)}
      className="flex items-center space-x-4 md:space-x-0 py-4 border-b md:border-b-0 border-[#C1C1C1] px-6 md:px-0 group relative z-30"
    >
      <Image
        src={`/nav/${title}.svg`}
        alt={title}
        width={100}
        height={100}
        className={`w-5 ${
          activeNav === title
            ? " opacity-100 md:opacity-0"
            : " opacity-20 md:opacity-100"
        } animation-smooth `}
      />
      <Image
        src={`/nav/${title}-active.svg`}
        alt={title}
        width={100}
        height={100}
        className={`hidden md:block w-5 absolute ${
          activeNav === title ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`${
          activeNav === title ? "text-black" : "text-[#B1B1BB]"
        } md:hidden z-50 md:group-hover:block md:absolute md:bg-black md:text-white md:px-3 md:py-1 md:text-sm md:left-8 md:rounded-lg animation-smooth`}
      >
        {title}
      </span>
    </Link>
  );
};

export const SearchButton: React.FC<SearchButtonProps> = ({
  isActive,
  title,
  setSearched,
  sortBy,
  fetchNews,
}) => {
  const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearched(title);
    fetchNews(e, title, sortBy); // Fetch news based on title and sortBy
  };

  return (
    <button
      disabled={!isActive}
      onClick={handler}
      className="w-auto h-10 md:w-10 bg-black text-white rounded md:rounded-lg hover:opacity-50 animation-smooth flex justify-center items-center disabled:opacity-60"
    >
      <span className="md:hidden">Search</span>
      <Image
        className={`object-cover rounded-xl hidden md:block w-5`}
        src={"/others/search-icon.svg"}
        alt="news illustration"
        width={500}
        height={500}
      />
    </button>
  );
};
