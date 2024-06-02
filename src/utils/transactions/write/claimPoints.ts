import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import {
  CHAIN_RESOLVERS,
  DEPLOYMENTS,
  PROTOCOL_ABI,
  TOKEN_ADDRESSES,
} from "../../constants";
import { createPublicClient, http } from "viem";
import formatPlayerIds from "../helpers/formatPlayerIds";

interface ClaimPointsParams {
  primaryWallet: Wallet;
  proof: string;
  gameId: string;
  playerIds: number[];
  totalPoints: number;
}
export default async function claimPoints(
  params: ClaimPointsParams
): Promise<{ success: boolean; data: any; error: any }> {
  const { primaryWallet, proof, gameId, playerIds, totalPoints } = params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[43113].chain,
      transport: http(CHAIN_RESOLVERS[43113].transport),
    });

    console.log("ARGS");
    console.log([
      gameId,
      formatPlayerIds(playerIds),
      totalPoints.toString(),
      proof,
    ]);
    const { request } = await publicClient.simulateContract({
      address: DEPLOYMENTS[43113] as `0x${string}`,
      abi: PROTOCOL_ABI,
      functionName: "claimPoints",
      args: [
        gameId,
        formatPlayerIds(playerIds),
        totalPoints.toString(),
        "0x" + proof,
      ],
      account: primaryWallet.address as `0x${string}`,
    });
    const tx = await walletClient.writeContract(request);
    return {
      success: true,
      data: tx,
      error: "",
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      data: "",
    };
  }
}
