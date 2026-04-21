export const newestArrivalQuery = `*[_type == "product" && status == "active"] | order(_createdAt desc)[0...4]{
  ...,
  category->
  }`;

export const bestSellingProductsQuery = `*[_type == "siteSettings"][0].homepage.bestSellersProducts[]->{
    ...,
    category->
  }`;

export const featuredProductsQuery = `*[_type == "siteSettings"][0].homepage.featuredProducts[]->{
    ...,
    category->
  }`;
