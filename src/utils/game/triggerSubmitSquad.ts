import { Wallet } from "@dynamic-labs/sdk-react-core";
import { CHAIN_RESOLVERS, chainToChainIds } from "../constants";
import approveToken from "../transactions/write/approveToken";
import placeBet from "../transactions/write/placeBet";
import placeBetRandom from "../transactions/write/placeBetRandom";
import { createPublicClient, http } from "viem";
import { Dispatch, SetStateAction } from "react";
interface TriggerSubmitSquadProps {
  gameId: number;
  chain: number;
  token: number;
  totalValue: string;
  tokenAmount: string;
  isRandom: boolean;
  captain: number;
  viceCaptain: number;
  squadHash: string;
  primaryWallet: Wallet;
  setTxHashes: Dispatch<SetStateAction<string[]>>;
  setTxConfirmations: Dispatch<SetStateAction<boolean[]>>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function triggerSubmitSquad({
  gameId,
  primaryWallet,
  chain,
  token,
  tokenAmount,
  totalValue,
  isRandom,
  viceCaptain,
  captain,
  squadHash,
  setTxHashes,
  setTxConfirmations,
}: TriggerSubmitSquadProps): Promise<{ success: boolean; error: string }> {
  const sourcePublicClient = createPublicClient({
    chain: CHAIN_RESOLVERS[chainToChainIds[chain]].chain,
    transport: http(CHAIN_RESOLVERS[chainToChainIds[chain]].transport),
  });

  if (token != 1) {
    // Approve Tokens
    const { success, data } = await approveToken({
      primaryWallet: primaryWallet,
      chainId: chainToChainIds[chain],
      token: token,
      amount: tokenAmount,
    });

    if (success) {
      setTxHashes((txHashes) => {
        txHashes.push(data.hash);
        return txHashes;
      });
      const txReceipt = await sourcePublicClient.waitForTransactionReceipt({
        hash: data.hash as `0x${string}`,
      });
      console.log("Approve Tokens Receipt");
      console.log(txReceipt);
      if (txReceipt.status == "reverted") {
        return {
          success: false,
          error: data.error,
        };
      }
      setTxConfirmations((confirmations) => {
        confirmations.push(true);
        return confirmations;
      });
      // TODO: If not approved 100000, throw error
    } else
      return {
        success: false,
        error: data.error,
      };
  }
  let unwatchBetPlaced;
  if (isRandom) {
    const { success, data } = await placeBetRandom({
      primaryWallet,
      chainId: chainToChainIds[chain],
      gameId,
      squadHash,
      value: totalValue,
      token: token - 1,
      tokenAmount: tokenAmount,
    });
    if (success) {
      setTxHashes((txHashes) => {
        txHashes.push(data.hash);
        return txHashes;
      });
      const txReceipt = await sourcePublicClient.waitForTransactionReceipt({
        hash: data.hash as `0x${string}`,
      });
      console.log("Place Bet Random Receipt");
      console.log(txReceipt);
      if (txReceipt.status == "reverted") {
        return {
          success: false,
          error: data.error,
        };
      }
      setTxConfirmations((txConfirmations) => {
        txConfirmations.push(true);
        return txConfirmations;
      });
      console.log("Waiting fot delay");
      await delay(8000);
      setTxHashes((txHashes) => {
        txHashes.push(data.hash);
        return txHashes;
      });
      setTxConfirmations((txConfirmations) => {
        txConfirmations.push(true);
        return txConfirmations;
      });
      console.log("ALl Steps completed");
    } else
      return {
        success: false,
        error: data.error,
      };
  } else {
    const { success, data } = await placeBet({
      primaryWallet,
      chainId: chainToChainIds[chain],
      gameId,
      squadHash,
      value: totalValue,
      token: token - 1,
      tokenAmount: tokenAmount,
      captain,
      viceCaptain,
    });
    if (success) {
      setTxHashes((txHashes) => {
        txHashes.push(data.hash);
        return txHashes;
      });
      const txReceipt = await sourcePublicClient.waitForTransactionReceipt({
        hash: data.hash as `0x${string}`,
      });
      console.log("Place Bet Receipt");
      console.log(txReceipt);
      if (txReceipt.status == "reverted") {
        return {
          success: false,
          error: data.error,
        };
      }
      setTxConfirmations((txConfirmations) => {
        txConfirmations.push(true);
        return txConfirmations;
      });
    } else
      return {
        success: false,
        error: data.error,
      };
  }
  if (chain > 1) {
    // TODO: wait for cross chain tx to receive
  }

  return {
    success: true,
    error: "",
  };
}
