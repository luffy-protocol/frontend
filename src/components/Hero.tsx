"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Pixelify_Sans } from "next/font/google";
const pxsans = Pixelify_Sans({ subsets: ["latin"] });
import AnkrModal from "./AnkrModal";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setShowModal(true);
    }
  }, [address]);

  const handleVerify = () => {
    window.open(
      `https://www-stage.ankr.com/verify/consumer/connect/?policyId=377&chain=opbnb&accountAddress=${address}`,
      "_blank"
    );
    setShowModal(false);
  };
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-4">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Unleash Your Inner Cricket Guru . Play Fantasy Cricket on the{" "}
              <span className={`${pxsans.className}`}>Blockchain</span> with{" "}
              <span className=" text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-[#01A4F1]">
                ZKricket
              </span>
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Experience cricket like never before with ZKricket, the
                world&apos;s first Web3 fantasy cricket game. Own your team,
                build your legacy, and earn real rewards.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md shad bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
              </div>
              {showModal && <AnkrModal handleVerify={handleVerify} />}
            </div>
            <img
              src="/cric.svg"
              alt=""
              className="mt-10 w-full h-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-24"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
