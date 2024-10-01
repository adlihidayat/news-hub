import Image from "next/image";
import React from "react";
interface PopUpProps {
  isActive: boolean; // Indicates if the popup is active
  setIsPopupActive: (isActive: boolean) => void; // Function to update the popup state
}

const PopUp: React.FC<PopUpProps> = ({ setIsPopupActive }) => {
  const closeHandler = () => {
    setIsPopupActive(false);
  };
  return (
    <div
      className={` w-full h-10 text-sm fixed top-0 md:flex  items-center justify-center space-x-3 bg-[#E7E7E7] z-30`}
    >
      <span className=" text-black">
        Don&apos;t miss out—subscribe now and unlock all access with a 40%
        discount before it&apos;s gone!
      </span>
      <button className=" text-white bg-black rounded-full py-1 px-4 text-xs hover:opacity-50 animation-smooth">
        Subscribe
      </button>
      <button
        onClick={closeHandler}
        className="absolute right-3 hover:opacity-30 animation-smooth"
      >
        <Image
          priority
          unoptimized
          className={`w-4 h-4`}
          src={"/others/close.svg"}
          alt="close button"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
};

export default PopUp;
