export interface CartItem {
  currency: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface Cart {
  items: CartItem[];
}
