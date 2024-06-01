import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  optimismSepolia,
  sepolia,
} from "viem/chains";
const DEPLOYMENTS: Record<number, `0x${string}`> = {
  43113: "0x2f80513FD5119CD9DC340cd0666Ee84d00A3e799",
  11155111: "0x05aAFbce41C5ad85Be9a7017cB545E631D7aCB38",
  84532: "0x146f80579cA969799523F333c77453143e99e67D",
  421614: "0x1c89e2970889cA2eA64078c9A87eBEd03D68a541",
  11155420: "0x17517F552d14E3ae1b2a8005f594D7916CE6466d",
};

const VRF_COORDINATORS: Record<number, string> = {
  43113: "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE",
  11155111: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
  421614: "0x5CE8D5A2BC84beb22a398CCA51996F7930313D61",
};
const PROTOCOL_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "sourceCode",
            type: "string",
          },
          {
            internalType: "address",
            name: "vrfWrapper",
            type: "address",
          },
          {
            internalType: "address",
            name: "ccipRouter",
            type: "address",
          },
          {
            internalType: "address",
            name: "usdcToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "linkToken",
            type: "address",
          },
          {
            internalType: "uint256[2]",
            name: "upKeepIds",
            type: "uint256[2]",
          },
          {
            internalType: "contract AggregatorV3Interface[2]",
            name: "priceFeeds",
            type: "address[2]",
          },
        ],
        internalType: "struct LuffyProtocol.ConstructorParams",
        name: "_params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ClaimWindowComplete",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ClaimWindowInComplete",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "requiredBetInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "betInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientBetAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "InvalidAutomationCaller",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
    ],
    name: "InvalidBetToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "InvalidCrosschainCaller",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyRouterCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyVRFWrapperCanFulfill",
    type: "error",
  },
  {
    inputs: [],
    name: "PanicClaimError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "SelectSquadDisabled",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetAmountSet",
    type: "event",
  },
  {
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64[]",
        name: "destinationSelectors",
        type: "uint64[]",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "destinationAddresses",
        type: "address[]",
      },
    ],
    name: "CrosschainAddressesSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "CrosschainReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "gameIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "remappings",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "resultsTriggersIn",
        type: "uint256",
      },
    ],
    name: "GamePlayerIdRemappingSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "OracleRequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "OracleResponseFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFunction",
        type: "bool",
      },
    ],
    name: "OracleResponseSuccess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "pointsMerkleRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "pointsIpfsHash",
        type: "string",
      },
    ],
    name: "OracleResultsPublished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32[11]",
        name: "playerIds",
        type: "bytes32[11]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalPoints",
        type: "uint256",
      },
    ],
    name: "PointsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
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
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "RewardsWithdrawn",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "BET_AMOUNT_IN_USDC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DON_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETH_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SUBSCRIPTION_ID",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VRF_WRAPPER",
    outputs: [
      {
        internalType: "contract IVRFV2PlusWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "_publicInputs",
        type: "bytes32[]",
      },
    ],
    name: "_verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "automationRegistry",
    outputs: [
      {
        internalType: "contract IKeeperRegistryMaster",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "txHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "source",
            type: "address",
          },
          {
            internalType: "bytes32[]",
            name: "topics",
            type: "bytes32[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Log",
        name: "log",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkLog",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "performData",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "performData",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_position",
        type: "uint256",
      },
    ],
    name: "claimAndWithdrawRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32[11]",
        name: "_playerIds",
        type: "bytes32[11]",
      },
      {
        internalType: "uint256",
        name: "_totalPoints",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
    ],
    name: "claimPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_position",
        type: "uint256",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimmables",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "clearCacheFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "crosschainAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameIdsToRemappingsSet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "gameToPrediction",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "resultsTriggersIn",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInUSD",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
    ],
    name: "getBetValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_automation",
        type: "uint8",
      },
    ],
    name: "getForwarderAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkToken",
    outputs: [
      {
        internalType: "contract LinkTokenInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gasPriceInWei",
        type: "uint256",
      },
    ],
    name: "getRandomnessPriceInNative",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "i_vrfV2PlusWrapper",
    outputs: [
      {
        internalType: "contract IVRFV2PlusWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestError",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestGameweek",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRequestId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestResponse",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_captain",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_viceCaptain",
        type: "uint8",
      },
    ],
    name: "makeSquadAndPlaceBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
    ],
    name: "makeSquadAndPlaceBetRandom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numWords",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "performData",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "prevDonHostedSecretsSlotID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prevDonHostedSecretsVersion",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rankings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "request",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestConfirmations",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "requestToGameId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "results",
    outputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "publishedTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "setBetAmountInUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_vrfCallbackGasLimit",
        type: "uint32",
      },
    ],
    name: "setCallbackGasLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64[]",
        name: "_destinationSelectors",
        type: "uint64[]",
      },
      {
        internalType: "address[]",
        name: "_destinationAddresses",
        type: "address[]",
      },
    ],
    name: "setCrosschainAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_donHostedSecretsSlotID",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "_donHostedSecretsVersion",
        type: "uint64",
      },
    ],
    name: "setDonHostedSecrets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_upKeepId",
        type: "uint256",
      },
    ],
    name: "setLogTriggerAutomation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_numWords",
        type: "uint32",
      },
    ],
    name: "setNumWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "gameIds",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "remappings",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "resultsTriggersIn",
        type: "uint256",
      },
    ],
    name: "setPlayerIdRemappings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_requestConfirmations",
        type: "uint16",
      },
    ],
    name: "setRequestConfirmations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_upKeepId",
        type: "uint256",
      },
    ],
    name: "setTimeTriggerAutomation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sourceCode",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "remapping",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "slotId",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
      {
        internalType: "bytes[]",
        name: "bytesArgs",
        type: "bytes[]",
      },
    ],
    name: "triggerFetchResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "upKeepIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vrfCallbackGasLimit",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vrfRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "winnings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_claimer",
        type: "address",
      },
      {
        internalType: "bytes32[11]",
        name: "_playerIds",
        type: "bytes32[11]",
      },
      {
        internalType: "uint256",
        name: "_totalPoints",
        type: "uint256",
      },
    ],
    name: "zclaimPointsTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_claimer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_position",
        type: "uint256",
      },
    ],
    name: "zclaimRewardsTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "zkVerifier",
    outputs: [
      {
        internalType: "contract UltraVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
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
        internalType: "struct Predictions.Prediction",
        name: "_prediction",
        type: "tuple",
      },
    ],
    name: "zmakeSquadTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_pointsIpfsHash",
        type: "string",
      },
    ],
    name: "zpostResultsTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameweek",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "gameIds",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "remappings",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "resultsTriggersIn",
        type: "uint256",
      },
    ],
    name: "zsetPlayerIdRemmapings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_claimer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "zwithdrawRewardsTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
