import Form from "./Form";
import Timer from "../Timer";
import Status from "../status";
import { useEffect, useRef, useState } from "react";

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
  const [homeScrolling, setHomeScrolling] = useState(false);
  const [awayScrolling, setAwayScrolling] = useState(false);
  const homeTextRef = useRef(null);
  const awayTextRef = useRef(null);

  useEffect(() => {
    const checkOverflow = (element: any, setScrolling: any) => {
      if (element && element.scrollWidth > element.clientWidth) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    checkOverflow(homeTextRef.current, setHomeScrolling);
    checkOverflow(awayTextRef.current, setAwayScrolling);
  }, [team1, team2]);
  return (
    <>
      <div className="flex text-xl font-stalinist w-10/12 justify-between">
        <div>
          <Status status={status} />
        </div>
        <div className="text-[10px]">Players: {playersCount}</div>
      </div>
      <hr className="p-2 w-10/12" />
      <div className="flex font-stalinist capitalize justify-between w-10/12">
        <div className="overflow-hidden relative w-[30%]">
          <p
            ref={homeTextRef}
            className={`${
              homeScrolling ? "scrolling-text" : ""
            } text-left text-[#D8485F] sm:text-3xl text-lg overflow-x-scroll whitespace-nowrap`}
          >
            {team1}
          </p>
        </div>
        <Timer starttime={time} />
        <div className="overflow-hidden relative w-[30%]">
          <p
            ref={awayTextRef}
            className={`${
              awayScrolling ? "scrolling-text" : ""
            } text-right text-[#B62DD3] sm:text-3xl text-lg overflow-x-scroll whitespace-nowrap`}
          >
            {team2}
          </p>
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
