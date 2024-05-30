import React, { useState } from "react";

const VrfTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="relative inline-block">
      <p
        className=" border-2 border-white-500 px-0.5 pr-1  text-center text-[10px]  py-0 text-purple-600 hover:text-blue-500 cursor-pointer font-stalinist"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ?
      </p>
      {isVisible && (
        <div className="absolute top-full left-0 mt-2 text-xs bg-gray-800 text-purple-600  rounded-md shadow-sm p-2 w-fit text-nowrap font-stalinist">
          <p>Chooses a random captain </p>
          <p> and vice-captain for you</p>
          <br />

          <p className="text-red-500">Provides following Perks :</p>
          <ul>
            <li className=" list-item list-disc ml-5 ">
              Captain <span className="text-[#005599]">3x </span>
              {"->"}&nbsp;
              <span className="text-[#D4AF37]">4x</span>
            </li>
            <li className=" list-item list-disc ml-5 ">
              Vice-captain <span className="text-[#005599]">2x </span>
              {"->"}&nbsp;
              <span className="text-[#D4AF37]">3x</span>
            </li>
          </ul>
          <br />
          <div className="flex">
            <p className=" text-[10px] font-stalinist text-red-500 ml-5  text-center">
              Powered By <span className="text-purple-600">Chainlink VRF</span>
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
              src="/assets/dice.gif"
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

export default VrfTooltip;
