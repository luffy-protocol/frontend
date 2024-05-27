"use client";
import Navbar from "@/components/Navbar";
import Status from "@/components/status";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import CheckProfile from "@/utils/profileHelpers/CheckProfile";
import registerUserProfile from "@/utils/profileHelpers/registerUserProfile";
import getProfile from "@/utils/profileHelpers/getProfile";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import { request, gql } from "graphql-request";
import { teamLogo } from "@/utils/logos/teamlogo";
import { useRouter } from "next/navigation";
import addFollower from "@/utils/profileHelpers/addFollower";

interface MatchCardProps {
  team1: number;
  team2: number;
  status: number;
  fixtureid: number;
}

const matchDate = "2024-06-15";

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  status,
  fixtureid,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center bg-transparent rounded-lg shadow-lg p-6 m-4 min-w-[280px] max-w-[300px] max-h-[130px] border gap-3 border-[#D8485F]">
      <div className="justify-between">
        <div className="flex justify-between items-center min-w-[200px] max-w-[260px]">
          <div>
            <Status status={status} />
          </div>
          <div
            onClick={() => {
              if (status == 4) {
                router.push(`/leaderboard/${fixtureid}`);
              }
            }}
          >
            <img src="/assets/Arrow.png" alt="" width={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mb-4 gap-3">
        <div className="flex flex-col items-center">
          <img
            src={teamLogo(team1)}
            alt={`${team1} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team1.name}</span> */}
        </div>
        <span className="text-xl font-semibold">VS</span>
        <div className="flex flex-col items-center">
          <img
            src={teamLogo(team2)}
            alt={`${team2} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team2.name}</span> */}
        </div>
      </div>

      {/* <div className="text-[10px] font-medium self-start">{matchDate}</div> */}
    </div>
  );
};

