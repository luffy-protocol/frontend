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
        <div className="flex w-1/2 h-2/3 bg-no-repeat bg-contain bg-[url('/assets/FixBorder.svg')] mt-20 ml-20"></div>
      </div>
    </div>
  );
}

export default Page;
