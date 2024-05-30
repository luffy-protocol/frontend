import { useEffect, useRef, useState } from "react";
import Status from "./Fixtures/FixtureCard/Status";
import Battery from "./Battery";
import { StepStatus } from "./StepStatus";
import TxHash from "./Game/Tooltip/TxHash";
interface TransactionProps {
  chain: number;
  setTransactionLoading: (value: boolean) => void;
  labels: string[];
  txHashes: string[];
  error: string;
  setError: (value: string) => void;
}
export default function Transaction({
  txHashes,
  chain,
  setTransactionLoading,
  labels,
  error,
  setError,
}: TransactionProps) {
  return (
    <div className="flex relative justify-center items-center w-1/2 h-2/3">
      <img
        src="/assets/FixBorder1.svg"
        className="w-fit relative z-10 mx-6 mt-16"
        key={1}
      />

      <div className="absolute w-1/3 z-20 mr-8  h-full flex top-[5%] left-[5%]">
        <div className=" justify-center items-center flex ml-10 ">
          <Battery step={txHashes.length} />
        </div>
        <div className="font-stalinist flex flex-col items-start justify-center text-lg text-red-400 gap-6  ml-4">
          <div className="flex text-xl text-white mb-10">
            <p className="text-center">
              Submitting Squad <br />
              <span className="text-purple-500">0 / 3</span>
            </p>
          </div>
          {labels.map((label, index) => (
            <>
              <StepStatus
                key={index}
                chain={chain}
                currentStep={txHashes.length}
                index={index}
                label={label}
                txHash={index < txHashes.length ? txHashes[index] : ""}
                error={
                  error.length > 0 && index == txHashes.length ? error : ""
                }
              />
            </>
          ))}
          <div className="flex w-full justify-center items-center mt-8 hover:scale-110">
            <button
              className={` bg-no-repeat  w-fit bg-cover `}
              style={{
                backgroundImage: `url('/assets/LoginBorder.svg')`,
                backgroundSize: "contain",
              }}
              onClick={() => {
                setError("");
                setTransactionLoading(false);
              }}
            >
              <span className="text-[12px] font-stalinist flex justify-center self-center p-7 cursor-pointer text-center -ml-2 -mt-4">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
