"use client";
import Dropdown from "@/components/Dropdown";
import computeMerklePath from "@/utils/zk/computeMerklePath";
import computeMerkleRoot from "@/utils/zk/helpers/computeMerkleRoot";
import circuit from "@/utils/zk/circuit.json";
import axios from "axios";
import {
  DynamicWidget,
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import {
  BarretenbergBackend,
  CompiledCircuit,
} from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import React, { useState } from "react";
import { hexToBytes, recoverPublicKey, stringToBytes, toBytes } from "viem";
import computeSquadHash from "@/utils/zk/helpers/computeSquadHash";
import formatProofInputs from "@/utils/zk/helpers/formatProofInputs";
import generateProof from "@/utils/zk/generateProof";

// place bet
interface Option {
  id: number;
  name: string;
  image: string;
}

export default function PlaceBet() {
  const { isAuthenticated, primaryWallet } = useDynamicContext();
  const [chainsOpen, setChainsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(0);
  const [tokensOpen, setTokensOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(0);

  const chains: Option[] = [
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
  ];
  const tokens: Option[] = [
    {
      id: 1,
      name: "Native",
      image: chains[selectedChain != 0 ? selectedChain - 1 : 0].image,
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
  ];
  return (
    <div className="w-full h-screen flex flex-col space-y-2 justify-center items-center">
      <p className="font-bold text-4xl">Game Page</p>
      <DynamicWidget />
      <p className="mt-6 mb-4 font-semibold text-white text-2xl">Step 1</p>
      {isAuthenticated && (
        <div className="flex space-x-4">
          <Dropdown
            label="Choose Chain"
            selectedOption={selectedChain}
            setSelectedOption={(chain: number) => {
              if (chain == selectedChain) setSelectedChain(0);
              else setSelectedChain(chain);
            }}
            options={chains}
            open={chainsOpen}
            setOpen={(state) => {
              setChainsOpen(state);
            }}
          />
          <Dropdown
            label="Choose Token"
            selectedOption={selectedToken}
            setSelectedOption={(token: number) => {
              if (token == selectedToken) setSelectedToken(0);
              else setSelectedToken(token);
            }}
            options={tokens}
            open={tokensOpen}
            setOpen={(state) => {
              console.log("PRESSED");
              console.log(state);
              setTokensOpen(state);
            }}
          />
        </div>
      )}
      <p className="mt-6 mb-4 font-semibold text-white text-2xl">Step 2</p>
      <p className="text-lg text-white">Bet Amount - 0.1 USDC</p>
      <p className="text-lg text-white">Crosschain Fee - 0.1 ETH</p>
      <p className="text-lg text-white">ETH to USDC Swap Fee - 0.1 ETH</p>
      <p className="mt-6 mb-4 font-semibold text-white text-2xl">Step 3</p>
      <button
        type="button"
        className="my-4 inline-flex justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Place Bet 💰
      </button>
      <button
        type="button"
        onClick={async () => {
          if (primaryWallet == null) return;
          // const response = await generateProof({
          //   primaryWallet,
          //   resultsUrl:
          //     "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/bafkreic2oubuisvjs6z3zbpnwergd6kpvcx5gfjrf6ttran6d634n6i2sa?pinataGatewayToken=CUMCxB7dqGB8wEEQqGSGd9u1edmJpWmR9b0Oiuewyt5gs633nKmTogRoKZMrG4Vk",
          //   playerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          // });

          // console.log(response);
        }}
        className="my-4 inline-flex justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Generate Proof
      </button>
      {/* {squadHash != "" && (
        <p className="text-white text-xl font-bold">
          {Array.from(Buffer.from(squadHash.slice(2), "hex")).map((e) =>
            e.toString()
          )}
        </p>
      )} */}
    </div>
  );
}
