import {
  bestSellingProductsQuery,
  featuredProductsQuery,
  newestArrivalQuery,
} from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import { defineQuery } from "next-sanity";
import { Product } from "./product-types";

export async function getBestSellingProducts(): Promise<Product[]> {
  const products: Product[] = await client.fetch(bestSellingProductsQuery);
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products: Product[] = await client.fetch(featuredProductsQuery);
  return products;
}

export async function getNewestArrivals(): Promise<Product[]> {
  const products: Product[] = await client.fetch(newestArrivalQuery);
  return products;
}
