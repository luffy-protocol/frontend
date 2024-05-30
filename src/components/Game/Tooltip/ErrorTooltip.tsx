import React, { useState } from "react";

const ErrorTooltip = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="relative inline-block ml-2 ">
      <p
        className="text-purple-600 hover:text-blue-500 border-2 border-red-500 px-1  text-center text-[10px] cursor-pointer font-stalinist"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        X
      </p>
      {isVisible && (
        <div className="absolute -top-[25px] left-[25px]  text-xs bg-gray-800 text-purple-600 rounded-md shadow-sm p-2 w-[190px] font-stalinist">
          <p className="text-red-500 w-full">{message}</p>
        </div>
      )}
    </div>
  );
};

export default ErrorTooltip;
