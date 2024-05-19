"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

interface Match {
  matchId: number;
  startDate: string;
}

const fetchFixtures = async (): Promise<{
  message: string;
  response: Match[];
}> => {
  // Implement this function to fetch fixtures
  // This is a placeholder implementation
  return {
    message: "success",
    response: [
      { matchId: 13, startDate: "1683705600000" },
      { matchId: 789012, startDate: "1683782000000" },
      // Add more mock data as needed
    ],
  };
};

const address = "0xd69a4dd0dfb261a8ef37f45925491c077ef1dbfb"; // replace with the actual address

const page: React.FC = () => {
  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    number[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    number[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<number[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<number[]>([]);
  const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
  const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOngoingFixtures() {
      try {
        console.log("Fetching ongoing fixtures...");

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
          const { message, response } = await fetchFixtures();
          console.log("Fetched fixtures message:", message);
          console.log("Fetched fixtures response:", response);

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
            gameIdsThatCanBeClaimed.includes(match.matchId)
          );
          console.log(
            "Ongoing matches that can be claimed:",
            ongoingMatchesThatCanBeClaimed
          );

          const ongoingMatchesThatCannotBeClaimed = response.filter(
            (match: any) => gameIdsThatCannotBeClaimed.includes(match.matchId)
          );
          console.log(
            "Ongoing matches that cannot be claimed:",
            ongoingMatchesThatCannotBeClaimed
          );

          const claimmableOngoingMatchesIds =
            ongoingMatchesThatCanBeClaimed.map((match: any) => match.matchId);
          console.log(
            "Claimmable ongoing match IDs:",
            claimmableOngoingMatchesIds
          );

          const unclaimmableOngoingMatchesIds =
            ongoingMatchesThatCannotBeClaimed.map(
              (match: any) => match.matchId
            );
          console.log(
            "Unclaimmable ongoing match IDs:",
            unclaimmableOngoingMatchesIds
          );

          setClaimmableOngoingMatches(claimmableOngoingMatchesIds);
          setUnclaimmableOngoingMatches(unclaimmableOngoingMatchesIds);
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

          setCompletedMatches(gameIdsWithPredictionsAndClaims);

          const remaining = games.filter(
            (match: any) =>
              !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
              !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
              !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
          );
          console.log("Remaining games:", remaining);

          const remainingCompletedMatchesIds: number[] = [];
          const remainingUpcomingMatchesIds: number[] = [];

          remaining.forEach((match: any) => {
            const matchId = parseInt(match.id, 16);
            const matchDetail = response.find(
              (responseMatch: any) => responseMatch.matchId === matchId
            );

            if (matchDetail) {
              const startDate = new Date(Number(matchDetail.startDate));
              const currentDate = new Date();

              if (startDate > currentDate) {
                remainingUpcomingMatchesIds.push(matchId);
              } else {
                remainingCompletedMatchesIds.push(matchId);
              }
            }
          });

          console.log(
            "Remaining completed match IDs:",
            remainingCompletedMatchesIds
          );
          console.log(
            "Remaining upcoming match IDs:",
            remainingUpcomingMatchesIds
          );

          setCompletedMatches((prevCompletedMatches) => [
            ...prevCompletedMatches,
            ...remainingCompletedMatchesIds,
          ]);
          setLoadingCompleted(false);
          setUpcomingMatches(remainingUpcomingMatchesIds);
          setUpcomingLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    fetchOngoingFixtures();
  }, [address]);

  return (
    <div>
      <h1>Matches</h1>
      {loadingOngoing ? (
        <p>Loading ongoing matches...</p>
      ) : (
        <>
          <h2>Claimable Ongoing Matches</h2>
          <ul>
            {claimmableOngoingMatches.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
          <h2>Unclaimable Ongoing Matches</h2>
          <ul>
            {unclaimmableOngoingMatches.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </>
      )}
      {loadingCompleted ? (
        <p>Loading completed matches...</p>
      ) : (
        <>
          <h2>Completed Matches</h2>
          <ul>
            {completedMatches.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </>
      )}
      {upcomingLoading ? (
        <p>Loading upcoming matches...</p>
      ) : (
        <>
          <h2>Upcoming Matches</h2>
          <ul>
            {upcomingMatches.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default page;
