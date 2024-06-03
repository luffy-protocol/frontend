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
  claimPointsTransaction: () => Promise<void>;
  isClaimed: boolean;
}
function shortenName(name: string): string {
  const maxLength = 8;
  return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
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
  claimPointsTransaction,
  isClaimed,
}: ResultsProps) {
  return (
    <div className="flex justify-center items-center w-1/2 h-2/3">
      <div className="relative z-20 mx-2 mt-16 w-full">
        <img
          src="/assets/ResultsBox.svg"
          className="border-purrple-600 border-3"
          key={1}
        />
      </div>

      <div className="absolute w-1/3 z-20 h-3/4 over animate__fadeInUp">
        <div className="flex flex-col gap-1 scale-110 h-full w-full bg-no-repeat mt-8 justify-center items-center font-stalinist">
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-20 -mb-3">
              <img src="/assets/post2.png" className="w-12 h-12 mt-8" />
              <img src="/assets/football.gif" className="w-20 " />
              <img src="/assets/post1.png" className="w-12 h-12 mt-8" />
            </div>
            <Status status={status} />
          </div>
          <div className="flex font-stalinist capitalize justify-between w-full px-10">
            <p className="w-[35%] text-left text-[#D8485F] sm:text-md text-sm truncate whitespace-nowrap animate__fadeIn">
              {homeTeam}
            </p>
            <p className="text-white">FT</p>
            <p className="w-[35%] text-right text-[#B62DD3] sm:text-md text-sm truncate whitespace-nowrap animate__fadeIn animate__delay-100">
              {awayTeam}
            </p>
          </div>
          <div className="flex font-stalinist capitalize justify-between w-full px-20  pb-2 ">
            <p className="animate__countUp">{homeGoals}</p>
            <p>-</p>
            <p className="animate__countUp">{awayGoals}</p>
          </div>

          <div className="w-full flex items-center justify-center mt-4 pb-4 bg-[#1c275a]">
            <div className="font-stalinist capitalize  px-10 ">
              <div className="text-center text-white sm:text-md text-md animate__fadeIn">
                <p>
                  Top <br />
                  Player
                </p>
              </div>
            </div>
            <div className="flex w-full  mt-4">
              <img
                src={`https://media.api-sports.io/football/players/${topPlayer.id}.png`}
                alt="toppoints"
                className="h-28 w-28 flex justify-center items-center border-[2px] bg-black border-red-400 animate__pulse hover:animate__pulse-hover"
              />
            </div>
            <div>
              <div
                className={`text-[11px] bg-gradient-to-r from-[#dc4c4a]  to-[#bf32b8] text-white  border-t-[2px]  border-x-[2px]  border-purple-800 font-stalinist text-center w-fit px-6 mx-6 py-2 `}
              >
                {shortenName(topPlayer.name)}
              </div>

              <div
                className={`
                  "cursor-default"
                px-2 py-2  text-[9px]  bg-[#180f31] text-white  border-b  -[2px]  border-x-[2px] border-purple-800 font-stalinist text-center mx-6
                }`}
              >
                {topPlayerPoints}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center mt-6">
            <div className="flex font-stalinist capitalize  pl-10">
              <div className=" text-purple-600 sm:text-md text-xl animate__fadeIn">
                <p>Your Points &nbsp; </p>
              </div>
            </div>
            <div className="text-md flex justify-start items-center w-fit ">
              <p className="animate__countUp">{totalPoints} </p>
            </div>
          </div>

          <div className="flex w-full justify-center items-center mt-6 ">
            <button
              className={`bg-no-repeat w-fit ${
                isClaimed
                  ? "h-[94px] opacity-50 cursor-not-allowed"
                  : "h-[79px] cursor-pointer"
              } bg-cover  hover:animate__wobble`}
              style={{
                backgroundImage: `url('/assets/LoginBorder.svg')`,
              }}
              disabled={isClaimed}
              onClick={async () => {
                await claimPointsTransaction();
              }}
            >
              <span className="text-xs font-stalinist flex justify-center self-center pt-2   px-8 ">
                {isClaimed ? "Already Claimed" : "Claim Points"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
