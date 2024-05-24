import React from "react";
import { useRouter } from "next/navigation";
interface ButtonProps {
  id: number;
  setplayerId: (id: number) => void;
}

const ArrowButton: React.FC<ButtonProps> = ({ id, setplayerId }) => {
  return (
    <div
      className={`flex justify-center items-center bg-contain bg-no-repeat `}
      style={{
        backgroundImage: `url('/assets/ButtonFrame.svg')`,
        width: "100px",
        height: "80px",
      }}
      onClick={() => {
        console.log("first");
        setplayerId(id);
      }}
    >
      <div className="flex items-center justify-center ">
        {/* <div className='self-center'>GO</div> */}
      </div>
    </div>
  );
};

export default ArrowButton;
