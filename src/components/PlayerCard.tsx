import { playerimg } from "@/utils/logos/playerImage";
import React from "react";
import Button from "./Button";
import ArrowButton from "./ArrowButton";

const PlayerCard = () => {
  return (
    <div
      className="flex items-center justify-center bg-no-repeat bg-contain bg-center  h-[120px] w-full  "
      style={{
        backgroundImage: `url('/assets/PlayerCard.svg')`,
      }}
    >
      <div className="flex justify-center items-center gap-6">
        <img src={playerimg(153465)} alt="" className="" width={80} />
        <div className="flex flex-row justify-center items-start">
          <div>
            <div className="font-stalinist">Player Name</div>
            <div className="font-stalinist">Position</div>
          </div>
        </div>
        <ArrowButton />
      </div>
    </div>
  );
};

export default PlayerCard;
