"use client";

import CTA from "@/components/CTA";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Tools from "@/components/Tools";
import TopPlayers from "@/components/TopPlayers";
import Youtube from "@/components/Youtube";

export default function Page() {
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <Hero />

        <CTA />
        <div className="mx-12 my-20">
          <p className="text-black font-bold text-3xl text-center pb-10">
            Top Players
          </p>
          <TopPlayers />
        </div>
        <Feature />
        {/* <Tools /> */
        /* <Team /> */}
      </div>
    </>
  );
}
