import React from "react";

export function SectionHead({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[#0f0f0f]">
        {title}
      </h2>
      {right}
    </div>
  );
}
