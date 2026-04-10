"use client";
export default function Category({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono uppercase text-caps bg-category py-2 px-4 flex items-center rounded-full">
      {children}
    </div>
  );
}
