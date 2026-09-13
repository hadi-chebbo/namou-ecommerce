import { api } from "../lib/api";
import type { WishlistItem } from "../types/wishlist";


export async function getWishlist(): Promise<WishlistItem[]> {
    const response = await api.get<WishlistItem[]>("/wishlist");

    return response.data;
}

export async function addToWishlist(slug: string): Promise<WishlistItem> {
    const response = await api.post<WishlistItem>(`/wishlist/${slug}`);

    return response.data;
}

export async function removeFromWishlist(slug: string) {
  const response = await api.delete(`/wishlist/${slug}`);

  return response.data;
}