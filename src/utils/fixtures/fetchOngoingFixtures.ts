import request, { gql } from "graphql-request";
import fetchFixtureByRound from "./fetchFixturesByRound";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MatchDetails } from "../interface";

interface fetchOngoingFixturesProps {
  address: string;
  round: string;
  setClaimmableOngoingMatches: (matches: any) => void;
  setUnclaimmableOngoingMatches: (matches: any) => void;
  setCompletedMatches: (matches: any) => void;
  setUpcomingMatches: (matches: any) => void;
  setExpiredMatches: (matches: any) => void;
  setLoadingOngoing: (loading: boolean) => void;
  setLoadingCompleted: (loading: boolean) => void;
  setUpcomingLoading: (loading: boolean) => void;
}

export default async function fetchOngoingFixtures({
  round,
  address,
  setClaimmableOngoingMatches,
  setUnclaimmableOngoingMatches,
  setCompletedMatches,
  setExpiredMatches,
  setLoadingOngoing,
  setLoadingCompleted,
  setUpcomingLoading,
  setUpcomingMatches,
}: fetchOngoingFixturesProps) {
  try {
    console.log("Fetching ongoing fixtures...");
    // const { message, response } = await fetchFixtures();
    const { message, response } = await fetchFixtureByRound(Number(round));

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
        game.predictions.some((prediction: any) => prediction.claim === null)
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
    console.log("Game IDs that cannot be claimed:", gameIdsThatCannotBeClaimed);

    const ongoingMatchesThatCanBeClaimed = response.filter((match: any) =>
      gameIdsThatCanBeClaimed.includes(match.fixture_id)
    );
    console.log(
      "Ongoing matches that can be claimed:",
      ongoingMatchesThatCanBeClaimed
    );

    const ongoingMatchesThatCannotBeClaimed = response.filter((match: any) =>
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
    setLoadingOngoing(false);

    const gameIdsWithPredictionsAndClaims = games
      .filter(
        (game: any) =>
          game.predictions.length > 0 &&
          game.predictions.some((prediction: any) => prediction.claim !== null)
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

        // if (startDate > currentDate) {
        //   remainingUpcomingMatchesDetails.push(matchDetail);
        // } else {
        //   remainingCompletedMatchesDetails.push(matchDetail);
        // }
        remainingUpcomingMatchesDetails.push(matchDetail);
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

    setCompletedMatches((prevCompletedMatches: any) => [
      ...prevCompletedMatches,
      ...remainingCompletedMatchesDetails,
    ]);
    setLoadingCompleted(false);
    setUpcomingMatches(remainingUpcomingMatchesDetails);
    setUpcomingLoading(false);
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
  }
}
