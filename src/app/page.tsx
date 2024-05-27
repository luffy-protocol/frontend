import LoginButton from "@/components/LoginButton";
import Navbar from "@/components/Navbar";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import React from "react";

function Page() {
  return (
    <div className="max-h-screen">
      <div className="relative z-10">
        <img src="/assets/Landing.png" className="h-screen w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 justify-center h-[80%] items-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full xl:mt-20">
            <img src="/assets/Luffy.svg" className="w-1/2 mx-auto" />
          </div>
          <div className="mt-12">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
