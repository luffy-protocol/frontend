import React from "react";
import Navbar from "@/components/Navbar";
import DefaultLayout from "@/components/DefaultLayout";

interface LeaderboardRow {
  rank: number;
  name: string;
  points: number;
  gamesPlayed: number;
  netRevenue: number;
}

const leaderboardData: LeaderboardRow[] = [
  { rank: 1, name: "Liam", points: 99, gamesPlayed: 16, netRevenue: 450 },
  { rank: 2, name: "Jackson", points: 95, gamesPlayed: 21, netRevenue: 280 },
  { rank: 3, name: "Isabella", points: 94, gamesPlayed: 24, netRevenue: -180 },
  {
    rank: 4,
    name: "Romario Kavin",
    points: 92,
    gamesPlayed: 19,
    netRevenue: 370,
  },
  { rank: 5, name: "Mia", points: 91, gamesPlayed: 12, netRevenue: -300 },
  {
    rank: 6,
    name: "Leo Franklin",
    points: 89,
    gamesPlayed: 22,
    netRevenue: 500,
  },
  { rank: 7, name: "Mason", points: 88, gamesPlayed: 25, netRevenue: 270 },
  { rank: 8, name: "Lucas", points: 87, gamesPlayed: 17, netRevenue: 410 },
  { rank: 9, name: "Elijah", points: 86, gamesPlayed: 13, netRevenue: 330 },
  { rank: 10, name: "Ava", points: 85, gamesPlayed: 15, netRevenue: 200 },
  { rank: 11, name: "Olivia", points: 81, gamesPlayed: 20, netRevenue: 130 },
  { rank: 12, name: "Gabriel", points: 79, gamesPlayed: 18, netRevenue: 50 },
  { rank: 13, name: "Sophia", points: 78, gamesPlayed: 14, netRevenue: -120 },
  { rank: 14, name: "Emma", points: 74, gamesPlayed: 11, netRevenue: -90 },
  { rank: 15, name: "Noah", points: 83, gamesPlayed: 23, netRevenue: -250 },
];

const Leaderboard = () => {
  return (
    <div className="flex flex-col p-20 gap-10 w-full">
      <div className="font-stalinist text-2xl xl:text-3xl text-[#D8485F]">
        Overall Leaderboard
      </div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 md:col-span-8 lg:col-span-6">
          <table className="table w-full">
            <thead>
              <tr className=" border-y-2 border-white border-opacity-50 font-stalinist text-gradient">
                <th className="th text-left px-4 py-2 min-w-[150px] xl:min-w-[200px] ">
                  Rank
                </th>
                <th className="th text-left px-4 py-2 min-w-[250px] xl:min-w-[300px] ">
                  Name
                </th>
                <th className="th text-left px-4 py-2 min-w-[150px] xl:min-w-[200px] ">
                  Played
                </th>
                <th className="th text-left px-4 py-2 min-w-[150px] xl:min-w-[200px] ">
                  Points
                </th>
                <th className="th text-left px-4 py-2 min-w-[150px] xl:min-w-[200px] ">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="">
              {leaderboardData.map((row) => (
                <tr key={row.rank} className="tr  font-stalinist">
                  <td className="td px-4 py-6 text-white">{row.rank}</td>
                  <td className="td px-4 py-6 text-[#cccccc]">{row.name}</td>
                  <td className="td px-4 py-6 text-[#b2b2b2]">
                    {row.gamesPlayed}
                  </td>
                  <td className="td px-4 py-6 text-[#999999]">{row.points}</td>
                  {row.netRevenue > 0 ? (
                    <td
                      className={`td px-4 py-6`}
                      style={{
                        color: "#32CD32",
                      }}
                    >
                      {row.netRevenue} $
                    </td>
                  ) : row.netRevenue < 0 ? (
                    <td
                      className={`td px-4 py-6`}
                      style={{
                        color: "#FF6347",
                      }}
                    >
                      {row.netRevenue} $
                    </td>
                  ) : (
                    <td className={`td px-4 py-6`}>{row.netRevenue} $</td>
                  )}
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
    <DefaultLayout>
      <div className="flex justify-center">
        <Leaderboard />
      </div>
    </DefaultLayout>
  );
};

export default page;
