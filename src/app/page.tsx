import Navbar from "@/components/Navbar";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat w-screen h-screen overflow-hidden bg-[url('/assets/bg3.svg')] bg-cover">
      <div className="w-full">
        <Navbar />
        <img src="/assets/luffy.svg" className="w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default Page;
