import request, { gql } from "graphql-request";

export const getProfileData = async (address: string) => {
  const data = await request(
    "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
    gql`
      query MyQuery {
        user(id: "${address}") {
          totalPointsWon
          totalGamesPlayed
          totalGamesClaimed
          totalClaimmables
          totalEarnings
          totalSpent
          rewards {
            amount
          }
        }
      }
    `
  );
  return data;
};
