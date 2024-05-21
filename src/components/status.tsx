import React from "react";

interface StatusProps {
  status: number;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className="flex gap-1  items-center">
      <div
        className={`w-3 h-3 rounded-full ${status == 0 ? "bg-green-500" : status == 1 ? "bg-gray-500" : status == 2 ? " bg-yellow-500" : status == 3 ? "bg-red-300" : status == 4 ? "bg-red-500" : ""} `}
      ></div>
      <div className="text-center text-[10px]">
        {status == 0
          ? "Open Now"
          : status == 1
            ? "Ongoing"
            : status == 2
              ? " Claim Now"
              : status == 3
                ? "Expired"
                : status == 4
                  ? "Completed"
                  : ""}
      </div>
    </div>
  );
};

export default Status;
