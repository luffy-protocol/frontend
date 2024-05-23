interface DigitBoxProps {
  value: string;
}

const DigitBox: React.FC<DigitBoxProps> = ({ value }) => (
  <div
    className="flex justify-center items-center bg-no-repeat bg-contain"
    style={{
      backgroundImage: `url('/assets/TimerBorder.svg')`,
      width: "28px",
      height: "28px",
    }}
  >
    <span className="text-md font-stalinist self-center">{value}</span>
  </div>
);

interface ScoreboxProps {
  home: string;
  away: string;
}

import React from "react";

const Scorebox: React.FC<ScoreboxProps> = ({ home, away }) => {
  return (
    <div className="flex justify-center items-center font-stalinist">
      {/* {days > 0 && (
        <div className="flex gap-1">
          <DigitBox value={formatTime(days)[0]} />
          <DigitBox value={formatTime(days)[1]} />
          <span className="text-md font-stalinist self-center">:</span>
        </div>
      )} */}
      <div className="flex gap-1">
        <DigitBox value={home[0]} />
        <DigitBox value={home[1]} />

        <span className="text-md font-stalinist self-center">:</span>
      </div>
      <div className="flex gap-1">
        <DigitBox value={away[0]} />
        <DigitBox value={away[1]} />
      </div>
    </div>
  );
};

export default Scorebox;
