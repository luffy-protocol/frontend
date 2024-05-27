"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface DropdownProps {
  content: string[];
  onOptionClick?: (option: string) => void;
  setState?: Dispatch<SetStateAction<string>>; // Use Dispatch for setState type
}

export default function Dropdown({
  content,
  onOptionClick,
  setState,
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedOption = event.target.value as string; // Type assertion for safety
    setSelectedOption(newSelectedOption);
    onOptionClick?.(newSelectedOption);
    toggleDropdown();
    if (setState) {
      setState(newSelectedOption);
    }
  };

  return (
    <>
      <select
        className="w-[400px] h-[43px] bg-[url('/assets/dropdown.svg')] p-2 bg-cover bg-no-repeat bg-transparent font-stalinist border-none rounded-md appearance-none focus:outline-none"
        name="players"
        id="players"
        value={selectedOption} // Set selected value based on state
        onChange={handleOptionChange} // Handle option changes
      >
        {content.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#0C0D3D] text-white text-[8px]"
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
