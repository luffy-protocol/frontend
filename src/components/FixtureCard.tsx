import React from "react";
import Timer from "./Timer";
import Status from "./status";
import Button from "./Button";

interface CardProps {
  className?: string; // Optional class for additional styling
}
interface FixtureDetails {
  away_id: number;
  away_name: string;
  away_logo: string; // added for logo
  date: string;
  fixture_id: number;
  home_id: number;
  home_name: string;
  home_logo: string; // added for logo
  id: number;
  starttime: string;
  venue: string;
}

const FixtureCard: React.FC<{ fixture: FixtureDetails; status: number }> = ({
  fixture,
  status,
}) => {
  return (
    <div
      className={`flex items-center justify-evenly  bg-no-repeat bg-contain xl:h-[165px] h-[140px]`}
      style={{ backgroundImage: `url('/assets/Border.svg')`, width: "100%" }}
    >
      <div className="flex flex-col justify-center items-center ">
        <div className="text-[10px] font-stalinist mb-1">Starts in</div>

        <div className="flex gap-4 items-center justify-center ">
          <div className="flex flex-col items-center">
            <p className="font-bold text-2xl font-stalinist text-[#D8485F] max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
              {fixture.home_name}
            </p>
            <div className=" self-start text-[12px] flex gap-1 font-stalinist">
              <p>W</p>
              <p>L</p>
              <p>W</p>
              <p>W</p> <p>D</p>
            </div>
          </div>
          <div className=" self-start">
            {" "}
            <Timer starttime={fixture.starttime} />
          </div>

          <div className="flex flex-col ">
            <div className="overflow-x-auto max-w-[260px]">
              <p className="font-bold text-2xl font-stalinist text-[#B62DD3] text-ellipsis whitespace-nowrap">
                {fixture.away_name}
              </p>
            </div>
            <div className="self-end text-[12px] flex gap-1 font-stalinist">
              <p>W</p>
              <p>L</p>
              <p>W</p>
              <p>W</p> <p>D</p>
            </div>
          </div>
        </div>
        <div className="text-[10px] font-stalinist text-gray-400 ">
          {fixture.venue}
        </div>
      </div>

      <div className=" justify-end font-stalinist">
        <div className="flex flex-col justify-start gap-3 ">
          <Status status={status} />

          <Button id={fixture.fixture_id} />

          <div className="text-[10px]">Players : 250</div>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
