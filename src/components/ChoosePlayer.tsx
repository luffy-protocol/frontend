import React, { use, useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerDetailCard from "./PlayerDetailCard";
import { getPlayerByTeamId } from "@/utils/playerHelpers/FetchPlayerByTeamId";

interface ChoosePlayerProps {
  setopen: (open: boolean) => void;
  index: number;
  setPlayerPositions: (player: any) => void;
  hometeam: number;
  awayteam: number;
  setCaptain: (captain: any) => void;
  setViceCaptain: (viceCaptain: any) => void;
}

interface Player {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: null | number;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: null | number;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number | null;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: null | number;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      yellowred: number;
      red: number;
    };
    penalty: {
      won: null | number;
      commited: null | number;
      scored: number;
      missed: number;
      saved: null | number;
    };
  }[];
}

const ChoosePlayer: React.FC<ChoosePlayerProps> = ({
  setopen,
  index,
  setPlayerPositions,
  hometeam,
  awayteam,
  setCaptain,
  setViceCaptain,
}) => {
  const [playerData, setplayerData] = useState<Player[] | undefined>(undefined);

  const [playerId, setPlayerId] = useState<number>(0);
  const [TeamData, setTeamData] = useState<any>(null);

  useEffect(() => {
    console.log(index);
    const data = getPlayerByTeamId(hometeam, awayteam);

    const positions = [
      { position: "Goalkeeper", indices: [10] },
      { position: "Defender", indices: [0, 1, 2] },
      { position: "Midfielder", indices: [6, 7, 8, 9] },
      { position: "Attacker", indices: [3, 4, 5] },
    ];

    const filteredPlayerData = positions.find((pos) =>
      pos.indices.includes(index)
    );

    if (filteredPlayerData) {
      const filterData = data?.filter(
        (item: any) =>
          item.statistics[0].games.position === filteredPlayerData.position
      );
      console.log(filterData);
      setplayerData(filterData);
    }
  }, [index, hometeam, awayteam]);

  return (
    <div
      className={`flex flex-col items-center justify-center  bg-no-repeat bg-contain bg-center  h-[700px] w-[800px] xl:h-[750px] xl:w-[900px] self-center`}
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

      <div className="flex gap-2 w-full mt-9 lg:w-[90%]">
        <div className="flex flex-col gap-2 w-full max-h-[520px] overflow-y-scroll scrollbar-custom">
          <div className="flex flex-col gap-2 w-full">
            {/* Map over the data array and render a PlayerCard component for each player */}
            {playerData?.map((item, index) => (
              <PlayerCard
                key={index}
                id={item.player.id}
                setPlayerId={setPlayerId}
              /> // Assuming player ID is available in item.player.id
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <PlayerDetailCard
            id={playerId}
            setopen={setopen}
            setPlayerPositions={setPlayerPositions}
            index={index}
            setCaptain={setCaptain}
            setViceCaptain={setViceCaptain}
          />
        </div>
      </div>
    </div>
  );
};

export default ChoosePlayer;
