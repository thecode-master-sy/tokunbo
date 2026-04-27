import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  getPaginatedLink,
  PaginationSearchParams,
} from "@/lib/nuqs/search-params";

type PaginationControlsProps = {
  numPages: number;
  pagination: Promise<PaginationSearchParams>;
};

export default async function ServerPaginationControls({
  numPages,
  pagination,
}: PaginationControlsProps) {
  const { page, sort, category } = await pagination;

  const isFirstPage = page <= 1;
  const isLastPage = page >= numPages;

  function pageURL(nextPage: number) {
    const safePage = Math.min(Math.max(nextPage, 1), numPages);

    return getPaginatedLink("/shop", {
      page: safePage,
      sort,
      category,
    });
  }

  return (
    <Pagination className="not-prose items-center gap-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={pageURL(page - 1)}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {Array.from({ length: numPages }, (_, i) => {
          const current = i + 1;
          const active = page === current;

          return (
            <PaginationItem key={current}>
              <PaginationLink
                href={pageURL(current)}
                aria-current={active ? "page" : undefined}
                className={cn(active && "bg-white")}
              >
                {current}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={pageURL(page + 1)}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={cn(isLastPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>

      
    </Pagination>
  );
}
