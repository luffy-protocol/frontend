"use client";

import {
  Dispatch,
  Fragment,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { csk, rcb, rr, kkr, dc, pbks, lsg, gt, srh, mi } from "@/data/teams";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { useAccount } from "wagmi";
interface PlayerPitch {
  name: string;
  id: string;
  team:
    | "plain"
    | "csk"
    | "rcb"
    | "mi"
    | "dc"
    | "kkr"
    | "pbks"
    | "rr"
    | "srh"
    | "gt"
    | "lsg"
    | "pkbs"
    | "dc";
  type: "bat" | "bowl" | "ar" | "wk";
}
interface AddPlayerProps {
  index: number;
  teams: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPlayerPositions: Dispatch<SetStateAction<PlayerPitch[]>>;
  slug: string;
}

const teamShortForms: { [key: string]: string } = {
  "Chennai Super Kings": "CSK",
  "Royal Challengers Bangalore": "RCB",
  "Mumbai Indians": "MI",
  "Delhi Capitals": "DC",
  "Kolkata Knight Riders": "KKR",
  "Punjab Kings": "PBKS",
  "Rajasthan Royals": "RR",
  "Sunrisers Hyderabad": "SRH",
  "Gujarat Titans": "GT",
  "Lucknow Super Giants": "LSG",
};

const Addplayer: React.FC<AddPlayerProps> = ({
  open,
  teams,
  index,
  setPlayerPositions,
  setOpen,
  slug,
}) => {
  const [team, setteams] = useState<string[]>(["rcb", "mi"]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(slug);
      if (message === "Success") {
        setteams([
          teamShortForms[response[0].team1].toLowerCase(),
          teamShortForms[response[0].team2].toLowerCase(),
        ]);
        fetchPlayers([
          teamShortForms[response[0].team1].toLowerCase(),
          teamShortForms[response[0].team2].toLowerCase(),
        ]);
      }
    };
    fetchTeams();
  }, []);

  const fetchPlayers = async (team: any) => {
    if (team[0] != "") {
      const team1 = allTeams[team[0] as keyof typeof allTeams] as any;
      const team2 = allTeams[team[1] as keyof typeof allTeams] as any;

      let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");
      let playerIds = gameData[slug];
      if (playerIds != undefined) {
        const matchedPlayers = playerIds.map((id: any) => {
          const team1Player = team1.player.find(
            (p: any) => parseInt(p.id) === id
          );
          const team2Player = team2.player.find(
            (p: any) => parseInt(p.id) === id
          );
          return team1Player
            ? {
                name: team1Player.name,
                id: team1Player.id,
                type:
                  team1Player.role == "Batter"
                    ? "bat"
                    : team1Player.role == "Bowler"
                    ? "bowl"
                    : team1Player.role == "Allrounder"
                    ? "ar"
                    : "wk",
                team: team1.name,
              }
            : team2Player
            ? {
                name: team2Player.name,
                id: team2Player.id,
                type:
                  team2Player.role == "Batter"
                    ? "bat"
                    : team2Player.role == "Bowler"
                    ? "bowl"
                    : team2Player.role == "Allrounder"
                    ? "ar"
                    : "wk",
                team: team2.name,
              }
            : { name: "Choose Player", id: "", type: "wk", team: "plain" }; // If player not found, return null
        });
        setPlayerPositions(matchedPlayers);
      }
    }
  };
  // const team = ["mi", "csk"];
  interface Player {
    id?: string;
    name: string;
    captain?: boolean;
    role?: string;
    imageId?: number;
    battingStyle?: string;
    bowlingStyle?: string;
    team?: string;
  }
  const [role, setRole] = useState("");
  const [player, setPlayer] = useState<Player[]>([]); // Fix the missing 'Player' type
  const allTeams = {
    csk: csk,
    rcb: rcb,
    rr: rr,
    kkr: kkr,
    dc: dc,
    pbks: pbks,
    lsg: lsg,
    gt: gt,
    srh: srh,
    mi: mi,
  };

  useEffect(() => {
    if (index === 10) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Wicket Keeper");
    } else if (index >= 6) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Batting Allrounder")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Batting Allrounder")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("All Rounder");
    } else if (index >= 3) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Bowler");
    } else {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Batter")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Batter")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Batsman");
    }
  }, [index]);
  const updatePlayerPosition = (index: number, newPlayerData: PlayerPitch) => {
    let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");
    if (gameData[slug] == null || gameData[slug] == undefined) {
      gameData[slug] = Array(11).fill(0);
    }
    gameData[slug][index] = parseInt(newPlayerData.id);
    console.log("GAME DATA");
    console.log(gameData);
    localStorage.setItem("gameData", JSON.stringify(gameData));
    setPlayerPositions((prevPositions: any) => {
      // Create a copy of the state to avoid mutation
      const updatedPositions = [...prevPositions];

      // Ensure the index is within valid bounds
      if (index >= 0 && index < updatedPositions.length) {
        updatedPositions[index] = newPlayerData; // Replace the entire player entry
      } else {
        console.error(`Invalid index: ${index}`);
      }

      return updatedPositions;
    });
  };

  const renderImage = (index: any) => {
    return (
      <img
        className="h-11 w-11 rounded-full"
        src={
          `https://i.cricketcb.com/stats/img/faceImages/${index}.jpg` ||
          "/default.png"
        }
        alt=""
      />
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-y-auto rounded-lg h-96 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-7xl sm:p-6">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Add Player
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">{role}</p>
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Team
                              </th>
                              {/* <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th> */}
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {player.map((person) => (
                              <tr key={person.id}>
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      {/* <img
                                        className="h-11 w-11 rounded-full"
                                        src={
                                          playerImages[index] || "/default.png"
                                        }
                                        alt=""
                                      /> */}
                                      {renderImage(person.id)}
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        {person.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <div className="text-gray-900">
                                    {/* {person.team} */}
                                    {person.team?.toUpperCase()}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  {role}
                                </td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <button
                                      type="button"
                                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      onClick={() => {
                                        console.log(person);
                                        updatePlayerPosition(index, {
                                          id: person.id as any,
                                          name: person.name,
                                          team: person.team as any,
                                          type: person.role as any,
                                        });
                                        setOpen(false);
                                      }}
                                    >
                                      Add Player
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Addplayer;
