"use client";
import Navbar from "@/components/Navbar";
import Status from "@/components/status";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CheckProfile from "@/utils/profileHelpers/CheckProfile";
import registerUserProfile from "@/utils/profileHelpers/registerUserProfile";
import getProfile from "@/utils/profileHelpers/getProfile";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import { request, gql } from "graphql-request";
import { teamLogo } from "@/utils/logos/teamlogo";
import { useRouter } from "next/navigation";
import addFollower from "@/utils/profileHelpers/addFollower";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectWalletToPlay from "@/components/ConnectWalletToPlay";
import uploadProfileImg from "@/utils/profileHelpers/uploadprofileImg";
import DefaultLayout from "@/components/DefaultLayout";
import { getProfileData } from "@/utils/profileHelpers/getProfileData";
import { getPackedSettings } from "http2";

interface MatchCardProps {
  team1: number;
  team2: number;
  status: number;
  fixtureid: number;
}

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  status,
  fixtureid,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center bg-transparent rounded-lg shadow-lg p-6 m-4 min-w-[280px] max-w-[300px] max-h-[130px] border gap-3 border-[#D8485F] font-stalinist">
      <div className="justify-between">
        <div className="flex justify-between items-center min-w-[200px] max-w-[260px]">
          <div>
            <Status status={status} />
          </div>
          <div
            onClick={() => {
              if (status == 4) {
                router.push(`/leaderboard/${fixtureid}`);
              }
            }}
          >
            <img src="/assets/Arrow.png" alt="" width={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mb-4 gap-3">
        <div className="flex flex-col items-center">
          <img
            src={teamLogo(team1)}
            alt={`${team1} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team1.name}</span> */}
        </div>
        <span className="text-xl font-semibold">VS</span>
        <div className="flex flex-col items-center">
          <img
            src={teamLogo(team2)}
            alt={`${team2} logo`}
            className="w-16 h-16 mb-2"
          />
          {/* <span className="text-lg font-bold">{team2.name}</span> */}
        </div>
      </div>

      {/* <div className="text-[10px] font-medium self-start">{matchDate}</div> */}
    </div>
  );
};

function Page({ params }: { params: { address: string } }) {
  const { primaryWallet } = useDynamicContext();
  const [name, setName] = useState<string>("Lionel Messi");
  const [username, setUsername] = useState<string>("@LeoMessi");
  const [followers, setFollowers] = useState<number>(1);
  const [followings, setFollowing] = useState<number>(1);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState<string>("-");
  const [HighestPosition, setHighestPosition] = useState<string>("-");
  const [BiggestWin, setBiggestWin] = useState<string>("-");
  const [AmountWon, setAmountWon] = useState<string>("-");
  const [NetRevenue, setNetRevenue] = useState<number>(0);

  useEffect(() => {
    if (!primaryWallet) return;
    CheckProfile(primaryWallet.address as string).then((data) => {
      if (data.response.length == 0) {
        registerUserProfile(primaryWallet.address as string).then((data) => {
          console.log(data.response);
        });
      }
    });
    getProfile(primaryWallet.address as string).then((data) => {
      console.log(data.response);
      setProfilepic(data.response[0].imageUrl);
      if (data.response[0].followers !== null) {
        setFollowers(data.response[0].followers.length);
      } else {
        setFollowers(0);
      }
      if (data.response[0].following !== null) {
        setFollowers(data.response[0].following.length);
      } else {
        setFollowers(0);
      }
    });

    if (typeof window !== "undefined" && primaryWallet.address) {
      console.log(process.env.NEXT_PUBLIC_DYNAMIC_API_KEY);
      (async function () {
        try {
          const response = await axios.get(`/api/dynamic/fetch-users`, {
            headers: {},
          });
          const data = response.data;

          console.log("DYNAMIC DATA");
          console.log(data);

          if (data.success) {
            // Filter the data based on address
            const filteredUsers = data.data.users.filter(
              (user: any) =>
                user.walletPublicKey.toLowerCase() ===
                params.address.toLowerCase()
            );
            console.log(filteredUsers);

            // Set the state based on the filtered user
            if (filteredUsers.length > 0) {
              const user = filteredUsers[0];
              setName(`${user.firstName} ${user.lastName}`);
              setUsername(user.firstName);
            }
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      })();
    }
  }, [primaryWallet]);

  const [profilepic, setProfilepic] = useState<string>(
    "https://media.api-sports.io/football/players/154.png"
  );

  const [claimmableOngoingMatches, setClaimmableOngoingMatches] = useState<
    any[]
  >([]);
  const [unclaimmableOngoingMatches, setUnclaimmableOngoingMatches] = useState<
    any[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [expiredMatches, setExpiredMatches] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchOngoingFixtures() {
      if (!primaryWallet) return;

      try {
        setFetching(true);
        console.log("Fetching ongoing fixtures...");
        // const { message, response } = await fetchFixtures();
        const { message, response } = await fetchFixtures();

        console.log("Fetched fixtures message:", message);
        console.log("Fetched fixtures response:", response);

        const data: { games: any[] } = await request(
          "https://api.studio.thegraph.com/query/30735/luffy-block-magic/version/latest",
          gql`
              query MyQuery {
                games {
                  id
                  resultsPublishedTime
                  predictions(
                    where: {
                      user_: {
                        address: "${primaryWallet.address}"
                      }
                    }
                  ) {
                    claim {
                      game {
                        id
                      }
                    }
                  }
                }
              }
            `
        );

        const games = data.games;
        console.log("Games:", games);

        const gameIdsWithPredictionsAndNullClaims = games.filter(
          (game: any) =>
            game.predictions.length > 0 &&
            game.predictions.some(
              (prediction: any) => prediction.claim === null
            )
        );
        console.log(
          "Games with predictions and null claims:",
          gameIdsWithPredictionsAndNullClaims
        );

        const gameIdsThatCanBeClaimed = gameIdsWithPredictionsAndNullClaims
          .filter((game: any) => game.resultsPublishedTime != null)
          .map((game: any) => parseInt(game.id, 16));
        console.log("Game IDs that can be claimed:", gameIdsThatCanBeClaimed);

        const gameIdsThatCannotBeClaimed = gameIdsWithPredictionsAndNullClaims
          .filter((game: any) => game.resultsPublishedTime == null)
          .map((game: any) => parseInt(game.id, 16));
        console.log(
          "Game IDs that cannot be claimed:",
          gameIdsThatCannotBeClaimed
        );

        const ongoingMatchesThatCanBeClaimed = response.filter((match: any) =>
          gameIdsThatCanBeClaimed.includes(match.fixture_id)
        );
        console.log(
          "Ongoing matches that can be claimed:",
          ongoingMatchesThatCanBeClaimed
        );

        const ongoingMatchesThatCannotBeClaimed = response.filter(
          (match: any) => gameIdsThatCannotBeClaimed.includes(match.fixture_id)
        );
        console.log(
          "Ongoing matches that cannot be claimed:",
          ongoingMatchesThatCannotBeClaimed
        );

        // Check if the resultsPublishedTime is more than 2 days ago
        const now = new Date();
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        const updatedClaimableOngoingMatches =
          ongoingMatchesThatCanBeClaimed.filter((match: any) => {
            const game = games.find(
              (game: any) => parseInt(game.id, 16) === match.fixture_id
            );
            return (
              new Date(parseInt(game.resultsPublishedTime) * 1000) > twoDaysAgo
            );
          });

        const matchesMovedToExpired = ongoingMatchesThatCanBeClaimed.filter(
          (match: any) => {
            const game = games.find(
              (game: any) => parseInt(game.id, 16) === match.fixture_id
            );
            return (
              new Date(parseInt(game.resultsPublishedTime) * 1000) <= twoDaysAgo
            );
          }
        );

        setClaimmableOngoingMatches(updatedClaimableOngoingMatches);
        setUnclaimmableOngoingMatches(ongoingMatchesThatCannotBeClaimed);
        setExpiredMatches(matchesMovedToExpired);

        const gameIdsWithPredictionsAndClaims = games
          .filter(
            (game: any) =>
              game.predictions.length > 0 &&
              game.predictions.some(
                (prediction: any) => prediction.claim !== null
              )
          )
          .map((game: any) => parseInt(game.id, 16));
        console.log(
          "Game IDs with predictions and claims:",
          gameIdsWithPredictionsAndClaims
        );

        const completedany = response.filter((match: any) =>
          gameIdsWithPredictionsAndClaims.includes(match.fixture_id)
        );
        console.log("Completed match details:", completedany);

        setCompletedMatches(completedany);

        const remaining = games.filter(
          (match: any) =>
            !gameIdsThatCanBeClaimed.includes(parseInt(match.id, 16)) &&
            !gameIdsThatCannotBeClaimed.includes(parseInt(match.id, 16)) &&
            !gameIdsWithPredictionsAndClaims.includes(parseInt(match.id, 16))
        );
        console.log("Remaining games:", remaining);

        const remainingCompletedMatchesDetails: any[] = [];
        const remainingUpcomingMatchesDetails: any[] = [];

        remaining.forEach((match: any) => {
          const fixture_id = parseInt(match.id, 16);
          const matchDetail = response.find(
            (responseMatch: any) => responseMatch.fixture_id === fixture_id
          );

          if (matchDetail) {
            const startDate = new Date(Number(matchDetail.starttime) * 1000);
            const currentDate = new Date();

            if (startDate > currentDate) {
              remainingUpcomingMatchesDetails.push(matchDetail);
            } else {
              remainingCompletedMatchesDetails.push(matchDetail);
            }
          }
        });

        console.log(
          "Remaining completed match details:",
          remainingCompletedMatchesDetails
        );
        console.log(
          "Remaining upcoming match details:",
          remainingUpcomingMatchesDetails
        );

        setCompletedMatches((prevCompletedMatches) => [
          ...prevCompletedMatches,
          ...remainingCompletedMatchesDetails,
        ]);

        setUpcomingMatches(remainingUpcomingMatchesDetails);
        setFetching(false);
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    fetchOngoingFixtures();
  }, [primaryWallet]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange: any = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      await uploadProfileImg(file, params.address as string).then((data) => {
        console.log(data.response);
        setProfilepic(data.response.publicUrl);
      });
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getProfileData(params.address);
      console.log(data);
      if (data) {
        setAmountWon(data.totalEarnings || "0");
        setTotalGamesPlayed(data.totalGamesPlayed || "0");
        const lowestPosition = data.predictions.reduce((min, prediction) => {
          if (
            prediction.reward === null ||
            prediction.reward.position === undefined
          ) {
            return min;
          }
          return Math.min(min, Number(prediction.reward.position));
        }, Infinity);

        const result = lowestPosition === Infinity ? "-" : lowestPosition;
        setHighestPosition(result.toString());
        const highestReward = data.rewards.reduce(
          (max, reward) => Math.max(max, Number(reward.amount)),
          0
        );
        setBiggestWin(highestReward.toString());

        setNetRevenue(
          Number(data.totalEarnings) === 0
            ? 0
            : Number(data.totalEarnings) - Number(data.totalSpent)
        );
      }
    };

    fetchdata();
  });

  return (
    <DefaultLayout>
      {primaryWallet == null ? (
        <ConnectWalletToPlay />
      ) : (
        <>
          <div className="flex justify-between w-10/12 px-10 font-stalinist">
            <div className="flex">
              <img
                src={profilepic}
                alt="toppoints"
                className="w-32 h-32  rounded-full bg-white mx-auto mt-10 cursor-pointer"
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className=" text-sm flex flex-col justify-center items-center w-fit mt-5 ml-5 gap-2">
                <p className=" text-nowrap  self-start">{name}</p>
                <p className="text-nowrap self-start">@{username}</p>
                <div className="flex items-center justify-center self-start">
                  <span className=" text-slate-400 ">
                    Followers&nbsp;:&nbsp;
                  </span>{" "}
                  {followers}
                </div>
                <div className="flex items-center justify-center self-start">
                  <span className=" text-slate-400">
                    Following&nbsp;:&nbsp;
                  </span>{" "}
                  {followings}
                </div>
              </div>
              <div className="flex w-full justify-center items-center mt-4 ml-10 ">
                <div
                  className={`bg-no-repeat w-fit bg-cover ${
                    primaryWallet.address === params.address
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  style={{
                    backgroundImage: `url('/assets/LoginBorder.svg')`,
                  }}
                >
                  <span
                    className={`text-sm font-stalinist flex justify-center self-center mt-1 py-2 ml-3 pr-3 ${
                      primaryWallet.address === params.address
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (primaryWallet.address !== params.address) {
                        addFollower(
                          params.address as string,
                          primaryWallet.address as string
                        ).then((data) => {
                          console.log(data.response);
                        });
                      }
                    }}
                  >
                    Follow
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 gap-2">
              <div className=" text-[10px] text-slate-400 xl:text-[14px]">
                Net Revenue
              </div>
              <div
                className={`text-[10px xl:text-[14px] ${
                  NetRevenue >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${NetRevenue}
              </div>
            </div>
            {params.address == primaryWallet?.address && (
              <div className="flex items-center justify-center mt-6">
                <div className="flex w-full justify-center items-center  ml-10">
                  <div
                    className={` bg-no-repeat  w-fit bg-cover `}
                    style={{
                      backgroundImage: `url('/assets/LoginBorder.svg')`,
                    }}
                  >
                    <span className="text-sm font-stalinist flex justify-center self-center mt-1 py-2 mr-2 ml-4 pr-3 cursor-pointer">
                      Claim
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between w-10/12 px-10 mt-8 font-stalinist">
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                Highest Position
              </div>
              <div className="text-[10px] ml-2 xl:text-[14px]">
                {HighestPosition}
              </div>
            </div>
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                Biggest Win
              </div>
              <div className="text-[10px] ml-2 xl:text-[14px]">
                ${BiggestWin}
              </div>
            </div>
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                Games Played
              </div>
              <div className="text-[10px] ml-2 xl:text-[14px]">
                {totalGamesPlayed}
              </div>
            </div>
            <div className="flex gap-1 ">
              <div className="text-[#D8485F] text-[10px] xl:text-[14px]">
                Amount won
              </div>
              <div className="text-[10px] ml-2 xl:text-[14px]">
                ${AmountWon}
              </div>
            </div>
          </div>
          <hr className="p-2 w-10/12 my-5 " />
          <div className="text-lg font-stalinist">Ongoing</div>
          <div className="flex justify-between w-10/12 mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom w-full">
              <div className="flex gap-3 self-start w-full">
                {fetching ? (
                  // Display dummy data while fetching
                  <div className="text-center flex items-center justify-center w-full h-32">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#D8485F]"
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
                ) : // Display actual ongoing matches after fetching
                unclaimmableOngoingMatches.length > 0 ? (
                  unclaimmableOngoingMatches.map(
                    (match: any, index: number) => (
                      <MatchCard
                        key={index}
                        team1={match.home_id}
                        team2={match.away_id}
                        status={1}
                        fixtureid={match.fixture_id}
                      />
                    )
                  )
                ) : (
                  <div className="flex items-center justify-center w-full h-32">
                    <div className="text-sm text-slate-500 font-stalinist">
                      Empty
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 text-lg font-stalinist">Claimable</div>

          <div className="flex justify-between w-10/12 mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom w-full">
              <div className="flex gap-3 self-start w-full">
                {fetching ? (
                  // Display dummy data while fetching
                  <div className="text-center flex items-center justify-center w-full h-32">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#D8485F]"
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
                ) : // Display actual ongoing matches after fetching
                claimmableOngoingMatches.length > 0 ? (
                  claimmableOngoingMatches.map((match: any, index: number) => (
                    <MatchCard
                      key={index}
                      team1={match.home_id}
                      team2={match.away_id}
                      status={1}
                      fixtureid={match.fixture_id}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-32">
                    <div className="text-sm text-slate-500 font-stalinist">
                      Empty
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 text-lg font-stalinist">Completed</div>

          <div className="flex justify-between w-10/12 mt-5">
            <div className="overflow-x-auto self-start scrollbar-custom w-full">
              <div className="flex gap-3 self-start w-full">
                {fetching ? (
                  // Display dummy data while fetching
                  <div className="text-center flex items-center justify-center w-full h-32">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#D8485F]"
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
                ) : // Display actual ongoing matches after fetching
                completedMatches.length > 0 ? (
                  completedMatches.map((match: any, index: number) => (
                    <MatchCard
                      key={index}
                      team1={match.home_id}
                      team2={match.away_id}
                      status={1}
                      fixtureid={match.fixture_id}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-32">
                    <div className="text-sm text-slate-500 font-stalinist">
                      Empty
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default Page;
