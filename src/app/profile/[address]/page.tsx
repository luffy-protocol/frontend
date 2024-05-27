"use client";
import Navbar from "@/components/Navbar";
import Status from "@/components/status";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import CheckProfile from "@/utils/profileHelpers/CheckProfile";
import registerUserProfile from "@/utils/profileHelpers/registerUserProfile";
import getProfile from "@/utils/profileHelpers/getProfile";

interface MatchCardProps {
  team1: {
    name: string;
    logo: string;
  };
  team2: {
    name: string;
    logo: string;
  };
  matchDate: string;
  status: number;
}

const team1 = {
  name: "Team A",
  logo: "https://media.api-sports.io/football/teams/18310.png",
};

const team2 = {
  name: "Team B",
  logo: "https://media.api-sports.io/football/teams/18310.png",
};

const matchDate = "2024-06-15";

const MatchCard: React.FC<MatchCardProps> = ({ team1, team2, status }) => {
  return (
    <div className="flex flex-col items-center bg-transparent rounded-lg shadow-lg p-6 m-4 min-w-[280px] max-w-[300px] max-h-[130px] border gap-3 border-[#D8485F]">
      <div className="justify-between">
        <div className="flex justify-between items-center min-w-[200px] max-w-[260px]">
          <div>
            <Status status={status} />
          </div>
          <div>
            <img src="/assets/Arrow.png" alt="" width={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mb-4 gap-3">
        <div className="flex flex-col items-center">
          <img
            src={team1.logo}
            alt={`${team1.name} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team1.name}</span> */}
        </div>
        <span className="text-xl font-semibold">VS</span>
        <div className="flex flex-col items-center">
          <img
            src={team2.logo}
            alt={`${team2.name} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team2.name}</span> */}
        </div>
      </div>

      {/* <div className="text-[10px] font-medium self-start">{matchDate}</div> */}
    </div>
  );
};

function Page() {
  const { address } = useAccount();
  const [name, setName] = useState<string>("Lionel Messi");
  const [username, setUsername] = useState<string>("@LeoMessi");
  const [followers, setFollowers] = useState<number>(1);
  const [followings, setFollowing] = useState<number>(1);

  useEffect(() => {
    if (address) {
      CheckProfile(address as string).then((data) => {
        if (data.response.length == 0) {
          registerUserProfile(address as string).then((data) => {
            console.log(data.response);
          });
        }
      });
      getProfile(address as string).then((data) => {
        console.log(data.response);
        setProfilepic(data.response[0].imageUrl);
        if (data.response[0].followers !== null) {
          setFollowers(data.response[0].followers.length);
        } else {
          setFollowers(0);
        }
        if (data.response[0].following !== null) {
          setFollowers(data.response[0].following.length);
        } else {
          setFollowers(0);
        }
      });
    }

    if (typeof window !== "undefined" && address) {
      console.log(process.env.NEXT_PUBLIC_DYNAMIC_API_KEY);
      (async function () {
        try {
          const response = await axios.get(`/api/dynamic/fetch-users`, {
            headers: {},
          });
          const data = response.data;
          console.log("DYNAMIC DATA");

          if (data.success) {
            // Filter the data based on address
            const filteredUsers = data.data.users.filter(
              (user: any) =>
                user.walletPublicKey.toLowerCase() === address.toLowerCase()
            );
            console.log(filteredUsers);

            // Set the state based on the filtered user
            if (filteredUsers.length > 0) {
              const user = filteredUsers[0];
              setName(`${user.firstName} ${user.lastName}`);
              setUsername(user.firstName);
            }
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      })();
    }
  }, [address]);

  const [profilepic, setProfilepic] = useState<string>(
    "https://media.api-sports.io/football/players/154.png"
  );

  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 items-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex justify-between w-10/12 px-10">
            <div className="flex">
              <img
                src={profilepic}
                alt="toppoints"
                className="w-32 h-32  rounded-full bg-white mx-auto mt-10"
              />
              <div className=" text-sm flex flex-col justify-center items-center w-fit mt-5 ml-5 gap-2">
                <p className=" text-nowrap  self-start">{name}</p>
                <p className="text-nowrap self-start">@{username}</p>
                <div className="flex items-center justify-center self-start">
                  <span className=" text-slate-400 ">
                    Followers&nbsp;:&nbsp;
                  </span>{" "}
                  {followers}
                </div>
                <div className="flex items-center justify-center self-start">
                  <span className=" text-slate-400">
                    Following&nbsp;:&nbsp;
                  </span>{" "}
                  {followings}
                </div>
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

            <div className="flex items-center justify-center mt-6 gap-2">
              <div className=" text-[10px] text-slate-400 xl:text-[14px]">
                Net Revenue
              </div>
              <div className="text-[10px] text-green-500 xl:text-[14px]">
                $1000
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <div className="flex w-full justify-center items-center  ml-10">
                <div
                  className={` bg-no-repeat  w-fit bg-cover `}
                  style={{
                    backgroundImage: `url('/assets/LoginBorder.svg')`,
                  }}
                >
                  <span className="text-sm font-stalinist flex justify-center self-center mt-1 py-2 mr-2 ml-4 pr-3 cursor-pointer">
                    Claim
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-10/12 px-10 mt-5">
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px]xl:text-[14px]">
                Highest Position
              </div>
              <div className="text-[10px] xl:text-[14px]">3</div>
            </div>
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                Highest amount
              </div>
              <div className="text-[10px] xl:text-[14px]">$836</div>
            </div>{" "}
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                total games
              </div>
              <div className="text-[10px] xl:text-[14px]">10</div>
            </div>{" "}
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                total amount
              </div>
              <div className="text-[10px] xl:text-[14px]">$1799</div>
            </div>
          </div>
          <hr className="p-2 w-10/12 mt-5 " />
          <div className="text-lg">Completed</div>
          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start ">
              <div className="flex gap-3 self-start  ">
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={1}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={1}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={1}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={1}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={1}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 text-lg">Ongoing</div>

          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start ">
              <div className="flex gap-3 self-start  ">
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={3}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={3}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={3}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={3}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={3}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start ">
              <div className="flex gap-3 self-start  ">
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={2}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={2}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={2}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={2}
                />
                <MatchCard
                  team1={team1}
                  team2={team2}
                  matchDate={matchDate}
                  status={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
