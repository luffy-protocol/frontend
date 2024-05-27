"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import { teamLogo } from "@/utils/logos/teamlogo";
import fetchFixtureByRound from "@/utils/fixtureHelpers/FixtureByRound";
import FixtureCard from "@/components/FixtureCard";
import Left from "../../../../public/assets/Left.png";
import Navbar from "@/components/Navbar";

interface MatchDetails {
  away_id: number;
  away_name: string;
  away_logo: string; // added for logo
  date: string;
  fixture_id: number;
  home_id: number;
  home_name: string;
  home_logo: string; // added for logo
  id: number;
  starttime: string;
  venue: string;
}

const address = "0x4b4b30e2E7c6463b03CdFFD6c42329D357205334"; // replace with the actual address

export default function Page({ params }: { params: { round: string } }) {
  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<MatchDetails[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchDetails[]>([]);
  const [expiredMatches, setExpiredMatches] = useState<MatchDetails[]>([]);
  const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
  const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOngoingFixtures() {
      try {
        console.log("Fetching ongoing fixtures...");
        // const { message, response } = await fetchFixtures();
        const { message, response } = await fetchFixtureByRound(
          Number(params.round)
        );

        console.log("Fetched fixtures message:", message);
        console.log("Fetched fixtures response:", response);

        const data = await request(
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

        console.log("Fetched data:", data);

        if (data != null) {
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
            (match: any) =>
              gameIdsThatCannotBeClaimed.includes(match.fixture_id)
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
                new Date(parseInt(game.resultsPublishedTime) * 1000) >
                twoDaysAgo
              );
            });

          const matchesMovedToExpired = ongoingMatchesThatCanBeClaimed.filter(
            (match: any) => {
              const game = games.find(
                (game: any) => parseInt(game.id, 16) === match.fixture_id
              );
              return (
                new Date(parseInt(game.resultsPublishedTime) * 1000) <=
                twoDaysAgo
              );
            }
          );

          setClaimmableOngoingMatches(updatedClaimableOngoingMatches);
          setUnclaimmableOngoingMatches(ongoingMatchesThatCannotBeClaimed);
          setExpiredMatches(matchesMovedToExpired);
          setLoadingOngoing(false);

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

          const completedMatchDetails = response.filter((match: any) =>
            gameIdsWithPredictionsAndClaims.includes(match.fixture_id)
          );
          console.log("Completed match details:", completedMatchDetails);

          setCompletedMatches(completedMatchDetails);

          const remaining = games.filter(
            (match: any) =>
              !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
              !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
              !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
          );
          console.log("Remaining games:", remaining);

          const remainingCompletedMatchesDetails: MatchDetails[] = [];
          const remainingUpcomingMatchesDetails: MatchDetails[] = [];

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
          setLoadingCompleted(false);
          setUpcomingMatches(remainingUpcomingMatchesDetails);
          setUpcomingLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    fetchOngoingFixtures();
  }, [address]);
  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">Matches</h1>
    //   {loadingOngoing ? (
    //     <p>Loading ongoing matches...</p>
    //   ) : (
    //     <>
    //       <h2 className="text-xl font-semibold mb-2">
    //         Claimable Ongoing Matches
    //       </h2>
    //       <div className="">
    //         {claimmableOngoingMatches.map((match) => (
    //           <FixtureCard key={match.fixture_id} fixture={match} status={2} />
    //         ))}
    //       </div>
    //       <h2 className="text-xl font-semibold mb-2 mt-4">
    //         Unclaimable Ongoing Matches
    //       </h2>
    //       <div className="">
    //         {unclaimmableOngoingMatches.map((match) => (
    //           <FixtureCard key={match.fixture_id} fixture={match} status={1} />
    //         ))}
    //       </div>
    //     </>
    //   )}

    //   {upcomingLoading ? (
    //     <p>Loading upcoming matches...</p>
    //   ) : (
    //     <>
    //       <h2 className="text-xl font-semibold mb-2 mt-4">Upcoming Matches</h2>
    //       <div className="">
    //         {upcomingMatches.map((match) => (
    //           <FixtureCard key={match.fixture_id} fixture={match} status={0} />
    //         ))}
    //       </div>
    //     </>
    //   )}
    //   <>
    //     <h2 className="text-xl font-semibold mb-2 mt-4">Expired Matches</h2>
    //     <div className="">
    //       {expiredMatches.map((match) => (
    //         <FixtureCard key={match.fixture_id} fixture={match} status={3} />
    //       ))}
    //     </div>
    //   </>
    //   {loadingCompleted ? (
    //     <p>Loading completed matches...</p>
    //   ) : (
    //     <>
    //       <h2 className="text-xl font-semibold mb-2 mt-4">Completed Matches</h2>
    //       <div className="">
    //         {completedMatches.map((match) => (
    //           <FixtureCard key={match.fixture_id} fixture={match} status={4} />
    //         ))}
    //       </div>
    //     </>
    //   )}
    // </div>
    // <div
    //   className="flex flex-col px-10 items-center bg-no-repeat bg-contain w-full h-[1700px] overflow-hidden xl:h-[1800px]"
    //   //  h-auto min-h-screen" // or
    //   style={{ backgroundImage: `url('/assets/PageBorder.svg')` }}
    // >
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>

      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 items-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full">
            <Navbar />
          </div>
          <div
            className="flex flex-col px-10 items-center bg-no-repeat bg-contain  w-[90%] h-[900px] overflow-hidden lg:h-[1000px] xl:h-[1250px] 2xl:h-[1400px] bg-center"
            style={{ backgroundImage: `url('/assets/GameBorder.svg')` }}
          >
            <div className="flex flex-col gap-2 items-center w-10/12 2xl:mt-32 xl:mt-56 mt-32 h-4/5 overflow-clip">
              <div className="flex gap-3 items-center justify-center mb-10 2xl:mt-20">
                <img
                  src="/assets/Left.png"
                  alt=""
                  width="60px"
                  className="hover:scale-110"
                />

                <div className="text-5xl font-stalinist items-center justify-center lg:text-2xl">
                  Game Week {params.round}
                </div>
                <img
                  src="/assets/Right.png"
                  alt=""
                  width="60px"
                  className="hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2  w-full xl:max-h-[700px] 2xl:max-h-[1000px] overflow-y-auto">
                <div className="flex-col items-center justify-center w-full">
                  {claimmableOngoingMatches.map((match, index) => (
                    <FixtureCard
                      key={`${match.fixture_id}-${index}`}
                      fixture={match}
                      status={2}
                    />
                  ))}
                </div>
                <div className="flex-col items-center justify-center w-full">
                  {unclaimmableOngoingMatches.map((match, index) => (
                    <FixtureCard
                      key={`${match.fixture_id}-${index}`}
                      fixture={match}
                      status={1}
                    />
                  ))}
                </div>
                <div className="flex-col items-center justify-center w-full">
                  {upcomingMatches.map((match, index) => (
                    <FixtureCard
                      key={`${match.fixture_id}-${index}`}
                      fixture={match}
                      status={0}
                    />
                  ))}
                </div>

                <div className="flex-col gap-2 items-center justify-center w-full">
                  {expiredMatches.map((match, index) => (
                    <FixtureCard
                      key={`${match.fixture_id}-${index}`}
                      fixture={match}
                      status={3}
                    />
                  ))}
                </div>
                <div className="flex-col gap-2 items-center justify-center w-full">
                  {completedMatches.map((match, index) => (
                    <FixtureCard
                      key={`${match.fixture_id}-${index}`}
                      fixture={match}
                      status={4}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
