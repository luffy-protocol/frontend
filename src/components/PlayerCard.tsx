import { playerimg } from "@/utils/logos/playerImage";
import React from "react";
import Button from "./Button";
import ArrowButton from "./ArrowButton";
import { getPlayerById } from "@/utils/playerHelpers/FetchPlayerById";

interface PlayerCardProps {
  id: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ id }) => {
  const data = getPlayerById(id);
  return (
    <div
      className="flex items-center justify-center bg-no-repeat bg-contain bg-center h-[100px] w-full"
      style={{
        backgroundImage: `url('/assets/PlayerCard.png')`,
      }}
    >
      <div className="flex justify-center items-center gap-2 w-full">
        {/* Image Section */}
        <img
          src={playerimg(id)}
          alt=""
          className="ml-3"
          width={50}
          style={{ marginRight: "20px" }}
        />

        {/* Content Section */}

        <div className="flex flex-col justify-start">
          <div className="font-stalinist text-[#D8485F] text-xl">
            {data?.player.name}
          </div>
          <div className="flex gap-2 justify-start items-center">
            <div className="font-stalinist text-[13px] text-[#FFFFFF] text-opacity-30">
              {data?.statistics[0].team.name}
            </div>
            <img
              src={data?.statistics[0].team.logo}
              alt=""
              width={21}
              height={15}
            />
          </div>
        </div>

        {/* Arrow Button Section */}
        <ArrowButton />
      </div>
    </div>
  );
};

export default PlayerCard;
