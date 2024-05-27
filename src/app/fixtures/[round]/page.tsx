"use client";
import React, { useEffect, useState } from "react";
import FixtureCard from "@/components/FixtureCard";
import Navbar from "@/components/Navbar";
import { MatchDetails } from "@/utils/interface";
import fetchOngoingFixtures from "@/utils/fixtureHelpers/fetchOngoingFixtures";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectWalletToPlay from "@/components/ConnectWalletToPlay";

export default function Page({ params }: { params: { round: string } }) {
  const { primaryWallet } = useDynamicContext();

  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    MatchDetails[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<MatchDetails[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchDetails[]>([]);
  const [expiredMatches, setExpiredMatches] = useState<MatchDetails[]>([]);
  const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
  const [loadingCompleted, setLoadingCompleted] = useState<boolean>(true);
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!primaryWallet) return;
    fetchOngoingFixtures({
      address: primaryWallet.address,
      round: params.round,
      setClaimmableOngoingMatches,
      setUnclaimmableOngoingMatches,
      setCompletedMatches,
      setUpcomingMatches,
      setExpiredMatches,
      setLoadingOngoing,
      setLoadingCompleted,
      setUpcomingLoading,
    });
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
          {primaryWallet == undefined ? (
            <ConnectWalletToPlay />
          ) : (
            <div
              className="flex flex-col px-10 items-center bg-no-repeat bg-contain  w-[90%] h-[900px] overflow-hidden lg:h-[1000px] xl:h-[1250px] 2xl:h-[1400px] bg-center"
              style={{ backgroundImage: `url('/assets/GameBorder.svg')` }}
            >
              <div className="flex flex-col gap-2 items-center w-10/12 2xl:mt-32 xl:mt-56 mt-32 h-4/5 overflow-clip">
                <div className="flex gap-3 items-center justify-center mb-10 2xl:mt-20">
                  <a href={`/fixtures/${parseInt(params.round) - 1}`}>
                    <img
                      src="/assets/Left.png"
                      alt=""
                      width="60px"
                      className="hover:scale-110"
                    />
                  </a>

                  <div className="text-5xl font-stalinist items-center justify-center lg:text-2xl">
                    Game Week {params.round}
                  </div>
                  <a href={`/fixtures/${parseInt(params.round) + 1}`}>
                    <img
                      src="/assets/Right.png"
                      alt=""
                      width="60px"
                      className="hover:scale-110"
                    />
                  </a>
                </div>
                <div className="flex flex-col gap-2  w-full xl:max-h-[700px] 2xl:max-h-[1000px] overflow-y-auto">
                  <div className="flex-col items-center justify-center w-full">
                    {claimmableOngoingMatches.map((match, index) => (
                      <FixtureCard
                        key={`${match.fixture_id}-${index}`}
                        fixture={match}
                        status={2}
                      />
                    ))}
                  </div>
                  <div className="flex-col items-center justify-center w-full">
                    {unclaimmableOngoingMatches.map((match, index) => (
                      <FixtureCard
                        key={`${match.fixture_id}-${index}`}
                        fixture={match}
                        status={1}
                      />
                    ))}
                  </div>
                  <div className="flex-col items-center justify-center w-full">
                    {upcomingMatches.map((match, index) => (
                      <FixtureCard
                        key={`${match.fixture_id}-${index}`}
                        fixture={match}
                        status={0}
                      />
                    ))}
                  </div>

                  <div className="flex-col gap-2 items-center justify-center w-full">
                    {expiredMatches.map((match, index) => (
                      <FixtureCard
                        key={`${match.fixture_id}-${index}`}
                        fixture={match}
                        status={3}
                      />
                    ))}
                  </div>
                  <div className="flex-col gap-2 items-center justify-center w-full">
                    {completedMatches.map((match, index) => (
                      <FixtureCard
                        key={`${match.fixture_id}-${index}`}
                        fixture={match}
                        status={4}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
