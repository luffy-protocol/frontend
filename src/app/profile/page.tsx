"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectWalletToPlay from "@/components/ConnectWalletToPlay";
import DefaultLayout from "@/components/DefaultLayout";

export default function Page() {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet) {
      window.location.href = `/profile/${primaryWallet.address}`;
    }
  }, [primaryWallet]);

  return (
    <DefaultLayout>
      {primaryWallet == undefined ? <ConnectWalletToPlay /> : <div></div>}
    </DefaultLayout>
  );
}
