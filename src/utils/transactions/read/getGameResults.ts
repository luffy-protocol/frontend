import { CHAIN_RESOLVERS, DEPLOYMENTS, PROTOCOL_ABI } from "@/utils/constants";

interface GetGameResultsParams {
  gameId: string;
}

export default async function getGameResults(params: GetGameResultsParams) {
  try {
    const { gameId } = params;
    const publicClient = CHAIN_RESOLVERS[43113];
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[43113],
      abi: PROTOCOL_ABI,
      functionName: "results",
      args: [gameId],
    });
    console.log(data);
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
