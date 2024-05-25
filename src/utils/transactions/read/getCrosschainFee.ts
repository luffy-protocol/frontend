import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
} from "@/utils/constants";

interface GetCrosschainFeeParams {
  chainId: number;
  gameId: string;
  squadHash: string;
  token: number;
  captain: number;
  viceCaptain: number;
  isRandom: boolean;
}

export default async function getCrosschainFee(params: GetCrosschainFeeParams) {
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
    const publicClient = CHAIN_RESOLVERS[chainId];
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[chainId],
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
      data: data.toString(),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
