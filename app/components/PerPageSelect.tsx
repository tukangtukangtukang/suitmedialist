"use client";
import { FaChevronDown } from "react-icons/fa";

type PerPageSelectProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function PerPageSelect({ value, onChange }: PerPageSelectProps) {
  return (
    <label className="flex items-center gap-1 font-medium text-[#AF3E3E] group">
      <span className="transition-colors duration-200 group-focus-within:text-[#CD5656]">
        Show per page:
      </span>
      <span className="relative">
        <select
          className="appearance-none border border-[#DA6C6C] rounded px-2 py-1 text-[#AF3E3E] bg-[#EAEBD0] focus:ring-2 focus:ring-[#DA6C6C] focus:outline-none transition-all duration-200 pr-6 focus:shadow-lg focus:scale-105 peer"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#DA6C6C] transition-transform duration-200 peer-focus:rotate-180" />
      </span>
    </label>
  );
}