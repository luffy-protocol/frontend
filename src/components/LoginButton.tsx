"use client";
import React from "react";
im;

const LoginButton = () => {
  return (
    <div
      className="flex  justify-center items-center cursor-pointer"
      onClick={() => {
        window.location.href = "/fixtures/19";
      }}
      style={{
        backgroundImage: 'url("/assets/LoginBorder.svg")',
        backgroundSize: "cover",
        width: "210px",
        height: "86px",
      }}
    >
      <a className="text-md font-stalinist  px-6 py-2 ">Play Now</a>
    </div>
  );
};

export default LoginButton;
