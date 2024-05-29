import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
} from "@/utils/constants";
import { createPublicClient, http } from "viem";

interface GetCrosschainFeeParams {
  chainId: number;
  gameId: string;
  squadHash: string;
  token: number;
  captain: number;
  viceCaptain: number;
  isRandom: boolean;
}

export default async function getCrosschainFee(
  params: GetCrosschainFeeParams
): Promise<{ success: boolean; data: bigint; error?: any }> {
  try {
    const {
      chainId,
      gameId,
      squadHash,
      token,
      captain,
      viceCaptain,
      isRandom,
    } = params;
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainId].chain,
      transport: http(CHAIN_RESOLVERS[chainId].transport),
    });
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi:
        chainId == 11155111 || chainId == 421614
          ? CROSSCHAIN_ABI
          : CROSSCHAIN_NO_VRF_ABI,
      functionName: "getCrosschainFee",
      args: [gameId, squadHash, token, captain, viceCaptain, isRandom],
    });
    console.log(data);
    return {
      success: true,
      data: data != undefined ? (data as bigint) : BigInt(0),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      data: BigInt(0),
    };
  }
}
