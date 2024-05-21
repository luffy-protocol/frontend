// import React, { useState, useEffect } from "react";

// const Timer: React.FC = () => {
//   const [time, setTime] = useState({ minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((prevTime) => {
//         const newSeconds = prevTime.seconds === 59 ? 0 : prevTime.seconds + 1;
//         const newMinutes =
//           prevTime.seconds === 59 ? prevTime.minutes + 1 : prevTime.minutes;
//         return { minutes: newMinutes, seconds: newSeconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (value: number) =>
//     String(value).padStart(2, "0").split("");

//   const [minuteTens, minuteOnes] = formatTime(time.minutes);
//   const [secondTens, secondOnes] = formatTime(time.seconds);

//   return (
//     <div className="flex justify-center items-center font-stalinist">
//       <div className="flex gap-1">
//         <DigitBox value={minuteTens} />
//         <DigitBox value={minuteOnes} />
//       </div>
//       <span className="text-md font-stalinist">:</span>
//       <div className="flex gap-1 font-stalinist">
//         <DigitBox value={secondTens} />
//         <DigitBox value={secondOnes} />
//       </div>
//     </div>
//   );
// };

// interface DigitBoxProps {
//   value: string;
// }

// const DigitBox: React.FC<DigitBoxProps> = ({ value }) => (
//   <div
//     className="flex justify-center items-center bg-no-repeat bg-contain"
//     style={{
//       backgroundImage: `url('/assets/TimerBorder.svg')`,
//       width: "28px",
//       height: "28px",
//     }}
//   >
//     <span className="text-md font-stalinist self-center">{value}</span>
//   </div>
// );

// export default Timer;

// import React, { useState, useEffect } from "react";

// interface TimerProps {
//   starttime: string; // Timestamp of the match start time
// }

// const Timer: React.FC<TimerProps> = ({ starttime }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const targetTime = new Date(Number(starttime) * 1000).getTime();
//     console.log(new Date(Number(starttime) * 1000).toLocaleString());
//     const updateTimeLeft = () => {
//       const now = new Date().getTime();
//       const difference = targetTime - now;

//       if (difference > 0) {
//         const hours = Math.floor(difference / (1000 * 60 * 60));
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setTimeLeft({ hours, minutes, seconds });
//       } else {
//         setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
//       }
//     };

//     const timer = setInterval(updateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, [starttime]);

//   const formatTime = (value: number) =>
//     String(value).padStart(2, "0").split("");

//   const [hourTens, hourOnes] = formatTime(timeLeft.hours);
//   const [minuteTens, minuteOnes] = formatTime(timeLeft.minutes);

//   return (
//     <div className="flex justify-center items-center font-stalinist">
//       <div className="flex gap-1">
//         <DigitBox value={hourTens} />
//         <DigitBox value={hourOnes} />
//       </div>
//       <span className="text-md font-stalinist">:</span>
//       <div className="flex gap-1">
//         <DigitBox value={minuteTens} />
//         <DigitBox value={minuteOnes} />
//       </div>
//     </div>
//   );
// };

// interface DigitBoxProps {
//   value: string;
// }

// const DigitBox: React.FC<DigitBoxProps> = ({ value }) => (
//   <div
//     className="flex justify-center items-center bg-no-repeat bg-contain"
//     style={{
//       backgroundImage: `url('/assets/TimerBorder.svg')`,
//       width: "28px",
//       height: "28px",
//     }}
//   >
//     <span className="text-md font-stalinist self-center">{value}</span>
//   </div>
// );

// export default Timer;

import React, { useState, useEffect } from "react";

interface TimerProps {
  starttime: string; // Timestamp of the match start time
}

const Timer: React.FC<TimerProps> = ({ starttime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const targetTime = new Date(Number(starttime) * 1000).getTime();

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        console.log(days);
        const hours1 = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const hours = hours1 + days * 24;
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [starttime]);

  const formatTime = (value: number) =>
    String(value).padStart(2, "0").split("");

  const { days, hours, minutes } = timeLeft;

  return (
    <div className="flex justify-center items-center font-stalinist">
      {/* {days > 0 && (
        <div className="flex gap-1">
          <DigitBox value={formatTime(days)[0]} />
          <DigitBox value={formatTime(days)[1]} />
          <span className="text-md font-stalinist self-center">:</span>
        </div>
      )} */}
      <div className="flex gap-1">
        <DigitBox value={formatTime(hours)[0]} />
        <DigitBox value={formatTime(hours)[1]} />
        <DigitBox value={formatTime(hours)[2]} />
        <span className="text-md font-stalinist self-center">:</span>
      </div>
      <div className="flex gap-1">
        <DigitBox value={formatTime(minutes)[0]} />
        <DigitBox value={formatTime(minutes)[1]} />
      </div>
    </div>
  );
};

interface DigitBoxProps {
  value: string;
}

const DigitBox: React.FC<DigitBoxProps> = ({ value }) => (
  <div
    className="flex justify-center items-center bg-no-repeat bg-contain"
    style={{
      backgroundImage: `url('/assets/TimerBorder.svg')`,
      width: "28px",
      height: "28px",
    }}
  >
    <span className="text-md font-stalinist self-center">{value}</span>
  </div>
);

export default Timer;
