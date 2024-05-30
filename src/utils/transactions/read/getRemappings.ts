import { CHAIN_RESOLVERS, DEPLOYMENTS, PROTOCOL_ABI } from "@/utils/constants";
import { createPublicClient, http } from "viem";

interface GetRemappingParams {
  gameId: string;
  gameweek: string;
}

export default async function getGameRemapping(params: GetRemappingParams) {
  try {
    const { gameweek, gameId } = params;
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[43113].chain,
      transport: http(CHAIN_RESOLVERS[43113].transport),
    });
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[43113] as `0x${string}`,
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
