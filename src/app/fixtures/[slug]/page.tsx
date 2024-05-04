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

export default function Page({ params }: { params: { slug: string } }) {
  const [addplr, setaddplr] = useState(false);
  const { address } = useAccount();
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [squadUpdated, setSquadUpdated] = useState(false);
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
      console;
      if (players != null && players != undefined && address != undefined) {
        const squad = players[params.slug][address as any];
        console.log("ADDRESS");
        console.log(address);
        console.log("SQUADDD");
        console.log(squad);

        if (squad != null && squad != undefined && teams.length > 0) {
          await fetchPlayers(squad.playerIds as any, teams);
          setSquadUpdated(true);
        }
      }
    })();
  }, [address, teams]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(params.slug);
      console.log(response);
      console.log(teamShortForms[response[0].team1]);
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
        console.log(matchedPlayers);
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
          <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14  ">
            <div className="w-[90%] mx-auto flex">
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
                showPoints={false}
              />
              <div className="w-[45%] flex flex-col items-center">
                <button
                  className="mt-10 flex items-center gap-x-6 rounded-md  bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                  disabled={
                    playerPositions.filter((player) => player.id != "")
                      .length != 11
                  }
                  onClick={async () => {
                    const pIds = playerPositions.map((p) => p.id);
                    console.log("REMAPPINGS");
                    console.log(playerIdRemappings);
                    console.log("Player Ids");
                    console.log(pIds);
                    const remappedIds = pIds.map(
                      (id: any) => playerIdRemappings[params.slug as string][id]
                    );
                    console.log("Remapped Ids");
                    console.log(remappedIds);
                    let squad_hash: `0x${string}` = computeSquadHash(
                      Buffer.from(remappedIds)
                    );
                    console.log("SQUAD HASH");
                    console.log(squad_hash);
                    setLogs([
                      {
                        id: 1,
                        hash: "Computed Squad Hash successfully",
                        href: "",
                        username: squad_hash,
                      },
                    ]);
                    // send transaction on-chain

                    if (primaryWallet) {
                      const walletClient = await createWalletClientFromWallet(
                        primaryWallet
                      );
                      const publicClient = createPublicClient({
                        chain: arbitrumSepolia,
                        transport: http(
                          `https://rpc.ankr.com/scroll_sepolia_testnet/${process.env.NEXT_PUBLIC_ANKR_RPC_KEY}`
                        ),
                      });
                      const { request } = await publicClient.simulateContract({
                        address: protocolAddress as `0x${string}`,
                        abi: protocolAbi,
                        functionName: "registerSquad",
                        args: [params.slug, squad_hash],
                        account: primaryWallet.address as `0x${string}`,
                      });
                      const tx = await walletClient.writeContract(request);
                      console.log(tx);
                      setLogs([
                        {
                          id: 1,
                          hash: "Computed Squad Hash successfully",
                          href: "",
                          username: squad_hash,
                        },
                        {
                          id: 1,
                          hash: "Transaction Sent successfully",
                          href: "https://sepolia.arbiscan.io/tx/" + tx,
                          username: tx,
                        },
                      ]);
                      let gameData = JSON.parse(
                        localStorage.getItem("players") || "{}"
                      );
                      if (!gameData[params.slug]) gameData[params.slug] = {};
                      gameData[params.slug][address as any] = {
                        squadHash: squad_hash,
                        playerIds: pIds,
                      };
                      localStorage.setItem("players", JSON.stringify(gameData));
                      setSquadUpdated(true);
                    }
                  }}
                >
                  <p>Submit Squad</p>
                </button>
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
                              </th> */}
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
              </div>
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
