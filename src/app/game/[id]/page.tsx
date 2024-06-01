"use client";
import React, { useEffect, useState } from "react";
import Pitch from "@/components/Pitch";
import ChoosePlayer from "@/components/ChoosePlayer/ChoosePlayer";
import fixtureById from "@/utils/fixtures/fetchFixtureById";
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
import { getPredictionComplete } from "@/utils/game/getPredictionComplete";

function Page({ params }: { params: { id: string } }) {
  const { primaryWallet, walletConnector } = useDynamicContext();
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("1000");
  const [stadium, setStadium] = useState("Inter and co Patriots Point");
  const [form1, setForm1] = useState(["L", "L", "W", "W", "L"]);
  const [form2, setForm2] = useState(["W", "L", "D", "W", "L"]);
  const [status, setStatus] = useState(0);
  const [points, setPoints] = useState([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [gas, setGas] = useState(30);
  const [transactionstep, setTransactionStep] = useState(0);
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

  useEffect(() => {
    if (primaryWallet == null || primaryWallet == undefined) return;
    const getPredictionState = async () => {
      const isPredictionComplete = await getPredictionComplete({
        gameId: "0x" + parseInt(params.id).toString(16),
        address: primaryWallet.address.toLocaleLowerCase(),
      });
      // if (isPredictionComplete) setStatus(1);
    };
    const getFixtureDetails = async () => {
      const { response } = await fixtureById(parseInt(params.id));
      setHomeTeam(response[0].home_name);
      setAwayTeam(response[0].away_name);
      setAwayId(response[0].away_id);
      setHomeId(response[0].home_id);
      setStadium(response[0].venue);
    };
    (async function () {
      const players = JSON.parse(localStorage.getItem("players") || "{}");
      if (
        players != null &&
        players != undefined &&
        primaryWallet.address != undefined
      ) {
        if (players[params.id] == null || players[params.id] == undefined)
          players[params.id] = {};
        const squad = players[params.id][primaryWallet.address as any];

        setPlayerPositions(squad.players);
        await getFixtureDetails();
        await getPredictionState();
      }
    })();
  }, [primaryWallet, params.id]);

  useEffect(() => {
    setnumberofPlayers(
      playerPositions.filter((player) => player.id !== "").length
    );
    console.log(playerPositions.length);
  }, [playerPositions]);

  return (
    <DefaultLayout>
      <GameStatus
        team1={homeTeam}
        team2={awayTeam}
        time={time}
        stadium={stadium}
        form1={form1}
        form2={form2}
        status={status}
        playersCount={0}
      />
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
              setTransactionLoading={setTransactionLoading}
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
                if (primaryWallet == null || primaryWallet == undefined) return;
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

                const squadHash = computeSquadHash(new Uint8Array(remappedIds));
                console.log("Squad Hash computed");
                console.log(squadHash);
                setLabels([]);
                setTxHashes([]);
                setTxConfirmed(0);
                resolveLabels({
                  setLabels,
                  token: token,
                  chain: chain,
                  isRandom: isRandom,
                });
                console.log("Labels resolved");

                const { success, error: callError } = await triggerSubmitSquad({
                  gameId: parseInt(params.id),
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
                const delay = (ms: number) =>
                  new Promise((resolve) => setTimeout(resolve, ms));

                if (!success) {
                  console.log("Error in transaction");
                  console.log(callError);
                  setError("Transasction Failed or User Rejected Transaction");
                } else {
                  await delay(5000);
                  setTxHashes((prev) => [...prev, prev[0]]);
                  setTxConfirmed((confirmed) => confirmed + 1);
                }
              }}
            />
          ) : (
            <Results
              status={status}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeGoals={2}
              awayGoals={3}
              topPlayerId="154"
              totalPoints={332}
              topPlayerPoints={80}
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
