import React, { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import Banner from "../public/images/cover/banner.png";
import MyCollection from "./myCollection";

const profile = () => {
  const {
    isAuthenticated,
    user,
    buyTokens,
    getBalance,
    nickname,
    setNickname,
    username,
    handleSetUsername,
  } = useContext(AmazonContext);
  return (
    <div className="flex justify-center bg-white pt-5">
      {isAuthenticated && (
        <>
          <div className="w-full md:w-3/3 lg:w-3/3 border-l border-r">
            <div>
              <img src="https://pbs.twimg.com/profile_banners/607109926/1622322022/1500x500" />
            </div>

            <div className="flex justify-between">
              <div className="rounded-full border-4 border-white inline-block -mt-16 w-32 ml-3">
                <img
                  src={user.attributes.profileImg}
                  alt="profile"
                  className="w-32 rounded-full"
                />
              </div>
              <Link href="/editProfile">
                <div>
                  <button className="rounded-full px-3 py-2 mt-3 mr-3 transition hover:bg-blue-50 inline-block border-2 border-blue-400 text-blue-400 font-bold">
                    Edit Profile
                  </button>
                </div>
              </Link>
            </div>

            <div className="ml-3">
              <p className="font-bold text-lg"> {user.attributes.name}</p>
              <p className="text-gray-500">@{user.attributes.username}</p>
            </div>

            <div className="px-3 mt-3">
              <p>
                A supply chain is a network between a company and its suppliers
                to produce and distribute a specific product or service. The
                entities in the supply chain include producers, distribution
                centers, and retailers.
              </p>
            </div>

            <div className="flex mt-3 border-b">
              <div className="px-8 py-5 hover:bg-blue-50 justify-center text-gray-500 hover:text-blue-400 cursor-pointer transition">
                <p className="text-center font-bold">My Collections</p>
              </div>
            </div>
            <div className="pt-12 px-3 mt-3">
              <MyCollection />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default profile;
