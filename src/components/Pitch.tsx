"use client";
import { gameResults, playerIdRemappings } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
    <div className="flex justify-start  relative w-[55%] mx-auto">
      <div className="relative rounded-lg shadow-md border-2 border-black bg-[url('/pitchbase.png')] w-full bg-contain  h-[122svh]">
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
  );
};

interface PlayerImageProps {
  name: string;
  index: number;
  player: Player;
  points: number[];
  showPoints: boolean;
  onClick: () => void;
}

// const PlayerImage: React.FC<PlayerImageProps> = ({
//   name,
//   index,
//   player,
//   onClick,
// }) => {
//   return (
//     <>
//       {player.team == "plain" ? (
//         <img
//           src={`/players/plain/${player.type}.png`}
//           alt={`Player ${index + 1}`}
//           className="absolute cursor-pointer w-20"
//           onClick={onClick}
//           style={{
//             top: calculateTopPosition(index),
//             left: calculateLeftPosition(index),
//           }}
//         />
//       ) : (
//         <img
//           // src={`/players/${player.team}/${player.type}.png`}
//           src={`/players/${player.team}/${player.type}.png`}
//           alt={`Player ${index + 1}`}
//           className="absolute cursor-pointer w-20"
//           onClick={onClick}
//           style={{
//             top: calculateTopPosition(index),
//             left: calculateLeftPosition(index),
//           }}
//         />
//       )}
//       <div
//         className="absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black  rounded-md"
//         onClick={onClick}
//         style={{
//           top: calculateTopTextPosition(index),
//           left: calculateLeftPosition(index),
//         }}
//       >
//         {name}
//       </div>
//     </>
//   );
// };
const PlayerImage: React.FC<PlayerImageProps> = ({
  name,
  index,
  player,
  points,
  showPoints,
  onClick,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(
    `/players/plain/${player.type}.png`
  );

  useEffect(() => {
    setImageUrl(`/players/${player.team}/${player.type}.png`);
  }, [player.team, player.type]);

  return (
    <>
      <img
        src={imageUrl}
        alt={`Player ${index + 1}`}
        className={`absolute cursor-pointer w-16 mt-8 ${
          index == 10
            ? "left-[42%]"
            : index == 9
            ? "top-[47%] left-[5%]"
            : index == 8
            ? "top-[47%] left-[30%]"
            : index == 7
            ? "top-[47%] left-[55%]"
            : index == 6
            ? "top-[47%] left-[80%]"
            : index == 5
            ? "top-[71%] left-[17%]"
            : index == 4
            ? "top-[71%] left-[42%]"
            : index == 3
            ? "top-[71%] left-[67%]"
            : index == 2
            ? "top-[23%] left-[17%]"
            : index == 1
            ? "top-[23%] left-[42%]"
            : "top-[23%] left-[67%]"
        }`}
        onClick={onClick}
      />
      <div
        className={`absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black rounded-md  ${
          index == 10
            ? "left-[42%]"
            : index == 9
            ? "top-[47%] left-[5%]"
            : index == 8
            ? "top-[47%] left-[30%]"
            : index == 7
            ? "top-[47%] left-[55%]"
            : index == 6
            ? "top-[47%] left-[80%]"
            : index == 5
            ? "top-[71%] left-[17%]"
            : index == 4
            ? "top-[71%] left-[42%]"
            : index == 3
            ? "top-[71%] left-[67%]"
            : index == 2
            ? "top-[23%] left-[17%]"
            : index == 1
            ? "top-[23%] left-[42%]"
            : "top-[23%] left-[67%]"
        }`}
        onClick={onClick}
      >
        {name}
      </div>
      {showPoints && (
        <div
          className="absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black rounded-md"
          onClick={onClick}
        >
          {points[index]}
          {"  "}Points
        </div>
      )}
    </>
  );
};

const calculateTopPosition = (index: number): string => {
  const centerY = window.innerHeight / 2;
  if (index === 10) {
    return `${centerY - 450}px`;
  } else if (index >= 6) {
    return `${centerY - 30}px`;
  } else if (index >= 3) {
    return `${centerY + 190}px`;
  } else {
    return `${centerY - 250}px`;
  }
};

const calculateTopTextPosition = (index: number): number => {
  const centerY = window.innerHeight / 2;
  if (index === 10) {
    return centerY - 450 + 110;
  } else if (index >= 6) {
    return centerY - 30 + 110;
  } else if (index >= 3) {
    return centerY + 190 + 110;
  } else {
    return centerY - 250 + 110;
  }
};
const calculateLeftPosition = (index: number): string => {
  const centerX = window.innerWidth / 2;
  if (index === 10) {
    return `${centerX - 35}px`;
  } else if (index >= 6) {
    return `${centerX - 290 + (index % 6) * 160}px`;
  } else if (index >= 3) {
    return `${centerX - 200 + (index % 3) * 160}px`;
  } else {
    return `${centerX - 200 + (index + (1 % 1)) * 160}px`;
  }
};
const calculateLeftTextPosition = (index: number): number => {
  const centerX = window.innerWidth / 2;
  if (index === 10) {
    return centerX - 35;
  } else if (index >= 6) {
    return centerX - 290 + (index % 6) * 160;
  } else if (index >= 3) {
    return centerX - 200 + (index % 3) * 160;
  } else {
    return centerX - 200 + (index + (1 % 1)) * 160;
  }
};

export default Pitch;
