import { playerimg } from "@/utils/logos/playerImage";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ArrowButton from "./ArrowButton";
import { getPlayerById } from "@/utils/player/fetchPlayerById";

interface PlayerCardProps {
  id: number;
  setPlayerPositions: (player: any) => void;
  setopen: (open: boolean) => void;
  index: number;
  setCaptain: (captain: any) => void;
  setViceCaptain: (viceCaptain: any) => void;
}

const PlayerDetailCard: React.FC<PlayerCardProps> = ({
  id,
  setPlayerPositions,
  setopen,
  index,
  setCaptain,
  setViceCaptain,
}) => {
  const [playerData, setplayerData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("loadinxg");
        const data = await getPlayerById(id);
        setplayerData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PlayerDetails
      id={id}
      playerData={playerData}
      setPlayerPositions={setPlayerPositions}
      setopen={setopen}
      index={index}
      setCaptain={setCaptain}
      setViceCaptain={setViceCaptain}
    />
  );
};

export default PlayerDetailCard;

const shortForm: { [key: string]: string } = {
  "Atlanta United FC": "atlanta-united",
  Austin: "austin",
  Charlotte: "charlotte",
  "Chicago Fire": "chicago-fire",
  "Colorado Rapids": "colorado-rapids",
  "Columbus Crew": "columbus-crew",
  "DC United": "dc-united",
  "FC Cincinnati": "fc-cincinnati",
  "FC Dallas": "fc-dallas",
  "Houston Dynamo": "houston-dynamo",
  "Inter Miami": "inter-miami",
  "Los Angeles FC": "lafc",
  "Los Angeles Galaxy": "la-galaxy",
  "Minnesota United FC": "minnesota-united",
  "Montreal Impact": "cf-montreal",
  "Nashville SC": "nashville",
  "New England Revolution": "new-england-revolution",
  "New York City FC": "nycfc",
  "New York Red Bulls": "new-york-red-bulls",
  "Orlando City SC": "orlando-city",
  "Philadelphia Union": "philadelphia-union",
  "Portland Timbers": "portland-timbers",
  "Real Salt Lake": "real-salt-lake",
  "San Jose Earthquakes": "san-jose-earthquakes",
  "Seattle Sounders": "seattle-sounders",
  "Sporting Kansas City": "sporting-kc",
  "St. Louis City": "st-louis-city",
  "Toronto FC": "toronto",
  "Vancouver Whitecaps": "vancouver-whitecaps",
};

interface PlayerDetailProps {
  id: number;
  index: number;
  playerData: any;
  setPlayerPositions: (player: any) => void;
  setopen: (open: boolean) => void;
  setCaptain: (captain: any) => void;
  setViceCaptain: (viceCaptain: any) => void;
}

