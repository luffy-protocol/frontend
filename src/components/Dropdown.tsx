import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Option {
  id: number;
  name: string;
  image: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  selectedOption: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedOption: (chain: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  open,
  selectedOption,
  setSelectedOption,
  setOpen,
}) => {
  return (
    <div className="relative flex-1 inline-block  text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setOpen(!open)}
        >
          {selectedOption == 0 ? (
            <p className="px-4">{label}</p>
          ) : (
            <button
              className="text-white block px-4 text-sm flex items-center"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Image
                src={options[selectedOption - 1].image}
                alt={options[selectedOption - 1].name}
                width={20}
                height={20}
              />
              <p className="px-4">{options[selectedOption - 1].name}</p>
            </button>
          )}
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          className="origin-top-right w-full border border-[1px] border-gray-300 absolute right-0 mt-2 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((chain, index) => (
              <button
                key={index}
                className="text-gray-300 w-full hover:bg-gray-800 hover:text-white block px-4 py-2 text-sm flex items-center"
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  setSelectedOption(chain.id);
                  setOpen(false);
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
  );
};

export default Dropdown;
