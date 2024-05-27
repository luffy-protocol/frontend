import React from "react";
import Navbar from "@/components/Navbar";

interface LeaderboardRow {
  rank: number;
  name: string;
  points: number;
}

interface ClaimRow {
  name: string;
  time: string;
  points: number;
}

const leaderboardData: LeaderboardRow[] = [
  { rank: 1, name: "Gabriel", points: 79 },
  { rank: 2, name: "Romario Kavin", points: 100 },
  { rank: 3, name: "Leo Franklin", points: 80 },
  { rank: 4, name: "Gabriel", points: 79 },
  { rank: 5, name: "Leo Franklin", points: 80 },
  { rank: 6, name: "Gabriel", points: 79 },
  { rank: 7, name: "Leo Franklin", points: 80 },
  { rank: 8, name: "Gabriel", points: 79 },
  { rank: 9, name: "Romario Kavin", points: 100 },
  { rank: 10, name: "Leo Franklin", points: 80 },
  { rank: 11, name: "Gabriel", points: 79 },
  { rank: 12, name: "Romario Kavin", points: 100 },
  { rank: 13, name: "Leo Franklin", points: 80 },
  { rank: 14, name: "Gabriel", points: 79 },
  { rank: 15, name: "Leo Franklin", points: 80 },
];

const claimRows: ClaimRow[] = [
  {
    name: "Leo Franklin",
    points: 80,
    time: "5 minutes ago",
  },
  {
    name: "Leo Franklin",
    points: 80,
    time: "5 minutes ago",
  },
  {
    name: "Leo Franklin",
    points: 80,
    time: "5 mins ago",
  },
  {
    name: "Leo Franklin",
    points: 80,
    time: "5 mins ago",
  },
];
const RecentClaims = () => {
  return (
    <div className="flex flex-col ">
      <div className="whitespace-nowrap font-stalinist text-2xl xl:text-3xl text-[#D8485F]">
        Recent Claims
      </div>
      <hr className="my-10 border-t border-gray-300" />
      <div className="flex flex-col gap-6">
        {claimRows.map((row, id) => (
          <div className="flex flex-col gap-3" key={id}>
            <div className="flex justify-between items-center">
              <div className="font-stalinist  text-lg xl:text-xl  max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap text-[#717171]">
                @{row.name}
              </div>
              <div className="font-stalinist text-sm whitespace-nowrap text-[#B62DD3]">
                {row.time}
              </div>
            </div>
            <div className="self-center eclipse text-[#D8485F] text-xl xl:text-2xl font-stalinist">
              {row.points} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className=" font-stalinist  text-2xl xl:text-3xl text-[#D8485F] ">
        Leaderboard
      </div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 md:col-span-8 lg:col-span-6">
          <table className="table w-full">
            <thead>
              <tr className=" border-y-2 border-white border-opacity-50 font-stalinist text-gradient">
                <th className="th text-left px-4 py-2 min-w-[100px] xl:min-w-[200px] ">
                  Rank
                </th>
                <th className="th text-left px-4 py-2 min-w-[220px] xl:min-w-[300px] ">
                  Name
                </th>
                <th className="th text-left px-4 py-2 min-w-[100px] xl:min-w-[200px] ">
                  Points
                </th>
              </tr>
            </thead>

            <tbody className="">
              {leaderboardData.map((row) => (
                <tr
                  key={row.rank}
                  className="tr hover:bg-gray-100 text-gradient font-stalinist"
                >
                  <td className="td px-4 py-6 text-sm xl:text-lg">
                    {row.rank}
                  </td>
                  <td className="td px-4 py-6 text-sm xl:text-lg">
                    {row.name}
                  </td>
                  <td className="td px-4 py-6 text-sm xl:text-lg">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 items-center justify-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex justify-between self-center px-10 xl:px-24">
            <div className="flex justify-between w-11/12 ">
              <div className="overflow-y-auto h-5/6">
                <Leaderboard />
              </div>
              <RecentClaims />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
