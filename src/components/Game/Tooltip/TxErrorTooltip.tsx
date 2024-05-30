import { chainToExplorer } from "@/utils/constants";
import { url } from "inspector";
import React, { useState } from "react";

const TxErrorTooltip = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  return (
    <button
      className="cursor-pointer ml-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative inline-block">
        {/* <p className="text-purple-600 border-2 z-10 border-red-500 px-0.5 pr-1  text-center text-[10px]  py-0  hover:text-blue-500 cursor-pointer font-stalinist">
          0x
        </p> */}
        <p className="    text-center text-lg cursor-pointer font-stalinist hover:scale-105">
          ℹ️
        </p>

        {isVisible && (
          <div className="absolute -top-[25px] left-[25px]  text-xs bg-gray-800 text-purple-600 rounded-md shadow-sm p-2 w-[190px] font-stalinist">
            <p className="text-red-500 w-full">{message}</p>
          </div>
        )}
      </div>
    </button>
  );
};

export default TxErrorTooltip;
