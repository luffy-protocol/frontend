import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerDetailCard from "./PlayerDetailCard";
import { getPlayerByTeamId } from "@/utils/playerHelpers/FetchPlayerByTeamId";

interface ChoosePlayerProps {
  setopen: (open: boolean) => void;
}

const ChoosePlayer: React.FC<ChoosePlayerProps> = ({ setopen }) => {
  const data = getPlayerByTeamId(9568, 1606);
  console.log(data);
  const [playerId, setPlayerId] = useState<number>(154);
  return (
    <div
      className={`flex flex-col items-center justify-center  bg-no-repeat bg-contain bg-center  h-[650px] xl:h-[750px] xl:w-[900px] self-center`}
      style={{
        backgroundImage: `url('/assets/ChooseModal.png')`,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="font-stalinist text-3xl">Choose Player</div>
        <div
          className="text-right justify-items-end cursor-pointer pl-20"
          onClick={() => setopen(false)}
        >
          Close
        </div>
      </div>

      <div className="flex gap-2 w-full mt-9 ">
        <div className="flex flex-col gap-2 w-full max-h-[520px] overflow-y-scroll scrollbar-custom">
          {/* <div className="flex flex-col gap-2 ">
            <PlayerCard id={154} />
            <PlayerCard id={154} />
            <PlayerCard id={154} />
            <PlayerCard id={154} />
            <PlayerCard id={154} />
            <PlayerCard id={154} />
            <PlayerCard id={154} />
          </div> */}
          <div className="flex flex-col gap-2 w-full">
            {/* Map over the data array and render a PlayerCard component for each player */}
            {data?.map((item, index) => (
              <PlayerCard
                key={index}
                id={item.player.id}
                setPlayerId={setPlayerId}
              /> // Assuming player ID is available in item.player.id
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <PlayerDetailCard id={playerId} />
        </div>
      </div>
    </div>
  );
};

export default ChoosePlayer;
