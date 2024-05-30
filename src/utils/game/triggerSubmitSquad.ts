import { Wallet } from "@dynamic-labs/sdk-react-core";
import { chainToChainIds } from "../constants";
import approveToken from "../transactions/write/approveToken";
import placeBet from "../transactions/write/placeBet";
import placeBetRandom from "../transactions/write/placeBetRandom";

interface TriggerSubmitSquadProps {
  gameId: number;
  chain: number;
  token: number;
  totalValue: string;
  tokenAmount: string;
  isRandom: number;
  captain: number;
  viceCaptain: number;
  squadHash: string;
  primaryWallet: Wallet;
  setTxHashes: (txHashes: string[]) => void;
}

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
}: TriggerSubmitSquadProps): Promise<{ success: boolean; error: string }> {
  const txHashes = [];
  if (token != 1) {
    // Approve Tokens
    const { success, data } = await approveToken({
      primaryWallet: primaryWallet,
      chainId: chainToChainIds[chain],
      token: token,
      amount: tokenAmount,
    });
    if (success) {
      txHashes.push(data.hash);
      setTxHashes(txHashes);
    } else
      return {
        success: false,
        error: data.error,
      };
  }
  // Submit Squad
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
      txHashes.push(data.hash);
      setTxHashes(txHashes);

      // TODO: wait for randomness to receive
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
      txHashes.push(data.hash);
      setTxHashes(txHashes);
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
