"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DefaultLayout from "@/components/DefaultLayout";
import request, { gql } from "graphql-request";
import axios from "axios";
import { time } from "console";
import { ClaimRow, FetchInput, UserData } from "@/utils/interface";
import { fetchLeaderboardByGame } from "@/utils/leaderboard/fetchLeaderboardByGame";
import { fetchRecentClaims } from "@/utils/leaderboard/fetchRecentClaims";

const RecentClaims = ({ claims }: { claims: ClaimRow[] }) => {
  return (
    <div className="flex flex-col ">
      <div className="whitespace-nowrap font-stalinist text-2xl xl:text-3xl text-[#D8485F]">
        Recent Claims
      </div>
      <hr className="my-10 border-t border-gray-300" />
      <div className="flex flex-col gap-6">
        {claims.map((claim, id) => (
          <div className="flex flex-col gap-3" key={id}>
            <div className="flex justify-between items-center">
              <div className="font-stalinist  text-lg xl:text-xl  max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap text-[#717171]">
                @{claim.name}
              </div>
              <div className="font-stalinist text-sm whitespace-nowrap text-[#B62DD3]">
                {claim.time}
              </div>
            </div>
            <div className="self-center eclipse text-[#D8485F] text-xl xl:text-2xl font-stalinist">
              {claim.points} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = ({ users }: { users: UserData[] }) => {
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
              {users
                .sort((a: any, b: any) => b.points - a.points)
                .map((user: any, index: any) => (
                  <tr
                    key={index}
                    className="tr hover:bg-gray-100 text-gradient font-stalinist"
                  >
                    <td className="td px-4 py-6 text-sm xl:text-lg">
                      {index + 1}
                    </td>
                    <td className="td px-4 py-6 text-sm xl:text-lg">
                      {user.name}
                    </td>
                    <td className="td px-4 py-6 text-sm xl:text-lg">
                      {user.points}
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

const Page: React.FC<{ params: { fixtureId: string } }> = ({ params }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [claims, setClaims] = useState<ClaimRow[]>([]);

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
          const fixtureIdHex = "0x" + parseInt(params.fixtureId).toString(16);
          const _userData = await fetchLeaderboardByGame({
            mappedUsers: _mappedUsers,
            gameId: fixtureIdHex,
          });
          console.log(_userData);
          setUsers(_userData);

          //Recent Claims
          const _claimData = await fetchRecentClaims({
            mappedUsers: _mappedUsers,
            gameId: fixtureIdHex,
          });
          console.log(_claimData);
          setClaims(_claimData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-between self-center px-10 xl:px-24">
        <div className="flex justify-between w-full ">
          <div className="overflow-y-auto h-5/6">
            <Leaderboard users={users} />
          </div>
          <div>
            <RecentClaims claims={claims} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
