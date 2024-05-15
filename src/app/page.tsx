"use client";
import fetchFixtures from "@/utils/supabase/fixtureHelpers/FetchFixtures";
import fixtureById from "@/utils/supabase/fixtureHelpers/FixtureById";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          // const { message, response } = await fetchFixtures();
          const { message, response } = await fixtureById(1150754);
          console.log(response);
        }}
      >
        Fetch
      </button>
    </div>
  );
}
