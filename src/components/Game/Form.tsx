import React from "react";
interface PitchProps {
  form: string[];
}
const Form: React.FC<PitchProps> = ({ form }) => {
  return (
    <div className="self-end text-[12px] flex gap-1 font-stalinist">
      {form.map((res, index) => (
        <p
          className={`${
            res === "W"
              ? "text-green-500"
              : res === "D"
              ? "text-slate-300"
              : res === "L" && " text-red-600"
          }`}
          key={index}
        >
          {res}
        </p>
      ))}
    </div>
  );
};

export default Form;
