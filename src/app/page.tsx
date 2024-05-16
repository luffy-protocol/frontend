"use client";
import { playerimg } from "@/utils/logos/playerImage";
import { teamLogo } from "@/utils/logos/teamlogo";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import fixtureById from "@/utils/fixtureHelpers/FixtureById";
import Image from "next/image";
import { getPlayerById } from "@/utils/playerHelpers/FetchPlayerById";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          // const { message, response } = await fetchFixtures();
          // const { message, response } = await fixtureById(1150754);
          const response = getPlayerById(148);
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
