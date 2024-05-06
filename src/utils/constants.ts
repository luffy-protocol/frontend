import { csk, dc, gt, kkr, lsg, mi, pbks, rcb, rr, srh } from "@/data/teams";

const protocolAddress = "0x1510e68f0874ea6a3a7841a29f7ccc6de82915d6";

const protocolAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_functionsRouter",
        type: "address",
      },
      {
        internalType: "string",
        name: "_sourceCode",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "_subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "_donId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EmptySource",
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
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "ResultsNotPublished",
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
    inputs: [],
    name: "ZeroKnowledgeVerificationFailed",
    type: "error",
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
    ],
    name: "ClaimPointsDisabled",
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
        internalType: "string",
        name: "remapping",
        type: "string",
      },
    ],
    name: "GamePlayerIdRemappingSet",
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
        name: "playersMetadataLength",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "playersMetadata",
        type: "string[]",
      },
    ],
    name: "PlayersMetadataUpdated",
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
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "error",
        type: "bytes",
      },
    ],
    name: "ResultsFetchFailed",
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
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "ResultsFetchInitiated",
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
        internalType: "bytes32",
        name: "pointsMerkleRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "gameResults",
        type: "string",
      },
    ],
    name: "ResultsPublished",
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
        internalType: "bytes32",
        name: "squadHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "SquadRegistered",
    type: "event",
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
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPoints",
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
    inputs: [],
    name: "donId",
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
    name: "functionsRouter",
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
    name: "gamePoints",
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
    name: "gameResults",
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
    name: "gameToSquadHash",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isSelectSquadEnabled",
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
    name: "isZkVerificationEnabled",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerIdRemappings",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playersMetadata",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pointsMerkleRoot",
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
    inputs: [
      {
        internalType: "string[]",
        name: "_playersMetadata",
        type: "string[]",
      },
    ],
    name: "registerPlayers",
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
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
    ],
    name: "registerSquad",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "s_callbackGasLimit",
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
    name: "s_lastError",
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
    name: "s_lastRequestId",
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
    name: "s_lastResponse",
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
    name: "s_subscriptionId",
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
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_gameResults",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_pointsMerkleRoot",
        type: "bytes32",
      },
    ],
    name: "setGameResults",
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
        internalType: "string",
        name: "_remapping",
        type: "string",
      },
    ],
    name: "setPlayerIdRemmapings",
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
        internalType: "bool",
        name: "_isSelectSquadEnabled",
        type: "bool",
      },
    ],
    name: "setSelectSquadEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_isZkVerificationEnabled",
        type: "bool",
      },
    ],
    name: "setZkVerificationEnabled",
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
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "donHostedSecretsSlotID",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "donHostedSecretsVersion",
        type: "uint64",
      },
    ],
    name: "triggerFetchGameResults",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_sourceCode",
        type: "string",
      },
    ],
    name: "updateSourceCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upkeepContract",
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
];
interface PlayerIdRemappings {
  [key: string]: { [key: string]: number };
}

interface FixtureDetails {
  [key: string]: {
    team1: string;
    team2: string;
  };
}

const allTeams = {
  csk: csk,
  rcb: rcb,
  rr: rr,
  kkr: kkr,
  dc: dc,
  pbks: pbks,
  lsg: lsg,
  gt: gt,
  srh: srh,
  mi: mi,
};
const fixtureDetails: FixtureDetails = {
  "91600": {
    team1: "Royal Challengers Bengaluru",
    team2: "Gujarat Titans",
  },
  "91515": {
    team1: "Chennai Super Kings",
    team2: "Delhi Capitals",
  },
  "91555": {
    team1: "Chennai Super Kings",
    team2: "Delhi Capitals",
  },
  "91609": {
    team1: "Punjab Kings",
    team2: "Chennai Super Kings",
  },
  "91618": {
    team1: "Lucknow Super Giants",
    team2: "Kolkata Knight Riders",
  },
};

