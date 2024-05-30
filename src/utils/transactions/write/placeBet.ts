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
} from "../../constants";
import { createPublicClient, http } from "viem";
interface PlaceBetParams {
  primaryWallet: Wallet;
  chainId: number;
  gameId: number;
  squadHash: string;
  tokenAmount: string;
  value: string;
  token: number;
  captain: number;
  viceCaptain: number;
}
export default async function placeBet(params: PlaceBetParams): Promise<{
  success: boolean;
  data: { hash: string; error: any };
}> {
  const {
    primaryWallet,
    chainId,
    gameId,
    squadHash,
    value,
    token,
    tokenAmount,
    captain,
    viceCaptain,
  } = params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainId].chain,
      transport: http(CHAIN_RESOLVERS[chainId].transport),
    });
    const { request } = await publicClient.simulateContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi:
        chainId == 43113
          ? PROTOCOL_ABI
          : chainId == 11155111 || chainId == 421614
          ? CROSSCHAIN_ABI
          : CROSSCHAIN_NO_VRF_ABI,
      functionName: "makeSquadAndPlaceBet",
      value: BigInt(value),
      args: [
        gameId.toString(),
        squadHash,
        tokenAmount,
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
        error: "",
      },
    };
  } catch (e) {
    return {
      success: false,
      data: {
        error: e,
        hash: "",
      },
    };
  }
}
