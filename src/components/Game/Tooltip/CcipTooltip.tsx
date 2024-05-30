import { dropdownElements } from "@/utils/constants";
import React, { useState } from "react";

const CcipTooltip = ({ chain }: { chain: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="relative inline-block ">
      <p
        className="text-purple-600 border-2 border-red-500 px-0.5 pr-1  text-center text-[10px]  py-0  hover:text-blue-500 cursor-pointer font-stalinist"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ?
      </p>
      {isVisible && (
        <div className="absolute bottom-full left-0 mb-2 text-xs bg-gray-800 text-purple-600  rounded-md shadow-sm p-2 w-fit text-nowrap font-stalinist">
          <p>Sends a cross chain tx</p>
          <p>
            from{" "}
            <span className="text-blue-500">
              {dropdownElements.chains[chain != 0 ? chain - 1 : 0].name}
            </span>{" "}
            {"->"} <span className="text-red-500">Avax</span>{" "}
          </p>
          <p>to create the squad</p>
          <br />

          <p className="text-red-500">Note :</p>
          <ul>
            <li className=" list-item list-disc ml-5 ">
              A cross chain tx takes <br />{" "}
              <span className="text-blue-500">20</span> to&nbsp;
              <span className="text-blue-500">30</span> minutes to <br />{" "}
              complete
            </li>
          </ul>
          <br />
          <div className="flex">
            <p className=" text-[10px] font-stalinist text-red-500 ml-5  text-center">
              Powered By <span className="text-purple-600">Chainlink CCIP</span>
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <img
              src="/chainlink.png"
              width={"25px"}
              height={"25px"}
              alt="chainlink"
              className=""
            />
            <img
              src="/assets/ccip.gif"
              width={"25px"}
              alt="vrf"
              className="ml-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CcipTooltip;
