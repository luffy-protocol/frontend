import {
  Wallet,
  createWalletClientFromWallet,
} from "@dynamic-labs/sdk-react-core";
import { CHAIN_RESOLVERS, DEPLOYMENTS, TOKEN_ADDRESSES } from "../../constants";
import { createPublicClient, erc20Abi } from "viem";

interface ApproveTokenParams {
  primaryWallet: Wallet;
  chainId: number;
  token: number;
  amount: bigint;
}
export default async function approveToken(params: ApproveTokenParams) {
  const { primaryWallet, chainId, token, amount } = params;

  try {
    const walletClient = await createWalletClientFromWallet(primaryWallet);
    const publicClient = CHAIN_RESOLVERS[chainId];
    const { request } = await publicClient.simulateContract({
      address: TOKEN_ADDRESSES[chainId][token] as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [DEPLOYMENTS[chainId] as `0x${string}`, amount],
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
