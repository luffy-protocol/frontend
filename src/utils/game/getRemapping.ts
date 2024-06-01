import request, { gql } from "graphql-request";
import axios from "axios";

export const fetchGameRemapping = async ({
  gameId,
}: {
  gameId: string;
}): Promise<Record<string, number>> => {
  try {
    const query = gql`
      query MyQuery($gameId: String!) {
        games(where: { id: $gameId }) {
          playerIdRemapping
        }
      }
    `;

    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
      query,
      { gameId }
    );

    console.log("Fetched data:", data);
    const remappingUrl = (data as any).games[0].playerIdRemapping;
    if (remappingUrl != null) {
      const remapping = await axios.get(remappingUrl);
      return remapping.data ?? "";
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return {};
  }
};
