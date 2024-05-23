"use client";
import React, { useState } from "react";
import Pitch from "@/components/Pitch";
import Navbar from "@/components/Navbar";
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
    <div className="flex flex-col px-10 items-center bg-no-repeat bg-contain w-full h-[1700px] overflow-hidden xl:h-[1800px] bg-[url('/assets/BG.svg')]">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="w-full h-full flex">
        <div className="w-1/3 ml-10">
          <Pitch
            setindex={setindex}
            setOpen={setOpen}
            playerPositions={playerPositions}
            points={[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            showPoints={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
