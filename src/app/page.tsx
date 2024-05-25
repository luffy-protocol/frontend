import Navbar from "@/components/Navbar";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat h-[800px] xl:h-[1050px] overflow-hidden bg-[url('/assets/Landing.png')] bg-contain">
      <div className="w-full xl:mt-20">
        <Navbar />
        <img src="/assets/luffy.svg" className="w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default Page;
