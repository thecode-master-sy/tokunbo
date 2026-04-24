// lib/searchParams.ts
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  createLoader,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault("Featured"),
  category: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadSearchParams = createLoader(searchParams);
