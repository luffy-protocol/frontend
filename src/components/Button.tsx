import React from "react";
import { useRouter } from "next/navigation";
interface ButtonProps {
  id: number;
}

const Button: React.FC<ButtonProps> = ({ id }) => {
  const router = useRouter();
  return (
    <div
      className={`flex justify-center items-center bg-contain bg-no-repeat `}
      style={{
        backgroundImage: `url('/assets/Button.svg')`,
        width: "100px",
        height: "40px",
      }}
      onClick={() => {
        console.log("first");
        router.push(`/game/${id}`);
      }}
    >
      <div className="flex items-center justify-center ">
        {/* <div className='self-center'>GO</div> */}
      </div>
    </div>
  );
};

export default Button;
