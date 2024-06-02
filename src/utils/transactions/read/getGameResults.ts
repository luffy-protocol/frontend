import { CHAIN_RESOLVERS, DEPLOYMENTS, PROTOCOL_ABI } from "@/utils/constants";
import { createPublicClient, http } from "viem";

interface GetGameResultsParams {
  gameId: string;
}

export default async function getGameResults(params: GetGameResultsParams):Promise<{ success: boolean; data?: any; error?: any }>{
  try {
    const { gameId } = params;
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[43113].chain,
      transport: http(CHAIN_RESOLVERS[43113].transport),
    });
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[43113] as `0x${string}`,
      abi: PROTOCOL_ABI,
      functionName: "results",
      args: [gameId],
    });
    console.log(data);
    return {
      success: true,
      data: data,
      error:""
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      data:[]
    };
  }
}