const CROSSCHAIN_NO_VRF_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ccipRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdcToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_linkToken",
        type: "address",
      },
      {
        internalType: "contract AggregatorV3Interface[2]",
        name: "_priceFeeds",
        type: "address[2]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "requiredBetInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "betInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientBetAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
    ],
    name: "InvalidBetToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "NotEnoughCrosschainFee",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetAmountSet",
    type: "event",
  },
  {
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
        internalType: "struct PredictionsNoVRF.Prediction",
        name: "Prediction",
        type: "tuple",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64[]",
        name: "destinationSelectors",
        type: "uint64[]",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "destinationAddresses",
        type: "address[]",
      },
    ],
    name: "CrosschainAddressesSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "CrosschainMessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "CrosschainReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "BET_AMOUNT_IN_USDC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DESTINATION_CHAIN_SELECTOR",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETH_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "crosschainAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "gameToPrediction",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInUSD",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
    ],
    name: "getBetValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_captain",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_viceCaptain",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_isRandom",
        type: "bool",
      },
    ],
    name: "getCrosschainFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_captain",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_viceCaptain",
        type: "uint8",
      },
    ],
    name: "makeSquadAndPlaceBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "setBetAmountInUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64[]",
        name: "_destinationSelectors",
        type: "uint64[]",
      },
      {
        internalType: "address[]",
        name: "_destinationAddresses",
        type: "address[]",
      },
    ],
    name: "setCrosschainAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolAddress",
        type: "address",
      },
    ],
    name: "setProtocolAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "valueBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vrfRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
