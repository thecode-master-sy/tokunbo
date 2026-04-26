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
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="peer w-full rounded-lg border border-[#d4d0ca] bg-white px-4 pb-2 pt-5 text-[15px] text-[#111] outline-none transition-colors placeholder-transparent focus:border-[#111] appearance-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 max-w-[calc(100%-28px)] -translate-y-1/2 truncate text-sm text-[#999] transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:text-[#888] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:text-[#888]"
      >
        {label}
      </label>
    </div>
  );
}
