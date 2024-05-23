"use client";
import React, { useState } from "react";
import Pitch from "@/components/Pitch";
import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import Status from "@/components/status";
import Form from "@/components/Form";
const GameStatus = ({
  team1,
  team2,
  time,
  stadium,
  form1,
  form2,
  status,
}: {
  team1: string;
  team2: string;
  time: string;
  stadium: string;
  form1: string[];
  form2: string[];
  status: number;
}) => {
  return (
    <>
      <div className="flex text-xl font-stalinist w-10/12 justify-between">
        <div className="">
          <Status status={status} />
        </div>
        <div className="text-[10px] ">Players : 250</div>
      </div>
      <hr className="p-2 w-10/12" />
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <div className="text-left text-[#D8485F] sm:text-3xl text-lg ">
          {team1}
        </div>
        <Timer starttime={time} />
        <div className=" text-right text-[#B62DD3] sm:text-3xl text-lg ">
          {team2}
        </div>
      </div>
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <Form form={form1} />
        <p className="text-[8px] pt-2 text-slate-400">{stadium}</p>
        <Form form={form2} />
      </div>
    </>
  );
};
const PlayerProgress = ({ noPlayers }: { noPlayers: number }) => {
  return (
    <>
      <div className="flex font-stalinist text-[8px] justify-between">
        <p>Players Chosen</p>
        <p>{noPlayers + 1}/11</p>
      </div>
      <div className="flex bg-[url('/assets/progressborder.svg')] sm:w-[320px] h-[20px] bg-no-repeat bg-cover items-center justify-center ">
        {Array(10) // Create an array of 11 elements
          .fill(null) // Fill the array with null values
          .map((_, index) => (
            <div
              key={index}
              className={`w-[28px] h-3 rounded-sm bg-white ml-1 ${
                index < noPlayers ? "" : "opacity-0"
              }`}
            />
          ))}
        {noPlayers == 10 && (
          <div className="w-0 h-0 transform rotate-0 border-b-[11px] ml-1 border-b-transparent border-l-[10px] border-l-white border-r-[5px] border-r-transparent "></div>
        )}{" "}
      </div>
    </>
  );
};
const Dropdown = ({
  content,
  onOptionClick,
}: {
  content: string[];
  onOptionClick?: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const handleOptionClick = (option: string) => {
    onOptionClick?.(option); // Optional callback for option click
    toggleDropdown(); // Close the dropdown after clicking an option
  };

  return (
    <>
      <select
        className=" w-[370px] h-[35px] bg-[url('/assets/dropdown.svg')] p-2 bg-cover bg-no-repeat  bg-transparent font-stalinist border-none rounded-md  appearance-none focus:outline-none"
        name="players"
        id="players"
      >
        {content.map((option) => (
          <option
            key={option}
            value={option}
            className=" bg-[#0C0D3D] text-white text-[8px]"
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
function Page() {
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(true);
  interface Player {
    name: string;
    id: string;
    team:
      | "avatar"
      | "atlanta-united"
      | "austin"
      | "charlotte"
      | "chicago-fire"
      | "fc-cincinnati"
      | "columbus-crew"
      | "dc-united"
      | "inter-miami"
      | "cf-montreal"
      | "new-england-revolution"
      | "nycfc"
      | "orlando-city"
      | "philadelphia-union"
      | "toronto"
      | "colorado-rapids"
      | "fc-dallas"
      | "houston-dynamo"
      | "la-galaxy"
      | "lafc"
      | "minnesota-united"
      | "nashville"
      | "portland-timbers"
      | "real-salt-lake"
      | "san-jose-earthquakes"
      | "seattle-sounders"
      | "sporting-kc"
      | "st-louis-city"
      | "vancouver-whitecaps";
  }
  const [playerPositions, setPlayerPositions] = useState<Player[]>([
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose",
      id: "",
      team: "avatar",
    },
  ]);
  const [noPlayers, setnumberofPlayers] = useState(10); // Initial state

  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat w-full h-[1700px] overflow-hidden xl:h-[1800px] bg-[url('/assets/BG.svg')] justify-center bg-contain">
      <div>
        <Navbar />
      </div>
      <GameStatus
        team1={"orlando city"}
        team2={"inter miami"}
        time={"1000"}
        stadium={"Inter and co Patriots Point"}
        form1={["L", "L", "W", "W", "L"]}
        form2={["W", "L", "D", "W", "L"]}
        status={0}
      />
      <div className=" h-full flex gap-2 sm:justify-between justify-center sm:items w-10/12 sm:flex-row flex-col">
        <div className="w-1/2 sm:ml-6">
          <Pitch
            setindex={setindex}
            setOpen={setOpen}
            playerPositions={playerPositions}
            points={[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            showPoints={true}
          />
        </div>
        <div className=" flex flex-col sm:w-1/2 h-2/3 bg-no-repeat bg-contain bg-[url('/assets/FixBorder.svg')] mt-20 ml-20 justify-start items-start">
          <div className="mt-12 ml-16">
            <PlayerProgress noPlayers={noPlayers} />
          </div>
          <div className="flex  gap-20 mt-24  font-stalinist text-[10px] ml-28">
            <p className="text-[10px]">Chain</p>

            <p className="text-[10px]">token</p>
          </div>
          <div
            className="flex  gap-4 justify-start items-start w-full "
            style={{ transform: "scale(.60)" }}
          >
            <Dropdown
              content={["Avalanche", "Chain 1", "Chain 2", "Chain 3"]}
            />
            <Dropdown
              content={["Avalanche", "Chain 1", "Chain 2", "Chain 3"]}
            />
          </div>
          <div className="flex ml-52 mt-2">
            <img src="/assets/gas.png" alt="chain" className=" -mt-1" />
            <p className="text-[10px]  font-stalinist ">30 gwei</p>
          </div>
          <div className="mt-60 ml-52">
            <div
              className={`flex items-center justify-center bg-no-repeat bg-contain w-[210%] h-full `}
              style={{
                backgroundImage: `url('/assets/LoginBorder.svg')`,
              }}
            >
              <span className="text-sm font-stalinist flex justify-center self-center py-2 ">
                Bet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
