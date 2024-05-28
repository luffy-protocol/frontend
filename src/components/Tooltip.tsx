import React, { useState } from "react";

const Tooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="relative inline-block">
      <p
        className="text-purple-600 border-2 border-red-500 px-0.5 pr-1  text-center text-[10px]  py-0  hover:text-blue-500 cursor-pointer font-stalinist"
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
            <li className=" list-item list-disc ml-5"> Captain 4x</li>
            <li className=" list-item list-disc ml-5"> Vice-captain 3x</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
