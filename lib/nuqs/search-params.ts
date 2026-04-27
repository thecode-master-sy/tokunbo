// lib/searchParams.ts
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  createLoader,
  createSerializer,
  type Options,
  type inferParserType,
} from "nuqs/server";

import { useQueryState } from "nuqs";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault("Featured"),
  category: parseAsArrayOf(parseAsString).withDefault([]),
};

export type PaginationSearchParams = inferParserType<typeof searchParams>;

export const usePage = (options: Options = {}) =>
  useQueryState(
    "page",
    searchParams.page.withOptions({ ...options, shallow: false }),
  );

export const loadSearchParams = createLoader(searchParams);
export const getPaginatedLink = createSerializer(searchParams);
