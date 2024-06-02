import request, { gql } from "graphql-request";

const chainToGraphName: Record<number, string> = {
  2: "ethereum",
  3: "base",
  4: "optimism",
  5: "arbitrum",
};

export const getPredictionStateCrosschain = async ({
  gameId,
  address,
  chain,
}: {
  gameId: string;
  address: string;
  chain: number;
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
      `https://api.studio.thegraph.com/query/30735/luffy-${chainToGraphName[chain]}/version/latest`,
      query,
      { gameId, address }
    );

    console.log("Fetched data:", data);
    return (data as any).predictions[0];
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return false;
  }
};
