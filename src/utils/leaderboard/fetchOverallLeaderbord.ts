import request, { gql } from "graphql-request";
import { FetchInput, MappedUsers, UserData } from "../interface";

export const fetchOverallLeaderboard = async ({
  mappedUsers,
}: {
  mappedUsers: MappedUsers;
}): Promise<any[]> => {
  try {
    const query = gql`
      query MyQuery {
        predictions {
          claim {
            points
            user {
              address
              totalGamesPlayed
              totalPointsWon
              totalEarnings
              totalSpent
            }
          }
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query
    );
    console.log(data);
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
            points: pred.claim.user.totalPointsWon || 0,
            gamesPlayed: pred.claim.user.totalGamesPlayed || 0,
            netRevenue:
              pred.claim.user.totalEarnings == 0
                ? 0
                : pred.claim.user.totalEarnings - pred.claim.user.totalSpent ||
                  0,
          };
        }
        return {
          name: user.name,
          address: userAddress,
          points: pred.claim.user.totalPointsWon || 0,
          gamesPlayed: pred.claim.user.totalGamesPlayed || 0,
          netRevenue:
            pred.claim.user.totalEarnings == 0
              ? 0
              : pred.claim.user.totalEarnings - pred.claim.user.totalSpent || 0,
        };
      })
      .filter((pred: any) => pred !== null);
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return [];
  }
};
