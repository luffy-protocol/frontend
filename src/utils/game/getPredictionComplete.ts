import request, { gql } from "graphql-request";
import axios from "axios";

export const getPredictionComplete = async ({
  gameId,
  address,
}: {
  gameId: string;
  address: string;
}): Promise<boolean> => {
  try {
    const query = gql`
      query MyQuery($address: String!, $gameId: String!) {
        predictions(where: { user: $address, game: $gameId }) {
          id
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { gameId, address }
    );

    console.log("Fetched data:", data);
    return (data as any).predictions.length > 0;
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return false;
  }
};
