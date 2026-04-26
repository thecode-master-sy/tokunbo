export function MiniCard({
  label,
  textColor,
  bg,
}: {
  label: string;
  textColor: string;
  bg: string;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded border border-[#e0ddd8] px-[7px] py-[3px] text-[10px] font-extrabold tracking-[0.04em]"
      style={{ color: textColor, background: bg }}
    >
      {label}
    </span>
  );
}
