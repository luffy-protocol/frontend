import React from 'react';

interface StatusProps {
  text: string;
}

const Status: React.FC<StatusProps> = ({ text = 'Open Now' }) => {
  return (
   <div className='flex gap-1 justify-center items-center'>
        <div className='w-2 h-2 rounded-full bg-green-500'></div>
        <div className='text-center text-sm'>
            {text}
            </div>
   </div>
  );
};

export default Status;