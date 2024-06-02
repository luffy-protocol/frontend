import { Wallet } from "@dynamic-labs/sdk-react-core";
import {
  CHAIN_RESOLVERS,
  DEPLOYMENTS,
  PROTOCOL_ABI,
  chainToChainIds,
} from "../constants";
import approveToken from "../transactions/write/approveToken";
import placeBet from "../transactions/write/placeBet";
import placeBetRandom from "../transactions/write/placeBetRandom";
import { createPublicClient, http } from "viem";
interface TriggerSubmitSquadProps {
  gameId: number;
  chain: number;
  token: number;
  players: any;
  totalValue: string;
  betAmount: string;
  isRandom: boolean;
  captain: number;
  viceCaptain: number;
  squadHash: string;
  primaryWallet: Wallet;
  setTxHashes: (hash: string) => void;
  setTxConfirmations: () => void;
}

export default async function triggerSubmitSquad({
  players,
  gameId,
  primaryWallet,
  chain,
  token,
  betAmount,
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
      amount: betAmount,
    });

    if (success) {
      setTxHashes(data.hash);
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
      setTxConfirmations();
    } else
      return {
        success: false,
        error: data.error,
      };
  }
  let txReceipt;
  if (isRandom) {
    const { success, data } = await placeBetRandom({
      primaryWallet,
      chainId: chainToChainIds[chain],
      gameId,
      squadHash,
      value: totalValue,
      token: token - 1,
      betAmount: betAmount,
    });
    players[gameId][primaryWallet.address].txStatus = 1;
    localStorage.setItem("players", JSON.stringify(players));
    if (success) {
      setTxHashes(data.hash);
      txReceipt = await sourcePublicClient.waitForTransactionReceipt({
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
      setTxConfirmations();
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
      betAmount,
      captain,
      viceCaptain,
    });
    if (success) {
      setTxHashes(data.hash);
      txReceipt = await sourcePublicClient.waitForTransactionReceipt({
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
      setTxConfirmations();
    } else
      return {
        success: false,
        error: data.error,
      };
  }
  if (chain > 1) {
    players[gameId][primaryWallet.address].txStatus = 2;
    console.log("Crosschain Tx Receipt");
    console.log(txReceipt);
    players[gameId][primaryWallet.address].messageId = "123";
    localStorage.setItem("players", JSON.stringify(players));
    // TODO: wait for cross chain tx to receive
  }

  return {
    success: true,
    error: "",
  };
}
