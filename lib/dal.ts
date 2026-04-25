import {
  bestSellingProductsQuery,
  featuredProductsQuery,
  newestArrivalQuery,
  productsQuery,
  singleProductQuery,
  relatedProductsQuery,
} from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";

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

export const getProducts = cache(
  async ({
    page,
    limit = 20,
    categories = [],
    sort,
  }: {
    page: number;
    limit?: number;
    categories?: string[];
    sort?: string;
  }) => {
    const offset = (page - 1) * limit;

    const products = await client.fetch(productsQuery, {
      offset,
      limit,
      categories,
      sort,
    });

    console.log(products);

    return products;
  },
);

export const getTotalProductsCount = cache(async () => {
  const total = await client.fetch(
    `count(*[_type == "product" && status == "active"])`,
  );

  return total as number;
});

export const getSingleProduct = cache(async (slug: string) => {
  const product: Product = await client.fetch(singleProductQuery, {
    slug,
  });

  return product;
});

export const getSimilarProductsFromCategory = cache(
  async (categoryId: string, productId: string) => {
    const products: Product[] = await client.fetch(relatedProductsQuery, {
      categoryId: categoryId,
      productId: productId,
    });
    return products;
  },
);
