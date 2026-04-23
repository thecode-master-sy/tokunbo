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

export const productsQuery = `*[_type == "product" && (count($categories) == 0 || category->slug.current in $categories)]
  | order(_createdAt desc) [$offset...$limit] {
    ...,
    "category": category->{
      name,
      "slug": slug.current
    },
    "images": images[].asset->url
}`;
