// product-related interfaces
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface Category {
  name: string;
}

// cart-related interfaces
export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// empty cart...
export const EMPTY_CART: Cart = {
  items: [],
};
