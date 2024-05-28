"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DefaultLayout from "@/components/DefaultLayout";
import request, { gql } from "graphql-request";
import axios from "axios";

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

interface User {
  id: string;
  name: string;
  address: string;
}
interface MappedUsers {
  [address: string]: User;
}
interface FetchInput {
  mappedUsers: MappedUsers;
  gameId: string;
}
interface UserData {
  id: string;
  name: string;
  address: string;

  points: number;
}

interface Props {
  fetched: boolean;
  setFetched: () => void;
  slug: string;
}

const fetchAllUsers = async ({
  gameId,
  mappedUsers,
}: FetchInput): Promise<UserData[]> => {
  try {
    const query = gql`
      query MyQuery($gameId: String!) {
        predictions(where: { game: $gameId }) {
          claim {
            points
            user {
              address
            }
          }
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { gameId }
    );

    console.log("Fetched data:", data);

    return (data as any).predictions
      .map((pred: any) => {
        if (pred.claim === null) {
          return null;
        }
        const userAddress = pred.claim.user.address.toLowerCase();
        const user = mappedUsers[userAddress];
        if (!user) {
          return {
            name: "Unknown",
            address: userAddress,
            points: pred.claim.points || 0,
          };
        }
        return {
          name: user.name,
          address: userAddress,
          points: pred.claim.points || 0,
        };
      })
      .filter((pred: any) => pred !== null);
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return [];
  }
};

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
                    key={user.name}
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

const page = ({ params }: { params: { fixtureId: string } }) => {
  const [users, setUsers] = useState<UserData[]>([]);

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
          const _userData = await fetchAllUsers({
            mappedUsers: _mappedUsers,
            gameId: fixtureIdHex,
          });
          console.log(_userData);
          setUsers(_userData);
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
            <RecentClaims />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