const PlayerDetails: React.FC<PlayerDetailProps> = ({
  playerData,
  id,
  setopen,
  setPlayerPositions,
  index,
  setCaptain,
  setViceCaptain,
}) => {
  const updatePlayerPosition = (index: number, newPlayerData: any) => {
    setPlayerPositions((prevPositions: any) => {
      // Create a copy of the state to avoid mutation
      const updatedPositions = [...prevPositions];

      // Ensure the index is within valid bounds
      if (index >= 0 && index < updatedPositions.length) {
        updatedPositions[index] = newPlayerData; // Replace the entire player entry
      } else {
        console.error(`Invalid index: ${index}`);
      }

      return updatedPositions;
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 font-stalinist">
      {playerData && (
        <>
          <img
            src={playerimg(id)}
            alt=""
            className="border border-gradient-[#D8485F,#B62DD3]"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="font-stalinist text-2xl text-gradient">
              {playerData?.player.name}
            </div>
            <div className="flex justify-between w-[320px] text-[13px] text-[#FFFFFF] text-opacity-30">
              <div>{playerData?.statistics[0].team.name}</div>
              <div>{playerData?.statistics[0].games.position}</div>
            </div>
          </div>
          <div className="flex gap-10 justify-between self-start text-[12px] w-[360px]">
            <div className="flex flex-col gap-3 justify-center items-center ">
              <div className="flex justify-between w-[170px]">
                <div>Appearances</div>{" "}
                <div> {playerData?.statistics[0].games.appearences}</div>
              </div>
              <div>
                <div className="text-[#D8485F]">Attacking</div>
              </div>
              <div className="flex justify-between w-[170px]">
                <div>Goals</div>{" "}
                <div> {playerData?.statistics[0].goals.total || 0}</div>
              </div>{" "}
              <div className="flex justify-between w-[170px]">
                <div>Assists</div>{" "}
                <div> {playerData?.statistics[0].goals.assists || 0}</div>
              </div>{" "}
              <div className="flex justify-between w-[170px]">
                <div>Passes</div>{" "}
                <div> {playerData?.statistics[0].passes.total || 0}</div>
              </div>
              <div className="flex justify-between w-[170px]">
                <div>Key Passes</div>{" "}
                <div> {playerData?.statistics[0].passes.key || 0}</div>
              </div>{" "}
              <div className="flex justify-between w-[170px]">
                <div>Pass Acc</div>{" "}
                <div> {playerData?.statistics[0].passes.accuracy || 0}%</div>
              </div>
              <div className="flex justify-between w-[165px]">
                <div>Yellow Cards</div>{" "}
                <div> {playerData?.statistics[0].cards.yellow || 0}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center self-end items-center">
              <div className="flex justify-between w-[165px]">
                <div>Rating</div>{" "}
                <div>
                  {" "}
                  {Number(playerData?.statistics[0].games.rating).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[#D8485F]">Defending</div>
              </div>
              <div className="flex justify-between w-[165px]">
                <div>Tackles</div>{" "}
                <div> {playerData?.statistics[0].tackles.total || 0}</div>
              </div>
              <div className="flex justify-between w-[165px]">
                <div>Block</div>{" "}
                <div> {playerData?.statistics[0].tackles.blocks || 0}</div>
              </div>{" "}
              <div className="flex justify-between w-[165px]">
                <div>Interception</div>{" "}
                <div>
                  {" "}
                  {playerData?.statistics[0].tackles.interceptions || 0}
                </div>
              </div>
              <div className="flex justify-between w-[165px]">
                <div>Duels Won</div>{" "}
                <div> {playerData?.statistics[0].duels.won || 0}</div>
              </div>
              <div className="flex justify-between w-[165px]">
                <div>Fouls</div>{" "}
                <div> {playerData?.statistics[0].fouls.committed || 0}</div>
              </div>{" "}
              <div className="flex justify-between w-[165px]">
                <div>Red Cards</div>{" "}
                <div> {playerData?.statistics[0].cards.red || 0}</div>
              </div>{" "}
            </div>
          </div>
          <div className="flex justify-between items-center w-[360px]">
            <button
              className={`flex items-center justify-center bg-no-repeat bg-contain h-[50px]`}
              style={{
                backgroundImage: `url('/assets/vcap.png')`,
              }}
              onClick={() => {
                if (playerData) {
                  setViceCaptain(index);
                  updatePlayerPosition(index, {
                    name: playerData?.player.name,
                    id: playerData?.player.id as any,
                    team: shortForm[
                      playerData?.statistics[0].team.name as string
                    ],
                  });
                  setopen(false);
                }
              }}
            >
              <span className="text-[10px] font-stalinist flex justify-center self-center px-3 py-2 ">
                Vice Captain
              </span>
            </button>

            <button
              className={`flex items-center justify-center bg-no-repeat bg-contain h-[50px]`}
              style={{
                backgroundImage: `url('/assets/cap.png')`,
              }}
              onClick={() => {
                if (playerData) {
                  setCaptain(index);
                  updatePlayerPosition(index, {
                    name: playerData?.player.name,
                    id: playerData?.player.id as any,
                    team: shortForm[
                      playerData?.statistics[0].team.name as string
                    ],
                  });
                  setopen(false);
                }
              }}
            >
              <span className="text-[10px] font-stalinist flex justify-center self-center px-8 py-3 ">
                Captain
              </span>
            </button>
          </div>
          <button
            className={`flex items-center justify-center bg-no-repeat bg-contain  h-full`}
            style={{
              backgroundImage: `url('/assets/ap.png')`,
            }}
            onClick={() => {
              console.log(playerData?.statistics[0].team.name);

              updatePlayerPosition(index, {
                name: playerData?.player.name,
                id: playerData?.player.id as any,
                team: shortForm[playerData?.statistics[0].team.name as string],
              });
              setopen(false);
            }}
          >
            <span className="text-sm font-stalinist flex justify-center self-center px-3 py-2 ">
              Add Player
            </span>
          </button>
        </>
      )}
    </div>
  );
};

// onClick={() => {
//   console.log(person);

//   updatePlayerPosition(index, {
//     id: person.id as any,
//     name: person.name,
//     team: person.team as any,
//     type: person.role as any,
//   });
//   setOpen(false);
// }}
