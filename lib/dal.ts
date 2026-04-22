import {
  bestSellingProductsQuery,
  featuredProductsQuery,
  newestArrivalQuery,
  productsQuery,
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

export const getProducts = cache(async (page: number, limit = 20) => {
  const offset = (page - 1) * limit;

  const products: Product[] = await client.fetch(productsQuery, {
    offset,
    limit,
  });

  return products;
});

export async function getTotalProductsCount() {
  const total = await client.fetch(
    `count(*[_type == "product" && status == "active"])`,
  );

  return total as number;
}
