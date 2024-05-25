import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
  PROTOCOL_ABI,
} from "@/utils/constants";

interface GetVrfFeeParams {
  chainId: number;
  gasPriceInWei: string;
}

export default async function getVrfFee(params: GetVrfFeeParams) {
  try {
    const { chainId, gasPriceInWei } = params;
    const publicClient = CHAIN_RESOLVERS[chainId];

    // TODO: Directly call getGas price and pass it here
    const data = await publicClient.readContract({
      address: DEPLOYMENTS[chainId],
      abi:
        chainId == 43113
          ? PROTOCOL_ABI
          : chainId == 11155111 || chainId == 421614
          ? CROSSCHAIN_ABI
          : CROSSCHAIN_NO_VRF_ABI,
      functionName: "getCrosschainFee",
      args: [gasPriceInWei],
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
