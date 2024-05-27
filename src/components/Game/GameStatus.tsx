import Form from "./Form";
import Timer from "../Timer";
import Status from "../status";

interface GameStatusProps {
  team1: string;
  team2: string;
  time: string;
  stadium: string;
  form1: string[];
  form2: string[];
  status: number;
  playersCount: number;
}
export default function GameStatus({
  team1,
  team2,
  time,
  stadium,
  form1,
  form2,
  status,
  playersCount,
}: GameStatusProps) {
  return (
    <>
      <div className="flex text-xl font-stalinist w-10/12 justify-between">
        <div className="">
          <Status status={status} />
        </div>
        <div className="text-[10px] ">Players : {playersCount}</div>
      </div>
      <hr className="p-2 w-10/12" />
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <div className="text-left text-[#D8485F] sm:text-3xl text-lg w-1/4 text-wrap ">
          {team1}
        </div>
        <Timer starttime={time} />
        <div className=" text-right text-[#B62DD3] sm:text-3xl text-lg w-1/4 text-wrap">
          {team2}
        </div>
      </div>
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <Form form={form1} />
        <p className="text-[8px] pt-2 text-slate-400">{stadium}</p>
        <Form form={form2} />
      </div>
    </>
  );
}
