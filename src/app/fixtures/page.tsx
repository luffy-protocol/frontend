// "use client";
// import React, { useEffect, useState } from "react";
// import { request, gql } from "graphql-request";
// import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";

// interface Match {
//   fixture_id: number;
//   startDate: string;
// }

// // const fetchFixtures = async (): Promise<{
// //   message: string;
// //   response: Match[];
// // }> => {
// //   // Implement this function to fetch fixtures
// //   // This is a placeholder implementation
// //   return {
// //     message: "success",
// //     response: [
// //       { fixture_id: 13, startDate: "1683705600000" },
// //       { fixture_id: 1150754, startDate: "1983782000000" },
// //     ],
// //   };
// // };

// const address = "0xd69a4dd0dfb261a8ef37f45925491c077ef1dbfb"; // replace with the actual address

// const page: React.FC = () => {
//   const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
//     number[]
//   >([]);
//   const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
//     number[]
//   >([]);
//   const [completedMatches, setCompletedMatches] = useState<number[]>([]);
//   const [upcomingMatches, setUpcomingMatches] = useState<number[]>([]);
//   const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
//   const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
//   const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchOngoingFixtures() {
//       try {
//         console.log("Fetching ongoing fixtures...");
//         const { message, response } = await fetchFixtures();
//         const data = await request(
//           "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
//           gql`
//             query MyQuery {
//               games {
//                 id
//                 resultsPublishedTime
//                 predictions(
//                   where: {
//                     user_: {
//                       address: "${address}"
//                     }
//                   }
//                 ) {
//                   claim {
//                     game {
//                       id
//                     }
//                   }
//                 }
//               }
//             }
//           `
//         );

//         console.log("Fetched data:", data);

//         if (data != null) {
//           const { message, response } = await fetchFixtures();
//           console.log("Fetched fixtures message:", message);
//           console.log("Fetched fixtures response:", response);

//           const games = data.games;
//           console.log("Games:", games);

//           const gameIdsWithPredictionsAndNullClaims = games.filter(
//             (game: any) =>
//               game.predictions.length > 0 &&
//               game.predictions.some(
//                 (prediction: any) => prediction.claim === null
//               )
//           );
//           console.log(
//             "Games with predictions and null claims:",
//             gameIdsWithPredictionsAndNullClaims
//           );

//           const gameIdsThatCanBeClaimed = gameIdsWithPredictionsAndNullClaims
//             .filter((game: any) => game.resultsPublishedTime != null)
//             .map((game: any) => parseInt(game.id, 16));
//           console.log("Game IDs that can be claimed:", gameIdsThatCanBeClaimed);

//           const gameIdsThatCannotBeClaimed = gameIdsWithPredictionsAndNullClaims
//             .filter((game: any) => game.resultsPublishedTime == null)
//             .map((game: any) => parseInt(game.id, 16));
//           console.log(
//             "Game IDs that cannot be claimed:",
//             gameIdsThatCannotBeClaimed
//           );

//           const ongoingMatchesThatCanBeClaimed = response.filter((match: any) =>
//             gameIdsThatCanBeClaimed.includes(match.fixture_id)
//           );
//           console.log(
//             "Ongoing matches that can be claimed:",
//             ongoingMatchesThatCanBeClaimed
//           );

//           const ongoingMatchesThatCannotBeClaimed = response.filter(
//             (match: any) =>
//               gameIdsThatCannotBeClaimed.includes(match.fixture_id)
//           );
//           console.log(
//             "Ongoing matches that cannot be claimed:",
//             ongoingMatchesThatCannotBeClaimed
//           );

//           const claimmableOngoingMatchesIds =
//             ongoingMatchesThatCanBeClaimed.map(
//               (match: any) => match.fixture_id
//             );
//           console.log(
//             "Claimmable ongoing match IDs:",
//             claimmableOngoingMatchesIds
//           );

