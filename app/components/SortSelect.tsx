"use client";
import { Listbox } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const options = [
    { value: "-published_at", label: "Terbaru" },
    { value: "published_at", label: "Terlama" },
  ];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="border border-[#DA6C6C] rounded px-2 py-1 text-[#AF3E3E] bg-[#EAEBD0] flex items-center gap-2 w-full">
          Sort by: {options.find(o => o.value === value)?.label}
          <FaChevronDown className="ml-2 text-[#DA6C6C]" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-[#EAEBD0] border border-[#DA6C6C] rounded shadow-lg z-10">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active }) =>
                `cursor-pointer px-4 py-2 transition-colors duration-150 ${
                  active ? 'bg-[#DA6C6C] text-[#EAEBD0]' : 'text-[#AF3E3E]'
                }`
              }
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
} 