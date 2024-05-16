import { useState, useEffect } from "react";
import { getPlayerById } from "@/utils/playerHelpers/FetchPlayerById";
import { playerimg } from "@/utils/logos/playerImage";

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

interface PlayerCardProps {
  playerId: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playerId }) => {
  const [playerData, setPlayerData] = useState<Player | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        console.log(playerId);
        const data = getPlayerById(playerId);
        console.log(data);
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!playerData) {
    return <div>No player data available</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-32 h-32 rounded-full mx-auto mt-4 "
        src={playerimg(playerData.player.id)}
        alt={playerData.player.name}
      />
      <div className="p-6 text-black">
        <h2 className="text-xl font-bold mb-2 text-center">
          Name: {playerData.player.name}
        </h2>
        <p className="text-gray-700 text-base">
          Position: {playerData.statistics[0].games?.position}
        </p>
        <p className="text-gray-700 text-base">Age: {playerData.player.age}</p>
        <p className="text-gray-700 text-base">
          Team: {playerData.statistics[0].team.name}
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;
