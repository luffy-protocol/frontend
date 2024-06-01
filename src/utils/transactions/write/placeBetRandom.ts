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
import { createPublicClient, http } from "viem";
interface PlaceBetRandomParams {
  primaryWallet: Wallet;
  chainId: number;
  gameId: number;
  squadHash: string;
  betAmount: string;
  value: string;
  token: number;
}
export default async function placeBetRandom(
  params: PlaceBetRandomParams
): Promise<{
  success: boolean;
  data: { hash: string; error: any };
}> {
  const { primaryWallet, chainId, gameId, squadHash, token, betAmount, value } =
    params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);

    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainId].chain,
      transport: http(CHAIN_RESOLVERS[chainId].transport),
    });

    console.log("Address " + DEPLOYMENTS[chainId]);
    console.log("Args " + [gameId.toString(), squadHash, betAmount, token]);
    console.log("Value " + BigInt(value));
    const { request } = await publicClient.simulateContract({
      address: DEPLOYMENTS[chainId] as `0x${string}`,
      abi: chainId == 43113 ? PROTOCOL_ABI : CROSSCHAIN_ABI,
      functionName: "makeSquadAndPlaceBetRandom",
      value: BigInt(value),
      gas: BigInt("300000"),
      args: [gameId.toString(), squadHash, betAmount, token],
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
    console.log("ERrro");
    console.log(e);
    return {
      success: false,
      data: {
        error: e,
        hash: "",
      },
    };
  }
}
