"use client";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React from "react";

// place bet

export default function PlaceBet() {
  const { isAuthenticated } = useDynamicContext();
  return (
    <div className="w-full h-screen flex flex-col space-y-2 justify-center items-center">
      <p className="font-bold text-4xl">Game Page</p>
      <DynamicWidget />

      {isAuthenticated && <div></div>}
    </div>
  );
}
