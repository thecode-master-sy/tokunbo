export type Category = {
  name: string;
  imageUrl: string;
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

export type Product = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _originalId?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  productType: "appliance" | "kitchenUtensil" | "toy";
  status: "draft" | "active" | "archived";
  sku: string;
  slug: {
    _type: "slug";
    current: string;
  };
  category: {
    _id: string;
    _type: "reference";
    _ref: string;
    name: string;
  };
  images: Array<{
    _key: string;
    _type: "image";
    alt?: string;
    asset: {
      _type: "reference";
      _ref: string;
    };
  }>;
  productDetails?: string[];
  shortDescription?: string;
  discountPrice?: number;
  categoryName: string;
};
