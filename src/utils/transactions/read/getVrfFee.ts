import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
  PROTOCOL_ABI,
} from "@/utils/constants";
import { createPublicClient, http } from "viem";

interface GetVrfFeeParams {
  chainId: number;
  gasPriceInWei: string;
}

export default async function getVrfFee(
  params: GetVrfFeeParams
): Promise<{ success: boolean; data: bigint; error?: any }> {
  try {
    const { chainId, gasPriceInWei } = params;
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainId].chain,
      transport: http(CHAIN_RESOLVERS[chainId].transport),
    });

    const data = await publicClient.readContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi:
        chainId == 43113
          ? PROTOCOL_ABI
          : chainId == 11155111 || chainId == 421614
          ? CROSSCHAIN_ABI
          : CROSSCHAIN_NO_VRF_ABI,
      functionName: "getRandomnessPriceInNative",
      args: [gasPriceInWei],
    });
    console.log(data);
    return {
      success: true,
      data: data == undefined ? BigInt(0) : (data as bigint),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      data: BigInt(0),
    };
  }
}
