"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

function Page() {
  const [profilepic, setProfilepic] = useState<string>(
    "https://media.api-sports.io/football/players/154.png"
  );
  const [name, setName] = useState<string>("Lionel Messi");
  const [username, setUsername] = useState<string>("@LeoMessi");
  const [followers, setFollowers] = useState<number>(56);
  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat w-full h-[1700px] overflow-hidden xl:h-[1800px] bg-[url('/assets/BG.svg')] bg-contain font-stalinist">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-between w-10/12 px-10">
        <div className="flex">
          <img
            src={profilepic}
            alt="toppoints"
            className="w-28 h-28  rounded-full bg-white mx-auto mt-10"
          />
          <div className=" text-sm flex flex-col justify-center items-center w-fit mt-5 ml-5">
            <p className=" text-nowrap">{name}</p>
            <p>{username}</p>
          </div>
          <div className="flex w-full justify-center items-center mt-4 ml-10">
            <div
              className={` bg-no-repeat  w-fit bg-cover `}
              style={{
                backgroundImage: `url('/assets/LoginBorder.svg')`,
              }}
            >
              <span className="text-sm font-stalinist flex justify-center self-center mt-1 py-2 ml-3 pr-3 cursor-pointer">
                Follow
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <span className=" text-slate-400">Followers&nbsp;:&nbsp;</span>{" "}
          followers
        </div>
      </div>
      <hr className="p-2 w-10/12 mt-5" />
    </div>
  );
}

export default Page;
