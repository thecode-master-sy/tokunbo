export type Category = {
  name: string;
  _id: string;
  slug: {
    current: string;
  };
  image: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
};

export type BestSellingProduct = {
  _id: string;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  price: number;
  discountPrice?: number;
  shortDescription?: string;
  images: Array<{
    _key: string;
    _type: "image";
    alt?: string;
    asset: {
      _type: "reference";
      _ref: string;
    };
  }>;
  featured: boolean;
  status: "draft" | "active" | "archived";
};

export type ProductImage = {
  _key?: string;
  _type: "image";
  alt?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    _type: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: string;
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export type ProductVariant = {
  _key: string;
  size: string;
  knobType: "black" | "stainless" | string;
  price: number;
  sku: string;
  stock: number;
};

export type ProductCustomization = {
  _key: string;
  label: string;
  name: string;
  type: "select" | string;
  choices: string[];
  defaultValue?: string;
  required?: boolean;
};

export type ProductSlug = {
  _type: "slug";
  current: string;
};

export type Product = {
  _id: string;
  _type: "product";
  name: string;
  slug: ProductSlug;
  description: string;
  price: number;
  status: "active" | "draft" | "archived" | string;
  featured?: boolean;
  productType?: string;
  images: ProductImage[];
  productDetails?: string[];
  variants?: ProductVariant[];
  customizations?: ProductCustomization[];
  category: {
    _ref: string;
    _type: string;
    name: string;
  };
};
