"use client";
import React, { useState } from "react";
import Pitch from "@/components/Pitch";
import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import Status from "@/components/status";
import Form from "@/components/Form";
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
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
    {
      name: "Choose Player",
      id: "",
      team: "avatar",
    },
  ]);
  const [noPlayers, setnumberofPlayers] = useState(5); // Initial state

  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat w-full h-[1700px] overflow-hidden xl:h-[1800px] bg-[url('/assets/BG.svg')] justify-center bg-contain">
      <div>
        <Navbar />
      </div>
      <div className="flex text-xl font-stalinist w-10/12 justify-between">
        <div className="">
          <Status status={0} />
        </div>
        <div className="text-[10px] ">Players : 250</div>
      </div>
      <hr className="p-2 w-10/12" />
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <div className="text-left text-[#D8485F] sm:text-3xl text-lg ">
          orlando city
        </div>
        <Timer starttime={"100000"} />
        <div className=" text-right text-[#B62DD3] sm:text-3xl text-lg ">
          inter miami
        </div>
      </div>
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <Form form={["W", "L", "D", "W", "L"]} />
        <p className="text-[8px] pt-2 text-slate-400">
          Inter and co Patriots Point{" "}
        </p>
        <Form form={["L", "L", "W", "W", "L"]} />
      </div>
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
        <div className=" flex w-1/2 h-2/3 bg-no-repeat bg-contain bg-[url('/assets/FixBorder.svg')] mt-20 ml-20 justify-center items-center">
          <div className=" -mt-[850px]">
            <div className="flex font-stalinist text-[8px] p-1 justify-between">
              <p>Players Chosen</p>
              <p>{noPlayers + 1}/11</p>
            </div>
            <div className="flex gap-0.1 bg-[url('/assets/progressborder.svg')] w-10/11 bg-no-repeat bg-cover items-center justify-center">
              {Array(10) // Create an array of 11 elements
                .fill(null) // Fill the array with null values
                .map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-1.5 bg-white mt-1 ml-1 ${
                      index < noPlayers ? "" : "opacity-0"
                    }`}
                  />
                ))}
              {noPlayers == 10 && (
                <div className="w-0 h-0 transform rotate-0 border-b-[6px] ml-1 border-b-transparent border-l-[10px] border-l-white border-r-[5px] border-r-transparent mt-1"></div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
