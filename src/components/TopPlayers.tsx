import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import PlayerCard from "./PlayerCard";

export default function CarouselLogo() {
  useEffect(() => {
    const slider = new Glide(".glide-09", {
      type: "carousel",
      autoplay: 1,
      animationDuration: 4500,
      animationTimingFunc: "linear",
      perView: 3,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
          gap: 36,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  // Define an array of player data
  const players = [
    { name: "Ruturaj Gaikwad", team: "csk", position: "Batter", points: 100 },
    {
      name: "Quinton de Kock",
      team: "lsg",
      position: "WK-Batter",
      points: 105,
    },
    { name: "Prithvi Shaw", team: "dc", position: "Batter", points: 110 },
    { name: "Ishant Sharma", team: "dc", position: "Bowler", points: 210 },
    { name: "Virat Kholi", team: "rcb", position: "Batter", points: 310 },
    { name: "Shubman Gill", team: "gt", position: "Batter", points: 101 },
    { name: "David Millek", team: "gt", position: "WK-Batter", points: 510 },
    { name: "Rohit Sharma", team: "mi", position: "Batter", points: 101 },];

  return (
    <>
      {/*<!-- Component: Testimonial carousel --> */}
      <div className="glide-09 relative w-full bg-white">
        {/* <!-- Slides --> */}
        <div data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {players.map((player, index) => (
              <li key={index}>
                <PlayerCard
                  name={player.name}
                  team={player.team.toUpperCase()}
                  position={player.position}
                  points={player.points}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
