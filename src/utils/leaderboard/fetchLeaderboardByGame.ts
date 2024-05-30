import request, { gql } from "graphql-request";
import { FetchInput, UserData } from "../interface";

export const fetchLeaderboardByGame = async ({
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
