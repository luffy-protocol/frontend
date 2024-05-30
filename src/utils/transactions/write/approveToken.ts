import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import { CHAIN_RESOLVERS, DEPLOYMENTS, TOKEN_ADDRESSES } from "../../constants";
import { createPublicClient, erc20Abi, http } from "viem";

interface ApproveTokenParams {
  primaryWallet: Wallet;
  chainId: number;
  token: number;
  amount: string;
}
export default async function approveToken(
  params: ApproveTokenParams
): Promise<{
  success: boolean;
  data: { hash: string; error: any };
}> {
  const { primaryWallet, chainId, token, amount } = params;
  console.log("Approve Token Input Params");
  console.log("Address: " + TOKEN_ADDRESSES[chainId][token - 1]);
  console.log(
    "Args: " + [DEPLOYMENTS[chainId] as `0x${string}`, BigInt(amount)]
  );

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainId].chain,
      transport: http(CHAIN_RESOLVERS[chainId].transport),
    });
    const { request } = await publicClient.simulateContract({
      address: TOKEN_ADDRESSES[chainId][token - 1] as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [DEPLOYMENTS[chainId] as `0x${string}`, BigInt(amount)],
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
