"use client";
type PerPageSelectProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function PerPageSelect({ value, onChange }: PerPageSelectProps) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>
  );
}