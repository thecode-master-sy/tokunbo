import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={currentPage > 1 ? `?page=${currentPage - 1}` : "?page=1"}
        className="grid h-14 w-14 place-items-center rounded-full bg-neutral-100 text-xl hover:bg-neutral-200"
        aria-disabled={currentPage === 1}
      >
        ←
      </Link>

      <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={page === 1 ? "?page=1" : `?page=${page}`}
            className={[
              "grid h-12 w-12 place-items-center rounded-full text-sm transition",
              page === currentPage
                ? "bg-white text-black shadow"
                : "text-neutral-700 hover:bg-neutral-200",
            ].join(" ")}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={
          currentPage < totalPages
            ? `?page=${currentPage + 1}`
            : `?page=${totalPages}`
        }
        className="grid h-14 w-14 place-items-center rounded-full bg-neutral-100 text-xl hover:bg-neutral-200"
        aria-disabled={currentPage === totalPages}
      >
        →
      </Link>
    </div>
  );
}
