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
  if (token != 1) {
    // Approve Tokens
    const publicClient = createPublicClient({
      chain: CHAIN_RESOLVERS[chainToChainIds[chain]].chain,
      transport: http(CHAIN_RESOLVERS[chainToChainIds[chain]].transport),
    });
    const unwatchApproval = publicClient.watchEvent({
      address: TOKEN_ADDRESSES[chainToChainIds[chain]][
        token - 1
      ] as `0x${string}`,
      event: parseAbiItem(
        "event Approval(address indexed owner, address indexed spender, uint256 value)"
      ),
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
          unwatchApproval();
        }
      },
    });
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
  }
  await waitForEvent(txState, 2);
  txState = 0;

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
      if (isRandom) {
        // TODO: upload the tx also to txHashes
      }
      console.log(logs);
      txState = 3;
      txConfirmations.push(true);
      setTxConfirmations(txConfirmations);
      unwatchBetPlaced();
    },
  });
  if (isRandom) {
    const unwatchRequestRandomness = sourcePublicClient.watchEvent({
      address: VRF_COORDINATORS[chainToChainIds[chain]][
        token - 1
      ] as `0x${string}`,
      event: parseAbiItem(
        "event RandomWordsRequested(bytes32 indexed keyHash, uint256 requestId, uint256 preSeed, uint256 indexed subId, uint16 minimumRequestConfirmations, uint32 callbackGasLimit, uint32 numWords, bytes extraArgs, address indexed sender)"
      ),
      onLogs: (logs) => {
        console.log("Random Words Requestd Event");
        console.log(logs);
        txState = 2;
        txConfirmations.push(true);
        setTxConfirmations(txConfirmations);
        unwatchRequestRandomness();
      },
    });

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
    } else
      return {
        success: false,
        error: data.error,
      };

    await waitForEvent(txState, 3);
    txState = 0;
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
    txState = 1;
    if (success) {
      txHashes.push(data.hash);
      setTxHashes(txHashes);
    } else
      return {
        success: false,
        error: data.error,
      };
    await waitForEvent(txState, 3);
    txState = 0;
  }
  if (chain > 1) {
    // TODO: wait for cross chain tx to receive
  }
  return {
    success: true,
    error: "",
  };
}
