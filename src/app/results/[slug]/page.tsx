"use client";
import Logs from "@/components/Logs";
import Pitch from "@/components/Pitch";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  allTeams,
  fixtureDetails,
  gameResults,
  playerIdRemappings,
  protocolAbi,
  protocolAddress,
} from "@/utils/constants";
import {
  createPublicClient,
  createWalletClient,
  hashMessage,
  http,
  recoverPublicKey,
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

export default function Page({ params }: { params: { slug: string } }) {
  const [addplr, setaddplr] = useState(false);
  const { address } = useAccount();
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [squad, setSquad] = useState([]);
  const [squadUpdated, setSquadUpdated] = useState(false);
  const [topScorerIndex, setTopScorerIndex] = useState(0);
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
                      .length != 11
                  }
                  onClick={async () => {
                    let gameData = JSON.parse(
                      localStorage.getItem("gameData") || "{}"
                    );
                    const playerIds = gameData[params.slug];
                    if (playerIds != null && playerIds != undefined) {
                      const remappedIds = playerIds.map(
                        (id: any) =>
                          playerIdRemappings[params.slug as string][
                            id.toString()
                          ]
                      );
                      console.log("Remapped Ids");
                      console.log(remappedIds);

                      let signer_pub_x_key = [];
                      let signer_pub_y_key = [];
                      let signature = [];
                      let points_merkle_paths = [];
                      const all_points_merkle_root = computeMerkleRoot(
                        gameResults[params.slug]
                      );
                      console.log("ALL POINTS MERKLE ROOT");
                      console.log(all_points_merkle_root);
                      const player_ids = remappedIds;
                      let player_points = [];
                      for (let i = 0; i < 11; i++) {
                        const merklePathHexString = computeMerklePath(
                          player_ids[i],
                          gameResults[params.slug]
                        );

                        player_points.push(
                          Array.from(
                            Buffer.from(
                              (points[i] as any).toString(16).padStart(64, "0"),
                              "hex"
                            )
                          )
                        );
                        const merklePath = merklePathHexString.map((element) =>
                          Array.from(
                            Buffer.from(element.slice(2), "hex")
                          ).toString()
                        );
                        points_merkle_paths.push(merklePath);
                      }
                      console.log("POINTS MERKLE PATH");
                      console.log(points_merkle_paths);

                      console.log("PLAYER POINTS");
                      console.log(player_points);

                      let squad_hash: `0x${string}` = computeSquadHash(
                        Buffer.from(remappedIds)
                      );

                      console.log("SQUAD HASH");
                      console.log(squad_hash);

                      if (primaryWallet != null) {
                        const walletClient = await createWalletClientFromWallet(
                          primaryWallet
                        );
                        const publicClient = createPublicClient({
                          chain: arbitrumSepolia,
                          transport: http(
                            `https://rpc.ankr.com/scroll_sepolia_testnet/${process.env.NEXT_PUBLIC_ANKR_RPC_KEY}`
                          ),
                        });
                        const sig = Buffer.from(
                          (
                            await walletClient.signMessage({
                              account: primaryWallet.address as `0x${string}`,
                              message: {
                                raw: Buffer.from(
                                  hashMessage({ raw: squad_hash }).slice(2),
                                  "hex"
                                ),
                              },
                            })
                          ).slice(2),
                          "hex"
                        );

                        const publicKey = await recoverPublicKey({
                          hash: Buffer.from(
                            hashMessage({ raw: squad_hash }).slice(2),
                            "hex"
                          ),
                          signature: sig,
                        });
                        const publicKeyBuffer = Buffer.from(
                          publicKey.slice(2),
                          "hex"
                        );
                        signature = Array.from(
                          new Uint8Array(sig.subarray(0, sig.length - 1))
                        );

                        // Extract x and y coordinates
                        signer_pub_x_key = Array.from(
                          publicKeyBuffer.subarray(1, 33)
                        ).map((byte) => `${byte}`);
                        signer_pub_y_key = Array.from(
                          publicKeyBuffer.subarray(33)
                        ).map((byte) => `${byte}`);
                        console.log("X coords");
                        console.log(
                          Array.from(publicKeyBuffer.subarray(1, 33))
                        );
                        console.log("Y coords");
                        console.log(Array.from(publicKeyBuffer.subarray(33)));
                        console.log("Signature");
                        console.log(signature);
                        const proofInput = `selected_player_ids=${player_ids.toString()}
          selected_players_points=${player_points.toString()}
          player_points_merkle_paths=${points_merkle_paths.toString()}
          all_player_points_merkle_root=[${Array.from(
            Buffer.from(all_points_merkle_root.slice(2), "hex")
          ).toString()}]
          claimed_player_points=${points
            .reduce((sum, currentValue) => sum + currentValue, 0)
            .toString()}
          selected_squad_hash=[${Array.from(
            Buffer.from(squad_hash.slice(2), "hex")
          ).toString()}]
          signer_pub_x_key=[${signer_pub_x_key.toString()}]
          signer_pub_y_key=[${signer_pub_y_key.toString()}]
          signature=[${signature.toString()}]`;
                        console.log(proofInput);

                        // const response = await fetch("/api/sindri/prove", {
                        //   method: "POST",
                        //   headers: {
                        //     "Content-Type": "application/json",
                        //   },
                        //   body: JSON.stringify({
                        //     proofInputs: proofInput,
                        //   }),
                        // });
                        // console.log(response);
                      }
                    }
                  }}
                >
                  <p>Generate Proof</p>
                </button>
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

{
  /* <div className="w-[45%] flex flex-col items-center">

<p className="font-normal text-neutral-500 italic text-xs py-1">
  {squadUpdated
    ? "Click on players to update your squad"
    : `${
        playerPositions.filter((player) => player.id != "")
          .length
      } selected, ${
        playerPositions.filter((player) => player.id == "")
          .length
      } more to go`}
</p>
<p className="py-6 text-black text-3xl font-bold text-center">
  {squadUpdated ? "Update Squad" : "Create Squad"}
</p>

<div className="mt-8 flow-root heropattern-pixeldots-slate-50 border-2 rounded-lg shadow-md px-6">
  <div className="">
    <div className="inline-block min-w-full py-2 align-middle">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Team
            </th>
            {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Role
            </th>
            <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {open == false ? (
            <DummyPlayerData />
          ) : (
            <ChoosePlayers
              index={index}
              teams={teams}
              open={open}
              setOpen={setOpen}
              setPlayerPositions={setPlayerPositions}
              playerIds={playerPositions.map(
                (player) => player.id
              )}
              slug={params.slug}
            />
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div> */
}
