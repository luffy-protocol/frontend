import { createPublicClient, http } from "viem";
import { formatUnits } from "viem/utils";
import { erc20Abi } from "viem";
import {
  TOKEN_ADDRESSES,
  CHAIN_RESOLVERS,
  chainToChainIds,
} from "@/utils/constants";

// Function to get the token balance
export async function getTokenBalance(
  chainId: number,
  tokenId: number,
  address: `0x${string}`
) {
  const chainResolver = CHAIN_RESOLVERS[chainToChainIds[chainId]];
  if (!chainResolver) {
    throw new Error(`Unsupported chain ID: ${chainToChainIds[chainId]}`);
  }

  const client = createPublicClient({
    chain: chainResolver.chain,
    transport: http(chainResolver.transport),
  });

  if (
    !TOKEN_ADDRESSES[chainToChainIds[chainId]] ||
    !TOKEN_ADDRESSES[chainToChainIds[chainId]][tokenId]
  ) {
    throw new Error(
      `Token ID ${tokenId} not found for chain ID ${chainToChainIds[chainId]}`
    );
  }

  const tokenAddress = TOKEN_ADDRESSES[chainToChainIds[chainId]][tokenId];

  try {
    const [balance, decimals, symbol] = await Promise.all([
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      }),
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      }),
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      }),
    ]);

    // Format the balance
    const formattedBalance = formatUnits(balance, decimals);

    console.log(
      `Balance of ${symbol} (${tokenAddress}) for address ${address}: ${formattedBalance}`
    );
    return formattedBalance;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}
