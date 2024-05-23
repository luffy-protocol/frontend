import React from "react";

const LoginButton = () => {
  return (
    <div
      className={`flex items-center justify-center bg-no-repeat bg-contain h-[53px]`}
      style={{
        backgroundImage: `url('/assets/LoginBorder.svg')`,

        width: "100%",
      }}
    >
      <div className="text-2xl font-stalinist flex justify-center self-center">
        Login
      </div>
    </div>
  );
};

export default LoginButton;
