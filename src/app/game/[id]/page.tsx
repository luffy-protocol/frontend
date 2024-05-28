"use client";
import React, { use, useEffect, useState } from "react";
import Pitch from "@/components/Pitch";
import Navbar from "@/components/Navbar";
import Status from "@/components/status";
import ChoosePlayer from "@/components/ChoosePlayer";
import fixtureById from "@/utils/fixtureHelpers/FixtureById";
import { emptyPlayers } from "@/utils/constants";
import { Player } from "@/utils/interface";
import GameStatus from "@/components/Game/GameStatus";
import PlayerProgress from "@/components/Game/PlayerProgress";
import Dropdown from "@/components/Game/Dropdown";
import Results from "@/components/Results";
import PlaceBet from "@/components/PlaceBet";

function Page({ params }: { params: { id: string } }) {
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("1000");
  const [stadium, setStadium] = useState("Inter and co Patriots Point");
  const [form1, setForm1] = useState(["L", "L", "W", "W", "L"]);
  const [form2, setForm2] = useState(["W", "L", "D", "W", "L"]);
  const [status, setStatus] = useState(0);
  const [points, setPoints] = useState([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [selectedChain, setSelectedChain] = useState("Avalanche");
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [gas, setGas] = useState(30);
  const [Randomness, setRandomness] = useState(false);
  const [betamount, setBetamount] = useState(10);

  const [captain, setCaptain] = useState(11);
  const [viceCaptain, setviceCaptain] = useState(11);
  const [playerPositions, setPlayerPositions] =
    useState<Player[]>(emptyPlayers);
  const [noPlayers, setnumberofPlayers] = useState(0); // Initial state
  const [homeTeam, setHomeTeam] = useState("...........");
  const [awayTeam, setAwayTeam] = useState("...........");
  const [homeid, setHomeId] = useState(0);
  const [awayid, setAwayId] = useState(0);

  useEffect(() => {
    const getFixtureDetails = async () => {
      const { response } = await fixtureById(parseInt(params.id));
      setHomeTeam(response[0].home_name);
      setAwayTeam(response[0].away_name);
      setAwayId(response[0].away_id);
      setHomeId(response[0].home_id);
      setStadium(response[0].venue);
    };
    getFixtureDetails();
  }, [params.id]);

  useEffect(() => {
    setnumberofPlayers(
      playerPositions.filter((player) => player.id !== "").length
    );
    console.log(playerPositions.length);
  }, [playerPositions]);
  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col  items-center w-full overflow-hidden  ">
          <div className="w-full">
            <Navbar />
          </div>
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
                showPoints={true}
                viceCaptain={viceCaptain}
                captain={captain}
              />
            </div>
            {status == 0 ? (
              <PlaceBet selectedPlayersCount={noPlayers} />
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
                matchMinutes={69}
              />
            )}
          </div>
          {open && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
              {/* Content of your Choosemodal component */}

              <ChoosePlayer
                setopen={setOpen}
                index={index}
                setPlayerPositions={setPlayerPositions}
                hometeam={homeid}
                awayteam={awayid}
                setCaptain={setCaptain}
                setViceCaptain={setviceCaptain}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
