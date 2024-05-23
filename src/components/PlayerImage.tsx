import { useEffect, useState } from "react";
interface PlayerImageProps {
  name: string;
  index: number;
  player: Player;
  points: number[];
  showPoints: boolean;
  onClick: () => void;
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
}) => {
  const [imageUrl, setImageUrl] = useState<string>(`/teams/${player.team}.png`);

  useEffect(() => {
    setImageUrl(`/teams/${player.team}.png`);
  }, [player.team]);

  return (
    <a href="#choose">
      <img
        src={imageUrl}
        alt={`Player ${index + 1}`}
        className={`absolute cursor-pointer w-16 mt-20 ${
          index == 10
            ? "left-[42%] top-[0%]"
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
        className={`absolute cursor-pointer sm:text-xs text-[5px] mt-10 mr-3 px-1 bg-slate-50 text-black rounded-md text-center  ${
          index == 10
            ? "left-[42%] top-[0%]"
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
        } w-7 md:w-14`}
        onClick={onClick}
      >
        {name}
      </div>
      {showPoints && (
        <div
          className={`absolute cursor-pointer text-[5px] md:text-xs mt-1 mr-5 px-1 bg-slate-50 text-black rounded-md ${
            index == 10
              ? "left-[42%] top-[14%]"
              : index == 9
              ? "top-[61%] left-[8%]"
              : index == 8
              ? "top-[61%] left-[30%]"
              : index == 7
              ? "top-[61%] left-[55%]"
              : index == 6
              ? "top-[61%] left-[80%]"
              : index == 5
              ? "top-[85%] left-[17%]"
              : index == 4
              ? "top-[85%] left-[42%]"
              : index == 3
              ? "top-[85%] left-[67%]"
              : index == 2
              ? "top-[37%] left-[17%]"
              : index == 1
              ? "top-[37%] left-[42%]"
              : "top-[37%] left-[67%]"
          }`}
          onClick={onClick}
        >
          {points[index]}
          {"  "}Points
        </div>
      )}
    </a>
  );
};

export default PlayerImage;
