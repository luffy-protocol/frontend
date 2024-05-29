import { CHAIN_RESOLVERS, chainToChainIds } from "@/utils/constants";
import { createPublicClient, http } from "viem";

export default async function getGasPrice(
  chain: number,
  setGasPrice: (gasPrice: string) => void
) {
  const chainId = chainToChainIds[chain];
  const publicClient = createPublicClient({
    chain: CHAIN_RESOLVERS[chainId].chain,
    transport: http(CHAIN_RESOLVERS[chainId].transport),
  });
  const gasPrice = await publicClient.getGasPrice();
  console.log(gasPrice);
  setGasPrice(gasPrice.toString());
}
