"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface DropdownProps {
  options: string[];
  selectedOption: number;
  setSelectedOption: (e: number) => void; // Use Dispatch for setState type
}

export default function Dropdown({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <select
        className="w-[400px] h-[55px] bg-[url('/assets/dropdown.svg')] p-2 bg-cover bg-no-repeat bg-transparent font-stalinist border-none rounded-md appearance-none focus:outline-none"
        name="players"
        id="players"
        value={options[selectedOption]} // Set selected value based on state
        onClick={() => {
          toggleDropdown();
        }}
      >
        {options.map((option, index) => (
          <option
            key={option}
            value={option}
            onClick={() => {
              setSelectedOption(index);
            }}
            className="bg-[#0C0D3D] text-white text-[8px]"
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