//           const unclaimmableOngoingMatchesIds =
//             ongoingMatchesThatCannotBeClaimed.map(
//               (match: any) => match.fixture_id
//             );
//           console.log(
//             "Unclaimmable ongoing match IDs:",
//             unclaimmableOngoingMatchesIds
//           );

//           setClaimmableOngoingMatches(claimmableOngoingMatchesIds);
//           setUnclaimmableOngoingMatches(unclaimmableOngoingMatchesIds);
//           setLoadingOngoing(false);

//           const gameIdsWithPredictionsAndClaims = games
//             .filter(
//               (game: any) =>
//                 game.predictions.length > 0 &&
//                 game.predictions.some(
//                   (prediction: any) => prediction.claim !== null
//                 )
//             )
//             .map((game: any) => parseInt(game.id, 16));
//           console.log(
//             "Game IDs with predictions and claims:",
//             gameIdsWithPredictionsAndClaims
//           );

//           setCompletedMatches(gameIdsWithPredictionsAndClaims);

//           const remaining = games.filter(
//             (match: any) =>
//               !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
//               !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
//               !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
//           );
//           console.log("Remaining games:", remaining);

//           const remainingCompletedMatchesIds: number[] = [];
//           const remainingUpcomingMatchesIds: number[] = [];

//           remaining.forEach((match: any) => {
//             const fixture_id = parseInt(match.id, 16);
//             const matchDetail = response.find(
//               (responseMatch: any) => responseMatch.fixture_id === fixture_id
//             );

//             if (matchDetail) {
//               const startDate = new Date(Number(matchDetail.startDate));
//               const currentDate = new Date();

//               if (startDate > currentDate) {
//                 remainingUpcomingMatchesIds.push(fixture_id);
//               } else {
//                 remainingCompletedMatchesIds.push(fixture_id);
//               }
//             }
//           });

//           console.log(
//             "Remaining completed match IDs:",
//             remainingCompletedMatchesIds
//           );
//           console.log(
//             "Remaining upcoming match IDs:",
//             remainingUpcomingMatchesIds
//           );

//           setCompletedMatches((prevCompletedMatches) => [
//             ...prevCompletedMatches,
//             ...remainingCompletedMatchesIds,
//           ]);
//           setLoadingCompleted(false);
//           setUpcomingMatches(remainingUpcomingMatchesIds);
//           setUpcomingLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching ongoing fixtures:", error);
//       }
//     }

//     fetchOngoingFixtures();
//   }, [address]);

//   return (
//     <div>
//       <h1>Matches</h1>
//       {loadingOngoing ? (
//         <p>Loading ongoing matches...</p>
//       ) : (
//         <>
//           <h2>Claimable Ongoing Matches</h2>
//           <ul>
//             {claimmableOngoingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//           <h2>Unclaimable Ongoing Matches</h2>
//           <ul>
//             {unclaimmableOngoingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//       {loadingCompleted ? (
//         <p>Loading completed matches...</p>
//       ) : (
//         <>
//           <h2>Completed Matches</h2>
//           <ul>
//             {completedMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//       {upcomingLoading ? (
//         <p>Loading upcoming matches...</p>
//       ) : (
//         <>
//           <h2>Upcoming Matches</h2>
//           <ul>
//             {upcomingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default page;
// "use client";
// import React, { useEffect, useState } from "react";
// import { request, gql } from "graphql-request";
// import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";

// interface Match {
//   fixture_id: number;
//   starttime: string;
// }

// const address = "0x4b4b30e2E7c6463b03CdFFD6c42329D357205334"; // replace with the actual address

// const Page: React.FC = () => {
//   const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
//     number[]
//   >([]);
//   const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
//     number[]
//   >([]);
//   const [completedMatches, setCompletedMatches] = useState<number[]>([]);
//   const [upcomingMatches, setUpcomingMatches] = useState<number[]>([]);
//   const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
//   const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
//   const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchOngoingFixtures() {
//       try {
//         console.log("Fetching ongoing fixtures...");
//         const { message, response } = await fetchFixtures();
//         console.log("Fetched fixtures message:", message);
//         console.log("Fetched fixtures response:", response);

