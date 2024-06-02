import React from "react";
import ArrowButton from "./ArrowButton";
import { getPlayerById } from "@/utils/player/getPlayerById";

interface PlayerCardProps {
  id: number;
  setPlayerId: (id: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ id, setPlayerId }) => {
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
          src={data?.player.photo}
          alt=""
          className="ml-3"
          width={50}
          style={{ marginRight: "20px" }}
        />

        <div className="flex flex-col justify-start max-w-[160px] ">
          <div className="font-stalinist text-[#D8485F] text-xl overflow-hidden overflow-ellipsis">
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
        <ArrowButton id={id} setplayerId={setPlayerId} />
      </div>
    </div>
  );
};

export default PlayerCard;
