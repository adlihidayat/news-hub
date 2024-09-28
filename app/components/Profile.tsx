import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ title }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if there is a token in the URL
    const params = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      fetchUserData(accessToken);
    }
  }, []);

  const fetchUserData = async (accessToken: string) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const redirectToGoogleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000"; // Your redirect URI
    const SCOPE = "openid profile email";

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}&prompt=consent`;
  };

  return (
    <div className="hidden md:block relative">
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="flex items-center space-x-4 md:space-x-0 py-4 border-b md:border-b-0 border-[#C1C1C1] px-6 md:px-0 group  z-10 w-full md:w-auto"
      >
        <Image
          src={`/nav/profile.svg`}
          alt={title}
          width={100}
          height={100}
          className={`w-5 opacity-20 md:opacity-100 animation-smooth `}
        />
      </button>
      <div
        className={`text-[#B1B1BB] ${
          isActive ? "hidden md:flex" : "hidden"
        } md:absolute md:bg-white   ${
          user ? "h-56 w-72" : "h-40 w-60"
        } md:text-sm md:left-12 top-2 md:rounded-[25px] animation-smooth overflow-hidden  flex-col items-center justify-center z-20`}
      >
        {user ? (
          <>
            <button
              onClick={() => {
                setIsActive(false);
              }}
              className=" w-6 h-6 bg-white absolute top-3 left-3 z-20 rounded-full flex justify-center items-center hover:opacity-50 animation-smooth"
            >
              {" "}
              <Image
                src={`/others/close.svg`}
                alt={title}
                width={100}
                height={100}
                className={`w-4 object-cover opacity-20 md:opacity-100 animation-smooth `}
              />
            </button>
            <div className=" w-full h-20 top-0 left-0 absolute bg-black">
              <Image
                src={"/img.jpg"}
                alt={title}
                width={100}
                height={100}
                className={`w-full h-full object-cover opacity-20 md:opacity-100 animation-smooth `}
              />
            </div>
            <div className=" w-16 h-16 rounded-full bg-slate-100 z-20 mb-4 mt-6 overflow-hidden">
              <Image
                src={user.picture}
                alt={"profile picture"}
                width={100}
                height={100}
                className={`w-full h-full object-cover opacity-20 md:opacity-100 animation-smooth `}
              />
            </div>
            <span className=" text-black">
              {user ? user.name : "You havent login"}
            </span>
            <span className="mb-3">
              {user ? user.email : "Start Login Now"}
            </span>
            <button
              onClick={() => setUser(null)}
              className="border border-[#B1B1BB] rounded-[6px] px-5 hover:opacity-50 animation-smooth"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setIsActive(false);
              }}
              className=" w-6 h-6 bg-white absolute top-3 left-3 z-20 rounded-full flex justify-center items-center hover:opacity-50 animation-smooth"
            >
              {" "}
              <Image
                src={`/others/close.svg`}
                alt={title}
                width={100}
                height={100}
                className={`w-4 object-cover opacity-20 md:opacity-100 animation-smooth `}
              />
            </button>
            <p className=" mb-2 mt-4 text-xl text-black">
              You Havent login yet
            </p>
            <button
              onClick={redirectToGoogleLogin}
              className="border border-[#B1B1BB] rounded-[6px] px-5 hover:opacity-50 animation-smooth"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
