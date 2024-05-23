"use client";
import React, { useState } from "react";
import Pitch from "@/components/Pitch";
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
    <div className="container mx-auto px-4 py-8 flex gap-2">
      <div className="h-10">
        <Pitch
          setindex={setindex}
          setOpen={setOpen}
          playerPositions={playerPositions}
          points={[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          showPoints={true}
        />
      </div>
      <div>hi</div>
    </div>
  );
}

export default Page;
