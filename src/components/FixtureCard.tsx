

import React from 'react';
import Timer from './Timer';
import Status from './status';
import Button from './Button';

interface CardProps {
  className?: string; // Optional class for additional styling
}

const Card: React.FC<CardProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center justify-evenly bg-contain bg-no-repeat `}
      style={{ backgroundImage: `url('/assets/Border.svg')` }}
    >
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="text-sm">Starts in</div>

        <div className="flex gap-4 items-center justify-center ">
          <div className="flex flex-col items-center">
            <p className="font-bold text-2xl">Orlando City</p>
            <div className=' self-start text-[12px] flex gap-1'><p>W</p><p>L</p><p>W</p><p>W</p> <p>D</p></div>
          </div>
            <div className=' self-start mt-2'> <Timer/></div>

          <div className="flex flex-col ">
            <p className="font-bold text-2xl ">Inter Miami</p>
            <div className='self-end text-[12px] flex gap-1'><p>W</p><p>L</p><p>W</p><p>W</p> <p>D</p></div>
          </div>
        </div>
        <div className="text-sm mt-3">Inter and co Stadium</div>


      </div>
      <div className='flex flex-col justify-center gap-2'>
        <Status text="Open Now" />
        <div className='self-end'>
        <Button />
        </div>
        <div>Players : 250</div>
      </div>
    </div>
  );
};

export default Card;
