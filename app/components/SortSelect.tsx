"use client";
type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="-published_at">Terbaru</option>
      <option value="published_at">Terlama</option>
    </select>
  );
}