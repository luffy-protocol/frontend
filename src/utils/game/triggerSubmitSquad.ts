import { Wallet } from "@dynamic-labs/sdk-react-core";
import {
  CHAIN_RESOLVERS,
  DEPLOYMENTS,
  TOKEN_ADDRESSES,
  VRF_COORDINATORS,
  chainToChainIds,
} from "../constants";
import approveToken from "../transactions/write/approveToken";
import placeBet from "../transactions/write/placeBet";
import placeBetRandom from "../transactions/write/placeBetRandom";
import { createPublicClient, http, parseAbiItem } from "viem";
import waitForEvent from "../transactions/helpers/waitForEvent";

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
  setTxHashes: (txHashes: string[]) => void;
  setTxConfirmations: (txConfirmations: boolean[]) => void;
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
  const txHashes: string[] = [];
  const txConfirmations: boolean[] = [];
  let txState = 0;
  const sourcePublicClient = createPublicClient({
    chain: CHAIN_RESOLVERS[chainToChainIds[chain]].chain,
    transport: http(CHAIN_RESOLVERS[chainToChainIds[chain]].transport),
  });
  const unwatchBetPlaced = sourcePublicClient.watchEvent({
    address: DEPLOYMENTS[chainToChainIds[chain]][token - 1] as `0x${string}`,
    event: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "caller",
          type: "address",
        },
        {
          components: [
            {
              internalType: "bytes32",
              name: "squadHash",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "amountInWei",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "token",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "captain",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "viceCaptain",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "isRandom",
              type: "bool",
            },
          ],
          indexed: false,
          internalType: "struct Predictions.Prediction",
          name: "Prediction",
          type: "tuple",
        },
      ],
      name: "BetPlaced",
      type: "event",
    },
    onLogs: (logs) => {
      console.log("Bet Placed Event");
      console.log(logs);
      if (logs[0].args.caller == primaryWallet.address) {
        if (isRandom) {
          const tx = logs[0].transactionHash;
          txHashes.push(tx);
          setTxHashes(txHashes);
        }
        txConfirmations.push(true);
        setTxConfirmations(txConfirmations);
        txState = 10;
      }
    },
  });
  const unwatchRequestRandomness = sourcePublicClient.watchEvent({
    address: VRF_COORDINATORS[chainToChainIds[chain]][
      token - 1
    ] as `0x${string}`,

    onLogs: (logs) => {
      console.log("Random Words Requestd Event");
      console.log(logs);
      txConfirmations.push(true);
      setTxConfirmations(txConfirmations);
      txState = 4;
    },
  });
  const unwatchApproval = sourcePublicClient.watchEvent({
    address: TOKEN_ADDRESSES[chainToChainIds[chain]][
      token - 1
    ] as `0x${string}`,
    event: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    onLogs: (logs) => {
      console.log("Approval Event");
      console.log(logs);
      if (
        logs[0].args.spender ==
          (DEPLOYMENTS[chainToChainIds[chain]] as `0x${string}`) &&
        logs[0].args.owner == primaryWallet.address
      ) {
        txState = 2;
        txConfirmations.push(true);
        setTxConfirmations(txConfirmations);
      }
    },
  });
  if (token != 1) {
    // Approve Tokens
    const { success, data } = await approveToken({
      primaryWallet: primaryWallet,
      chainId: chainToChainIds[chain],
      token: token,
      amount: tokenAmount,
    });
    txState = 1;

    if (success) {
      txHashes.push(data.hash);
      setTxHashes(txHashes);
    } else
      return {
        success: false,
        error: data.error,
      };

    while (txState != 2) {
      await delay(2000);
    }
  }

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
    txState = 3;
    if (success) {
      txHashes.push(data.hash);
      setTxHashes(txHashes);
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
    txState = 6;
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

  while (txState != 10) {
    await delay(2000);
  }
  return {
    success: true,
    error: "",
  };
}