const playerIdRemappings: PlayerIdRemappings = {
  "91515": {
    "702": 40,
    "1465": 10,
    "1649": 11,
    "1739": 27,
    "1858": 21,
    "6326": 3,
    "6349": 1,
    "8030": 34,
    "8181": 18,
    "8182": 20,
    "8204": 7,
    "8292": 46,
    "8531": 49,
    "8808": 33,
    "8944": 22,
    "9425": 25,
    "9693": 6,
    "10226": 5,
    "10280": 41,
    "10384": 37,
    "10484": 48,
    "10499": 4,
    "10520": 12,
    "10738": 9,
    "10744": 39,
    "10754": 45,
    "10952": 44,
    "11128": 16,
    "11427": 47,
    "11595": 15,
    "11808": 0,
    "12094": 28,
    "12779": 19,
    "13136": 13,
    "13143": 17,
    "13214": 8,
    "13252": 31,
    "13866": 2,
    "14274": 42,
    "14501": 29,
    "14596": 24,
    "14650": 32,
    "14706": 23,
    "15452": 14,
    "15779": 38,
    "19243": 36,
    "22556": 26,
    "22616": 43,
    "24326": 35,
    "52418": 30,
  },
  "91555": {
    "265": 11,
    "587": 9,
    "1447": 1,
    "1726": 45,
    "2195": 30,
    "6327": 40,
    "6692": 4,
    "7836": 15,
    "8095": 44,
    "8497": 28,
    "8683": 18,
    "9012": 26,
    "9582": 27,
    "9863": 19,
    "10100": 10,
    "10209": 39,
    "10225": 41,
    "10477": 24,
    "10693": 25,
    "10713": 5,
    "10945": 32,
    "10947": 29,
    "11177": 6,
    "11195": 8,
    "11307": 22,
    "11777": 13,
    "11813": 0,
    "11965": 38,
    "12086": 37,
    "12627": 43,
    "12636": 42,
    "12805": 17,
    "13184": 16,
    "13509": 34,
    "13931": 49,
    "14163": 20,
    "14282": 46,
    "14565": 35,
    "14599": 14,
    "14606": 36,
    "14628": 31,
    "14696": 47,
    "14700": 3,
    "14701": 33,
    "16458": 21,
    "18504": 23,
    "19027": 48,
    "22571": 2,
    "22576": 7,
    "51767": 12,
  },
  "91600": {
    "145": 12,
    "1413": 2,
    "1465": 35,
    "1649": 36,
    "1844": 14,
    "1858": 46,
    "6326": 28,
    "6349": 26,
    "7662": 4,
    "7825": 3,
    "8181": 43,
    "8182": 45,
    "8204": 32,
    "8349": 22,
    "8944": 47,
    "9522": 11,
    "9693": 31,
    "10226": 30,
    "10238": 10,
    "10486": 15,
    "10499": 29,
    "10520": 37,
    "10636": 1,
    "10692": 20,
    "10738": 34,
    "10808": 21,
    "10953": 19,
    "10954": 6,
    "11128": 41,
    "11220": 16,
    "11595": 40,
    "11808": 25,
    "12225": 7,
    "12258": 5,
    "12669": 0,
    "12779": 44,
    "13135": 13,
    "13136": 38,
    "13143": 42,
    "13214": 33,
    "13866": 27,
    "13962": 8,
    "14172": 17,
    "14596": 49,
    "14706": 48,
    "14726": 24,
    "15452": 39,
    "21686": 9,
    "32786": 18,
    "36482": 23,
  },
  "91609": {
    "265": 11,
    "587": 9,
    "1446": 25,
    "1447": 1,
    "2244": 27,
    "6322": 26,
    "6507": 40,
    "6670": 37,
    "6692": 4,
    "7836": 15,
    "8175": 44,
    "8616": 36,
    "8683": 18,
    "9354": 33,
    "9585": 49,
    "9863": 19,
    "10045": 32,
    "10100": 10,
    "10214": 41,
    "10420": 35,
    "10477": 24,
    "10713": 5,
    "10919": 34,
    "11177": 6,
    "11195": 8,
    "11307": 22,
    "11777": 13,
    "11813": 0,
    "12087": 42,
    "12335": 38,
    "12805": 17,
    "13184": 16,
    "13217": 46,
    "13497": 30,
    "13914": 29,
    "13977": 43,
    "14163": 20,
    "14254": 39,
    "14452": 48,
    "14599": 14,
    "14700": 3,
    "15480": 45,
    "16458": 21,
    "18504": 23,
    "22571": 2,
    "22576": 7,
    "41295": 28,
    "51767": 12,
    "53478": 47,
    "53496": 31,
  },
  "91618": {
    "1454": 43,
    "1836": 0,
    "2276": 10,
    "7710": 19,
    "7736": 11,
    "8393": 20,
    "8440": 25,
    "8506": 30,
    "8520": 34,
    "8733": 35,
    "8925": 32,
    "8989": 26,
    "9025": 13,
    "9067": 46,
    "9204": 4,
    "9406": 33,
    "9427": 29,
    "9428": 3,
    "10479": 14,
    "10896": 2,
    "10917": 7,
    "11054": 23,
    "11289": 40,
    "11311": 27,
    "12096": 41,
    "12337": 1,
    "12344": 8,
    "12926": 17,
    "12930": 36,
    "13088": 24,
    "13213": 12,
    "13494": 18,
    "13534": 45,
    "13748": 6,
    "13907": 31,
    "14659": 38,
    "15749": 37,
    "15861": 15,
    "18637": 44,
    "22401": 39,
    "22566": 9,
    "24729": 21,
    "33129": 5,
    "36487": 16,
    "36501": 22,
    "50458": 42,
    "51378": 28,
  },
};

interface GameResults {
  [key: string]: number[];
}

const gameResults: GameResults = {
  "91515": [
    10, 97, 105, 0, 0, 14, 4, 0, 1, 39, 65, 0, 0, 0, 25, 25, 0, 0, 0, 0, 0, 0,
    75, 0, 0, 0, 0, 0, 19, 43, 0, 0, 0, 135, 0, 0, 50, 9, 0, 156, 0, 0, 75, 0,
    0, 25, 50, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  "91555": [
    156, 13, 0, 0, 0, 86, 0, 0, 67, 25, 0, 9, 0, 0, 0, 0, 0, 0, 25, 50, 0, 50,
    100, 0, 0, 0, 0, 48, 23, 0, 0, 29, 0, 15, 0, 0, 11, 25, 0, 26, 26, 25, 0, 0,
    9, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  "91609": [
    156, 13, 0, 0, 0, 86, 0, 0, 67, 25, 0, 9, 0, 0, 0, 0, 0, 0, 25, 50, 0, 50,
    100, 0, 0, 0, 0, 48, 23, 0, 0, 29, 0, 15, 0, 0, 11, 25, 0, 26, 26, 25, 0, 0,
    9, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  "91618": [
    0, 47, 24, 35, 0, 0, 0, 1, 0, 50, 172, 72, 0, 0, 58, 0, 0, 75, 0, 25, 0, 75,
    0, 0, 0, 0, 64, 5, 17, 9, 28, 21, 0, 16, 0, 37, 0, 38, 27, 0, 75, 25, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

export {
  protocolAbi,
  protocolAddress,
  playerIdRemappings,
  gameResults,
  fixtureDetails,
  allTeams,
};
