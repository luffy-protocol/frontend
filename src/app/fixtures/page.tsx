"use client";
import FixtureCard from "@/components/FixtureCard";
import React, { useEffect, useState } from "react";
import { Pixelify_Sans } from "next/font/google";
import { request, gql } from "graphql-request";
import fetchFixtures from "@/utils/supabaseFunctions/fetchFixtures";
import { useAccount } from "wagmi";
import { helix } from "ldrs";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

const pxsans = Pixelify_Sans({ subsets: ["latin"] });

function Page() {
  const { isAuthenticated } = useDynamicContext();
  const [matches, setMatches] = useState([
    {
      id: 91515,
      team1: "Delhi Capitals",
      team2: "Gujarat Titans",
      title: "Indian Premiere League",
    },
    {
      id: 91555,
      team1: "Chennai Super Kings",
      team2: "Sunrisers Hyderabad",
      title: "Indian Premiere League",
    },
    {
      id: 91600,
      team1: "Royal Challengers Bengaluru",
      team2: "Gujarat Titans",
      title: "Indian Premiere League",
    },
  ]);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [LoadingUpcoming, setUpcomingLoading] = useState(true);
  const [AllMatches, setAllMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);
  const [ongoingMatches, setOngoingMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);

  const { address } = useAccount();
  useEffect(() => {
    helix.register();
    async function fetchOngoingFixtures() {
      try {
        const data = await request(
          "https://api.studio.thegraph.com/query/30735/luffy/version/latest",
          gql`
            query MyQuery {
              games {
                id
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

        // Extract ongoing matches from the data and set in state
        if (data != null) {
          const { message, response } = await fetchFixtures();
          console.log(response);
          console.log(data);
          const games = (data as any).games;
          console.log(games);
          const gameIdsWithPredictionsAndNullClaims = games
            .filter(
              (game: any) =>
                game.predictions.length > 0 &&
                game.predictions.some(
                  (prediction: any) => prediction.claim === null
                )
            )
            .map((game: any) => parseInt(game.id, 16));

          console.log(
            "Game IDs with predictions and null claims:",
            gameIdsWithPredictionsAndNullClaims
          );

          const ongoingMatchesData = response.filter((match: any) =>
            gameIdsWithPredictionsAndNullClaims.includes(match.matchId)
          );
          console.log(ongoingMatchesData);
          const formattedOngoingMatches = ongoingMatchesData.map(
            (match: any) => ({
              id: match.matchId,

              team1: match.team1,
              team2: match.team2,
              title: "Indian Premiere League",
            })
          );

          setOngoingMatches(formattedOngoingMatches);
          setLoadingOngoing(false);
          console.log("Ongoing Matches Data");
          console.log(formattedOngoingMatches);

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

          const gameIdsWithPredictionsAndClaimsFormatted =
            gameIdsWithPredictionsAndClaims.map((gameId: any) => {
              // Find the match detail in the response array
              const matchDetail = response.find(
                (match: any) => match.matchId === gameId
              );

              // If match detail is found, extract team1 and team2
              if (matchDetail) {
                return {
                  id: matchDetail.matchId,
                  team1: matchDetail.team1,
                  team2: matchDetail.team2,
                  title: "Indian Premiere League",
                };
              }
            });
          console.log(gameIdsWithPredictionsAndClaimsFormatted);
          setCompletedMatches(gameIdsWithPredictionsAndClaimsFormatted);

          const completedMatchesData = response.filter((match: any) =>
            gameIdsWithPredictionsAndClaims.includes(match.id)
          );
          console.log("Completed Matches Data");
          console.log(completedMatchesData);

          //Now if the match isnt completed and not in ongoing status then , we need to fetch the match id and check for the startdate of the matchId in response .if the startDate is greater than current date then it is an upcoming match else mark it as complted
          const remaining = games.filter(
            (match: any) =>
              !gameIdsWithPredictionsAndNullClaims.includes(
                parseInt(match.id, 16)
              ) &&
              !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
          );

          console.log(remaining);

          const remainingCompletedMatches = [] as any;
          const remainingUpcomingMatches = [] as any;

          remaining.forEach((match: any) => {
            const matchId = parseInt(match.id, 16);
            const matchDetail = response.find(
              (responseMatch: any) => responseMatch.matchId === matchId
            );

            if (matchDetail) {
              const startDate = new Date(Number(matchDetail.startDate));
              const currentDate = new Date();

              if (startDate > currentDate) {
                remainingUpcomingMatches.push({
                  id: matchId,
                  team1: matchDetail.team1,
                  team2: matchDetail.team2,
                  title: "Indian Premiere League",
                });
              } else {
                remainingCompletedMatches.push({
                  id: matchId,
                  team1: matchDetail.team1,
                  team2: matchDetail.team2,
                  title: "Indian Premiere League",
                });
              }
            }
          });

          console.log("Remaining Completed Matches");
          console.log(remainingCompletedMatches);
          setCompletedMatches((prevCompletedMatches) => [
            ...prevCompletedMatches,
            ...remainingCompletedMatches,
          ]);
          setLoadingCompleted(false);
          console.log("Remaining Upcoming Matches");
          console.log(remainingUpcomingMatches);
          setUpcomingMatches(remainingUpcomingMatches);
          setUpcomingLoading(false);
        }
        console.log("Data from the graph");
        console.log(data);
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    fetchOngoingFixtures();
  }, [address]);

  return isAuthenticated ? (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Upcoming Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create squads in upcoming fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white pb-2">
        {!LoadingUpcoming ? (
          <FixtureCard fixtures={upcomingMatches} state={0} />
        ) : (
          <div className="flex items-center justify-center p-12">
            <l-helix size="45" speed="2.5" color="black"></l-helix>
          </div>
        )}
      </div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Ongoing Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Claim your points in the Ongoing Fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white pb-2">
        {!loadingOngoing ? (
          <FixtureCard fixtures={ongoingMatches} state={1} />
        ) : (
          <div className="flex items-center justify-center p-12">
            <l-helix size="45" speed="2.5" color="black"></l-helix>
          </div>
        )}
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Completed Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Completed fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white pb-2">
        {!loadingCompleted ? (
          <FixtureCard fixtures={completedMatches} state={2} />
        ) : (
          <div className="flex items-center justify-center p-12">
            <l-helix size="45" speed="2.5" color="black"></l-helix>
          </div>
        )}
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
