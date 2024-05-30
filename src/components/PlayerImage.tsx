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
function shortenName(name: string): string {
  const maxLength = 8;
  return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
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
        className={`absolute cursor-pointer   text-[11px] bg-slate-50 text-black  border-2 border-purple-600 font-stalinist text-center  ${
          index == 10
            ? "left-[40%] top-[15%]  self-center"
            : index == 9
            ? " top-[52%] sm:top-[59%] left-[6%] "
            : index == 8
            ? "top-[52%] sm:top-[59%] left-[28%]"
            : index == 7
            ? " top-[52%] sm:top-[59%] left-[53%]"
            : index == 6
            ? "top-[52%] sm:top-[59%] left-[76%]"
            : index == 5
            ? "top-[66%] sm:top-[83%] left-[15%]"
            : index == 4
            ? "top-[66%] sm:top-[83%] left-[40%]"
            : index == 3
            ? "top-[66%] sm:top-[83%] left-[65%]"
            : index == 2
            ? "top-[28%] sm:top-[35%] left-[15%]"
            : index == 1
            ? "top-[28%] sm:top-[35%] left-[40%]"
            : "top-[28%] sm:top-[35%] left-[65%]"
        } w-fit px-2`}
        onClick={onClick}
      >
        {shortenName(name)}
      </div>
      {showPoints ? (
        <div
          className={`absolute cursor-pointer px-2   text-[9px] bg-slate-50 text-black  border-2 border-purple-600 font-stalinist text-center ${
            index == 10
              ? "left-[40%] top-[18%]"
              : index == 9
              ? "top-[62%] left-[6%]"
              : index == 8
              ? "top-[62%] left-[28%]"
              : index == 7
              ? "top-[62%] left-[53%]"
              : index == 6
              ? "top-[62%] left-[76%]"
              : index == 5
              ? "top-[86%] left-[15%]"
              : index == 4
              ? "top-[86%] left-[40%]"
              : index == 3
              ? "top-[86%] left-[65%]"
              : index == 2
              ? "top-[38%] left-[15%]"
              : index == 1
              ? "top-[38%] left-[40%]"
              : "top-[38%] left-[65%]"
          }`}
          onClick={onClick}
        >
          {points[index]}
          {"  "}Points{" "}
          {index == captain ? "(C)" : index == viceCaptain ? "(VC)" : ""}
        </div>
      ) : (
        (index == captain || index == viceCaptain) && (
          <div
            className={`absolute cursor-pointer px-2   text-[9px] bg-purple-600 text-white  border-[1px] border-white font-stalinist text-center ${
              index == 10
                ? "left-[43%] top-[18%]"
                : index == 9
                ? "top-[62%] left-[9%]"
                : index == 8
                ? "top-[62%] left-[31%]"
                : index == 7
                ? "top-[62%] left-[56%]"
                : index == 6
                ? "top-[62%] left-[79%]"
                : index == 5
                ? "top-[86%] left-[18%]"
                : index == 4
                ? "top-[86%] left-[43%]"
                : index == 3
                ? "top-[86%] left-[68%]"
                : index == 2
                ? "top-[38%] left-[18%]"
                : index == 1
                ? "top-[38%] left-[43%]"
                : "top-[38%] left-[68%]"
            }`}
            onClick={onClick}
          >
            {index == captain ? "(C)" : index == viceCaptain ? "(VC)" : ""}
          </div>
        )
      )}
    </div>
  );
};

export default PlayerImage;
