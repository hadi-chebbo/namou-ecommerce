import type { Product } from "./product";

export type WishlistItem = {
    id: string,
    userId: string,
    productId: string,
    createdAt: string,
    product: Product,
}