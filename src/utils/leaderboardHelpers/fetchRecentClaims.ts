import request, { gql } from "graphql-request";
import { ClaimRow, FetchInput } from "../interface";

export const fetchAllClaims = async ({
  gameId,
  mappedUsers,
}: FetchInput): Promise<ClaimRow[]> => {
  try {
    const query = gql`
      query MyQuery($gameId: String!) {
        claims(
          where: { game: $gameId }
          first: 10
          orderDirection: desc
          orderBy: id
        ) {
          user {
            address
          }
          points
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { gameId }
    );

    console.log("Fetched data:", data);
    return (data as any).claims
      .map((claim: any) => {
        const userAddress = claim.user.address.toLowerCase();
        const user = mappedUsers[userAddress];
        if (!user) {
          return {
            name: "Unknown",
            address: userAddress,
            points: claim.points || 0,
            time: "5 mins ago",
          };
        }
        return {
          name: user.name,
          address: userAddress,
          points: claim.points || 0,
          time: "5 mins ago",
        };
      })
      .filter((claim: any) => claim !== null);
  } catch (error) {
    console.error("Error fetching  recent claims:", error);
    return [];
  }
};
