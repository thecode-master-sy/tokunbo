import {
  bestSellingProductsQuery,
  featuredProductsQuery,
  newestArrivalQuery,
} from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import { defineQuery } from "next-sanity";
import { Product } from "./product-types";
import { cache } from "react";

export const getBestSellingProducts = cache(async () => {
  const products: Product[] = await client.fetch(bestSellingProductsQuery);
  return products;
});

export const getFeaturedProducts = cache(async () => {
  const products: Product[] = await client.fetch(featuredProductsQuery);
  return products;
});

export const getNewestArrivals = cache(async () => {
  const products: Product[] = await client.fetch(newestArrivalQuery);
  return products;
});
