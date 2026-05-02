import React from "react";

export function FloatInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="peer w-full rounded-lg border border-[#d4d0ca] bg-white px-4 pb-2 pt-5 text-[15px] outline-none transition-colors placeholder-transparent focus:border-[#111] appearance-none"
      />
    </div>
  );
}
