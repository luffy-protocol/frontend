import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import {
  CHAIN_RESOLVERS,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
  PROTOCOL_ABI,
  TOKEN_ADDRESSES,
} from "../constants";
import { createPublicClient, erc20Abi } from "viem";
interface PlaceBetParams {
  primaryWallet: Wallet;
  chainId: number;
  gameId: number;
  squadHash: string;
  amountInWei: string;
  token: number;
  captain: number;
  viceCaptain: number;
}
export default async function placeBet(params: PlaceBetParams) {
  const {
    primaryWallet,
    chainId,
    gameId,
    squadHash,
    token,
    amountInWei,
    captain,
    viceCaptain,
  } = params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = createPublicClient(CHAIN_RESOLVERS[chainId] as any);
    const { request } = await publicClient.simulateContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi:
        chainId == 43113
          ? PROTOCOL_ABI
          : chainId == 11155111 || chainId == 421614
          ? CROSSCHAIN_ABI
          : CROSSCHAIN_NO_VRF_ABI,
      functionName: "makeSquadAndPlaceBet",
      args: [
        gameId.toString(),
        squadHash,
        amountInWei,
        token,
        captain,
        viceCaptain,
      ],
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
