import Navbar from "@/components/Navbar";
import React from "react";

function Page() {
  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/Landing.png" className=" w-screen" />
      </div>
      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 items-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full xl:mt-20">
            <Navbar />
            <img src="/assets/luffy.svg" className="w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
