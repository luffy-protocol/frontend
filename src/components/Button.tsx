import React from "react";
import { useRouter } from "next/navigation";
interface ButtonProps {
  id: number;
}

const Button: React.FC<ButtonProps> = ({ id }) => {
  const router = useRouter();
  return (
    <div
      className={`flex items-center justify-center bg-no-repeat bg-contain  h-[60px]`}
      style={{
        backgroundImage: `url('/assets/Button.svg')`,
      }}
      onClick={() => {
        router.push(`/game/${id}`);
      }}
    >
      <span className="text-sm font-stalinist flex justify-center self-center text-center px-1 mr-7">
        Go
      </span>
    </div>
  );
};

export default Button;
