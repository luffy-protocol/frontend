import { CHAIN_RESOLVERS } from "@/utils/constants";

export default async function getGasPrice(chainId: number) {
  const publicClient = CHAIN_RESOLVERS[chainId];
  const gasPrice = await publicClient.getGasPrice();
  return gasPrice;
}