//         const data = await request(
//           "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
//           gql`
//             query MyQuery {
//               games {
//                 id
//                 resultsPublishedTime
//                 predictions(
//                   where: {
//                     user_: {
//                       address: "${address}"
//                     }
//                   }
//                 ) {
//                   claim {
//                     game {
//                       id
//                     }
//                   }
//                 }
//               }
//             }
//           `
//         );

//         console.log("Fetched data:", data);

//         if (data != null) {
//           const games = data.games;
//           console.log("Games:", games);

//           const gameIdsWithPredictionsAndNullClaims = games.filter(
//             (game: any) =>
//               game.predictions.length > 0 &&
//               game.predictions.some(
//                 (prediction: any) => prediction.claim === null
//               )
//           );
//           console.log(
//             "Games with predictions and null claims:",
//             gameIdsWithPredictionsAndNullClaims
//           );

//           const gameIdsThatCanBeClaimed = gameIdsWithPredictionsAndNullClaims
//             .filter((game: any) => game.resultsPublishedTime != null)
//             .map((game: any) => parseInt(game.id, 16));
//           console.log("Game IDs that can be claimed:", gameIdsThatCanBeClaimed);

//           const gameIdsThatCannotBeClaimed = gameIdsWithPredictionsAndNullClaims
//             .filter((game: any) => game.resultsPublishedTime == null)
//             .map((game: any) => parseInt(game.id, 16));
//           console.log(
//             "Game IDs that cannot be claimed:",
//             gameIdsThatCannotBeClaimed
//           );

//           const ongoingMatchesThatCanBeClaimed = response.filter((match: any) =>
//             gameIdsThatCanBeClaimed.includes(match.fixture_id)
//           );
//           console.log(
//             "Ongoing matches that can be claimed:",
//             ongoingMatchesThatCanBeClaimed
//           );

//           const ongoingMatchesThatCannotBeClaimed = response.filter(
//             (match: any) =>
//               gameIdsThatCannotBeClaimed.includes(match.fixture_id)
//           );
//           console.log(
//             "Ongoing matches that cannot be claimed:",
//             ongoingMatchesThatCannotBeClaimed
//           );

//           const claimmableOngoingMatchesIds =
//             ongoingMatchesThatCanBeClaimed.map(
//               (match: any) => match.fixture_id
//             );
//           console.log(
//             "Claimmable ongoing match IDs:",
//             claimmableOngoingMatchesIds
//           );

//           const unclaimmableOngoingMatchesIds =
//             ongoingMatchesThatCannotBeClaimed.map(
//               (match: any) => match.fixture_id
//             );
//           console.log(
//             "Unclaimmable ongoing match IDs:",
//             unclaimmableOngoingMatchesIds
//           );

//           setClaimmableOngoingMatches(claimmableOngoingMatchesIds);
//           setUnclaimmableOngoingMatches(unclaimmableOngoingMatchesIds);
//           setLoadingOngoing(false);

//           const gameIdsWithPredictionsAndClaims = games
//             .filter(
//               (game: any) =>
//                 game.predictions.length > 0 &&
//                 game.predictions.some(
//                   (prediction: any) => prediction.claim !== null
//                 )
//             )
//             .map((game: any) => parseInt(game.id, 16));
//           console.log(
//             "Game IDs with predictions and claims:",
//             gameIdsWithPredictionsAndClaims
//           );

//           setCompletedMatches(gameIdsWithPredictionsAndClaims);

//           const remaining = games.filter(
//             (match: any) =>
//               !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
//               !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
//               !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
//           );
//           console.log("Remaining games:", remaining);

//           const remainingCompletedMatchesIds: number[] = [];
//           const remainingUpcomingMatchesIds: number[] = [];

