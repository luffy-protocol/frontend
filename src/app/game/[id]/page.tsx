"use client";
import React, { useEffect, useState } from "react";
import Pitch from "@/components/Pitch";
import ChoosePlayer from "@/components/ChoosePlayer/ChoosePlayer";
import { emptyPlayers } from "@/utils/constants";
import { Player, TriggerTransactionProps } from "@/utils/interface";
import GameStatus from "@/components/Game/GameStatus";
import Results from "@/components/Results";
import PlaceBet from "@/components/PlaceBet";
import DefaultLayout from "@/components/DefaultLayout";
import Transaction from "@/components/Transaction";
import resolveLabels from "@/utils/game/resolveLabels";
import triggerSubmitSquad from "@/utils/game/triggerSubmitSquad";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import computeSquadHash from "@/utils/zk/helpers/computeSquadHash";
import { getRemapping } from "@/utils/game/getRemapping";
import { getMaxIndex, getMaxValue, sumArray } from "@/utils/game/arrayHelpers";
import computeGamePageState from "@/utils/game/computeGamePageState";

function Page({ params }: { params: { id: string } }) {
  const { primaryWallet, walletConnector } = useDynamicContext();
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [stadium, setStadium] = useState("Inter and co Patriots Point");

  const [status, setStatus] = useState(0);
  const [points, setPoints] = useState([10, 1, 2, 32, 23, 0, 0, 0, 89, 1, 2]);
  const [captain, setCaptain] = useState(11);
  const [viceCaptain, setviceCaptain] = useState(11);
  const [playerPositions, setPlayerPositions] =
    useState<Player[]>(emptyPlayers);
  const [noPlayers, setnumberofPlayers] = useState(0); // Initial state
  const [homeTeam, setHomeTeam] = useState("...........");
  const [awayTeam, setAwayTeam] = useState("...........");
  const [homeid, setHomeId] = useState(0);
  const [awayid, setAwayId] = useState(0);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [chain, setChain] = useState(0);
  const [txHashes, setTxHashes] = useState<string[]>([]);
  const [txConfirmed, setTxConfirmed] = useState<number>(0);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (primaryWallet == null || primaryWallet == undefined) return;

    computeGamePageState({
      primaryWallet,
      gameId: params.id,
      setPlayerPositions,
      setCaptain,
      setviceCaptain,
      setChain,
      setLabels,
      setTxConfirmed,
      setTxHashes,
      setTransactionLoading,
      setStatus,
      setHomeTeam,
      setAwayTeam,
      setStadium,
      setHomeId,
      setAwayId,
      setIsLoaded,
    });
  }, [primaryWallet, params.id]);

  useEffect(() => {
    setnumberofPlayers(
      playerPositions.filter((player) => player.id !== "").length
    );
    console.log(playerPositions.length);
  }, [playerPositions]);

  useEffect(() => {
    if (status == 1) {
      (async function () {
        console.log("Fetching results from smart contract");
      })();
    }
  }, [status]);

  return (
    <DefaultLayout>
      <GameStatus
        team1={homeTeam}
        team2={awayTeam}
        time={"1000"}
        stadium={stadium}
        form1={["L", "L", "W", "W", "L"]}
        form2={["W", "L", "D", "W", "L"]}
        status={status}
        playersCount={0}
      />
      {isLoaded ? (
        <div className=" h-full flex gap-2 sm:justify-between justify-center sm:items w-10/12 sm:flex-row flex-col">
          <div className="w-1/2 sm:ml-6">
            <Pitch
              setindex={setindex}
              setOpen={setOpen}
              playerPositions={playerPositions}
              points={points}
              showPoints={status > 0}
              viceCaptain={viceCaptain}
              captain={captain}
            />
          </div>
          {!transactionLoading ? (
            status == 0 ? (
              <PlaceBet
                selectedPlayersCount={noPlayers}
                captainAndViceCaptainSet={
                  captain !== 11 && viceCaptain !== 11 && captain != viceCaptain
                }
                triggerTransaction={async ({
                  token,
                  chain,
                  isRandom,
                  betAmount,
                  totalValue,
                }: TriggerTransactionProps) => {
                  console.log("Transaction Started");
                  if (primaryWallet == null || primaryWallet == undefined)
                    return;
                  if (walletConnector == null || walletConnector == undefined)
                    return;
                  setChain(chain);

                  const playerIdRemapping = await getRemapping({
                    gameId: "0x" + Number(params.id).toString(16),
                  });
                  const playerIds = playerPositions.map((player) => player.id);

                  const remappedIds = playerIds.map(
                    (id: any) => playerIdRemapping[id.toString()]
                  );
                  console.log("Remapped Ids");
                  console.log(remappedIds);

                  const squadHash = computeSquadHash(
                    new Uint8Array(remappedIds)
                  );
                  console.log("Squad Hash computed");
                  console.log(squadHash);
                  const players = JSON.parse(
                    localStorage.getItem("players") || "{}"
                  );

                  players[params.id][primaryWallet.address as any].squadHash =
                    squadHash;

                  players[params.id][primaryWallet.address as any].txStatus = 0;
                  localStorage.setItem("players", JSON.stringify(players));

                  setLabels([]);
                  setTxHashes([]);
                  setError("");
                  setTxConfirmed(0);
                  const { tempLabels } = resolveLabels({
                    setLabels,
                    token: token,
                    chain: chain,
                    isRandom: isRandom,
                  });
                  console.log("Labels resolved");
                  setTransactionLoading(true);

                  const {
                    success,
                    error: callError,
                    tempTxHahes,
                    tempTxConfirmations,
                  } = await triggerSubmitSquad({
                    gameId: parseInt(params.id),
                    players: players,
                    primaryWallet,
                    chain,
                    token,
                    betAmount,
                    totalValue,
                    isRandom,
                    captain: 1,
                    viceCaptain: 2,
                    squadHash,
                    setTxHashes: (hash: string) => {
                      setTxHashes((hashes) => {
                        return [...hashes, hash];
                      });
                    },
                    setTxConfirmations: () => {
                      setTxConfirmed((confirmed) => {
                        return confirmed + 1;
                      });
                    },
                  });

                  if (!success) {
                    console.log("Error in transaction");
                    console.log(callError);
                    setError(
                      "Transasction Failed or User Rejected Transaction"
                    );
                  } else {
                    const players = JSON.parse(
                      localStorage.getItem("players") || "{}"
                    );
                    const txStatus =
                      players[params.id][primaryWallet.address as any].txStatus;

                    console.log("LABELS");
                    console.log(tempLabels);
                    console.log("TX HASHES");
                    console.log(tempTxHahes);
                    console.log("TX CONFIRMED");
                    console.log(tempTxConfirmations);

                    if (txStatus != 0) {
                      players[params.id][primaryWallet.address as any].chain =
                        chain;
                      players[params.id][primaryWallet.address as any].labels =
                        tempLabels;
                      players[params.id][
                        primaryWallet.address as any
                      ].txHashes = tempTxHahes;
                      players[params.id][
                        primaryWallet.address as any
                      ].confirmations = tempTxConfirmations;
                      localStorage.setItem("players", JSON.stringify(players));
                    }
                  }
                }}
              />
            ) : (
              <Results
                status={status}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                homeGoals={Math.floor(Math.random() * 6)}
                awayGoals={Math.floor(Math.random() * 6)}
                topPlayer={playerPositions[getMaxIndex(points)]}
                totalPoints={sumArray(points)}
                topPlayerPoints={getMaxValue(points)}
                matchMinutes={90}
                setTransactionLoading={setTransactionLoading}
              />
            )
          ) : (
            <Transaction
              labels={labels}
              setTransactionLoading={setTransactionLoading}
              txHashes={txHashes}
              txConfirmed={txConfirmed}
              chain={chain}
              error={error}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col h-[500px] justify-center items-center ">
          <svg
            aria-hidden="true"
            className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-[#D8485F]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <ChoosePlayer
            gameId={params.id}
            address={primaryWallet?.address as string}
            setopen={setOpen}
            index={index}
            setPlayerPositions={setPlayerPositions}
            hometeam={homeid}
            awayteam={awayid}
            setCaptain={setCaptain}
            setViceCaptain={setviceCaptain}
            playerPosition={playerPositions}
          />
        </div>
      )}
    </DefaultLayout>
  );
}

export default Page;
