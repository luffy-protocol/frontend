"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import { teamLogo } from "@/utils/logos/teamlogo";
import fetchFixtureByRound from "@/utils/fixtureHelpers/FixtureByRound";
import FixtureCard from "@/components/FixtureCard";

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

const MatchCard: React.FC<{ match: MatchDetails }> = ({ match }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-4">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <img
            src={teamLogo(match.home_id)}
            alt={match.home_name}
            className="w-12 h-12"
          />
          <span className="text-xl font-bold">vs</span>
          <img
            src={teamLogo(match.away_id)}
            alt={match.away_name}
            className="w-12 h-12"
          />
        </div>
        <div className="font-bold text-xl mb-2">
          {match.home_name} vs {match.away_name}
        </div>
        <p className="text-gray-700 text-base">Venue: {match.venue}</p>
        <p className="text-gray-700 text-base">
          Date: {new Date(match.date).toLocaleDateString()} Time:{" "}
          {new Date(parseInt(match.starttime) * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      {loadingOngoing ? (
        <p>Loading ongoing matches...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">
            Claimable Ongoing Matches
          </h2>
          <div className="">
            {claimmableOngoingMatches.map((match) => (
              <FixtureCard key={match.fixture_id} fixture={match} status={2} />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2 mt-4">
            Unclaimable Ongoing Matches
          </h2>
          <div className="">
            {unclaimmableOngoingMatches.map((match) => (
              <FixtureCard key={match.fixture_id} fixture={match} status={1} />
            ))}
          </div>
        </>
      )}
      {loadingCompleted ? (
        <p>Loading completed matches...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2 mt-4">Completed Matches</h2>
          <div className="">
            {completedMatches.map((match) => (
              <FixtureCard key={match.fixture_id} fixture={match} status={4} />
            ))}
          </div>
        </>
      )}
      {upcomingLoading ? (
        <p>Loading upcoming matches...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2 mt-4">Upcoming Matches</h2>
          <div className="">
            {upcomingMatches.map((match) => (
              <FixtureCard key={match.fixture_id} fixture={match} status={0} />
            ))}
          </div>
        </>
      )}
      <>
        <h2 className="text-xl font-semibold mb-2 mt-4">Expired Matches</h2>
        <div className="">
          {expiredMatches.map((match) => (
            <FixtureCard key={match.fixture_id} fixture={match} status={3} />
          ))}
        </div>
      </>
    </div>
  );
}
