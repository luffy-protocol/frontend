"use client";
import Dropdown from "@/components/Dropdown";
import computeSquadHash from "@/utils/zk/computeSquadHash";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React, { useState } from "react";
const BN = require("bn.js");

// place bet
interface Option {
  id: number;
  name: string;
  image: string;
}

export default function PlaceBet() {
  const { isAuthenticated } = useDynamicContext();
  const [chainsOpen, setChainsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(0);
  const [tokensOpen, setTokensOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(0);
  const [squadHash, setSquadHash] = useState("");
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
          const remappedPIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12];
          let squad_hash: `0x${string}` = computeSquadHash(
            Buffer.from(remappedPIds)
          );
          console.log(
            JSON.stringify(Array.from(Buffer.from(squad_hash.slice(2), "hex")))
          );
          setSquadHash(squad_hash);
        }}
        className="my-4 inline-flex justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Compute Squad Hash
      </button>
      {squadHash != "" && (
        <p className="text-white text-xl font-bold">
          {Array.from(Buffer.from(squadHash.slice(2), "hex")).map((e) =>
            e.toString()
          )}
        </p>
      )}
    </div>
  );
}
