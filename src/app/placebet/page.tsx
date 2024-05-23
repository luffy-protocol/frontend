"use client";
import Dropdown from "@/components/Dropdown";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React, { useState } from "react";

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
      image: "https://testnet.luffyprotocol.com/link.png",
    },
    {
      id: 3,
      name: "USDC",
      image: "https://testnet.luffyprotocol.com/usdc.png",
    },
  ];
  return (
    <div className="w-full h-screen flex flex-col space-y-2 justify-center items-center">
      <p className="font-bold text-4xl">Game Page</p>
      <DynamicWidget />

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
    </div>
  );
}