const CROSSCHAIN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vrfWrapper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ccipRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdcToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_linkToken",
        type: "address",
      },
      {
        internalType: "contract AggregatorV3Interface[2]",
        name: "_priceFeeds",
        type: "address[2]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "requiredBetInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "betInWei",
        type: "uint256",
      },
    ],
    name: "InsufficientBetAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "token",
        type: "uint8",
      },
    ],
    name: "InvalidBetToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "NotEnoughCrosschainFee",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyVRFWrapperCanFulfill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetAmountSet",
    type: "event",
  },
  {
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64[]",
        name: "destinationSelectors",
        type: "uint64[]",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "destinationAddresses",
        type: "address[]",
      },
    ],
    name: "CrosschainAddressesSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "CrosschainMessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "CrosschainReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "BET_AMOUNT_IN_USDC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DESTINATION_CHAIN_SELECTOR",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETH_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_USD_PRICE_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VRF_WRAPPER",
    outputs: [
      {
        internalType: "contract IVRFV2PlusWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "crosschainAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "gameToPrediction",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInUSD",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
    ],
    name: "getBetValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_captain",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_viceCaptain",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_isRandom",
        type: "bool",
      },
    ],
    name: "getCrosschainFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkToken",
    outputs: [
      {
        internalType: "contract LinkTokenInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gasPriceInWei",
        type: "uint256",
      },
    ],
    name: "getRandomnessPriceInNative",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_vrfV2PlusWrapper",
    outputs: [
      {
        internalType: "contract IVRFV2PlusWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_captain",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_viceCaptain",
        type: "uint8",
      },
    ],
    name: "makeSquadAndPlaceBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_token",
        type: "uint8",
      },
    ],
    name: "makeSquadAndPlaceBetRandom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numWords",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "request",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestConfirmations",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "setBetAmountInUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_vrfCallbackGasLimit",
        type: "uint32",
      },
    ],
    name: "setCallbackGasLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64[]",
        name: "_destinationSelectors",
        type: "uint64[]",
      },
      {
        internalType: "address[]",
        name: "_destinationAddresses",
        type: "address[]",
      },
    ],
    name: "setCrosschainAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_numWords",
        type: "uint32",
      },
    ],
    name: "setNumWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolAddress",
        type: "address",
      },
    ],
    name: "setProtocolAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_requestConfirmations",
        type: "uint16",
      },
    ],
    name: "setRequestConfirmations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "valueBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vrfCallbackGasLimit",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vrfRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const CHAIN_RESOLVERS: Record<number, { chain: any; transport: string }> = {
  43113: {
    chain: avalancheFuji,
    transport: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  11155111: {
    chain: sepolia,
    transport:
      "https://eth-sepolia.g.alchemy.com/v2/" +
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  84532: {
    chain: baseSepolia,
    transport:
      "https://base-sepolia.g.alchemy.com/v2/" +
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  421614: {
    chain: arbitrumSepolia,
    transport: `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
  11155420: {
    chain: optimismSepolia,
    transport: `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
};

const TOKEN_ADDRESSES: Record<number, Record<number, `0x${string}`>> = {
  43113: {
    1: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    2: "0x5425890298aed601595a70AB815c96711a31Bc65",
  },
  11155111: {
    1: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    2: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  },
  84532: {
    1: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    2: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  421614: {
    1: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    2: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  },
  11155420: {
    1: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    2: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  },
};

const COINMARKETCAP_IDS = {
  link: 1975,
  eth: 1027,
  avax: 5805,
  usdc: 3408,
};

const emptyPlayers: any = [
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
  {
    name: "Choose",
    id: "",
    team: "avatar",
  },
];
const dropdownElements = {
  tokens: [
    {
      id: 1,
      name: "Native",
      image: "", // chains[selectedChain != 0 ? selectedChain - 1 : 0].image
    },
    {
      id: 2,
      name: "LINK",
      image: "/link.png",
    },
    {
      id: 3,
      name: "USDC",
      image: "/usdc.png",
    },
  ],
  chains: [
    {
      id: 1,
      name: "Avalanche",
      image: "https://app.dynamic.xyz/assets/networks/avax.svg",
    },
    {
      id: 2,
      name: "Sepolia",
      image: "https://app.dynamic.xyz/assets/networks/eth.svg",
    },
    {
      id: 3,
      name: "Base",
      image: "https://app.dynamic.xyz/assets/networks/base.svg",
    },
    {
      id: 4,
      name: "Optimism",
      image: "https://app.dynamic.xyz/assets/networks/optimism.svg",
    },
    {
      id: 5,
      name: "Arbitrum",
      image: "https://app.dynamic.xyz/assets/networks/arbitrum.svg",
    },
  ],
};
const chainToExplorer: Record<number, string> = {
  1: "https://testnet.snowtrace.io/tx/",
  2: "https://sepolia.etherscan.io/tx/",
  3: "https://sepolia.basescan.org/tx/",
  4: "https://sepolia-optimism.etherscan.io/tx",
  5: "https://sepolia.arbiscan.io/tx/",
};
const chainToChainIds: Record<number, number> = {
  1: 43113,
  2: 11155111,
  3: 84532,
  4: 11155420,
  5: 421614,
};

export {
  PROTOCOL_ABI,
  CROSSCHAIN_ABI,
  CROSSCHAIN_NO_VRF_ABI,
  DEPLOYMENTS,
  CHAIN_RESOLVERS,
  COINMARKETCAP_IDS,
  TOKEN_ADDRESSES,
  emptyPlayers,
  dropdownElements,
  chainToChainIds,
  chainToExplorer,
  VRF_COORDINATORS,
};
