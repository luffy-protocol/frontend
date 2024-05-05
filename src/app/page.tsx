"use client";

import CTA from "@/components/CTA";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import PlayerCarousel from "@/components/TopPlayers";
import WelcomeModal from "@/components/WelcomeModal";
import { useEffect, useState } from "react";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Page() {
  const { address } = useAccount();
  const [fetched, setFetched] = useState(false);
  const { data, refetch } = useBalance({
    address: address,
  });
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const { isAuthenticated } = useDynamicContext();
  useEffect(() => {
    console.log(!fetched);
    console.log(txHash == "");
    console.log(isAuthenticated);
    if (!fetched && txHash == "" && isAuthenticated) {
      (async function () {
        try {
          refetch();
          if (data != undefined) {
            const value = parseFloat(data.formatted);
            console.log(value);
            if (value < 0.0001) {
              const account = privateKeyToAccount(
                (process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`) || "0x"
              );
              const walletClient = createWalletClient({
                account: account,
                chain: arbitrumSepolia,
                transport: http(
                  `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
                ),
              });
              const publicClient = createPublicClient({
                chain: arbitrumSepolia,
                transport: http(
                  `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
                ),
              });
              const txCount = await publicClient.getTransactionCount({
                address: account.address,
              });

              const tx = await walletClient.sendTransaction({
                account: account,
                to: address,
                value: parseEther("0.002"),
                nonce: txCount,
              });
              console.log("TX complete");
              console.log(tx);
              setTxHash(tx);
              setShowModal(true);
            } else {
              console.log("YOu have enough money :0");
            }
            setFetched(true);
          } else {
            console.log("could not fetch balance");
          }
        } catch (e) {
          console.log(e);
        }
      })();
    } else {
      console.log("Already fetched");
    }
  }, [address, isAuthenticated]);
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        {showModal && (
          <WelcomeModal
            tx={txHash}
            close={() => {
              setShowModal(false);
            }}
          />
        )}
        <Hero />

        <CTA />
        <div className="mx-12 my-20">
          <p className="text-black font-bold text-3xl text-center pb-10">
            Top Players
          </p>
          <PlayerCarousel />
        </div>
        <Feature />
        {/* <Tools /> */
        /* <Team /> */}
      </div>
    </>
  );
}
