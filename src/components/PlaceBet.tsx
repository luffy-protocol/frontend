"use client";
import { useEffect, useState } from "react";
import Dropdown from "./Game/Dropdown";
import PlayerProgress from "./Game/PlayerProgress";
import VrfTooltip from "./Game/Tooltip/VrfTooltip";
import { chainToChainIds, dropdownElements } from "@/utils/constants";
import resolveTokens from "@/utils/game/resolveTokens";
import ErrorTooltip from "./Game/Tooltip/ErrorTooltip";
import resolveBet from "@/utils/game/resolveBet";
import resolveCrosschainFee from "@/utils/game/resolveCrosschainFee";
import resolveVrfFee from "@/utils/game/resolveVrfFee";
import getGasPrice from "@/utils/transactions/read/getGasPrice";
import { formatGwei, parseEther } from "viem";
import CcipTooltip from "./Game/Tooltip/CcipTooltip";
import { PlaceBetProps } from "@/utils/interface";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function PlaceBet({
  selectedPlayersCount,
  setTransactionLoading,
  captainAndViceCaptainSet,
  triggerTransaction,
}: PlaceBetProps) {
  const { isAuthenticated, primaryWallet, walletConnector } =
    useDynamicContext();
  const [betamount, setBetAmount] = useState("0.0");
  const [chain, setChain] = useState(0);
  const [token, setToken] = useState(0);
  const [enableRandomness, setEnableRandomness] = useState(false);
  const [crosschainfee, setCrosschainFee] = useState("0.0");
  const [vrffee, setVrfFee] = useState("0.0");
  const [betAmountLoading, setBetAmountLoading] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [gasPrice, setGasPrice] = useState("0.0");
  useEffect(() => {
    resolveBet(token, chain, setBetAmount, setBetAmountLoading);
  }, [chain, token]);

  useEffect(() => {
    if (chain != 0) getGasPrice(chain, setGasPrice);
    resolveCrosschainFee(chain, setCrosschainFee);
  }, [chain]);

  useEffect(() => {
    if (chain == 3 || chain == 4) {
      setEnableRandomness(false);
      setVrfFee("0.0");
    } else if (enableRandomness) resolveVrfFee(chain, setVrfFee);
    else {
      setVrfFee("0.0");
    }
  }, [chain, enableRandomness]);

  return (
    <div className="flex justify-center items-center w-1/2 h-2/3">
      <div className=" relative z-10 mx-2 mt-16">
        <img src="/assets/FixBorder.svg" className=" w-fit h-2/3" />
      </div>
      <div className="absolute  w-1/3 inset-y-80 z-20  mt-24 h-2/3">
        <div className=" flex flex-col mx-2 mt-16 justify-center items-center 2xl:gap-28 min-[1400px]:gap-[74px]">
          <div className="flex items-center">
            <PlayerProgress noPlayers={selectedPlayersCount} />
            {selectedPlayersCount < 11 && showErrorMessage && (
              <ErrorTooltip message="You must select 11 players to submit the squad ⚠️" />
            )}
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className="flex w-full font-stalinist text-[10px] justify-center space-x-[20%]">
              <div className="flex">
                <p className="text-[10px] text-gray-300">Chain</p>
                {chain == 0 && showErrorMessage && (
                  <ErrorTooltip message="Please select a chain to continue ⚠️" />
                )}
              </div>
              {chain > 1 ? <CcipTooltip chain={chain} /> : <div></div>}
              <div className="flex">
                <p className="text-[10px] text-gray-300">Token</p>
                {token == 0 && showErrorMessage && (
                  <ErrorTooltip message="Please select token to continue ⚠️" />
                )}
              </div>
            </div>
            <div
              className="flex  gap-4 justify-start items-start w-full sm:flex-row flex-col"
              style={{ transform: "scale(.60)" }}
            >
              <Dropdown
                label={
                  chain == 0
                    ? "Choose Chain"
                    : dropdownElements.chains[chain - 1].name
                }
                selectedOption={chain}
                setSelectedOption={async function (selectedChain: number) {
                  if (walletConnector == null) return;
                  if (primaryWallet == null) return;
                  if (chain == selectedChain) setChain(0);
                  else {
                    console.log("PRIMARY WALLET CHAIN");
                    console.log(primaryWallet.network);
                    if (walletConnector.supportsNetworkSwitching()) {
                      try {
                        await walletConnector.switchNetwork({
                          networkChainId: chainToChainIds[selectedChain],
                        });
                        setChain(selectedChain);
                      } catch (e) {}
                    }
                  }
                }}
                options={dropdownElements.chains}
              />
              <Dropdown
                label={
                  token == 0
                    ? "Choose Token"
                    : dropdownElements.tokens[token - 1].name
                }
                selectedOption={token}
                setSelectedOption={async function (selectedToken: number) {
                  setToken(selectedToken);
                }}
                options={resolveTokens(dropdownElements, chain - 1)}
              />
            </div>
          </div>

          <div className="flex gap-10  ">
            <div className="flex mt-2 justify-center items-center">
              <img src="/assets/gas.png" alt="chain" className=" -mt-1" />
              <p className="text-[10px] font-stalinist text-center text-gray-300">
                {Number(
                  formatGwei(BigInt(gasPrice == "0.0" ? "0" : gasPrice))
                ).toFixed(3)}{" "}
                gwei
              </p>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-md font-stalinist text-slate-500">
                  Bet Amount
                </p>
                <p className="text-lg  font-stalinist  ">
                  {betAmountLoading ? ". . ." : betamount}
                  <br />
                  <span className=" text-[#d94956]">
                    {token < 2
                      ? chain > 1
                        ? "ETH"
                        : "AVAX"
                      : dropdownElements.tokens[token - 1].name}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-md  font-stalinist text-slate-500">
                  Cross Chain Fee
                </p>
                <p className="text-xl  font-stalinist  ">
                  {crosschainfee}
                  <br />
                  <span className=" text-[#d94956]">
                    {chain > 1 ? "ETH" : "AVAX"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableRandomness}
                    disabled={chain == 3 || chain == 4}
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
              <div className="ml-4">
                {chain != 3 && chain != 4 && <VrfTooltip />}

                {chain == 3 || chain == 4 ? (
                  <ErrorTooltip
                    message={`Feature Unavailable for ${
                      chain == 3 ? "Base" : "Optimism"
                    } ⚠️`}
                  />
                ) : (
                  !enableRandomness &&
                  !captainAndViceCaptainSet &&
                  showErrorMessage && (
                    <ErrorTooltip
                      message={`Set your Captain and Vice Captain or Enable Randomness ⚠️`}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col text-center justify-center items-center">
                <p className="text-md  font-stalinist text-slate-500">
                  VRF Fee
                </p>
                <p className="text-xl  font-stalinist  ">
                  {vrffee}
                  <br />
                  <span className=" text-[#d94956]">
                    {chain > 1 ? "ETH" : "AVAX"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center items-center mt-28">
              <button
                className={` bg-no-repeat  w-fit bg-cover `}
                style={{
                  backgroundImage: `url('/assets/LoginBorder.svg')`,
                  backgroundSize: "contain",
                }}
                onClick={async () => {
                  if (
                    selectedPlayersCount == 11 &&
                    chain != 0 &&
                    token != 0 &&
                    (enableRandomness ? true : captainAndViceCaptainSet)
                  ) {
                    setTransactionLoading(true);
                    let totalValue = parseEther(
                      (Number(vrffee) + Number(crosschainfee)).toString()
                    );
                    let betAmount = "0";
                    if (token == 1) {
                      totalValue += parseEther(betamount);
                      betAmount = parseEther(betamount).toString();
                    } else if (token == 2)
                      betAmount = parseEther(betamount).toString();
                    else if (token == 3) betAmount = "100000";
                    await triggerTransaction({
                      chain,
                      token,
                      totalValue: totalValue.toString(),
                      betAmount,
                      isRandom: enableRandomness,
                    });
                    // set chain
                  } else {
                    setShowErrorMessage(true);
                  }
                }}
              >
                <span className="text-[12px] font-stalinist flex justify-center self-center p-7 cursor-pointer text-center -ml-2">
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
