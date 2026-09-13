import type { Product, ProductVariant } from "./product";

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  variant: ProductVariant | null;
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
};