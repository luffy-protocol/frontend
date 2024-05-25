"use client";
import Dropdown from "@/components/Dropdown";
import computeMerklePath from "@/utils/zk/computeMerklePath";
import computeMerkleRoot from "@/utils/zk/computeMerkleRoot";
import circuit from "@/utils/zk/circuit.json";
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
import computeSquadHash from "@/utils/zk/computeSquadHash";

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
          const _logs = [];

          try {
            const backend = new BarretenbergBackend(circuit as CompiledCircuit);
            const noir = new Noir(circuit as CompiledCircuit, backend);
            if (primaryWallet === null) return;
            const walletClient = await createWalletClientFromWallet(
              primaryWallet
            );
            // const publicClient = createPublicClient({
            //   chain: ,
            //   transport: http(
            //     `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
            //   ),
            // });

            let signer_pub_x_key = [];
            let signer_pub_y_key = [];
            let signature = [];
            let points_merkle_paths = [];
            const results = [
              10, 97, 105, 0, 0, 14, 4, 0, 1, 39, 65, 0, 0, 0, 25, 25, 0, 0, 0,
              0, 0, 0, 75, 0, 0, 0, 0, 0, 19, 43, 0, 0, 0, 135, 0, 0, 50, 9, 0,
              156, 0, 0, 75, 0, 0, 25, 50, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0,
            ];
            const squadMerkleRoot = computeMerkleRoot(results);
            const player_ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const points = [10, 97, 105, 0, 0, 14, 4, 0, 1, 39, 65];
            let player_points = [];
            for (let i = 0; i < 11; i++) {
              const merklePathHexString = computeMerklePath(
                player_ids[i],
                results
              );
              console.log(merklePathHexString);
              console.log(
                `0x${(points[i] as any).toString(16).padStart(64, "0")}`
              );
              player_points.push(
                hexToBytes(
                  `0x${(points[i] as any).toString(16).padStart(64, "0")}`
                )
              );
              const merklePath = merklePathHexString.map((element) =>
                hexToBytes(element)
              );
              points_merkle_paths.push(merklePath);
            }
            console.log("Signing this");
            const squadHash = computeSquadHash(new Uint8Array(player_ids));
            console.log(squadHash);
            const sig = Buffer.from(
              (
                await walletClient.signMessage({
                  account: primaryWallet.address as `0x${string}`,
                  message: {
                    raw: stringToBytes(squadHash),
                  },
                })
              ).slice(2),
              "hex"
            );

            const publicKey = await recoverPublicKey({
              hash: Buffer.from(squadHash.slice(2), "hex"),
              signature: sig,
            });
            const publicKeyBuffer = Buffer.from(publicKey.slice(2), "hex");
            signature = Array.from(
              new Uint8Array(sig.subarray(0, sig.length - 1))
            );

            // Extract x and y coordinates
            signer_pub_x_key = Array.from(publicKeyBuffer.subarray(1, 33)).map(
              (byte) => `${byte}`
            );
            signer_pub_y_key = Array.from(publicKeyBuffer.subarray(33)).map(
              (byte) => `${byte}`
            );
            console.log({
              signer_pub_x_key: Array.from(signer_pub_x_key).map(
                (byte) => `${byte}`
              ),
              signer_pub_y_key: Array.from(signer_pub_y_key).map(
                (byte) => `${byte}`
              ),
              signature: Array.from(signature).map((byte) => `${byte}`),
              selected_player_ids: Array.from(player_ids).map(
                (byte) => `${byte}`
              ),
              selected_players_points: player_points.map((point) =>
                Array.from(point).map((byte) => `${byte}`)
              ),
              player_points_merkle_paths: points_merkle_paths.map(
                (points_merkle_path) =>
                  points_merkle_path.map((element) =>
                    Array.from(element).map((e) => `${e}`)
                  )
              ) as any,
              all_player_points_merkle_root: Array.from(
                toBytes(squadMerkleRoot)
              ).map((byte) => `${byte}`),
              selected_squad_hash: Array.from(
                Buffer.from(squadHash.slice(2), "hex")
              ).map((byte) => `${byte}`),
              claimed_player_points: points.reduce(
                (acc, currentValue) => acc + currentValue,
                0
              ),
            });

            console.log("MERKLE PATH");
            console.log(
              JSON.stringify(
                points_merkle_paths.map((path) =>
                  path.map((e) => Array.from(e))
                )
              )
            );

            const proof = await noir.generateFinalProof({
              signer_pub_x_key: Array.from(signer_pub_x_key).map(
                (byte) => `${byte}`
              ),
              signer_pub_y_key: Array.from(signer_pub_y_key).map(
                (byte) => `${byte}`
              ),
              signature: Array.from(signature).map((byte) => `${byte}`),
              selected_player_ids: Array.from(player_ids).map(
                (byte) => `${byte}`
              ),
              selected_players_points: player_points.map((point) =>
                Array.from(point).map((byte) => `${byte}`)
              ) as any,
              player_points_merkle_paths: points_merkle_paths.map(
                (points_merkle_path) =>
                  points_merkle_path.map((element) =>
                    Array.from(element).map((e) => `${e}`)
                  )
              ) as any,
              all_player_points_merkle_root: Array.from(
                toBytes(squadMerkleRoot)
              ).map((byte) => `${byte}`),
              selected_squad_hash: Array.from(
                Buffer.from(squadHash.slice(2), "hex")
              ).map((byte) => `${byte}`),
              claimed_player_points: points.reduce(
                (acc, currentValue) => acc + currentValue,
                0
              ),
            });

            const verified = await noir.verifyFinalProof(proof);
            if (verified)
              _logs.push({
                id: _logs.length + 1,
                hash: "Proof verified successfully",
                href: "",
                username:
                  "Woohoo. There is one more step. Wait for the transaction to complete. The proof is being sent on the blockchain",
              });
            else
              _logs.push({
                id: _logs.length + 1,
                hash: "Proof verification failed",
                href: "",
                username:
                  "Uh Oh. Something is wrong with your proof. Please try again. If you are stuck, reach out to our discord channel.",
              });

            console.log("PARAMS");
            console.log([
              69,
              points.reduce((acc, currentValue) => acc + currentValue, 0),
              proof.proof,
            ]);
            // send transaction
            // const { request } = await publicClient.simulateContract({
            //   address: protocolAddress as `0x${string}`,
            //   abi: protocolAbi,
            //   functionName: "claimPoints",
            //   args: [
            //     params.slug,
            //     points.reduce((acc, currentValue) => acc + currentValue, 0),
            //     bytesToHex(proof.proof),
            //   ],
            //   account: primaryWallet.address as `0x${string}`,
            // });
            // const tx = await walletClient.writeContract(request);
            // _logs.push({
            //   id: _logs.length + 1,
            //   hash: "Transaction Sent Successfully",
            //   href: `https://sepolia.arbiscan.io/tx/${tx}`,
            //   username: tx,
            // });
            // setLogs(_logs);
            // let claimed = JSON.parse(localStorage.getItem("claimed") || "{}");
            // if (
            //   claimed != null &&
            //   claimed != undefined &&
            //   address != undefined
            // ) {
            //   if (
            //     claimed[params.slug] == null ||
            //     claimed[params.slug] == undefined
            //   )
            //     claimed[params.slug] = {};
            //   claimed[params.slug][address] = true;
            //   localStorage.setItem("claimed", JSON.stringify(claimed));
            // }
          } catch (e) {
            console.log(e);
          }
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
