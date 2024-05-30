import { chainToExplorer } from "@/utils/constants";
import { url } from "inspector";
import React, { useState } from "react";

const TxHash = ({
  chain,
  hash,
  confirmed,
}: {
  chain: number;
  hash: string;
  confirmed: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const url = chainToExplorer[chain] + hash;
  return (
    <button
      className="cursor-pointer ml-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(url, "_blank")}
    >
      <div className="relative inline-block">
        {/* <p className="text-purple-600 border-2 z-10 border-red-500 px-0.5 pr-1  text-center text-[10px]  py-0  hover:text-blue-500 cursor-pointer font-stalinist">
          0x
        </p> */}
        <p className=" text-center text-lg cursor-pointer font-stalinist hover:scale-105">
          ℹ️
        </p>

        {isVisible && (
          <div className="absolute top-full left-0 mt-2 text-xs z-20 bg-gray-800 text-purple-600  rounded-md shadow-sm p-2 w-fit text-nowrap font-stalinist">
            {confirmed ? (
              <p className="text-green-600">Tx Confirmed ✅</p>
            ) : (
              <p className="text-yellow-600">Tx Pending ⏳</p>
            )}

            <p className="ml-3">{`${hash.slice(0, 6)} ... ${hash.slice(
              hash.length - 6
            )}`}</p>
          </div>
        )}
      </div>
    </button>
  );
};

export default TxHash;
