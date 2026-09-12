import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

export function useProducts(page: number) {
    return useQuery({
        queryKey: ["products", page],
        queryFn: () => getProducts(page),
        staleTime: 5 * 60 * 1000,
    });
}