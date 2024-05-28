import { useEffect, useState } from "react";
interface PlayerImageProps {
  name: string;
  index: number;
  player: Player;
  points: number[];
  showPoints: boolean;
  onClick: () => void;
  captain: number;
  viceCaptain: number;
}

interface Player {
  name: string;
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
const PlayerImage: React.FC<PlayerImageProps> = ({
  name,
  index,
  player,
  points,
  showPoints,
  onClick,
  captain,
  viceCaptain,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(`/teams/${player.team}.png`);

  useEffect(() => {
    setImageUrl(`/teams/${player.team}.png`);
  }, [player.team]);

  return (
    <div className=" h-full ml-10">
      <img
        src={imageUrl}
        alt={`Player ${index + 1}`}
        className={`absolute cursor-pointer  scale-125 mt-0 ${
          index == 10
            ? "left-[42%] top-[5%]"
            : index == 9
            ? " top-[40%] sm:top-[47%] left-[8%]"
            : index == 8
            ? "top-[40%] sm:top-[47%] left-[30%]"
            : index == 7
            ? " top-[40%] sm:top-[47%] left-[55%]"
            : index == 6
            ? "top-[40%] sm:top-[47%] left-[80%]"
            : index == 5
            ? "top-[64%] sm:top-[71%] left-[17%]"
            : index == 4
            ? "top-[64%] sm:top-[71%] left-[42%]"
            : index == 3
            ? "top-[64%]  sm:top-[71%] left-[67%]"
            : index == 2
            ? "top-[16%] sm:top-[23%] left-[17%]"
            : index == 1
            ? "top-[16%] sm:top-[23%] left-[42%]"
            : "top-[16%] sm:top-[23%] left-[67%]"
        } w-7 sm:w-7 md:w-10 lg:w-14`}
        onClick={onClick}
      />

      <div
        className={`absolute cursor-pointer   text-sm bg-slate-50 text-black rounded-md text-center  ${
          index == 10
            ? "left-[42%] top-[15%]  self-center"
            : index == 9
            ? " top-[52%] sm:top-[59%] left-[8%] "
            : index == 8
            ? "top-[52%] sm:top-[59%] left-[30%]"
            : index == 7
            ? " top-[52%] sm:top-[59%] left-[55%]"
            : index == 6
            ? "top-[52%] sm:top-[59%] left-[78%]"
            : index == 5
            ? "top-[66%] sm:top-[83%] left-[17%]"
            : index == 4
            ? "top-[66%] sm:top-[83%] left-[42%]"
            : index == 3
            ? "top-[66%] sm:top-[83%] left-[67%]"
            : index == 2
            ? "top-[28%] sm:top-[35%] left-[17%]"
            : index == 1
            ? "top-[28%] sm:top-[35%] left-[42%]"
            : "top-[28%] sm:top-[35%] left-[67%]"
        } w-fit px-2`}
        onClick={onClick}
      >
        {name}
      </div>
      {showPoints && (
        <div
          className={`absolute cursor-pointer text-[5px] md:text-xs mt-1 mr-5 px-1 font-semibold text-black rounded-md bg-slate-50 ${
            index == 10
              ? "left-[42%] top-[18%]"
              : index == 9
              ? "top-[62%] left-[8%]"
              : index == 8
              ? "top-[62%] left-[30%]"
              : index == 7
              ? "top-[62%] left-[55%]"
              : index == 6
              ? "top-[62%] left-[78%]"
              : index == 5
              ? "top-[86%] left-[17%]"
              : index == 4
              ? "top-[86%] left-[42%]"
              : index == 3
              ? "top-[86%] left-[67%]"
              : index == 2
              ? "top-[38%] left-[17%]"
              : index == 1
              ? "top-[38%] left-[42%]"
              : "top-[38%] left-[67%]"
          }`}
          onClick={onClick}
        >
          {points[index]}
          {"  "}Points{" "}
          {index == captain ? "(C)" : index == viceCaptain ? "(VC)" : ""}
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
