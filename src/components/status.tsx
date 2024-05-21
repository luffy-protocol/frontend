import React from 'react';

interface StatusProps {
  text: string;
}

const Status: React.FC<StatusProps> = ({ text = 'Open Now' }) => {
  return (
   <div className='flex gap-1  items-center'>
        <div className='w-2 h-2 rounded-full bg-green-500'></div>
        <div className='text-center text-[10px]'>
            {text}
            </div>
   </div>
  );
};

export default Status;