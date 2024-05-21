import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const newSeconds = prevTime.seconds === 59 ? 0 : prevTime.seconds + 1;
        const newMinutes = prevTime.seconds === 59 ? prevTime.minutes + 1 : prevTime.minutes;
        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, '0').split('');

  const [minuteTens, minuteOnes] = formatTime(time.minutes);
  const [secondTens, secondOnes] = formatTime(time.seconds);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex gap-1">
        <DigitBox value={minuteTens} />
        <DigitBox value={minuteOnes} />
      </div>
      <span className="text-md font-mono">:</span>
      <div className="flex gap-1">
        <DigitBox value={secondTens} />
        <DigitBox value={secondOnes} />
      </div>
    </div>
  );
};

interface DigitBoxProps {
  value: string;
}

const DigitBox: React.FC<DigitBoxProps> = ({ value }) => (
  <div className="flex justify-center items-center bg-no-repeat bg-contain" style={{backgroundImage : `url('/assets/TimerBorder.svg')` ,width:"24px" ,height:"24px"}}>
    <span className="text-md font-mono self-center">{value}</span>
  </div>
);

export default Timer;
