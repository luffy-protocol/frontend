"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { DynamicWidget, SpinnerIcon } from "../lib/dynamic";
import { useAccount, useBalance } from "wagmi";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Fixtures", href: "/fixtures" },
  { name: "Leaderboard", href: "/leaderboard/0" },
];

import { DynamicUserProfile, useDynamicContext } from "../lib/dynamic";
import WelcomeModal from "./WelcomeModal";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { arbitrumSepolia } from "viem/chains";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useDynamicContext();
  const { address } = useAccount();

  const { data, refetch } = useBalance({
    address: address,
  });
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    console.log(address);
    console.log(isAuthenticated);
  }, []);
  return (
    <div>
      {showModal && (
        <WelcomeModal
          close={() => {
            setShowModal(false);
          }}
          tx={txHash}
        />
      )}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img
                className="h-12 w-auto rounded-lg z-0"
                src="/logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated && (
              <button
                className="mx-4 rounded-md bg-[#01A4F1] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                onClick={async () => {
                  setProcessing(true);
                  console.log(txHash == "");
                  console.log(isAuthenticated);
                  if (txHash == "" && isAuthenticated) {
                    (async function () {
                      try {
                        refetch();
                        if (data != undefined) {
                          const value = parseFloat(data.formatted);
                          console.log(value);
                          if (value < 0.0002) {
                            const account = privateKeyToAccount(
                              (process.env
                                .NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`) ||
                                "0x"
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
                            const txCount =
                              await publicClient.getTransactionCount({
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
                        } else {
                          console.log("could not fetch balance");
                        }
                      } catch (e) {
                        console.log(e);
                      }
                      setProcessing(false);
                    })();
                  } else {
                    console.log("Already fetched");
                  }
                }}
              >
                <div className="flex">
                  <p>Claim free ETH</p>&nbsp;
                  {processing && <SpinnerIcon />}
                </div>
              </button>
            )}
            <DynamicWidget />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="/logo.png" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 flex flex-col space-y-2 items-start justify-start">
                  {isAuthenticated && (
                    <button
                      className="mt-2 rounded-md bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                      onClick={async () => {
                        console.log(txHash == "");
                        console.log(isAuthenticated);
                        if (txHash == "" && isAuthenticated) {
                          (async function () {
                            try {
                              refetch();
                              if (data != undefined) {
                                const value = parseFloat(data.formatted);
                                console.log(value);
                                if (value < 0.0002) {
                                  const account = privateKeyToAccount(
                                    (process.env
                                      .NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`) ||
                                      "0x"
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
                                  const txCount =
                                    await publicClient.getTransactionCount({
                                      address: account.address,
                                    });

                                  const tx = await walletClient.sendTransaction(
                                    {
                                      account: account,
                                      to: address,
                                      value: parseEther("0.002"),
                                      nonce: txCount,
                                    }
                                  );
                                  console.log("TX complete");
                                  console.log(tx);
                                  setTxHash(tx);
                                  setShowModal(true);
                                } else {
                                  console.log("YOu have enough money :0");
                                }
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
                      }}
                    >
                      <div className="flex">
                        <p>Claim free ETH</p>&nbsp;
                        {processing && <SpinnerIcon />}
                      </div>
                    </button>
                  )}
                  <DynamicWidget />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

export default Nav;
