import { api } from "../lib/api";
import type { ProductListingResponse } from "../types/product";

export async function getProducts(page = 1, limit = 12): Promise<ProductListingResponse> {
    const response = await api.get<ProductListingResponse>("/products", {
        params: {
            page,
            limit,
        }
    });

    return response.data;
}