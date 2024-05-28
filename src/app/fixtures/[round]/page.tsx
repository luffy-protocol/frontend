"use client";
import React, { useEffect, useState } from "react";
import FixtureCard from "@/components/FixtureCard";
import Navbar from "@/components/Navbar";
import { MatchDetails } from "@/utils/interface";
import fetchOngoingFixtures from "@/utils/fixtureHelpers/fetchOngoingFixtures";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectWalletToPlay from "@/components/ConnectWalletToPlay";
import DefaultLayout from "@/components/DefaultLayout";

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

  const [fixtureLoading, setFixtureLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!primaryWallet) return;
    setFixtureLoading(true);
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
    }).then(() => {
      setFixtureLoading(false);
    });
  }, [primaryWallet]);

  return (
    <DefaultLayout>
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
            {fixtureLoading && (
              <div className="flex flex-col gap-2  w-full xl:max-h-[700px] 2xl:max-h-[1000px] overflow-y-auto">
                <div className="flex-col items-center justify-center w-full">
                  <div className="text-center flex items-center justify-center w-full h-52">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-[#D8485F]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    </DefaultLayout>
  );
}
