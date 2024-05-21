

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
      className={`flex items-center justify-evenly  bg-no-repeat bg-contain xl:h-[165px] h-[140px]`}
      style={{ backgroundImage: `url('/assets/Border.svg')`,width:"100%"}}
    >

      <div className="flex flex-col justify-center items-center ">
        <div className="text-[10px] font-stalinist ml-8">Starts in</div>

        <div className="flex gap-4 items-center justify-center ">
          <div className="flex flex-col items-center">
            <p className="font-bold text-2xl font-stalinist text-[#D8485F]">Orlando City</p>
            <div className=' self-start text-[12px] flex gap-1 font-stalinist'><p>W</p><p>L</p><p>W</p><p>W</p> <p>D</p></div>
          </div>
            <div className=' self-start mt-2'> <Timer/></div>

          <div className="flex flex-col ">
            <p className="font-bold text-2xl font-stalinist text-[#B62DD3]">Inter Miami</p>
            <div className='self-end text-[12px] flex gap-1 font-stalinist' ><p>W</p><p>L</p><p>W</p><p>W</p> <p>D</p></div>
          </div>
        </div>
        <div className="text-[10px] font-stalinist text-gray-400 ml-8">Inter and co Stadium</div>


      </div>

      <div className=' justify-end font-stalinist'>
      <div className='flex flex-col justify-start gap-3 '>
        <Status text="Open Now" />
        <div className=''>
        <Button />

        </div>
        <div className='text-[10px]'>Players : 250</div>
      </div>
      </div>
    </div>
  );
};

export default Card;
