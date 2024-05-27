"use client";
import React, { useEffect, useState } from "react";
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

function Page({ params }: { params: { id: string } }) {
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("1000");
  const [stadium, setStadium] = useState("Inter and co Patriots Point");
  const [form1, setForm1] = useState(["L", "L", "W", "W", "L"]);
  const [form2, setForm2] = useState(["W", "L", "D", "W", "L"]);
  const [status, setStatus] = useState(1);
  const [points, setPoints] = useState([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [selectedChain, setSelectedChain] = useState("Avalanche");
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [gas, setGas] = useState(30);
  const [Randomness, setRandomness] = useState(false);
  const [betamount, setBetamount] = useState(10);

  const [captain, setCaptain] = useState(0);
  const [setViceCaptain, setviceCaptain] = useState(0);
  const [playerPositions, setPlayerPositions] =
    useState<Player[]>(emptyPlayers);
  const [noPlayers, setnumberofPlayers] = useState(10); // Initial state
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
    };
    getFixtureDetails();
  }, [params.id]);

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
              />
            </div>
            {status == 0 ? (
              <div className="flex justify-center items-center w-1/2 h-2/3">
                <div className=" relative z-10 mx-2 mt-16">
                  <img src="/assets/FixBorder.svg" className=" w-fit h-2/3" />
                </div>
                <div className="absolute  w-1/3 inset-y-80 z-20  mt-24 h-2/3">
                  <div className=" flex flex-col mx-2 mt-16 justify-center items-center gap-24">
                    <div className="">
                      <PlayerProgress noPlayers={noPlayers} />
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                      <div className="flex  gap-20 font-stalinist text-[10px] justify-be">
                        <p className="text-[10px]">Chain</p>
                        <p className="text-[10px]">Token</p>
                      </div>
                      <div
                        className="flex  gap-4 justify-start items-start w-full sm:flex-row flex-col"
                        style={{ transform: "scale(.60)" }}
                      >
                        <Dropdown
                          setState={setSelectedChain}
                          content={[
                            "Avalanche",
                            "Chain 1",
                            "Chain 2",
                            "Chain 3",
                          ]}
                        />
                        <Dropdown
                          content={["USDT", "token  1", "token 2", "token 3"]}
                          setState={setSelectedToken}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col mt-2 justify-center items-center">
                        <p className="text-md  font-stalinist text-slate-500">
                          Bet Amount
                        </p>
                        <p className="text-xl  font-stalinist  ">
                          {betamount}{" "}
                          <span className=" text-[#d94956]">
                            {selectedToken}
                          </span>
                        </p>
                      </div>
                      <div className="flex mt-2 justify-center items-center">
                        <img
                          src="/assets/gas.png"
                          alt="chain"
                          className=" -mt-1"
                        />
                        <p className="text-[10px] font-stalinist text-center">
                          {gas} gwei
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              onChange={() => {
                                setRandomness(!Randomness);
                              }}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800  peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border  after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#410C5E]"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-stalinist">
                              Randomness
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex w-full justify-center items-center">
                        <div
                          className={` bg-no-repeat  w-fit bg-cover `}
                          style={{
                            backgroundImage: `url('/assets/LoginBorder.svg')`,
                          }}
                        >
                          <span className="text-sm font-stalinist flex justify-center self-center py-2 mx-5 pr-3 cursor-pointer">
                            Bet
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center w-1/2 h-2/3">
                <img
                  src="/assets/FixBorder1.svg"
                  className=" w-fit relative z-10 mx-6 mt-16"
                  key={1}
                />

                <div className="absolute w-1/3 inset-y-80 z-20  mt-40 top-[30%] h-2/3 ">
                  <div className=" font-stalinist ">
                    <Status status={status} />
                  </div>
                  <div className=" flex flex-col scale-110 h-2/3 bg-no-repeat  mt-20  justify-center items-center font-stalinist">
                    <div className="flex font-stalinist capitalize justify-between w-full px-10 mt-10 ">
                      <div className="text-left text-[#D8485F] sm:text-md text-sm overflow-x-scroll whitespace-nowrap">
                        {homeTeam}
                      </div>
                      <p className=" text-slate-500"> 64&apos;</p>
                      <div className=" text-right text-[#B62DD3] sm:text-md text-sm overflow-x-scroll whitespace-nowrap">
                        {awayTeam}
                      </div>
                    </div>
                    <div className="flex font-stalinist capitalize justify-between w-full px-20 mt-3 ">
                      <p>02</p>
                      <p>-</p>
                      <p>03 </p>
                    </div>
                    <div className="flex font-stalinist capitalize justify-between w-full px-10 mt-5 ">
                      <div className="text-left text-[#D8485F] sm:text-md text-sm ">
                        <p>Top Points</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-5">
                      <img
                        src="https://media.api-sports.io/football/players/154.png"
                        alt="toppoints"
                        className="w-1/5  flex justify-center items-center"
                      />
                    </div>
                    <div className=" text-sm flex justify-center items-center w-full mt-5">
                      <p>50 points</p>
                    </div>
                    <div className="flex font-stalinist capitalize justify-between w-full px-10 mt-5 ">
                      <div className="text-left text-[#D8485F] sm:text-md text-sm ">
                        <p>Your Points</p>
                      </div>
                    </div>
                    <div className=" text-sm flex justify-center items-center w-full mt-5">
                      <p>23 points</p>
                    </div>
                    <div className="flex w-full justify-center items-center mt-4">
                      <div
                        className={` bg-no-repeat  w-fit bg-cover `}
                        style={{
                          backgroundImage: `url('/assets/LoginBorder.svg')`,
                        }}
                      >
                        <span className="text-sm font-stalinist flex justify-center self-center py-2 ml-3 pr-3 cursor-pointer">
                          Claim
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
