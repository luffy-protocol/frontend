import React from "react";

const LoginButton = () => {
  return (
    <div
      className={`flex items-center justify-center bg-no-repeat bg-contain w-[210%] h-full`}
      style={{
        backgroundImage: `url('/assets/LoginBorder.svg')`,
      }}
    >
      <span className="text-sm font-stalinist flex justify-center self-center px-3 py-2 ">
        Login
      </span>
    </div>
  );
};

export default LoginButton;
