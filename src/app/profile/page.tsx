"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectWalletToPlay from "@/components/ConnectWalletToPlay";

export default function Page() {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet) {
      window.location.href = `/profile/${primaryWallet.address}`;
    }
  }, [primaryWallet]);

  return (
    <div className="">
      <div className=" relative z-10 mx-2">
        <img src="/assets/BG.svg" className=" w-screen" />
      </div>

      <div className="absolute inset-0 z-20 ">
        <div className="flex flex-col px-10 items-center bg-no-repeat w-full overflow-hidden  bg-contain font-stalinist">
          <div className="w-full">
            <Navbar />
          </div>
          {primaryWallet == undefined ? <ConnectWalletToPlay /> : <div></div>}
        </div>
      </div>
    </div>
  );
}
