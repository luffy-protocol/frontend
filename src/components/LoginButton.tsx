import React from "react";

const LoginButton = () => {
  return (
    <div className="w-[140px]">
      <button
        className="button-with-svg"
        style={{
          backgroundImage: 'url("/assets/LoginBorder.svg")',
          backgroundSize: "cover",
          width: "140px",
          height: "54px",
        }}
      >
        <span className="text-sm font-stalinist flex justify-center items-center self-center px-3 py-2 ">
          Login
        </span>
      </button>
    </div>
  );
};

export default LoginButton;
