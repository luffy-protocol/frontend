import React from "react";
import Timer from "./Timer";
import Status from "./Status";
import Button from "./Button";

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
      className={`flex items-center justify-evenly  bg-no-repeat bg-contain 2xl:h-[150px] xl:h-[130px] h-[110px]`}
      style={{ backgroundImage: `url('/assets/Border.svg')`, width: "100%" }}
    >
      <div className="flex flex-col  items-center ">
        <div className="text-[10px] font-stalinist mb-1">Starts in</div>

        <div className="flex gap-4 items-center justify-center ">
          <div className="flex flex-col items-center">
            <p className="font-bold  text-xl xl:text-2xl font-stalinist text-[#D8485F] min-w-[180px] max-w-[180px]  xl:min-w-[260px] xl:max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
              {fixture.home_name}
              {/* Orlando */}
            </p>
            <div className=" self-start text-[10px] xl:text-[12px] flex gap-1 font-stalinist">
              <p>W</p>
              <p>L</p>
              <p>W</p>
              <p>W</p> <p>D</p>
            </div>
          </div>
          <div className=" self-start">
            {" "}
            <Timer
              starttime={fixture.starttime}
              // starttime={"2022-09-30T14:00:00Z"}
            />
          </div>

          <div className="flex flex-col text-right">
            <div className="overflow-x-auto max-w-[180px]   min-w-[180px]  xl:min-w-[260px] xl:max-w-[260px]">
              <p className="font-bold  text-xl xl:text-2xl font-stalinist text-[#B62DD3] min-w-[180px] max-w-[180px]  xl:min-w-[260px] xl:max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                {fixture.away_name}
                {/* Inter Miami */}
              </p>
            </div>
            <div className="self-end text-[10px] xl:text-[12px] flex gap-1 font-stalinist">
              <p>W</p>
              <p>L</p>
              <p>W</p>
              <p>W</p> <p>D</p>
            </div>
          </div>
        </div>
        <div className="text-[10px] font-stalinist text-gray-400 ">
          {fixture.venue}
          {/* inter $ co */}
        </div>
      </div>

      <div className=" justify-end font-stalinist">
        <div className="flex flex-col justify-start gap-3 ">
          <Status status={status} />
          {/* <Status status={1} /> */}

          <Button
            id={fixture.fixture_id}
            // id={1}
          />

          <div className="text-[10px]">Players : 250</div>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
