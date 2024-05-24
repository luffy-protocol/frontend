import { playerimg } from "@/utils/logos/playerImage";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ArrowButton from "./ArrowButton";
import { getPlayerById } from "@/utils/playerHelpers/FetchPlayerById";

interface PlayerCardProps {
  id: number;
}

const PlayerDetailCard: React.FC<PlayerCardProps> = ({ id }) => {
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

  return playerDetails(playerData, id);
};

export default PlayerDetailCard;

const playerDetails = (playerData: any, id: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 font-stalinist">
      {playerData && (
        <>
          <img
            src={playerimg(id)}
            alt=""
            className="border border-gradient-[#D8485F,##B62DD3]"
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
            <div
              className={`flex items-center justify-center bg-no-repeat bg-contain h-[50px]`}
              style={{
                backgroundImage: `url('/assets/vc.png')`,
              }}
            >
              <span className="text-[10px] font-stalinist flex justify-center self-center px-3 py-2 ">
                Vice Captain
              </span>
            </div>

            <div
              className={`flex items-center justify-center bg-no-repeat bg-contain h-[50px]`}
              style={{
                backgroundImage: `url('/assets/cap.png')`,
              }}
            >
              <span className="text-[10px] font-stalinist flex justify-center self-center px-8 py-3 ">
                Captain
              </span>
            </div>
          </div>
          <div
            className={`flex items-center justify-center bg-no-repeat bg-contain  h-full`}
            style={{
              backgroundImage: `url('/assets/AddPlayer.png')`,
            }}
          >
            <span className="text-sm font-stalinist flex justify-center self-center px-3 py-2 ">
              Add Player
            </span>
          </div>
        </>
      )}
    </div>
  );
};
