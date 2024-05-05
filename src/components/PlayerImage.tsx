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
    | "plain"
    | "csk"
    | "rcb"
    | "mi"
    | "dc"
    | "kkr"
    | "pbks"
    | "rr"
    | "srh"
    | "gt"
    | "lsg"
    | "pkbs"
    | "dc";
  type: "bat" | "bowl" | "ar" | "wk";
}
const PlayerImage: React.FC<PlayerImageProps> = ({
  name,
  index,
  player,
  points,
  showPoints,
  onClick,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(
    `/players/plain/${player.type}.png`
  );

  useEffect(() => {
    setImageUrl(`/players/${player.team}/${player.type}.png`);
  }, [player.team, player.type]);

  return (
    <>
      <img
        src={imageUrl}
        alt={`Player ${index + 1}`}
        className={`absolute cursor-pointer w-16 mt-8 ${
          index == 10
            ? "left-[42%]"
            : index == 9
            ? "top-[47%] left-[5%]"
            : index == 8
            ? "top-[47%] left-[30%]"
            : index == 7
            ? "top-[47%] left-[55%]"
            : index == 6
            ? "top-[47%] left-[80%]"
            : index == 5
            ? "top-[71%] left-[17%]"
            : index == 4
            ? "top-[71%] left-[42%]"
            : index == 3
            ? "top-[71%] left-[67%]"
            : index == 2
            ? "top-[23%] left-[17%]"
            : index == 1
            ? "top-[23%] left-[42%]"
            : "top-[23%] left-[67%]"
        }`}
        onClick={onClick}
      />
      <div
        className={`absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black rounded-md  ${
          index == 10
            ? "left-[42%]"
            : index == 9
            ? "top-[47%] left-[5%]"
            : index == 8
            ? "top-[47%] left-[30%]"
            : index == 7
            ? "top-[47%] left-[55%]"
            : index == 6
            ? "top-[47%] left-[80%]"
            : index == 5
            ? "top-[71%] left-[17%]"
            : index == 4
            ? "top-[71%] left-[42%]"
            : index == 3
            ? "top-[71%] left-[67%]"
            : index == 2
            ? "top-[23%] left-[17%]"
            : index == 1
            ? "top-[23%] left-[42%]"
            : "top-[23%] left-[67%]"
        }`}
        onClick={onClick}
      >
        {name}
      </div>
      {showPoints && (
        <div
          className="absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black rounded-md"
          onClick={onClick}
        >
          {points[index]}
          {"  "}Points
        </div>
      )}
    </>
  );
};

export default PlayerImage;
