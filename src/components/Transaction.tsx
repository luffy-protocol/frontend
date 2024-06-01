import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Status from "./Fixtures/FixtureCard/Status";
import Battery from "./Battery";
import { StepStatus } from "./StepStatus";
import TxHash from "./Game/Tooltip/TxHash";
interface TransactionProps {
  chain: number;
  setTransactionLoading: Dispatch<SetStateAction<boolean>>;
  labels: string[];
  txHashes: string[];
  txConfirmed: number;
  clearStates: () => void;
  error: string;
}
export default function Transaction({
  txHashes,
  chain,
  setTransactionLoading,
  labels,
  error,
  txConfirmed,
  clearStates,
}: TransactionProps) {
  useEffect(() => {
    console.log("TX hashes updated");
    console.log(txHashes);
    console.log("TX confirmed updated");
    console.log(txConfirmed);
  }, [txHashes, txConfirmed]);
  return (
    <div className="flex relative justify-center items-center w-1/2 h-2/3">
      <img
        src="/assets/FixBorder1.svg"
        className="w-fit relative z-10 mx-6 mt-16"
        key={1}
      />

      <div className="absolute w-full z-20 mr-8  h-full flex top-[5%] left-[5%]">
        <div className="flex justify-center items-center  ml-10 ">
          <Battery step={2} totalSteps={3} />
        </div>
        <div className="font-stalinist w-[60%] flex flex-col items-center justify-center text-lg text-red-400 gap-6  ml-4">
          <div className=" text-xl text-white mb-10">
            <p className="text-center">
              {txConfirmed == labels.length ? "Registered" : "Submitting"} Squad{" "}
              <br />
              {txConfirmed != labels.length ? (
                <span className="text-purple-500">
                  {txConfirmed} / {labels.length}
                </span>
              ) : (
                <img src="/assets/tick.svg" className="w-8 h-8 mx-auto" />
              )}
            </p>
          </div>
          {labels.map((label, index) => (
            <>
              <StepStatus
                key={index}
                chain={chain}
                currentStep={txConfirmed}
                index={index}
                label={label}
                txHash={index < txHashes.length ? txHashes[index] : ""}
                error={
                  error.length > 0
                    ? txHashes.length == txConfirmed && index == txHashes.length
                      ? error
                      : txHashes.length != txConfirmed && index == txConfirmed
                      ? error
                      : ""
                    : ""
                }
                txConfirmed={index < txConfirmed ? true : false}
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
                clearStates();
                setTransactionLoading(false);
              }}
            >
              <span className="text-[12px] font-stalinist flex justify-center self-center p-7 cursor-pointer text-center -ml-2 -mt-4">
                {txConfirmed == labels.length ? "Go Back" : "Cancel"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
