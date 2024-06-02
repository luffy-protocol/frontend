import { useEffect, useRef, useState } from "react";
import Status from "./Fixtures/FixtureCard/Status";
import { Player } from "@/utils/interface";
interface ResultsProps {
  status: number;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  topPlayer: Player;
  topPlayerPoints: number;
  totalPoints: number;
  matchMinutes: number;
  setTransactionLoading: (loading: boolean) => void;
}
export default function Results({
  status,
  homeTeam,
  awayTeam,
  homeGoals,
  awayGoals,
  topPlayer,
  totalPoints,
  topPlayerPoints,
}: ResultsProps) {
  return (
    <div className="flex justify-center items-center w-1/2 h-2/3">
      <div className="relative z-10 mx-2 mt-16">
        <img src="/assets/ResultsBox.svg" className="w-fit h-2/3" />
      </div>

      <div className="absolute w-1/3 inset-y-96  z-20 h-2/3">
        <div className="font-stalinist">
          <Status status={status} />
        </div>
        <div className="flex flex-col scale-110 h-full w-full bg-no-repeat mt-20 justify-center items-center font-stalinist">
          <div className="flex font-stalinist capitalize justify-between w-full px-10">
            <p
              className={` w-[35%] text-left text-[#D8485F] sm:text-md text-sm truncate whitespace-nowrap`}
            >
              {homeTeam}
            </p>
            <p className="text-slate-500">FT</p>
            <p
              className={`w-[35%] text-right text-[#B62DD3] sm:text-md text-sm truncate whitespace-nowrap`}
            >
              {awayTeam}
            </p>
          </div>
          <div className="flex font-stalinist capitalize justify-between w-full px-20 mt-3">
            <p>{homeGoals}</p>
            <p>-</p>
            <p>{awayGoals}</p>
          </div>
          <div className="flex font-stalinist capitalize justify-between w-full px-10 mt-5">
            <div className="text-center text-[#D8485F] sm:text-md text-sm">
              <p>Top Player</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mt-5">
            <img
              src={`https://media.api-sports.io/football/players/${topPlayer.id}.png`}
              alt="toppoints"
              className="w-1/5 flex justify-center items-center"
            />
          </div>
          <div className="text-sm flex justify-center items-center w-full mt-5">
            <p>{topPlayer.name}</p>
          </div>
          <div className="text-sm flex justify-center items-center w-full mt-5">
            <p>{topPlayerPoints}</p>
          </div>
          <div className="flex font-stalinist capitalize justify-between w-full px-10 mt-5">
            <div className="text-center text-[#D8485F] sm:text-md text-sm">
              <p>Your Points</p>
            </div>
          </div>
          <div className="text-sm flex justify-center items-center w-full mt-5">
            <p>{totalPoints} points</p>
          </div>
          <div className="flex w-full justify-center items-center mt-6 ">
            <button
              className="bg-no-repeat w-fit h-[87px] bg-cover cursor-pointer"
              style={{
                backgroundImage: `url('/assets/LoginBorder.svg')`,
              }}
            >
              <span className="text-sm font-stalinist flex justify-center self-center pt-2   px-8 ">
                Claim Points
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
