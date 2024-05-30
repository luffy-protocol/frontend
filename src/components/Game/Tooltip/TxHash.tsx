import { chainToExplorer } from "@/utils/constants";
import { url } from "inspector";
import React, { useState } from "react";

const TxHash = ({ chainid, hash }: { chainid: number; hash: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const url = chainToExplorer[chainid] + hash;
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(url, "_blank")}
    >
      <div className="relative inline-block">
        <p className="text-purple-600 border-2 z-10 border-red-500 px-0.5 pr-1  text-center text-[10px]  py-0  hover:text-blue-500 cursor-pointer font-stalinist">
          0x
        </p>
        {isVisible && (
          <div className="absolute top-full left-0 mt-2 text-xs z-20 bg-gray-800 text-purple-600  rounded-md shadow-sm p-2 w-fit text-nowrap font-stalinist">
            <p>{`${hash.slice(0, 8)}` + `...`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TxHash;
