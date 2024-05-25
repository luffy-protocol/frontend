import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  DEPLOYMENTS,
  PROTOCOL_ABI,
} from "../../constants";
import { createPublicClient } from "viem";
interface PlaceBetRandomParams {
  primaryWallet: Wallet;
  chainId: number;
  gameId: number;
  squadHash: string;
  tokenAmount: string;
  value: string;
  token: number;
}
export default async function placeBetRandom(params: PlaceBetRandomParams) {
  const {
    primaryWallet,
    chainId,
    gameId,
    squadHash,
    token,
    tokenAmount,
    value,
  } = params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = CHAIN_RESOLVERS[chainId];
    const { request } = await publicClient.simulateContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi: chainId == 43113 ? PROTOCOL_ABI : CROSSCHAIN_ABI,
      functionName: "makeSquadAndPlaceBetRandom",
      value: BigInt(value),
      args: [gameId.toString(), squadHash, tokenAmount, token],
      account: primaryWallet.address as `0x${string}`,
    });
    const tx = await walletClient.writeContract(request);
    return {
      success: true,
      data: {
        hash: tx,
      },
    };
  } catch (e) {
    return {
      success: false,
      data: {
        error: e,
      },
    };
  }
}
