import React from "react";
import PlayerCard from "./PlayerCard";
import PlayerDetailCard from "./PlayerDetailCard";

const ChoosePlayer = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center  bg-no-repeat bg-contain bg-center  h-[650px] xl:h-[750px] xl:w-[900px] self-center`}
      style={{
        backgroundImage: `url('/assets/ChooseModal.png')`,
      }}
    >
      <div className=" font-stalinist text-3xl">Choose Player</div>
      <div className="flex gap-2 w-full mt-9 ">
        <div className="flex flex-col gap-2 w-full">
          <PlayerCard id={154} />
          <PlayerCard id={154} />
          <PlayerCard id={154} />
          <PlayerCard id={154} />
          <PlayerCard id={154} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <PlayerDetailCard id={154} />
        </div>
      </div>
    </div>
  );
};

export default ChoosePlayer;
