"use client";
import { playerimg } from "@/utils/logos/playerImage";
import { teamLogo } from "@/utils/logos/teamlogo";
import fetchFixtures from "@/utils/fixtureHelpers/FetchFixtures";
import fixtureById from "@/utils/fixtureHelpers/FixtureById";
import Image from "next/image";
import { getPlayerById } from "@/utils/playerHelpers/FetchPlayerById";
import PlayerCard from "@/components/PlayerCard";
import { useState } from "react";
import uploadProfileImg from "@/utils/profileHelpers/uploadprofileImg";
import registerUserProfile from "@/utils/profileHelpers/registerUserProfile";
import addFollower from "@/utils/profileHelpers/addFollower";
import FixtureCard from "@/components/FixtureCard";
import { getPlayerByTeamId } from "@/utils/playerHelpers/FetchPlayerByTeamId";
import getFollowingNotifications from "@/utils/notificationHelpers/notifyFollowing";
import ArrowButton from "@/components/ArrowButton";

export default function Home() {
  const [img, setimg] = useState<File | null | undefined>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (img) {
      const data = await uploadProfileImg(img, 1001);
      console.log(data.response);
      console.log("uploaded");
    }
  };

  // const data = getPlayerByTeamId(9568, 1606);
  // console.log(data);

  // return (
  //   <div>
  //     <button
  //       onClick={async () => {
  //         // const { message, response } = await fetchFixtures();
  //         // const { message, response } = await fixtureById(1150754);
  //         // const response = getPlayerById(148);
  //         // Register profile before adding the follower or error will be thrown
  //         // const { message: c, response: d } = await registerUserProfile(1112);
  //         // const { message: a, response: b } = await registerUserProfile(1111);
  //         // const { message, response } = await addFollower(1111, 1112);
  //         // console.log(response);
  //         const { message, response } = await getFollowingNotifications(1111);
  //         console.log(response);
  //       }}
  //     >
  //       Register
  //     </button>
  //     <img src={teamLogo(1616)} alt="" width={50} height={50} />
  //     <img src={playerimg(153465)} alt="" width={50} height={50} />
  //     <PlayerCard />

  //     <form action="" onSubmit={handleSubmit}>
  //       <label htmlFor="">Profile Image</label>
  //       <input
  //         type="file"
  //         name="profile"
  //         id="profile"
  //         onChange={(e) => {
  //           if (e.target.files) setimg(e.target.files[0]);
  //         }}
  //       />
  //       <input type="submit" title="submit" />
  //     </form>
  //   </div>
  // );
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-2">
      {/* <FixtureCard /> */}
      <PlayerCard />
      {/* <ArrowButton /> */}
    </div>
  );
}
