import { api } from "../lib/api";
import type { ProductListingResponse, Product } from "../types/product";

export async function getProducts(page = 1, limit = 12): Promise<ProductListingResponse> {
    const response = await api.get<ProductListingResponse>("/products", {
        params: {
            page,
            limit,
        }
    });

    return response.data;
}

export async function getProduct(slug: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${slug}`);

    return response.data;
}