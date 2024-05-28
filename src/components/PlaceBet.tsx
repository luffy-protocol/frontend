import { useState } from "react";
import Dropdown from "./Game/Dropdown";
import PlayerProgress from "./Game/PlayerProgress";
import Tooltip from "./Tooltip";

interface PlaceBetProps {
  selectedPlayersCount: number;
}

export default function PlaceBet({ selectedPlayersCount }: PlaceBetProps) {
  const [betInEther, setBetInEther] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const chains = [
    "Select Chain",
    "Avalanche",
    "Ethereum",
    "Arbitrum",
    "Optimism",
    "Base",
  ];
  const [chain, setChain] = useState(0);
  const tokens = ["Select Token", "Native", "USDT", "LINK"];
  const [token, setToken] = useState(0);
  const [enableRandomness, setEnableRandomness] = useState(false);

  return (
    <div className="flex justify-center items-center w-1/2 h-2/3">
      <div className=" relative z-10 mx-2 mt-16">
        <img src="/assets/FixBorder.svg" className=" w-fit h-2/3" />
      </div>
      <div className="absolute  w-1/3 inset-y-80 z-20  mt-24 h-2/3">
        <div className=" flex flex-col mx-2 mt-16 justify-center items-center gap-24">
          <div className="">
            <PlayerProgress noPlayers={selectedPlayersCount} />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className="flex  gap-20 font-stalinist text-[10px] justify-be">
              <p className="text-[10px]">Chain</p>
              <p className="text-[10px]">Token</p>
            </div>
            <div
              className="flex  gap-4 justify-start items-start w-full sm:flex-row flex-col"
              style={{ transform: "scale(.60)" }}
            >
              <Dropdown
                selectedOption={chain}
                setSelectedOption={(index) => {
                  setChain(index);
                }}
                options={chains}
              />
              <Dropdown
                selectedOption={token}
                setSelectedOption={(index) => {
                  setToken(index);
                }}
                options={tokens}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mt-2 justify-center items-center">
              <p className="text-md  font-stalinist text-slate-500">
                Bet Amount
              </p>
              <p className="text-xl  font-stalinist  ">
                {betInEther}&nbsp;
                <span className=" text-[#d94956]">
                  {token == 1 ? (chain > 1 ? "ETH" : "AVAX") : tokens[token]}
                </span>
              </p>
            </div>
            <div className="flex mt-2 justify-center items-center">
              <img src="/assets/gas.png" alt="chain" className=" -mt-1" />
              <p className="text-[10px] font-stalinist text-center">
                {gasPrice} gwei
              </p>
            </div>
          </div>
          <div>
            <div className="flex">
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={() => {
                      setEnableRandomness(!enableRandomness);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800  peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border  after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#410C5E]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-stalinist">
                    Randomness
                  </span>
                </label>
              </div>
              <div className="ml-4 mt-0">
                <Tooltip />
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <button
                className={` bg-no-repeat  w-fit bg-cover `}
                style={{
                  backgroundImage: `url('/assets/LoginBorder.svg')`,
                }}
              >
                <span className="text-sm font-stalinist flex justify-center self-center py-2 mx-5 pr-3 cursor-pointer">
                  Submit Squad
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
