import { CHAIN_RESOLVERS, DEPLOYMENTS, PROTOCOL_ABI } from "@/utils/constants";

interface GetRemappingParams {
  gameId: string;
  gameweek: string;
}

export default async function getGameRemapping(params: GetRemappingParams) {
  try {
    const { gameweek, gameId } = params;
    const publicClient = CHAIN_RESOLVERS[43113];
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[43113],
      abi: PROTOCOL_ABI,
      functionName: "games",
      args: [gameweek],
    });
    console.log(data);
    // TODO: Get gameId data
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
