import React from "react";

interface BatteryProps {
  step: number;
}

const Battery: React.FC<BatteryProps> = ({ step }) => {
  return (
    <div className="flex bg-[url('/assets/battery.svg')] sm:w-[150px] h-[530px] bg-no-repeat bg-cover items-center justify-center flex-col-reverse gap-2">
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={`w-[105px] h-[50px] rounded-sm bg-purple-600 shadow-2xl shadow-purple-700 ${
              index < step * 2 ? "animate-fill-drain" : "opacity-0"
            }`}
          />
        ))}
    </div>
  );
};

export default Battery;
