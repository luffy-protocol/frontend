"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DefaultLayout from "@/components/DefaultLayout";
import { fetchOverallLeaderboard } from "@/utils/leaderboard/fetchOverallLeaderboard";
import axios from "axios";

interface LeaderboardRow {
  rank: number;
  name: string;
  points: number;
  gamesPlayed: number;
  netRevenue: number;
}

interface OverallLeaderBoard {
  address: string;
  name: string;
  gamesPlayed: string;
  points: string;
  netRevenue: number;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = React.useState<
    OverallLeaderBoard[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("FETCHING data");
        const response = await axios.get(`/api/dynamic/fetch-users`);
        const data = response.data;
        console.log(data);
        if (data.success) {
          const _mappedUsers: {
            [key: string]: { id: string; name: string; address: string };
          } = {};
          data.data.users.forEach((user: any) => {
            const address = user.walletPublicKey.toLowerCase();
            _mappedUsers[address] = {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              address,
            };
          });

          const _userData = await fetchOverallLeaderboard({
            mappedUsers: _mappedUsers,
          });
          console.log(_userData);
          setLeaderboardData(_userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
              {leaderboardData.map((row, index) => (
                <tr key={index} className="tr  font-stalinist">
                  <td className="td px-4 py-6 text-white">{index + 1}</td>
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