//           remaining.forEach((match: any) => {
//             const fixture_id = parseInt(match.id, 16);
//             const matchDetail = response.find(
//               (responseMatch: any) => responseMatch.fixture_id === fixture_id
//             );

//             if (matchDetail) {
//               const startDate = new Date(Number(matchDetail.starttime) * 1000);
//               const currentDate = new Date();

//               if (startDate > currentDate) {
//                 remainingUpcomingMatchesIds.push(fixture_id);
//               } else {
//                 remainingCompletedMatchesIds.push(fixture_id);
//               }
//             }
//           });

//           console.log(
//             "Remaining completed match IDs:",
//             remainingCompletedMatchesIds
//           );
//           console.log(
//             "Remaining upcoming match IDs:",
//             remainingUpcomingMatchesIds
//           );

//           setCompletedMatches((prevCompletedMatches) => [
//             ...prevCompletedMatches,
//             ...remainingCompletedMatchesIds,
//           ]);
//           setLoadingCompleted(false);
//           setUpcomingMatches(remainingUpcomingMatchesIds);
//           setUpcomingLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching ongoing fixtures:", error);
//       }
//     }

//     fetchOngoingFixtures();
//   }, [address]);

//   return (
//     <div>
//       <h1>Matches</h1>
//       {loadingOngoing ? (
//         <p>Loading ongoing matches...</p>
//       ) : (
//         <>
//           <h2>Claimable Ongoing Matches</h2>
//           <ul>
//             {claimmableOngoingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//           <h2>Unclaimable Ongoing Matches</h2>
//           <ul>
//             {unclaimmableOngoingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//       {loadingCompleted ? (
//         <p>Loading completed matches...</p>
//       ) : (
//         <>
//           <h2>Completed Matches</h2>
//           <ul>
//             {completedMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//       {upcomingLoading ? (
//         <p>Loading upcoming matches...</p>
//       ) : (
//         <>
//           <h2>Upcoming Matches</h2>
//           <ul>
//             {upcomingMatches.map((id) => (
//               <li key={id}>{id}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";

interface MatchDetails {
  away_id: number;
  away_name: string;
  date: string;
  fixture_id: number;
  home_id: number;
  home_name: string;
  id: number;
  starttime: string;
  venue: string;
}

const address = "0xd69a4dd0dfb261a8ef37f45925491c077ef1dbfb"; // replace with the actual address

const Page: React.FC = () => {
  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<MatchDetails[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchDetails[]>([]);
  const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
  const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOngoingFixtures() {
      try {
        console.log("Fetching ongoing fixtures...");
        const { message, response } = await fetchFixtures();
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

          setClaimmableOngoingMatches(ongoingMatchesThatCanBeClaimed);
          setUnclaimmableOngoingMatches(ongoingMatchesThatCannotBeClaimed);
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
    <div>
      <h1>Matches</h1>
      {loadingOngoing ? (
        <p>Loading ongoing matches...</p>
      ) : (
        <>
          <h2>Claimable Ongoing Matches</h2>
          <ul>
            {claimmableOngoingMatches.map((match) => (
              <li key={match.fixture_id}>
                {match.home_name} vs {match.away_name} at {match.venue} on{" "}
                {match.date}
              </li>
            ))}
          </ul>
          <h2>Unclaimable Ongoing Matches</h2>
          <ul>
            {unclaimmableOngoingMatches.map((match) => (
              <li key={match.fixture_id}>
                {match.home_name} vs {match.away_name} at {match.venue} on{" "}
                {match.date}
              </li>
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
            {completedMatches.map((match) => (
              <li key={match.fixture_id}>
                {match.home_name} vs {match.away_name} at {match.venue} on{" "}
                {match.date}
              </li>
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
            {upcomingMatches.map((match) => (
              <li key={match.fixture_id}>
                {match.home_name} vs {match.away_name} at {match.venue} on{" "}
                {match.date}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Page;
