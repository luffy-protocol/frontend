import React from "react";

const ChoosePlayer = () => {
  return (
    <div
      className={`flex items-center justify-center  bg-no-repeat bg-contain bg-center w-full h-[550px]`}
      style={{
        backgroundImage: `url('/assets/ChooseModal.svg')`,
        width: "100%",
      }}
    >
      <div className=" font-stalinist">Choose Player</div>
    </div>
  );
};

export default ChoosePlayer;
