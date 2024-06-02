import request, { gql } from "graphql-request";
import axios from "axios";

export const getPredictionState = async ({
  gameId,
  address,
}: {
  gameId: string;
  address: string;
}): Promise<any> => {
  try {
    const query = gql`
      query MyQuery($address: String!, $gameId: String!) {
        predictions(where: { user: $address, game: $gameId }) {
          id
          transactionHash
          captain
          viceCaptain
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { gameId, address }
    );

    return (data as any).predictions[0];
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return false;
  }
};
