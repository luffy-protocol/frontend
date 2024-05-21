import React from "react";

const Button: React.FC = () => {
  return (
    <div
      className={`flex justify-center items-center bg-contain bg-no-repeat `}
      style={{
        backgroundImage: `url('/assets/Button.svg')`,
        width: "100px",
        height: "40px",
      }}
      onClick={() => {
        console.log("first");
      }}
    >
      <div className="flex items-center justify-center ">
        {/* <div className='self-center'>GO</div> */}
      </div>
    </div>
  );
};

export default Button;