function Page({ params }: { params: { address: string } }) {
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

  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    any[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    any[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [expiredMatches, setExpiredMatches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOngoingFixtures() {
      try {
        console.log("Fetching ongoing fixtures...");
        // const { message, response } = await fetchFixtures();
        const { message, response } = await fetchFixtures();

        console.log("Fetched fixtures message:", message);
        console.log("Fetched fixtures response:", response);

        const data: { games: any[] } = await request(
          "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
          gql`
              query MyQuery {
                games {
                  id
                  resultsPublishedTime
                  predictions(
                    where: {
                      user_: {
                        address: "${address}"
                      }
                    }
                  ) {
                    claim {
                      game {
                        id
                      }
                    }
                  }
                }
              }
            `
        );

        const games = data.games;
        console.log("Games:", games);

        const gameIdsWithPredictionsAndNullClaims = games.filter(
          (game: any) =>
            game.predictions.length > 0 &&
            game.predictions.some(
              (prediction: any) => prediction.claim === null
            )
        );
        console.log(
          "Games with predictions and null claims:",
          gameIdsWithPredictionsAndNullClaims
        );

        const gameIdsThatCanBeClaimed = gameIdsWithPredictionsAndNullClaims
          .filter((game: any) => game.resultsPublishedTime != null)
          .map((game: any) => parseInt(game.id, 16));
        console.log("Game IDs that can be claimed:", gameIdsThatCanBeClaimed);

        const gameIdsThatCannotBeClaimed = gameIdsWithPredictionsAndNullClaims
          .filter((game: any) => game.resultsPublishedTime == null)
          .map((game: any) => parseInt(game.id, 16));
        console.log(
          "Game IDs that cannot be claimed:",
          gameIdsThatCannotBeClaimed
        );

        const ongoingMatchesThatCanBeClaimed = response.filter((match: any) =>
          gameIdsThatCanBeClaimed.includes(match.fixture_id)
        );
        console.log(
          "Ongoing matches that can be claimed:",
          ongoingMatchesThatCanBeClaimed
        );

        const ongoingMatchesThatCannotBeClaimed = response.filter(
          (match: any) => gameIdsThatCannotBeClaimed.includes(match.fixture_id)
        );
        console.log(
          "Ongoing matches that cannot be claimed:",
          ongoingMatchesThatCannotBeClaimed
        );

        // Check if the resultsPublishedTime is more than 2 days ago
        const now = new Date();
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        const updatedClaimableOngoingMatches =
          ongoingMatchesThatCanBeClaimed.filter((match: any) => {
            const game = games.find(
              (game: any) => parseInt(game.id, 16) === match.fixture_id
            );
            return (
              new Date(parseInt(game.resultsPublishedTime) * 1000) > twoDaysAgo
            );
          });

        const matchesMovedToExpired = ongoingMatchesThatCanBeClaimed.filter(
          (match: any) => {
            const game = games.find(
              (game: any) => parseInt(game.id, 16) === match.fixture_id
            );
            return (
              new Date(parseInt(game.resultsPublishedTime) * 1000) <= twoDaysAgo
            );
          }
        );

        setClaimmableOngoingMatches(updatedClaimableOngoingMatches);
        setUnclaimmableOngoingMatches(ongoingMatchesThatCannotBeClaimed);
        setExpiredMatches(matchesMovedToExpired);

        const gameIdsWithPredictionsAndClaims = games
          .filter(
            (game: any) =>
              game.predictions.length > 0 &&
              game.predictions.some(
                (prediction: any) => prediction.claim !== null
              )
          )
          .map((game: any) => parseInt(game.id, 16));
        console.log(
          "Game IDs with predictions and claims:",
          gameIdsWithPredictionsAndClaims
        );

        const completedany = response.filter((match: any) =>
          gameIdsWithPredictionsAndClaims.includes(match.fixture_id)
        );
        console.log("Completed match details:", completedany);

        setCompletedMatches(completedany);

        const remaining = games.filter(
          (match: any) =>
            !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
            !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
            !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
        );
        console.log("Remaining games:", remaining);

        const remainingCompletedMatchesDetails: any[] = [];
        const remainingUpcomingMatchesDetails: any[] = [];

        remaining.forEach((match: any) => {
          const fixture_id = parseInt(match.id, 16);
          const matchDetail = response.find(
            (responseMatch: any) => responseMatch.fixture_id === fixture_id
          );

          if (matchDetail) {
            const startDate = new Date(Number(matchDetail.starttime) * 1000);
            const currentDate = new Date();

            if (startDate > currentDate) {
              remainingUpcomingMatchesDetails.push(matchDetail);
            } else {
              remainingCompletedMatchesDetails.push(matchDetail);
            }
          }
        });

        console.log(
          "Remaining completed match details:",
          remainingCompletedMatchesDetails
        );
        console.log(
          "Remaining upcoming match details:",
          remainingUpcomingMatchesDetails
        );

        setCompletedMatches((prevCompletedMatches) => [
          ...prevCompletedMatches,
          ...remainingCompletedMatchesDetails,
        ]);

        setUpcomingMatches(remainingUpcomingMatchesDetails);
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    fetchOngoingFixtures();
  }, [address]);

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
              <div className="flex w-full justify-center items-center mt-4 ml-10 ">
                <div
                  className={`bg-no-repeat w-fit bg-cover ${
                    address === params.address
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  style={{
                    backgroundImage: `url('/assets/LoginBorder.svg')`,
                  }}
                >
                  <span
                    className={`text-sm font-stalinist flex justify-center self-center mt-1 py-2 ml-3 pr-3 ${
                      address === params.address
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (address !== params.address) {
                        addFollower(
                          params.address as string,
                          address as string
                        ).then((data) => {
                          console.log(data.response);
                        });
                      }
                    }}
                  >
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
          <div className="text-lg">Ongoing</div>
          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom">
              <div className="flex gap-3 self-start  ">
                {unclaimmableOngoingMatches.length > 0 ? (
                  unclaimmableOngoingMatches.map(
                    (match: any, index: number) => (
                      <MatchCard
                        key={index}
                        team1={match.home_id}
                        team2={match.away_id}
                        status={1}
                        fixtureid={match.fixture_id}
                      />
                    )
                  )
                ) : (
                  <div className="text-lg text-slate-100 font-stalinist">
                    No Ongoing Matches
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 text-lg">Claimable</div>

          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom">
              <div className="flex gap-3 self-start">
                {claimmableOngoingMatches.length > 0 ? (
                  claimmableOngoingMatches.map((match: any, index: number) => (
                    <MatchCard
                      key={index}
                      team1={match.home_id}
                      team2={match.away_id}
                      status={2}
                      fixtureid={match.fixture_id}
                    />
                  ))
                ) : (
                  <div className="text-lg text-slate-100 self-center">
                    No Claimable Matches
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 text-lg">Completed</div>
          <div className="flex justify-between w-10/12  mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom">
              <div className="flex gap-3 self-start  ">
                {completedMatches.map((match: any, index: number) => (
                  <MatchCard
                    key={index}
                    team1={match.home_id}
                    team2={match.away_id}
                    status={4}
                    fixtureid={match.fixture_id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
