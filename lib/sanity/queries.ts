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

export const productsQuery = `*[_type == "product" && status == "active" &&
  (count($categories) == 0 || category->slug.current in $categories) &&
  (
    !defined($query) || $query == "" ||
    name match $query + "*" ||
    brand match $query + "*" ||
    sku match $query ||
    tags[] match $query
  )
]
| order(_createdAt desc) [$offset...$offset + $limit] {
   ...,
    "category": category->{
      name,
      "slug": slug.current
    }
}`;

export const singleProductQuery = `*[_type == "product" && slug.current == $slug][0]`;

export const relatedProductsQuery = `
  *[_type == "product" &&
    category._ref == $categoryId &&
    _id != $productId &&
    status == "active"
  ][0...4] {
    ...,
    category ->
  }
`;

export const categoriesQuery = `*[_type == "category"]{
  _id,
  name,
  slug,
  image
}`;
