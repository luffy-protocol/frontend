"use client";
import MatchLeaderboard from "@/components/MatchLeaderboard";
import { fixtureDetails } from "@/utils/constants";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import request, { gql } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}
interface UserData {
  id: string;
  name: string;
  address: string;
  totalGamesPlayed: number;
  totalGamesClaimed: number;
  totalPointsWon: number;
}

const fetchAllUsers = async ({
  mappedUsers,
}: FetchInput): Promise<UserData[]> => {
  try {
    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy/version/latest",
      gql`
        query MyQuery {
          users(orderBy: totalPointsWon, orderDirection: desc) {
            address
            totalGamesPlayed
            totalGamesClaimed
            totalPointsWon
          }
        }
      `
    );

    // Extract ongoing matches from the data and set in state
    console.log(data);
    console.log("Mapped Users");
    console.log(mappedUsers);
    return (data as any).users
      .map((user: any) => {
        console.log("Mapped User");
        console.log(mappedUsers[user.address]);
        if (mappedUsers[user.address.toLowerCase()] === undefined) {
          return null;
        } else return { ...user, name: mappedUsers[user.address].name };
      })
      .filter((user: any) => user !== null);
    // setongoing(ongoingMatchesData);
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return [];
  }
};
function Page({ params }: { params: { slug: string } }) {
  const { isAuthenticated } = useDynamicContext();
  const [users, setUsers] = useState<UserData[]>([]);
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_DYNAMIC_API_KEY);
    (async function () {
      const response = await axios.get(`/api/dynamic/fetch-users`, {
        headers: {
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_DYNAMIC_API_KEY || ""
          }`,
        },
      });
      const data = response.data;
      if (data.success) {
        const _mappedUsers: MappedUsers = {};
        data.data.users.forEach((user: any) => {
          _mappedUsers[user.walletPublicKey.toLowerCase()] = {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            address: user.walletPublicKey.toLowerCase() || "0x",
          };
        });
        const _userData = await fetchAllUsers({ mappedUsers: _mappedUsers });
        setUsers(_userData);
      }
    })();
  }, []);

  return isAuthenticated ? (
    <div>
      <div className="bg-white  px-48 py-6 sm:pt-32 lg:px-48 text-black h-full">
        <div className={`w-full  ${users.length == 0 && "h-screen"}`}>
          <div className="hidden md:flex justify-center space-x-4 w-full">
            <Image
              src={`/${fixtureDetails[params.slug].team1}.png`}
              width={130}
              height={130}
              alt="team1"
            />
            <Image src="/vs.png" width={100} height={100} alt="vs" />
            <Image
              src={`/${fixtureDetails[params.slug].team2}.png`}
              width={130}
              height={130}
              alt="team2"
            />
          </div>
          <p className="mb-6 text-sm text-neutral-600 mx-auto text-center">
            Note: If you don&apos;t see your profile or games played here, make
            sure you claimed the points for your predictions in the fixtures
            page.
          </p>
          {users.length == 0 && (
            <div className="flex flex-col items-center justify-start h-full w-full mt-24">
              <l-helix size="45" speed="2.5" color="black"></l-helix>
            </div>
          )}
        </div>
        <MatchLeaderboard users={users} />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div>
        <p className="text-black font-bold text-xl sm:text-3xl">
          Connect your wallet to get started
        </p>
        <div className="mx-auto flex justify-center mt-6">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
}
export default Page;
