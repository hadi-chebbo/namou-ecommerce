import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/product.service";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}