"use client";
import Logs from "@/components/Logs";
import Pitch from "@/components/Pitch";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import circuit from "@/utils/circuits.json";
import {
  allTeams,
  fixtureDetails,
  gameResults,
  playerIdRemappings,
  protocolAbi,
  protocolAddress,
} from "@/utils/constants";
import {
  bytesToHex,
  createPublicClient,
  createWalletClient,
  hashMessage,
  hexToBytes,
  http,
  recoverPublicKey,
  stringToBytes,
  stringToHex,
  toBytes,
} from "viem";
import { arbitrumSepolia, cronos } from "viem/chains";
import computeSquadHash from "@/utils/computeSquadHash";
import {
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import computeMerklePath from "@/utils/computeMerklePath";
import computeMerkleRoot from "@/utils/computeMerkleRoot";
import axios from "axios";
import Image from "next/image";
import DummyPlayerData from "@/components/DummyPlayerData";
import ChoosePlayers from "@/components/ChoosePlayers";
import { useAccount } from "wagmi";
import PlayerImage from "@/components/PlayerImage";
import JustPlayerImage from "@/components/JustPlayerImage";
import {
  BarretenbergBackend,
  CompiledCircuit,
} from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export default function Page({ params }: { params: { slug: string } }) {
  const [addplr, setaddplr] = useState(false);
  const { address } = useAccount();
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [squad, setSquad] = useState([]);
  const [squadHash, setSquadHash] = useState("");
  const [squadUpdated, setSquadUpdated] = useState(false);
  const [topScorerIndex, setTopScorerIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const teamShortForms: { [key: string]: string } = {
    "Chennai Super Kings": "CSK",
    "Royal Challengers Bengaluru": "RCB",
    "Mumbai Indians": "MI",
    "Delhi Capitals": "DC",
    "Kolkata Knight Riders": "KKR",
    "Punjab Kings": "PBKS",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG",
  };
  interface Player {
    name: string;
    id: string;
    team:
      | "plain"
      | "csk"
      | "rcb"
      | "mi"
      | "dc"
      | "kkr"
      | "pbks"
      | "rr"
      | "srh"
      | "gt"
      | "lsg"
      | "pkbs"
      | "dc";
    type: "bat" | "bowl" | "ar" | "wk";
  }
  const [playerPositions, setPlayerPositions] = useState<Player[]>([
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "wk",
      team: "plain",
    },
  ]);

  useEffect(() => {
    (async function () {
      const players = JSON.parse(localStorage.getItem("players") || "{}");
      if (players != null && players != undefined && address != undefined) {
        if (players[params.slug] == null || players[params.slug] == undefined)
          players[params.slug] = {};
        const _squad = players[params.slug][address as any];
        if (_squad != null && _squad != undefined && teams.length > 0) {
          await fetchPlayers(_squad.playerIds as any, teams);

          setSquad(_squad.playerIds);
          setSquadHash(_squad.squadHash);

          const remappedIds = _squad.playerIds.map(
            (id: any) =>
              playerIdRemappings[params.slug as string][id.toString()]
          );
          console.log(remappedIds);
          const tpoints = remappedIds.map(
            (id: any) => gameResults[params.slug][id.toString()]
          );
          setTopScorerIndex(tpoints.indexOf(Math.max(...tpoints)));
          console.log("TEAM POINTS");
          console.log(tpoints);
          setPoints(tpoints);
          setSquadUpdated(true);
        }
      }
    })();
  }, [address, teams]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(params.slug);
      if (message === "Success") {
        setteams([
          teamShortForms[response[0].team1],
          teamShortForms[response[0].team2],
        ]);
      }
    };

    fetchTeams();
  }, []);

  const fetchPlayers = async (playerIds: any, team: any) => {
    if (team[0] != "") {
      const team1 = allTeams[
        team[0].toLowerCase() as keyof typeof allTeams
      ] as any;
      const team2 = allTeams[
        team[1].toLowerCase() as keyof typeof allTeams
      ] as any;
      if (playerIds != undefined) {
        const matchedPlayers = playerIds.map((id: any) => {
          const team1Player = team1.player.find(
            (p: any) => p.id === (id as string)
          );
          const team2Player = team2.player.find(
            (p: any) => p.id === (id as string)
          );
          return team1Player
            ? {
                name: team1Player.name,
                id: team1Player.id,
                type: team1Player.role,
                team: teamShortForms[team1.name].toLowerCase(),
              }
            : team2Player
            ? {
                name: team2Player.name,
                id: team2Player.id,
                type: team2Player.role,
                team: teamShortForms[team2.name].toLowerCase(),
              }
            : { name: "Choose Player", id: "", type: "wk", team: "plain" }; // If player not found, return null
        });
        setPlayerPositions(matchedPlayers);
      }
    }
  };
  return (
    <>
      <div className="pt-10 bg-white">
        <div className="">
          <div className="flex justify-center space-x-4 w-full mt-20">
            <Image
              src={`/${fixtureDetails[params.slug].team1}.png`}
              width={130}
              height={130}
              alt="team1"
            />
            <Image src="/vs.png" width={100} height={100} alt="vs" />
            <Image
              src={`/${fixtureDetails[params.slug].team2}.png`}
              width={130}
              height={130}
              alt="team2"
            />
          </div>
          {/* <div className="text-neutral-500 px-2 text-sm font-semibold text-center">
            Fixture: {params.slug}
          </div> */}
          {/* <div className=" px-16 py-6 sm:pt-32 lg:pr-16 text-black text-6xl font-bold ">
            {teams[0]} VS {teams[1]}
            
          </div> */}
          {/* </div> */}
        </div>

        <div className="pt-12 ">
          <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-6  ">
            <div className="flex w-[70%] mx-auto justify-between text-black  h-[200px] ">
              <div>
                <p className="text-2xl font-semibold text-center">Top Scorer</p>
                <JustPlayerImage
                  point={points.length > 0 ? points[topScorerIndex] : 0}
                  player={
                    squadUpdated
                      ? playerPositions[topScorerIndex - 1]
                      : {
                          name: "Choose Player",
                          id: "",
                          type: "bat",
                          team: "plain",
                        }
                  }
                />
              </div>
              <div>
                <p className="text-2xl font-semibold text-center">
                  Total Points
                </p>
                <p className="text-5xl font-semibold text-center mt-12">
                  {points.reduce((acc, currentValue) => acc + currentValue, 0)}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-center">
                  Claim Points
                </p>
                <button
                  className="mt-10 mx-auto flex items-center gap-x-6 rounded-md  bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                  disabled={
                    playerPositions.filter((player) => player.id != "")
                      .length != 11 || started
                  }
                  onClick={async () => {
                    try {
                      setStarted(true);
                      const backend = new BarretenbergBackend(
                        circuit as CompiledCircuit
                      );
                      const noir = new Noir(
                        circuit as CompiledCircuit,
                        backend
                      );
                      if (primaryWallet === null) return;
                      const walletClient = await createWalletClientFromWallet(
                        primaryWallet
                      );
                      const publicClient = createPublicClient({
                        chain: arbitrumSepolia,
                        transport: http(
                          `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
                        ),
                      });

                      let signer_pub_x_key = [];
                      let signer_pub_y_key = [];
                      let signature = [];
                      let points_merkle_paths = [];
                      const squadMerkleRoot = computeMerkleRoot(
                        gameResults[params.slug]
                      );
                      const _logs = [];
                      _logs.push({
                        id: 1,
                        hash: "Computed Squad Merkle root",
                        href: "",
                        username: squadMerkleRoot,
                      });
                      setLogs(_logs);
                      const player_ids = squad.map(
                        (p) =>
                          playerIdRemappings[params.slug][
                            (p as number).toString()
                          ]
                      );
                      let player_points = [];
                      for (let i = 0; i < 11; i++) {
                        const merklePathHexString = computeMerklePath(
                          player_ids[i],
                          gameResults[params.slug]
                        );
                        console.log(merklePathHexString);
                        console.log(
                          `0x${(points[i] as any)
                            .toString(16)
                            .padStart(64, "0")}`
                        );
                        player_points.push(
                          hexToBytes(
                            `0x${(points[i] as any)
                              .toString(16)
                              .padStart(64, "0")}`
                          )
                        );
                        const merklePath = merklePathHexString.map((element) =>
                          hexToBytes(element)
                        );
                        points_merkle_paths.push(merklePath);
                      }
                      _logs.push({
                        id: 2,
                        hash: "Computed Squad Hash",
                        href: "",
                        username: squadHash,
                      });
                      setLogs(_logs);
                      console.log("Signing this");
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
                      const publicKeyBuffer = Buffer.from(
                        publicKey.slice(2),
                        "hex"
                      );
                      signature = Array.from(
                        new Uint8Array(sig.subarray(0, sig.length - 1))
                      );
                      _logs.push({
                        id: 3,
                        hash: "Signature obtained successfully",
                        href: "",
                        username: bytesToHex(
                          new Uint8Array(sig.subarray(0, sig.length - 1))
                        ),
                      });
                      setLogs(_logs);

                      // Extract x and y coordinates
                      signer_pub_x_key = Array.from(
                        publicKeyBuffer.subarray(1, 33)
                      ).map((byte) => `${byte}`);
                      signer_pub_y_key = Array.from(
                        publicKeyBuffer.subarray(33)
                      ).map((byte) => `${byte}`);
                      console.log({
                        signer_pub_x_key: Array.from(signer_pub_x_key).map(
                          (byte) => `${byte}`
                        ),
                        signer_pub_y_key: Array.from(signer_pub_y_key).map(
                          (byte) => `${byte}`
                        ),
                        signature: Array.from(signature).map(
                          (byte) => `${byte}`
                        ),
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
                      _logs.push({
                        id: 4,
                        hash: "Generating zero knowledge proof...",
                        href: "",
                        username:
                          "Please wait. This may take 2-3 minutes. This proof is generated to verify your squad in the blockchain without revealing it 🪄",
                      });
                      setLogs(_logs);

                      const proof = await noir.generateFinalProof({
                        signer_pub_x_key: Array.from(signer_pub_x_key).map(
                          (byte) => `${byte}`
                        ),
                        signer_pub_y_key: Array.from(signer_pub_y_key).map(
                          (byte) => `${byte}`
                        ),
                        signature: Array.from(signature).map(
                          (byte) => `${byte}`
                        ),
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
                      _logs.push({
                        id: 5,
                        hash: "Proof generated successfully",
                        href: "",
                        username:
                          bytesToHex(proof.proof).substring(0, 50 - 3) + "...",
                      });
                      setLogs(_logs);
                      _logs.push({
                        id: 6,
                        hash: "Verifying zero knowledge proof...",
                        href: "",
                        username:
                          "The proof needs to be verified initially to be passed on chain",
                      });
                      setLogs(_logs);
                      const verified = await noir.verifyFinalProof(proof);
                      if (verified)
                        _logs.push({
                          id: 7,
                          hash: "Proof verified successfully",
                          href: "",
                          username:
                            "Woohoo. You are all set. Triggering transaction to send the proof on chain",
                        });
                      else
                        _logs.push({
                          id: 7,
                          hash: "Proof verification failed",
                          href: "",
                          username:
                            "Uh Oh. Please try again. If you are stuck, reach out to our discord channel.",
                        });

                      setLogs(_logs);

                      // send transaction
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <p>Generate Proof</p>
                </button>
                {started && (
                  <p className="font-normal text-center text-neutral-500 italic text-xs py-1 w-[200px] mx-auto">
                    Proof generation started. Check logs below for status
                  </p>
                )}
              </div>
            </div>
            <div className="w-[90%] mx-auto flex justify-center pt-6">
              <Pitch
                index={index}
                setindex={setindex}
                slug={params.slug}
                open={open}
                setOpen={setOpen}
                playerPositions={playerPositions}
                points={gameResults[params.slug]}
                setPoints={(_points: any) => {
                  setPoints(_points);
                }}
                showPoints={true}
              />
            </div>
          </div>
        </div>

        <div className="px-24 pt-16 pb-32 flex flex-col items-center">
          <div className=" pr-16 py-6 lg:pr-16 text-black text-4xl font-bold text-center">
            Logs
          </div>
          {logs.length != 0 && <Logs logs={logs} />}
        </div>
      </div>
    </>
  );
}
