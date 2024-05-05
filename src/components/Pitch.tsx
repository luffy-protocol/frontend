"use client";
import { gameResults, playerIdRemappings } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PlayerImage from "./PlayerImage";

interface Player {
  name: string;
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

interface PitchProps {
  open: boolean;
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  setindex: React.Dispatch<React.SetStateAction<number>>;
  playerPositions: Player[];
  points: any[];
  setPoints: (number: any) => void;
  showPoints: boolean;
}

const Pitch: React.FC<PitchProps> = ({
  open,
  slug,
  setOpen,
  setindex,
  index,
  playerPositions,
  points,
  setPoints,
  showPoints,
}) => {
  const handlePlayerClick = (index: number) => {
    console.log("Player", index, "clicked");
    setindex(index);
    setOpen(true);
  };
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("claim") === "true") {
      let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");
      const playerIds = gameData[slug];
      if (playerIds != null && playerIds != undefined) {
        const remappedIds = playerIds.map(
          (id: any) => playerIdRemappings[slug as string][id.toString()]
        );
        console.log(remappedIds);
        const tpoints = remappedIds.map(
          (id: any) => gameResults[slug][id.toString()]
        );
        setPoints(tpoints);
      }
    }
  }, []);

  return (
    <div className="flex justify-start  relative w-[48%] mx-auto">
      {/* <div className="relative rounded-lg shadow-md border-2 border-black bg-[url('/pitchbase.png')] w-full bg-contain  h-[122svh] bg-no-repeat">
        {playerPositions.map((player, index) => (
          <>
            <PlayerImage
              name={player.name}
              key={index}
              index={index}
              player={player}
              points={points}
              showPoints={showPoints}
              onClick={() => handlePlayerClick(index)}
            />
            <div></div>
          </>
        ))}
      </div> */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="flex justify-center items-center relative">
          <img
            className="rounded-lg shadow-md border-2 border-black"
            src="/pitchbase.png"
            alt="Pitch"
          />
          {playerPositions.map((player, index) => (
            <>
              <PlayerImage
                name={player.name}
                key={index}
                index={index}
                player={player}
                points={points}
                showPoints={showPoints}
                onClick={() => handlePlayerClick(index)}
              />
              <div></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pitch;
