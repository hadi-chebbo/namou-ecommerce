import { api } from "../lib/api";
import type { Cart, CartItem } from "../types/cart";

export async function getCart(): Promise<Cart> {
  const response = await api.get<Cart>("/cart");
  return response.data;
}

export async function addToCart(
  productSlug: string,
  variantId: string | undefined,
  quantity: number
): Promise<CartItem> {
  const response = await api.post<CartItem>("/cart/items", {
    productSlug,
    variantId,
    quantity,
  });

  return response.data;
}

export async function updateCartItem(
  itemId: string,
  quantity?: number,
  variantId?: string
): Promise<CartItem> {
  const response = await api.patch<CartItem>(`/cart/items/${itemId}`, {
    quantity,
    variantId,
  });

  return response.data;
}

export async function removeCartItem(itemId: string) {
  const response = await api.delete(`/cart/items/${itemId}`);
  return response.data;
}

export async function clearCart() {
  const response = await api.delete("/cart");
  return response.data;
}