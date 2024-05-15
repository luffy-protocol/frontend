"use client";
import { playerimg } from "@/utils/logos/playerImage";
import { teamLogo } from "@/utils/logos/teamlogo";
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
      <img src={teamLogo("1616")} alt="" width={50} height={50} />
      <img src={playerimg("153465")} alt="" width={50} height={50} />
    </div>
  );
}
