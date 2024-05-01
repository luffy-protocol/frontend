"use client";
import FixtureCard from "@/components/FixtureCard";
import React, { useEffect, useState } from "react";
import { Pixelify_Sans } from "next/font/google";
import { request, gql } from "graphql-request";
import fetchFixtures from "@/utils/supabaseFunctions/fetchFixtures";
import { useAccount } from "wagmi";

const pxsans = Pixelify_Sans({ subsets: ["latin"] });

function Page() {
  const { address } = useAccount();

  const [matches, setMatches] = useState([
    {
      id: 91515,
      team1: "Delhi Capitals",
      team2: "Gujarat Titans",
      title: "Indian Premiere League",
    },
    {
      id: 91555,
      team1: "Chennai Super Kings",
      team2: "Sunrisers Hyderabad",
      title: "Indian Premiere League",
    },
  ]);
  const [upcomingMatches, setUpcomingMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);
  const [ongoingMatches, setOngoingMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);
  const [completedMatches, setCompletedMatches] = useState<
    { id: number; team1: string; team2: string; title: string }[]
  >([]);
  useEffect(() => {
    const fetchUpcomingFixtures = async () => {
      try {
        // Fetch fixtures
        const { message, response } = await fetchFixtures();
        if (message === "Success") {
          // Get current date
          const currentDate = new Date();
          // Filter upcoming matches
          const filteredMatches = response.filter((match: any) => {
            const startDate = new Date(Number(match.startDate));
            return startDate > currentDate;
          });
          // Map the filtered matches to the desired format
          const completedMatches = filteredMatches
            .slice(0, 6)
            .map((match: any) => ({
              id: match.id, // Assuming fid represents matchId
              team1: match.team1,
              team2: match.team2,
              title: "Indian Primere League", // Common title
            }));
          // Set completed matches in state
          console.log(completedMatches);
          setCompletedMatches(completedMatches);
        } else {
          console.error("Error fetching upcoming fixtures:", message);
        }
      } catch (error) {
        console.error("Error fetching upcoming fixtures:", error);
      }
    };
    // Call the function to fetch upcoming fixtures
    fetchUpcomingFixtures();
  }, []);
  useEffect(() => {
    async function fetchOngoingFixtures() {
      try {
        const data = await request(
          "https://api.studio.thegraph.com/query/30735/zkricket/version/latest",
          gql`
            query MyQuery {
              users(address: "${address}") {
                predictions {
                  game{
                    id
                  }
                }
              }
            }
          `
        );

        // Extract ongoing matches from the data and set in state
        if (data != null) {
          const predictions = (data as any).users[0].predictions;
          const games = predictions.map((prediction: any) =>
            parseInt(prediction.game.id, 16)
          );
          const ongoingMatchesData = matches.filter((match: any) =>
            games.includes(match.id)
          );
          const upcomingMatchesData = matches.filter(
            (match: any) => !games.includes(match.id)
          );
          setOngoingMatches(ongoingMatchesData);
          setUpcomingMatches(upcomingMatchesData);
          console.log("Ongoing Matches Data");
          console.log(ongoingMatchesData);
          console.log("Upcoming Matches Data");
          console.log(upcomingMatchesData);
        }
        console.log("Data from the graph");
        console.log(data);
        // setongoing(ongoingMatchesData);
      } catch (error) {
        console.error("Error fetching ongoing fixtures:", error);
      }
    }

    // Call the function to fetch ongoing fixtures
    fetchOngoingFixtures();
  }, []);

  return (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Upcoming Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participate in upcoming fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white">
        <FixtureCard fixtures={upcomingMatches} state={0} />
      </div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Ongoing Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participate in Ongoing fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white">
        <FixtureCard fixtures={ongoingMatches} state={1} />
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Completed Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Completed fixtures
          </p>
        </div>
      </div>
      <div className="px-24 bg-white">
        <FixtureCard fixtures={completedMatches} state={2} />
      </div>
    </div>
  );
}

export default Page;
