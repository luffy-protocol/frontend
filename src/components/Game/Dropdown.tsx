"use client";
import { Option } from "@/utils/interface";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DropdownProps {
  label: string;
  options: Option[];
  selectedOption: number;
  setSelectedOption: (e: number) => Promise<void>; // Use Dispatch for setState type
}

export default function Dropdown({
  label,
  selectedOption,
  setSelectedOption,
  options,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("SELECTED OPTION");
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <div className="relative inline-block  text-left font-stalinist">
      <div>
        <button
          className="w-[400px]  h-[55px] bg-[url('/assets/dropdown.svg')] pl-4 py-2 pr-2 bg-cover bg-no-repeat bg-transparent  border-none rounded-md  focus:outline-none flex items-center "
          onClick={() => {
            toggleDropdown();
          }}
        >
          {selectedOption != 0 && (
            <Image
              src={options[selectedOption - 1].image}
              alt={options[selectedOption - 1].name}
              width={20}
              height={20}
            />
          )}
          <p className="text-white ml-4 ">
            {selectedOption == 0 ? label : options[selectedOption - 1].name}
          </p>
        </button>
        {isOpen && (
          <div
            className="w-[92%] border border-t-[0px] border-x-[2px] border-b-[2px] border-[#b52ad8]  absolute left-0 shadow-lg bg-[#0c0c3c] ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {options.map((chain, index) => (
                <button
                  key={index}
                  className="text-gray-300 w-full hover:bg-[#d94856] hover:text-white block px-4 py-2 text-sm flex items-center"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={async () => {
                    console.log("SELECTED CHIAN ID");
                    console.log(chain.id);
                    await setSelectedOption(chain.id);
                    setIsOpen(false);
                  }}
                >
                  <Image
                    src={chain.image}
                    alt={chain.name}
                    width={20}
                    height={20}
                  />
                  <p className="px-4">{chain.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
