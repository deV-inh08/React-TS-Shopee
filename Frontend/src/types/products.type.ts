interface Reviews {
  rating: number
  comment: string
  date: Date
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number;
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  images: string[]
  review: Reviews[]
  shippingInformation: string
  stock: number
};

export interface ProductList {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductListConfig {
  skip?: number | 0
  limit?: number | 15
  order?: "asc" | "desc"
  sortBy?: "stock" | "price" | "rating"
  category?: string
  search?: string;
}

export interface ProductAddToCart  {
  id: number,
  title: string
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedPrice: number
  thumbnail: string,
  disable?: boolean
  checked?: boolean
}

